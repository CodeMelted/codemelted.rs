#
# =============================================================================
# MIT License
#
# © 2025 Mark Shaffer. All Rights Reserved.
#
# Permission is hereby granted, free of charge, to any person obtaining a
# copy of this software and associated documentation files (the "Software"),
# to deal in the Software without restriction, including without limitation
# the rights to use, copy, modify, merge, publish, distribute, sublicense,
# and/or sell copies of the Software, and to permit persons to whom the
# Software is furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
# THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
# FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
# DEALINGS IN THE SOFTWARE.
# =============================================================================
# [CLASS DEFINITIONS] =========================================================
# =============================================================================

# .NET Assemblies
Add-Type -AssemblyName Microsoft.PowerShell.Commands.Utility

# .NET Based Classes
Add-Type -Language CSharp @"
  using System;
  using System.Diagnostics;
  using System.IO;
  using System.Text;

  // Main class definition for the process_spawn cmdlet.
  public class CProcess {
    // Member Fields
    private String _output;
    private Process _process;
    private DataReceivedEventHandler _data_rx_handler;

    // Gets the PID of the kicked off powershell process.
    public int id() {
      return _process.Id;
    }

    // Kills this process and deregisters the handlers.
    public void kill() {
      _process.Kill();
      _process.OutputDataReceived -= _data_rx_handler;
      _process.ErrorDataReceived -= _data_rx_handler;
    }

    // Gets the current output captured by the process and clears the
    // member field for later queries.
    public string read() {
      var rtnval = _output;
      _output = "";
      return rtnval;
    }

    /// Takes a string of data to write and converts it to bytes.
    public void write(string data) {
      var buffer = System.Text.Encoding.ASCII.GetBytes(data);
      _process.StandardInput.BaseStream.Write(buffer, 0, buffer.Length);
      _process.StandardInput.BaseStream.Flush();
    }

    // Constructor for the class. Takes the command and arguments to run the
    // command.
    public CProcess(string command, string arguments) {
      _process = new Process();
      _process.StartInfo.FileName = command;
      _process.StartInfo.Arguments = arguments;
      _process.StartInfo.UseShellExecute = false;
      _process.StartInfo.RedirectStandardInput = true;
      _process.StartInfo.RedirectStandardError = true;
      _process.StartInfo.RedirectStandardOutput = true;

      _data_rx_handler = new DataReceivedEventHandler((sender, e) => {
          _output += e.Data;
          _output += "\n";
      });
      _process.OutputDataReceived += _data_rx_handler;
      _process.ErrorDataReceived += _data_rx_handler;

      _process.Start();
      _process.BeginErrorReadLine();
      _process.BeginOutputReadLine();
    }
  }
"@

# Global Namespace for Module
if ($null -eq $Global:CodeMeltedData) {
  $Global:CodeMeltedData = @{
    log_level = 3;
    log_handler = $null;
  }
}

# A response object returned from the codemelted_network fetch action.
# Contains the status_code, statusText, and the data.
class CFetchResponse {
  # Member Fields
  [int] $status_code
  [object] $data

  # Signals whether the status_code was a 2XX HTTP Response Code or not.
  [bool] is_ok() {
    return $this.status_code -gt 199 && $this.status_code -lt 300
  }

  # Will treat the data as a series of bytes if it is that or return $null.
  [byte[]] as_bytes() {
    return $this.data -is [byte[]] ? $this.data : $null
  }

  # Will treat the data as a JSON object if it is that or return $null.
  [hashtable] as_object() {
    return $this.data -is [hashtable] ? $this.data : $null
  }

  # Will treat the data as a string if it is that or return $null.
  [string] as_string() {
    return $this.data -is [string] ? $this.data : $null
  }

  # Constructor for the class transforming the response into the appropriate
  # data for consumption.
  CFetchResponse($resp) {
    $this.status_code = $resp.StatusCode
    [string] $headers = $resp.Headers | Out-String
    if ($headers.ToLower().Contains("application/json")) {
      $this.data = json_parse @{
        "data" = $resp.Content
      }
    } else {
      $this.data = $resp.Content
    }
  }
}

# Provides the log record object to pass to a handler for post processing.
# Attached to it is the module log level along with the current captured
# log level, data, and the time it was logged.
class CLogRecord {
  # Constants
  static [int] $DebugLogLevel = 0
  static [int] $InfoLogLevel = 1
  static [int] $WarningLogLevel = 2
  static [int] $ErrorLogLevel = 3
  static [int] $OffLogLevel = 4

