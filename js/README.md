<center>
  <br /><img style="width: 100%; max-width: 375px;" src="https://codemelted.com/assets/images/logo-codemelted-rs.png" /><br />
</center>

The `codemelted.js` module is an ES6 module that mirrors the `codemelted.rs` module. It's goal is to implement the domain use cases wrapping the Web APIs exposed in a browser runtime. This provides the client side single page app (SPA) / progressive web app (PWA) development support utilizing web technologies. By supporting the SPA / PWA client side development, the `codemelted.js` module will also provide WASM bindings to support client side application development in Rust whether a native desktop application or a web hosted client.

TODO: Add more words about client binding for Rust.

<center>
  <br />
  <a href="https://www.buymeacoffee.com/codemelted" target="_blank">
    <img height="40px" src="https://codemelted.com/assets/images/icon-bmc-button.png" />
  </a>
  <br /><br />
  <p>If you find this module useful, any support is greatly appreciated. Thank you! 🙇</p>
</center>

**Table of Contents**

- [FEATURES](#features)
- [GETTING STARTED](#getting-started)
- [USAGE](#usage)

# FEATURES

 <table style="width: 100%;">
  <tr>
    <td style="width: 275px;">
      <img style= "width: 275px;" src="https://codemelted.com/developer/mdbook/models/use-case-model.drawio.png" />
    </td>
    <td>
      <ul>
        <li> Implements the identified domain use cases as a series of exported functions. </li>
        <li> Function names match that of the <code>codemelted.rs</code> rust function names. </li>
        <li> Function parameters / returns are abstracted from JS runtime specific objects. </li>
        <li> This provides for the support of multiple JS runtimes. </li>
        <li> This provides support for TypeScript development / checking. </li>
      </ul>
    </td>
  </tr>
   <tr>
    <td style="width: 275px;">
      <img style= "width: 275px;" src="https://codemelted.com/developer/mdbook/models/wasm-build-process.drawio.png" />
    </td>
    <td>
      <ul>
        <li> The <code>codemelted.js</code> module is ran through the targeted runtime tests. </li>
        <li> When all tests PASS, the <code>codemelted.rs</code> WASM build occurs. </li>
        <li> When the cargo doc, build, and tests all PASS you end up with two build targets. </li>
        <li> The ability to write a pure rust desktop / web app via the <code>codemelted.rs</code> crate. </li>
        <li> The ability to write a JS / TS frontend / backend regardless frontend development framework. </li>
      </ul>
    </td>
  </tr>
 </table>

# GETTING STARTED

The `codemelted.js` module is hosted on GitHub and delivered via the `jsdelivr` CDN. The following represents the URLs for importing the modules.

- **Latest Version (Risky):** `https://cdn.jsdelivr.net/gh/codemelted/codemelted.rs/js/codemelted.js`
- **Version Controlled (Safest):** `https://cdn.jsdelivr.net/gh/codemelted/codemelted.rs@X.Y.Z/js/codemelted.js`

Since the `codemelted.js` module is an ES6 module, standard `import` statements apply. Below is the example of how to import features within JavaScript / TypeScript.

**ES6 Module Import Example**

```js
// Import whole module statically via URL or local path
import * as codemelted from "path/to/codemelted.js";

// Import elements to use statically via URL or local path
import { exported_element } from "path/to/codemelted.js";

// Dynamically import all module elements to named variable
let codemelted = await import("path/to/codemelted.js");
```

**Via Script**

```html
<script type="module">
  // Use the import examples above to utilize the script functions.
</script>
```

As shown in the import examples above, you can utilize either the `jsdelivr` CDN to the `codemelted.js` module or download locally into your web project. When developing a Rust Desktop Tauri application and utilize the `codemelted.rs` Crate, the module will be available locally to take advantage of Tauri bindings for building a full featured Desktop / Mobile application. Downloading of the `codemelted.js` will also be a feature option of the `codemelted` native CLI command to enable quick downloading / upgrading for your local web project.

```sh
# It will download the specified version of the codemelted.js
# module to the specified path. Any failure will be presented to STDOUT.
codemelted --dev-fetch-codemelted-js [version] [path]
```

# USAGE

<mark>TBD</mark>