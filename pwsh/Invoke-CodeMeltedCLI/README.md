
<center>
  <img style="width: 100%; max-width: 375px;" src="https://codemelted.com/assets/images/logo-codemelted-developer.png" />
</center>
<h1><img style="height: 35px;" src="https://codemelted.com/assets/images/icon-pwsh.png" /> Invoke-CodeMeltedCLI Module</h1>

*BY: Mark Shaffer / LAST UPDATED: 2025-Oct-12*

The `Invoke-CodeMeltedCLI` PowerShell module will provide a Command Line Interface (CLI) to facilitate common developer tasks on Mac, Linux, or Windows systems. When installed, the CLI will provide the `codemelted-cli` command that can be accessed in a pwsh terminal or in ps1 scripts.

The `codemelted-cli` provides a binding to the `codemelted` rust compiled native command. This binding facilitates lower level calls not easily accomplished within PowerShell. However, with this binding and the power of the .NET core, a developer gets the most powerful terminal experience around.

<center>
  <br />
  <a href="https://www.buymeacoffee.com/codemelted" target="_blank">
    <img height="50px" src="https://codemelted.com/assets/images/icon-bmc-button.png" />
  </a>
  <br /><br />
  <p>Hope you enjoy the content. Any support is greatly appreciated. Thank you! 🙇</p>
</center>

**Table of Contents**

- [1.0 GETTING STARTED](#10-getting-started)
  - [1.1 Install pwsh Core](#11-install-pwsh-core)
    - [1.1.1 Mac OS](#111-mac-os)
    - [1.1.2 Linux OS](#112-linux-os)
    - [1.1.3 Windows](#113-windows)
    - [1.1.4 Raspberry Pi](#114-raspberry-pi)
  - [1.2 Install Module](#12-install-module)
- [2.0 FEATURES](#20-features)
  - [2.1 codemelted-cli --version](#21-codemelted-cli---version)
  - [2.2 codemelted-cli --help](#22-codemelted-cli---help)
- [3.0 USAGE](#30-usage)
  - [3.1 --async-\* Actions](#31---async--actions)
  - [3.2 --json-\* Actions](#32---json--actions)
  - [3.3 --logger-\* Actions](#33---logger--actions)
  - [3.4 --network-fetch Actions](#34---network-fetch-actions)
  - [3.5 --process-\* Actions](#35---process--actions)
- [4.0 MODULE INFORMATION](#40-module-information)
  - [4.1 License](#41-license)
  - [4.2 Revision History](#42-revision-history)

# 1.0 GETTING STARTED

This will guide you through the setup of the `codemelted-cli` command.

## 1.1 Install pwsh Core

The following section walk you through the installation of the pwsh terminal. Once installed you can access the terminal via the `pwsh` command.

### 1.1.1 Mac OS

From a Mac OS terminal execute the command:

```
brew install --cask powershell
```

### 1.1.2 Linux OS

Follow the <a target="_blank" href="https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-linux">Install Powershell on Linux</a> to properly setup the pwsh terminal for your Linux flavor.

### 1.1.3 Windows

From a windows cmd terminal execute the command

```
winget install --id Microsoft.PowerShell --source winget
```

### 1.1.4 Raspberry Pi

The following series of commands will setup a pwsh terminal on a Raspberry Pi picking up the necessary repo and setting up the environment. Notice the `VERSION` as the currently identified version. Change this to install the latest version.

```sh
VERSION=7.5.0
sudo dpkg --add-architecture arm64
sudo apt-get update
sudo apt-get install -y libc6:arm64 libstdc++6:arm64
sudo mkdir -p /opt/microsoft/powershell/7
sudo wget -O /tmp/powershell.tar.gz https://github.com/PowerShell/PowerShell/releases/download/v${VERSION}/powershell-$VERSION}-linux-arm64.tar.gz
sudo tar zxf /tmp/powershell.tar.gz -C /opt/microsoft/powershell/7
sudo chmod +x /opt/microsoft/powershell/7/pwsh
sudo ln -s /opt/microsoft/powershell/7/pwsh /usr/bin/pwsh
sudo rm /tmp/powershell.tar.gz
pwsh --version
```

## 1.2 Install Module

The `Invoke-CodeMeltedCLI` module is hosted at [PowerShell Gallery](https://www.powershellgallery.com/packages/invoke-codemeltedcli). The commands below will facilitate installation, maintenance, and removal of the module.

- `Find-Module -Name Invoke-CodeMeltedCLI`: To find the current version of the published module in the PSGallery.
- `Install-Module -Name Invoke-CodeMeltedCLI`: To install the module from the PSGallery.
- `Update-Module -Name Invoke-CodeMeltedCLI`: To update to the latest module version from the PSGallery.
- `Remove-Module -Name Invoke-CodeMeltedCLI`: To completely uninstall the module from the host operating system.

# 2.0 FEATURES

<center><img style="width: 100%"src="https://codemelted.com/developer/mdbook/models/use-case-model.drawio.png"></center>

## 2.1 codemelted-cli --version

<mark>TBD</mark>

## 2.2 codemelted-cli --help

```
NAME
    Invoke-CodeMeltedCLI

SYNOPSIS
    Provides the PowerShell module Invoke-CodeMeltedCLI. This cmdlet
    accessible via the codemelted-cli alias provides the advanced wrapper
    for the native codemelted command. The native codemelted command provides
    the lower level bindings to work in any shell. This cmdlet provides
    additional functionality only available in a pwsh terminal.

    SYNTAX:
      codemelted-cli [Action] [Params]

    PARAMETERS:
      [Action]
        --help: Execute `codemelted-cli --help to learn about produce this
            help file. Execute
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

RELATED LINKS
    SDK Docs:
    https://codemelted.com/developer/pwsh

    GitHub Source:
    https://github.com/CodeMelted/codemelted.rs
```

# 3.0 USAGE

## 3.1 --async-* Actions

Execute `codemelted-cli --help @{ action = "--async" }` to retrieve help information.

```
NAME
    codemelted_async

SYNOPSIS
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
```

## 3.2 --json-* Actions

Execute `codemelted-cli --help @{ action = "--json" }` to retrieve the latest information.

```
NAME
    codemelted_json

SYNOPSIS
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
```

## 3.3 --logger-* Actions

Execute `codemelted-cli --help @{ action = "--logger" }` to retrieve the latest information.

```
NAME
    codemelted_logger

SYNOPSIS
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
```

## 3.4 --network-fetch Actions

Execute `codemelted-cli --help @{ action = "--network-fetch" }` to retrieve the latest information.

```
NAME
    codemelted_network_fetch

SYNOPSIS
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

RELATED LINKS
    Invoke-WebRequest Details:
    https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/invoke-webrequest
```

## 3.5 --process-* Actions

Execute `codemelted-cli --help @{ action = "--process" }` to retrieve the latest information.

```
NAME
    codemelted_process

SYNOPSIS
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
```

# 4.0 MODULE INFORMATION

## 4.1 License

MIT License

© 2025 Mark Shaffer

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## 4.2 Revision History

- **<u>2025-mmm-dd (M. Shaffer)</u>:** TBD