  # Utility to translate to the constants to string representation.
  static [string] log_level_string([int] $log_level) {
    if ($log_level -eq [CLogRecord]::DebugLogLevel) {
      return "DEBUG"
    } elseif ($log_level -eq [CLogRecord]::InfoLogLevel) {
      return "INFO"
    } elseif ($log_level -eq [CLogRecord]::WarningLogLevel) {
      return "WARNING"
    } elseif ($log_level -eq [CLogRecord]::ErrorLogLevel) {
      return "ERROR"
    } elseif ($log_level -eq [CLogRecord]::OffLogLevel) {
      return "OFF"
    }

    return "UNKNOWN"
  }

  # Utility to translate from string to constant log level number.
  static [int] log_level_int([string] $log_level) {
    if ($log_level.ToLower() -eq "debug") {
      return [CLogRecord]::DebugLogLevel
    } elseif ($log_level.ToLower() -eq "info") {
      return [CLogRecord]::InfoLogLevel
    } elseif ($log_level.ToLower() -eq "warning") {
      return [CLogRecord]::WarningLogLevel
    } elseif ($log_level.ToLower() -eq "error") {
      return [CLogRecord]::ErrorLogLevel
    }

    return -1
  }

  # Member Fields
  [string]$timestamp
  [int]$module_log_level = -1
  [int]$log_level = -1
  [string]$data = ""

  # Constructor for the class.
  CLogRecord([int]$module_log_level, [int] $log_level, [string] $data) {
    $this.timestamp = (Get-Date -Format "yyyy/MM/dd HH:mm:ss.fff")
    $this.module_log_level = $module_log_level
    $this.log_level = $log_level
    if ($log_level -eq -1) {
      throw "Params 'level' key is expected to be set.";
    }
    $this.data = $data
    if ($null -eq $data) {
      throw "Params 'data' key is expected to be set.";
    }
  }

  [string] ToString() {
    return $this.timestamp +
      " [" +
      [CLogRecord]::log_levelString($this.log_level) +
      "]: " +
      $this.data
  }
}

# Holds the results of a --async-task action. This happens in a background
# thread.
class CTaskResult {
  # Member Fields
  hidden [object] $thread_job = $null

  # Will contain the final result of the ran task. Will block if called
  # before the task has completed.
  [object] value() {
    $this.thread_job | Wait-Job
    $answer = ($this.thread_job | Receive-Job)
    $this.thread_job | Remove-Job
    return $answer
  }

  # Provides the ability to check if the task has completed.
  [bool] has_completed() {
    return $this.thread_job.State.ToLower() -eq "completed"
  }

