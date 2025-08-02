<center>
  <img style="width: 100%; max-width: 375px;" src="https://codemelted.com/assets/images/logo-codemelted-developer.png" /></a><br />
</center>
<h1><img style="height: 35px;" src="https://codemelted.com/assets/favicon/apple-touch-icon.png" /> CodeMelted DEV Project</h1>

The following document will help you setup this repo for local development by
1. Installing the necessary tools to build / test the `codemelted.rs` module.
2. Setup and utilization of VS code.
3. Deployment / publishing of the crate and crate website information.

<center>
  <br />
  <a href="https://www.buymeacoffee.com/codemelted" target="_blank">
    <img height="50px" src="https://codemelted.com/assets/images/icon-bmc-button.png" />
  </a>
  <br /><br />
  <p>Hope you enjoy the content. Any support is greatly appreciated. Thank you! 🙇</p>
</center>

**Table of Contents**

# Environment Setup

The following are the items recommended for installation to properly make use of this repo in your development environment.

### GitHub

- [ ] [git](https://git-scm.com/downloads)
- [ ] [GitHub Desktop](https://desktop.github.com/)

### Programming Languages

- [ ] [Deno](https://deno.com/)
- [ ] [NodeJS](https://nodejs.org/en)
- [ ] [Rust](https://doc.rust-lang.org/book/ch01-01-installation.html)

### VS Code

**The Application:**

- [ ] [VS Code](https://code.visualstudio.com/)

**Extensions:**

- [ ] [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
- [ ] [Dart](https://marketplace.visualstudio.com/items?itemName=Dart-Code.dart-code)
- [ ] [Deno](https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno)
- [ ] [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [ ] [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)
- [ ] [Markdown Preview Mermaid Support](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-mermaid)
- [ ] [Rust](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

# Repo Structure

## build Scripts

**Execute:**

- Linux / Mac : `./build.sh --flag`
- Windows     : `build --flag`

**Flags:**

- `--deploy`  : Deploys the SDK documentation to the codemelted.com/developer site.
- `--make`    : Executes the multiple builds for the crate, CLI, and WASM targets.
- `--test`    : Executes the different tests for the `codemelted.rs` and `codemelted.js` modules.
- `--publish` : Publishes the `codemelted.rs` crate and CLI to `crates.io`
- `--setup`   : Automated option to setup a computer to utilize this repo.

## Main Repo

The main repo `codemelted.rs` is the `codemelted.rs` published crate and `codemelted` Command Line Interface. Added to these are the `js`, `mdbook`, and `models` folders.

### js Folder

The `js` folder contains the `codemelted.js` namespace that feeds as an input when building the `codemelted.rs` module WASM build. This utilizes the two modules to build a `codemelted.js` and `codemelted.wasm` files for utilization in V8 backend runtimes (Deno or NodeJS) and frontend browser runtime.

*NOTE: The `codemelted.rs` crate will also support using Rust to compile a web application.*

### mdbook Folder

The `mdbook` folder contains the living book of titled *codemelted.rs: The Swiss Army Knife Full Stack Solution* which documents the overall journey of this repo and how it is being utilized for different projects and domains.

### models Folder

The `models` folder contains the `mermaid` markdown documents for the different domain use cases. These are captured within the `codemelted.rs` crate SDK documentation.

### index.html File

Static page for the `codemelted.com/developer` domain to gain quick access to this project's different SDK documentation vs. the main `rs.codemelted.com` sub-domain with additional resources.