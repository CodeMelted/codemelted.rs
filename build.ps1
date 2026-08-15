#!/usr/bin/pwsh
# =============================================================================
# MIT License
#
# © 2024-26 Mark Shaffer
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

# =============================================================================
# [General Definitions] =======================================================
# =============================================================================

[string]$GEN_HTML_PERL_SCRIPT = "c:/ProgramData/chocolatey/lib/lcov/tools/bin/genhtml"

# Helper function to format message output from the build script.
function message([string]$msg) {
  Write-Host
  Write-Host "MESSAGE: $msg"
  Write-Host
}

# =============================================================================
# [deploy Options] ============================================================
# =============================================================================

# Will publish the codemelted crate for consumption into a Rust project.
function deploy_crate {
  $answer = Read-Host -Prompt "Publish Crate (y/N)?"
  if ($answer -eq "y") {
    cargo publish
  } else {
    cargo publish --dry-run
  }
  if ($LASTEXITCODE -ne 0) {
    throw "cargo publish failed"
  }
}

# Takes care of deploying the full build of the project to the
# rs.codemelted.com domain.
function deploy_website {
  message "Now uploading rs.codemelted.com content."
  Move-Item -Path docs -Destination rs -ErrorAction Stop
  Compress-Archive -Path rs -DestinationPath rs.zip -Force
  $hostService = $env:CODEMELTED_USER_AND_IP + $env:CODEMELTED_HOME
  scp rs.zip $hostService
  ssh $env:CODEMELTED_USER_AND_IP
  Remove-Item -Path rs.zip
  Remove-Item -Path rs -Recurse -Force
  Set-Location $PSScriptRoot
  message "Upload completed."
}

# Takes care of deploying the different aspects of this project.
function deploy([string]$option) {
  switch ($option) {
    "crate" { deploy_crate }
    "website" { deploy_website }
    default { throw "Invalid parameter specified." }
  }
}

# =============================================================================
# [make Options] ==============================================================
# =============================================================================

# Handles the making of the rust based components of the project.
function make_rust {
  message "Now building the codemelted.rs Rust code and docs."
  cargo clean
  cargo doc --no-deps --lib
  if ($LASTEXITCODE -ne 0) {
    throw "make failed (cargo doc)."
  }
  Set-Location $PSScriptRoot/mdbook
  mdbook clean
  mdbook build
  if ($LASTEXITCODE -ne 0) {
    throw "make failed (mdbook build)"
  }
  Set-Location $PSScriptRoot
  message "codemelted.rs build of code and documentation completed."
}

# Handles the making of the typedoc for the JavaScript modules.
function make_js {
  message "Now building codemelted JavaScript modules."
  Set-Location $PSScriptRoot/js
  Remove-Item -Path docs -Force -Recurse -ErrorAction SilentlyContinue
  typedoc
  if ($LASTEXITCODE -ne 0) {
    throw "make failed (typedoc)"
  }

  # Finish up the the prepping of the documentation
  Set-Location $PSScriptRoot
  message "codemelted JavaScript modules build completed."
}