  # Constructor for the class.
  CTaskResult([scriptblock] $task, [object] $data, [int] $delay) {
    $this.thread_job = Start-ThreadJob -ScriptBlock {
      param($task_runner, $task_data, $task_delay)
      Start-Sleep -Milliseconds $task_delay
      $answer = Invoke-Command -ScriptBlock $task_runner `
        -ArgumentList $task_data
      return $answer
    } -ArgumentList $task, $data, $delay
  }
}

# Object for tracking codemelted_task 'start_timer' action. This happens in a
# background thread.
class CTimerResult {
  # Member Fields
  [int] $id = -1
  hidden [object] $thread_job = $null

  # Provides the ability to check if the task is running or not.
  [bool] is_running() {
    return $this.thread_job.State.ToLower() -eq "running"
  }

  # Stops the running timer.
  [void] stop() {
    if ($this.is_running()) {
      Stop-Job -Job $this.thread_job
      Remove-Job -Job $this.thread_job
    }
  }

  # Constructor for the class.
  CTimerResult([scriptblock] $task, [int] $interval) {
    # Setup the background thread job to call the task on the given
    # interval.
    $this.thread_job = Start-ThreadJob -ScriptBlock {
      param([scriptblock] $timerTask, [int] $timerDelay)
      while ($true) {
        Start-Sleep -Milliseconds $timerDelay
        Invoke-Command -ScriptBlock $timerTask
      }
    } -ArgumentList $task, $interval
  }
}

# =============================================================================
# [FUNCTION DEFINITIONS] ======================================================
# =============================================================================

function codemelted_async {
  <#
  .SYNOPSIS
    Provides a series of actions for performing asynchronous operations within
    a pwsh session / script. These actions include sleeping processing for
    a given number of milliseconds, running a background task and retrieving
    the data later, and kicking off a repeating timer in the background until
    stopped.

    SYNTAX:
      # Delay a given script task for the specified time in milliseconds.
      codemelted-cli --async-sleep @{
        delay = [int]; # required
      }

      # Starts a background processing task that will run to completion and
      # provide the answer via the return call of the task.
      $scheduledTask = codemelted-cli --async-task @{
        task = {
          param($data)
          return $data + 5
        };                  # [scriptblock] required
        data = [object];    # optional
        delay = [int];      # optional
      }

      # Some processing later...
      if ($scheduleTask.has_completed()) {
        # This blocks if it has not completed.
        $value = $scheduledTask.value()
      }

      # Kicks off a repeating background timer on a given interval in
      # milliseconds.
      $timer = codemelted-cli --async-timer @{
        task = [scriptblock]; # required
        delay = [int];     # required
      }

      # Some processing later...
      if ($timer.is_running()) {
        $timer.stop()
      }

    RETURNS:
      --async-sleep: [void]

      --async-task: [CTaskResult] object that will hold the task running in
          the background until completed. You can check if it has completed
          via the has_completed() function call and access the final
          calculated value via the value() function.

      --async-timer: [CTimerResult] object with the methods of is_running()
          and stop() to determine if the timer is running and stopping it
          altogether.
  #>
  param(
    [Parameter(
      Mandatory = $true,
      ValueFromPipeline = $false,
      Position = 0
    )]
    [string]$Action,
    [Parameter(
      Mandatory = $true,
      ValueFromPipeline = $false,
      Position = 1
    )]
    [hashtable]$Params
  )

  # Go carry out the requested action.
  switch ($Action) {
    "--async-sleep" {
      # Get the parameters and perform a validity check
      $delay = $Params["delay"] ?? 0
      if ($delay -lt 0) {
        throw "Params 'delay' key needs to be an [int] >= 0."
      }
      Start-Sleep -Milliseconds $delay
    }
    "--async-task" {
      # Get the named parameters and validate them.
      $task = $Params["task"]
      $data = $Params["data"]
      if ($delay -lt 0) {
        throw "Params 'delay' key needs to be an [int] >= 0."
      } elseif (-not ($task -is [scriptblock])) {
        throw "Params 'task' key needs to be a [scriptblock]"
      }

      # Return the task running in the background
      return [CTaskResult]::new($task, $data, $delay)
    }
    "--async-timer" {
      # Get the named parameters and validate them.
      $task = $Params["task"]
      $delay = $Params["delay"] ?? 0
      if ($delay -lt 99) {
        throw "Params 'delay' key needs to be an [int] >= 100."
      } elseif (-not ($task -is [scriptblock])) {
        throw "Params 'task' key needs to be a [scriptblock]"
      }
      return [CTimerResult]::new($task, $interval)
    }
  }
}

function codemelted_json {
  <#
  .SYNOPSIS
    Provides a series of actions that allow for fully working with JSON data
    within a pwsh terminal / shell script.

    SYNTAX:

      # Validates the specified "data" is the given .NET "type".
      # NOTE: the type represents the .NET type name but a Contains compare
      #       is done to try to establish partial name finds but that is not
      #       a guarantee.
      $isType = codemelted-cli --json-check-type @{
        type = "string";       # required
        data = $var1;          # required
        should_throw = [bool]; # optional
      }

      # Creates a JSON compliant [ArrayList] copying "data" if specified.
      $data = codemelted-cli --json-create-array @{
        "data" = [array] or [System.Collection.ArrayList] # optional
      }

      # Creates a JSON compliant [hashtable] copying "data" if specified.
      $data = codemelted-cli --json-create-object @{
        data = [hashtable]  # optional
      }

      # Determines if the given [hashtable] has the specified key.
      $hasKey = codemelted-cli --json-has-key @{
        data = [hashtable];    # required
        key = "key_name";      # required
        should_throw = [bool]; # optional
      }

      # Converts the string data to its appropriate JSON compliant data type.
      $data = codemelted-cli --json-parse @{
        data = [string]; # required
      }

      # Converts a JSON compliant type to a string.
      $data = codemelted-cli --json-stringify @{
        data = [object]; # required, JSON compliant type.
      }

      # Determines if the data is a valid url or not.
      $isType = codemelted-cli --json-valid-url @{
        data = [string];       # required
        should_throw = [bool]; # optional
      }

    RETURNS:
      --json-check-type: [bool] indication if the type is as expected.
      --json-create-array: [System.Collections.ArrayList] JSON compliant
          object.
      --json-create-object: [hashtable] JSON compliant object.
      --json-has-key: [bool] if key found or not.
      --json-parse: [array], [double], [int], [bool], [hashtable] JSON
          compliant types.
      --json-stringify: [string] representation of the JSON compliant type.
      --json-valid-url: [bool] URL validity.

    THROWS:
      Any option taking a 'should_throw = true' will throw on unexpected
      data.

      Any conversion failures with the --json-stringify / --json-parse
      actions.
  #>
  param(
    [Parameter(
      Mandatory = $true,
      ValueFromPipeline = $false,
      Position = 0
    )]
    [string]$Action,
    [Parameter(
      Mandatory = $true,
      ValueFromPipeline = $false,
      Position = 1
    )]
    [hashtable]$Params
  )

  # Carry out the json request.
  switch ($Action) {
    "--json-check-type" {
      # Setup the data requests and validate expectations
      $type = $Params["type"]
      $data = $Params["data"]
      $shouldThrow = $Params["should_throw"] -is [boolean] `
        ? $Params["should_throw"]
        : $false
      if ($null -eq $data) {
        throw "Params 'data' key was not set."
      } elseif ([string]::IsNullOrEmpty($type) -or
                [string]::IsNullOrWhiteSpace($type)) {
        throw "Params 'type' key was not set."
      }

      # Carry out the data check
      $throwMessage = "$type was not the expected type."
      $answer = $type.ToString().ToLower().Contains(
        $data.GetType().Name.ToLower()
      )

      # Handle how we are returning from this function whether to throw or
      # return boolean.
      if ($shouldThrow) {
        if ( -not $answer) {
          throw $throwMessage
        } else {
          return [void] $answer
        }
      }
      return $answer
    }
    "--json-create-array" {
      $data = $Params["data"]
      $obj = New-Object System.Collections.ArrayList
      if ($data -is [System.Collections.ArrayList]) {
        $obj = $data.Clone()
      } elseif ($data -is [array]) {
        $obj += $data
      }
      return $obj
    }
    "--json-create-object" {
      $data = $Params['data']
      $obj = $data -is [hashtable] ? $data.Clone() : @{}
      return $obj
    }
    "--json-has-key" {
      # Setup the data requests and validate expectations
      $key = $Params["key"]
      $data = $Params["data"]
      $shouldThrow = $Params["should_throw"] -is [boolean] `
        ? $Params["should_throw"]
        : $false
      if (-not ($data -is [hashtable])) {
        throw "Params 'data' key was not a [hashtable] value."
      } elseif ([string]::IsNullOrEmpty($key) `
                -or [string]::IsNullOrWhiteSpace($key)) {
        throw "Params 'key' key was not set."
      }

      # Carry out the request
      $throwMessage = "$key did not exist."
      $answer = $data.ContainsKey($key)

      # Handle how we are returning from this function whether to throw or
      # return# boolean.
      if ($shouldThrow) {
        if ( -not $answer) {
          throw $throwMessage
        } else {
          return [void] $answer
        }
      }
      return $answer
    }
    "--json-parse" {
      $data = $Params["data"]
      if ([string]::IsNullOrEmpty($data) -or
          [string]::IsNullOrWhiteSpace($data)) {
        throw "Params expects a 'data' key with a string value."
      }
      return ConvertFrom-Json -InputObject $data -Depth 100
    }
    "--json-stringify" {
      $data = $Params["data"]
      if ($null -eq $data) {
        throw "Params expects a 'data' key and value."
      }
      if ($data.GetType().Name.ToLower() -eq "arraylist") {
        return ConvertTo-Json -InputObject $data.ToArray() -Depth 100
      }
      return ConvertTo-Json -InputObject $data -Depth 100
    }
    "--json-valid-url" {
      # Parse the request elements.
      $data = $Params["data"]
      $shouldThrow = $Params["should_throw"] -is [boolean] `
        ? $Params["should_throw"]
        : $false
      if ([string]::IsNullOrEmpty($data) -or
          [string]::IsNullOrWhiteSpace($data)) {
        throw "Params 'data' key expected a [string] value."
      }

      # Carry out the url request.
      $throwMessage = "$data failed the codemelted --json-valid-url request."
      $answer = [uri]::IsWellFormedUriString($data.ToString(), 0)

      # Handle how we are returning from this function whether to throw or
      # return boolean.
      if ($shouldThrow) {
        if ( -not $answer) {
          throw $throwMessage
        } else {
          return [void] $answer
        }
      }
      return $answer
    }
  }
}

function codemelted_help {
  <#
  .SYNOPSIS
    Provides the basic help system for the module.

    SYNTAX:
      codemelted-cli --help @{
        action = "--action-item" # optional
      }

    RETURNS:
      [void]
  #>
  param(
    [Parameter(
      Mandatory = $false,
      ValueFromPipeline = $false,
      Position = 0
    )]
    [hashtable]$Params
  )

  # Carry out the requested help action.
  $help_action = ($null -ne $Params) ? ($Params["action"] ?? "") : ""
  switch -Wildcard ($help_action) {
    "--async*" { Get-Help codemelted_async }
    "--json*" { Get-Help codemelted_json }
    "--logger*" { Get-Help codemelted_logger }
    "--network-fetch" {Get-Help codemelted_network_fetch }
    "--process*" { Get-Help codemelted_process }
    default { Get-Help Invoke-CodeMeltedCLI }
  }
}

function codemelted_logger {
  <#
  .SYNOPSIS
    Provides a logging facility to STDOUT color coding the different log
    messages based on the log level. Also provides further processing via
    a log handler to allow for logging to backend database or local file.

    SYNTAX:
      # Set / get the current pwsh script logging level. The valid levels
      # when setting are 'debug' / 'info' / 'warning' / 'error' / 'off'.
      codemelted-cli --logger-level @{
        level = [string]; # required for setting
      }

      # Set / unset a scriptblock log handler for further processing
      # of a log event.
      codemelted-cli --logger-handler @{
        handler = [scriptblock] / $null  # required
      }

      # Will log a 'info' / 'warning' / 'error' / 'debug' [level] message
      # to STDOUT and to be further processed via a log handler.
      codemelted-cli --logger-log @{
        level = [string]; # required
        data = [string];  # required
      }

    RETURNS:
      --logger-level: [string] if not setting the log level.
      --logger-handler: [void]
      --logger-log: [void]
  #>
  param(
    [Parameter(
      Mandatory = $true,
      ValueFromPipeline = $false,
      Position = 0
    )]
    [string]$Action,
    [Parameter(
      Mandatory = $false,
      ValueFromPipeline = $false,
      Position = 1
    )]
    [hashtable]$Params
  )

  # Go carry out our log action.
  switch ($Action) {
    "--logger-level" {
      # Get data and see if we are returning the log level.
      $log_level = $null -ne $Params ? $Params["log_level"] : $null
      if ($null -eq $log_level) {
        $logLevelString = [CLogRecord]::logLevelString(
          $Global:CodeMeltedData.log_level
        )
        return $logLevelString
      }

      # Ok, we are setting the log level, not retrieving it. Go get the int value
      # and set it in the global store.
      $level = [CLogRecord]::logLevelInt($log_level)
      if ($level -eq -1) {
        throw "Params data 'key' not a valid value for setting log level. " +
          "Valid values are 'debug' / 'info' / 'warning' / 'error'"
      }
      $Global:CodeMeltedData.log_level = $level
    }
    "--logger-handler" {
      $handler = $Params["handler"]
      if ($null -eq $handler -and $null -eq $Params) {
        $Global:CodeMeltedData.log_handler = $null
      } elseif ($data -is [scriptblock]) {
        $Global:CodeMeltedData.log_handler = $data
      } else {
        throw "Params 'handler' key value was not $null or [scriptblock]"
      }
    }
    "--logger-log" {
      # If we don't meet the current log level or its turned off, return.
      if ($Global:CodeMeltedData.log_level -eq [CLogRecord]::offLogLevel) {
        return [void]
      }

      # We have something to log, go determine how to log it.
      $level = [CLogRecord]::logLevelInt($Params["level"])
      $record = [CLogRecord]::new($Global:CodeMeltedData.log_level, $level, $data)
      if ($Global:CodeMeltedData.log_level -le `
          [CLogRecord]::DebugLogLevel -and `
          $level -eq [CLogRecord]::DebugLogLevel) {
        Write-Host $record.ToString() -ForegroundColor White
      } elseif ($Global:CodeMeltedData.log_level -le `
                [CLogRecord]::InfoLogLevel -and `
                $level -eq [CLogRecord]::InfoLogLevel) {
        Write-Host $record.ToString() -ForegroundColor Green
      } elseif ($Global:CodeMeltedData.log_level -le `
                [CLogRecord]::WarningLogLevel -and `
                $level -eq [CLogRecord]::WarningLogLevel) {
        Write-Host $record.ToString() -ForegroundColor Yellow
      } elseif ($Global:CodeMeltedData.log_level-le
                [CLogRecord]::ErrorLogLevel -and `
                $level -eq [CLogRecord]::ErrorLogLevel) {
        Write-Host $record.ToString() -ForegroundColor Red
      }

