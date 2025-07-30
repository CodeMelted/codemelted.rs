#!/usr/bin/pwsh
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

# Helper function to format message output from the build script.
function message([string]$msg) {
  Write-Host
  Write-Host "MESSAGE: $msg"
  Write-Host
}

switch ($args[0]) {
  "--deploy-website" {

  }
  "--make" {
    message "Now building the codemelted.rs documentation."
    cargo clean
    cargo doc --no-deps --lib
    Set-Location $PSScriptRoot/swiss-army-knife-book
    mdbook clean
    mdbook build
    Set-Location $PSScriptRoot
    message "codemelted.rs documentation completed."

    message "codemelted.rs Now building docs website."
    Remove-Item -Path docs -Force -Recurse -ErrorAction SilentlyContinue
    New-Item -Path docs/codemelted.rs -ItemType Directory
    New-Item -Path docs/swiss-army-knife-book -ItemType Directory
    Copy-Item -Path swiss-army-knife-book/book/* -Destination docs/swiss-army-knife-book -Force -Recurse
    Copy-Item -Path target/doc/* -Destination docs/codemelted.rs -Force -Recurse
    Copy-Item -Path index.html -Destination docs -Force
    message "codemelted.rs docs website completed."
  }
  "--test" {
    message "Now testing the codemelted.rs module"
    cargo test
    message "codemelted.rs module testing completed."
  }
  "--publish-crate" {

  }
  default { Write-Host "ERROR: Invalid parameter specified." }
}