# Runs the whole make_rust, make_js, then assembles all the output for the
# rs.codemelted.com domain website.
function make_website {
  message "Now building the rs.codemelted.com website."
  make_rust
  make_js
  Remove-Item -Path docs -Force -Recurse -ErrorAction SilentlyContinue
  New-Item -Path docs/codemelted.rs -ItemType Directory -ErrorAction Stop
  New-Item -Path docs/mdbook -ItemType Directory -ErrorAction Stop
  New-Item -Path docs/js -ItemType Directory -ErrorAction Stop
  New-Item -Path docs/support -ItemType Directory -ErrorAction Stop
  Copy-Item -Path mdbook/book/* -Destination docs/mdbook -Force -Recurse `
    -ErrorAction Stop
  Copy-Item -Path target/doc/* -Destination docs/codemelted.rs -Force `
    -Recurse -ErrorAction Stop
  Copy-Item -Path js/docs/* -Destination docs/js -Force -Recurse `
    -ErrorAction Stop
  Copy-Item -Path support/* -Destination docs/support -Force -Recurse `
    -ErrorAction Stop
  Move-Item -Path docs/support/index.html -Destination docs -Force `
    -ErrorAction Stop
  message "rs.codemelted.com website completed."
}

# Performs the make based on the specified option.
function make([string]$option) {
  switch ($option) {
    "" { make_website }
    "rust" { make_rust }
    "js" { make_js }
    default { throw "Invalid parameter specified." }
  }
}

# =============================================================================
# [test Options] ==============================================================
# =============================================================================

# Helper function to handle creating the coverage results.
function lcov_to_html() {
  if ($IsLinux -or $IsMacOS) {
    genhtml -o coverage --ignore-errors unused,inconsistent,inconsistent,range `
      --dark-mode coverage/lcov.info
    if ($LASTEXITCODE -ne 0) {
      throw "lcov_to_html failed. no coverage file produced"
    }
  } else {
    $exists = Test-Path -Path $GEN_HTML_PERL_SCRIPT -PathType Leaf
    if ($exists) {
      perl $GEN_HTML_PERL_SCRIPT -o coverage coverage/lcov.info
      if ($LASTEXITCODE -ne 0) {
        throw "lcov_to_html failed. no coverage file produced"
      }
    } else {
      throw "genhtml not installed for windows. Run " +
        "'choco install lcov' for pwsh terminal as Admin to install it."
    }
  }
}

# Handles testing the JavaScript modules within all the different runtimes.
function test_js {
  message "Now testing JavaScript modules."
  Set-Location $PSScriptRoot/js
  Copy-Item *.js $PSScriptRoot/js/tests -Force -ErrorAction Stop
  New-Item -ItemType Directory $PSScriptRoot/js/docs -ErrorAction Ignore
  Set-Location $PSScriptRoot/js/tests

  # First we test bun and see how that goes.
  message "Testing bun runtime."
  bun test --coverage --coverage-reporter=lcov bun.test.ts
  if ($LASTEXITCODE -ne 0) {
    throw "test failed (bun)"
  } else {
    lcov_to_html
    Move-Item -Path coverage -Destination $PSScriptRoot/js/docs/coverage-bun `
      -Force -ErrorAction Stop
    message "bun testing completed."
  }

  # Do the deno tests
  message "Testing deno runtime."
  deno test --allow-env --allow-net --allow-read --allow-sys --allow-write `
    --coverage=coverage --no-config deno.test.ts
  if ($LASTEXITCODE -ne 0) {
    throw "test failed (deno)"
  } else {
    deno coverage --lcov > coverage/lcov.info
    lcov_to_html
    Move-Item -Path coverage -Destination $PSScriptRoot/js/docs/coverage-deno `
      -Force -ErrorAction Stop
    message "deno testing completed."
  }

  # Do node tests
  message "Testing node runtime."
  New-Item -ItemType Directory coverage
  node --test ./node.test.js
  if ($LASTEXITCODE -ne 0) {
    throw "test failed (node)"
  } else {
    node --experimental-test-coverage --test-reporter=lcov `
      --test-reporter-destination=coverage/lcov.info ./node.test.js
    lcov_to_html
    Move-Item -Path coverage -Destination $PSScriptRoot/js/docs/coverage-node `
      -Force -ErrorAction Stop
    message "node testing completed."
  }

  # Setup to do Browser Runtime Testing
  New-Item -ItemType Directory $PSScriptRoot/js/docs/coverage-browser `
    -Force -ErrorAction Stop
  Copy-Item coverage-browser.html $PSScriptRoot/js/docs/coverage-browser/index.html `
    -Force -ErrorAction Stop
  Copy-Item browser.test.js $PSScriptRoot/js/docs/coverage-browser -Force `
    -ErrorAction Stop
  Copy-Item worker.test.js $PSScriptRoot/js/docs/coverage-browser -Force `
    -ErrorAction Stop
  Copy-Item codemelted*.js $PSScriptRoot/js/docs/coverage-browser -Force `
    -ErrorAction Stop

  Set-Location $PSScriptRoot
  message "JavaScript module V8 runtime testing completed." +
    "Execute python3 -m http.server to complete browser testing " +
    "and validation of the rs.codemelted.com domain."
}

# Handles the execution of testing the rust based code.
function test_rust {
  message "Now testing the codemelted.rs modules"
  cargo test
  if ($LASTEXITCODE -ne 0) {
    throw "test failed (cargo)"
  }
  message "codemelted.rs module testing completed."
}

# Handles the testing of the different aspects of the project
function test([string]$option) {
  switch ($option) {
    "" {
      test_js
      test_rust
    }
    "js" { test_js }
    "rust" { test_rust }
    default { throw "Invalid parameter specified." }
  }
}

# =============================================================================
# [Main execution of the script] ==============================================
# =============================================================================

try {
  $option = $args[1] ?? ""
  switch ($args[0]) {
    "--deploy" { deploy $option }
    "--make" { make $option }
    "--test" { test $option }
    default { throw "Invalid parameter specified." }
  }
} catch {
  Write-Host "ERROR: $($_.Exception.Message)" -ForegroundColor Red
  Set-Location $PSScriptRoot
  exit 1
}
