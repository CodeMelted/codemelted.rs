[string]$GEN_HTML_PERL_SCRIPT = "c:/ProgramData/chocolatey/lib/lcov/tools/bin/genhtml"#!/usr/bin/pwsh
# =============================================================================
# MIT License
#
# © 2024 Mark Shaffer
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to
# deal in the Software without restriction, including without limitation the
# rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
# sell copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
# FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
# IN THE SOFTWARE.
# =============================================================================

[string]$GEN_HTML_PERL_SCRIPT = "c:/ProgramData/chocolatey/lib/lcov/tools/bin/genhtml"

# Helper function to format message output from the build script.
function message([string]$msg) {
  Write-Host
  Write-Host "MESSAGE: $msg"
  Write-Host
}

switch ($args[0]) {
  "--deploy" {
    message "Now uploading codemelted.com/developer content."
    Move-Item -Path docs -Destination developer -ErrorAction Stop
    Compress-Archive -Path developer -DestinationPath developer.zip -Force
    $hostService = $env:CODEMELTED_USER_AND_IP + $env:CODEMELTED_HOME
    scp developer.zip $hostService
    ssh $env:CODEMELTED_USER_AND_IP
    Remove-Item -Path developer.zip
    Remove-Item -Path developer -Recurse -Force
    Set-Location $PSScriptRoot
    message "Upload completed."
  }
  "--make" {
    message "Now building the codemelted.rs documentation."
    cargo clean
    cargo doc --no-deps --lib
    Set-Location $PSScriptRoot/mdbook
    mdbook clean
    mdbook build
    Set-Location $PSScriptRoot
    message "codemelted.rs documentation completed."

    message "Now building codemelted.js module."
    Set-Location $PSScriptRoot/js
    Remove-Item -Path docs -Force -Recurse -ErrorAction SilentlyContinue
    jsdoc ./codemelted.js --destination docs
    Copy-Item jsdoc-default.css -Destination docs/styles
    Copy-Item codemelted.js -Destination docs
    Set-Location $PSScriptRoot
    message "build completed."

    message "codemelted.rs Now building docs website."
    Remove-Item -Path docs -Force -Recurse -ErrorAction SilentlyContinue
    New-Item -Path docs/codemelted.rs -ItemType Directory
    New-Item -Path docs/mdbook -ItemType Directory
    New-Item -Path docs/js -ItemType Directory
    Copy-Item -Path mdbook/book/* -Destination docs/mdbook -Force -Recurse
    Copy-Item -Path target/doc/* -Destination docs/codemelted.rs -Force -Recurse
    Copy-Item -Path js/docs/* -Destination docs/js -Force -Recurse
    Copy-Item -Path index.html -Destination docs -Force
    message "codemelted.rs docs website completed."
  }
  "--test" {
    message "Now testing codemelted.js."
    Set-Location $PSScriptRoot/js
    deno test --allow-env --allow-net --allow-read --allow-sys --allow-write --coverage=coverage --no-config test_deno.ts
    deno coverage coverage --lcov > coverage/lcov.info
    if ($IsLinux -or $IsMacOS) {
      genhtml -o coverage --ignore-errors unused,inconsistent --dark-mode coverage/lcov.info
    } else {
      $exists = Test-Path -Path $GEN_HTML_PERL_SCRIPT -PathType Leaf
      if ($exists) {
        perl $GEN_HTML_PERL_SCRIPT -o coverage coverage/lcov.info
      }
      else {
        Write-Host "WARNING: genhtml not installed for windows. Run " +
        "'choco install lcov' for pwsh terminal as Admin to install it."
      }
    }
    Move-Item -Path coverage -Destination docs -Force
    Set-Location $PSScriptRoot
    message "codemelted.js testing completed."

    message "Now testing the codemelted.rs module"
    cargo test
    message "codemelted.rs module testing completed."
  }
  "--publish" {
    message "TBD"
  }
  default { Write-Warning "ERROR: Invalid parameter specified." }
}