      # If a log handler is set, go send on the log record for further
      # processing.
      if ($null -ne $Global:CodeMeltedData.log_handler) {
        Invoke-Command -ScriptBlock $Global:CodeMeltedData.log_handler `
          -ArgumentList $record
      }
    }
  }
}

function codemelted_network_fetch {
  <#
  .SYNOPSIS
    Provides a mechanism for fetching data from a server REST API. The result
    is a [CFetchResponse] object with the status_code along with the data
    received as_bytes(), as_object(), or as_string(). If it is not any of those
    types, a $null is returned.

    SYNTAX:
      # Perform a network fetch to a REST API. The "data" is a [hashtable]
      # reflecting the named parameters of the Invoke-WebRequest. So the two
      # most common items will be "method" / "body" / "headers" but others
      # are reflected via the link.
      $resp = codemelted --network-fetch @{
        "url" = [string / ip]; # required
        "data" = [hashtable]   # required
      }

    RETURNS:
      [CFetchResponse] that has the statusCode and data as properties.
        Methods of as_bytes(), as_object(), as_string() exists to get the data
        of the expected type or $null if not of that type. A method of is_ok()
        signals whether the statusCode was a 2XX HTTP Status Code.

  .LINK
    Invoke-WebRequest Details:
    https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/invoke-webrequest
  #>
  param(
    [Parameter(
      Mandatory = $true,
      ValueFromPipeline = $false,
      Position = 0
    )]
    [hashtable]$Params
  )
  # Validate the required entries utilized by all actions.
  $url = $Params["url"]
  $data = $Params["data"]

  if ([string]::IsNullOrEmpty($url) -or [string]::IsNullOrWhiteSpace($url)) {
    throw "Params expects a url key with a [string] URL / IP address"
  } elseif (-not ($data -is [hashtable])) {
    throw "Params expects a data [hashtable] entry."
  }

  # Go carry out the fetch.
  [hashtable] $request = json_create_object @{
    "data" = $data
  }
  $request.Add("uri", $url)
  $resp = Invoke-WebRequest @request -SkipHttpErrorCheck
  return [CFetchResponse]::new($resp)
}

function codemelted_process {
  <#
  .SYNOPSIS
    Provides the actions necessary to interact with the host operating
    system's available executable programs.

    SYNTAX:
      # Determines if a given executable is known by the host operating
      # system. NOTE: regular terminal command (i.e. ls, dir) will not
      # register.
      $exists = codemelted-cli --process-exists @{
        command = [string]; # required
      }

      # Runs a one-off operating system process and captures its STDOUT
      # output.
      $output = codemelted-cli --process-run @{
        command = "ls"; [string] # required
        args = "-latr"; [string] # optional
      }

      # Creates a [CProcess] object allowing bi-directional communication via
      # STDIN / STDOUT with the command until killed.
      $process = codemelted-cli --process-spawn @{
        command = [string] # required executable name
        args = [string]    # optional arguments to pass.
      }

    RETURNS:
      --process-exists: [bool] identifying if the process exists.
      --process-run: [string] of the captured STDOUT.
      --process-spawn: [CProcess] object with the methods of id(), read(),
          and write() to allow bi-directional communication with the process
          until terminated via kill().
  #>
  param(
    [Parameter(
      Mandatory = $true,
      ValueFromPipeline = $false,
      Position = 0
    )]
    [string]$Action,
    [Parameter(
      Mandatory = $true,
      ValueFromPipeline = $false,
      Position = 1
    )]
    [hashtable]$Params
  )

  switch ($Action) {
    "--process-exists" {
      $cmd = $Params["command"]
      if ([string]::IsNullOrEmpty($cmd) -or `
          [string]::IsNullOrWhiteSpace($cmd)) {
        throw "'command' key / value expected with named parameters"
      }

      if ($IsWindows) {
        cmd /c where $cmd > nul 2>&1
      } else {
        which -s $cmd > /dev/null
      }
      return $LASTEXITCODE -eq 0
    }
    "--process-run" {
      $cmd = $Params["command"]
      $arguments = $Params["args"]
      if ([string]::IsNullOrEmpty($cmd) -or `
          [string]::IsNullOrWhiteSpace($cmd)) {
        throw "'command' key / value expected with named parameters"
      }

      if (-not [string]::IsNullOrEmpty($arguments) -and
          -not [string]::IsNullOrWhiteSpace($arguments)) {
        $cmd += " " + $arguments
      }

      return $IsWindows ? (cmd /c $cmd) : (sh -c $cmd)
    }
    "--process-spawn" {
      $cmd = $Params["command"]
      $arguments = $Params["args"] ?? ""

      if (-not [string]::IsNullOrEmpty($arguments) -and
          -not [string]::IsNullOrWhiteSpace($arguments)) {
        $cmd += " " + $arguments
      }

      return [CProcess]::new($cmd, $arguments)
    }
  }
}

# =============================================================================
# [PUBLIC API] ================================================================
# =============================================================================
function Invoke-CodeMeltedCLI {
  <#
  .SYNOPSIS
    Provides the PowerShell module Invoke-CodeMeltedCLI. This cmdlet
    accessible via the codemelted-cli alias provides the advanced wrapper
    for the native codemelted command. The native codemelted command provides
    the lower level bindings to work in any shell. This cmdlet provides
    additional functionality only available in a pwsh terminal.

    SYNTAX:
      codemelted-cli [Action] [Params]

    PARAMETERS:
      [Action]
        --help: Execute `codemelted-cli --help to produce this help. Execute
            'codemelted-cli --help @{ action = "--action-item" }' to learn
            about additional actions listed under the ACTION: section.

        --version: Get the current version of the Invoke-CodeMeltedCLI
            module.

      [Params]
        The optional set of named arguments to pass to action via a
        hashtable.

    ACTIONS:
      --async-sleep
      --async-task
      --async-timer
      --json-check-type
      --json-create-array
      --json-create-object
      --json-has-key
      --json-parse
      --json-stringify
      --json-valid-url
      --logger-level
      --logger-handler
      --logger-log
      --network-fetch
      --process-exists
      --process-run
      --process-spawn

    RETURNS:
      Will vary depending on the called [Action] function call. It will be
      documented with each function and available online.

  .LINK
    SDK Docs:
    https://codemelted.com/developer/pwsh

    GitHub Source:
    https://github.com/CodeMelted/codemelted.rs
  #>
  [CmdletBinding()]
  param(
    [Parameter(
      Mandatory = $true,
      ValueFromPipeline = $false,
      Position = 0
    )]
    [ValidateSet(
      "--async-sleep",
      "--async-task",
      "--async-timer",
      "--json-check-type",
      "--json-create-array",
      "--json-create-object",
      "--json-has-key",
      "--json-parse",
      "--json-stringify",
      "--json-valid-url",
      "--logger-log",
      "--logger-handler",
      "--logger-log",
      "--network-fetch",
      "--version",
      "--help"
    )]
    [string]$Action,
    [Parameter(
      Mandatory = $false,
      ValueFromPipeline = $false,
      Position = 1
    )]
    [hashtable]$Params
  )

  # Carry out the cmdlet action
  try {
    switch -Wildcard ($Action.ToLower()) {
      "--async-*" { codemelted_async $Action $Params }
      "--json-*" { codemelted_json $Action $Params}
      "--help" { codemelted_help $Params }
      "--logger-*" { codemelted_logger $Action $Params }
      "--network-fetch" { codemelted_network_fetch $Params }
      "--process-*" { codemelted_process $Action $Params }
      "--version" { Get-Module -Name Invoke-CodeMeltedCLI }
    }
  } catch {
    throw ("codemelted-cli '$Action' failed. " + $_.Exception.Message)
  }
}

# Export items from the CMDLET module
Export-ModuleMember -Function Invoke-CodeMeltedCLI
Set-Alias -Name codemelted-cli -Value Invoke-CodeMeltedCLI
Export-ModuleMember -Alias codemelted-cli
