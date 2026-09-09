// @ts-check
/**
 * <center>
 *   <img
 *     style="width: 100%"
 *     src="https://codemelted.com/assets/images/logo-codemelted-rs.png"
 *   />
 * </center>
 *
 * Welcome to the `codemelted.js` Module. This is a ES6 module
 * implementing the *CodeMelted Rust Project* 14 domain use cases that wrap Web
 * APIs providing an easy ability to build web based applications. These
 * include Single Page Applications (SPAs), Progressive Web Applications
 * (PWAs), general websites, and desktop / mobile applications utilizing Rust
 * TAURI crate. It also provides proper JSDoc bindings so you can utilize both
 * JavaScript / TypeScript for your project. Finally, care was taken to
 * utilize this module within your preferred V8 (Bun, Deno, Node) runtime for
 * backend cloud / server side development even though this is not its primary
 * use.
 * </p>
 * <center>
 *   <br />
 *   <a href="https://www.buymeacoffee.com/codemelted" target="_blank">
 *     <img
 *       height="40px"
 *       src="https://codemelted.com/assets/images/icon-bmc-button.png"
 *     />
 *   </a>
 *   <br /><br />
 *   <p>
 *      If you find this module useful, any support is greatly appreciated.
 *      Thank you! 🙇
 *   </p>
 * </center>
 *
 * # FEATURES
 *
 * ## Domain Use Cases
 *
 * The domain use case model reflects what the the `codemelted.js` module
 * implements. The use cases expose objects and functions to support their
 * identified functionality. The following model reflects how the
 * `codemelted.js` module fits into the overall *codemelted Rust Project*.
 *
 * <center>
 *   <img
 *     style= "width: 100%; max-width: 700px;"
 *     src="https://codemelted.com/rs/mdbook/models/use-case-model.png"
 *   />
 * </center>
 *
 * ## Project Build Process
 *
 * The following model reflects how this project is built, tested, and
 * delivered for consumption by a software engineer. The `build.ps1`
 * PowerShell script ensures testing on all different platforms the
 * *codemelted Rust Project* supports.
 *
 * <center>
 *   <img
 *     style= "width: 100%; max-width: 700px;"
 *     src="https://codemelted.com/rs/mdbook/models/cargo-build-process.png"
 *   />
 * </center>
 *
 * # GETTING STARTED
 *
 * ## Module Hierarchy
 *
 * The codemelted JavaScript modules is organized into seven modules. The `codemelted_core.js` module works in all runtimes. The `codemelted_disk.js`, `codemelted_hw.js`, `codemelted_storage.js`, and `codemelted_ui.js` work only in a Browser runtime. Including them into any V8 runtime will result in a thrown module error. Lastly the `codemelted_db.js` and `codemelted_network.js` modules work within the Browser and Worker (a.k.a Service / Web Worker Background threads) runtimes. It to will result in a thrown module error.
 *
 * <center>
 *  <img style="width: 100%; max-width: 700px;" src="models/module_hierarchy.png" />
 * </center>
 *
 * The modules are hosted on GitHub and delivered via the `jsdelivr` CDN. The following represents the URLs for accessing the modules. These can be utilized with `import` statements or as part of the `<script type="module"></script>` tags of a website.
 *
 * - **Latest Version (Risky):** `https://cdn.jsdelivr.net/gh/codemelted/codemelted.rs/js/codemelted_xxx.js`
 * - **Version Controlled (Safest):** `https://cdn.jsdelivr.net/gh/codemelted/codemelted.rs@X.Y.Z/js/codemelted_xxx.js`
 *
 * **NOTES:**
 *
 * 1. *The `xxx` in the `codemelted_xxx.js` module filename represents the specific module being accessed.*
 * 2. *The `@X.Y.Z` corresponds to the releases of the overall codemelted.rs Project.*
 *
 * ## Rust TAURI Development
 *
 * <mark>UNDER INVESTIGATION</mark>
 *
 * ## V8 Runtime Utilization
 *
 * Bun, Deno, and Node are all popular V8 runtimes typically for cloud / backend server-side services development. For the cloud portion, typically all the source files are packaged and delivered to the cloud Software As A Service (SaaS). Additionally, each of these runtimes has an ability to "compile" all source files into a given operating system executable. To support these options, the codemelted JavaScript modules can be downloaded into your project structure via the following command.
 *
 * <mark>Command below is not available yet.</mark>
 *
 * ```sh
 * codemelted --dev-fetch-codemelted-js [version] [path]
 * ```
 *
 * This then allows for you to develop your project independent of changes to the overall *codemelted.rs Project*. You also have the ability to utilize TypeScript as each of the modules have full JSDoc documentation and `// @ts-check` turned on by default.
 *
 * *NOTE: You can utilize this method for building complex web apps as well. It is not just for V8 JavaScript runtimes.*
 *
 * # USAGE
 *
 * Once you have determined how you will access the codemelted JavaScript modules of interest, include them in your source as follows.
 *
 * **ES6 Module Import Example**
 *
 * ```js
 * // Import whole module statically via URL or local path
 * import * as codemelted from "path/to/codemelted_xxx.js";
 *
 * // Import elements to use statically via URL or local path
 * import { exported_element } from "path/to/codemelted_xxx.js";
 *
 * // Dynamically import all module elements to named variable
 * let codemelted = await import("path/to/codemelted_xxx.js");
 * ```
 *
 * **Via Script Tag in HTML File**
 *
 * ```html
 * <script type="module">
 *   // Use the import examples above to utilize the script functions.
 * </script>
 * ```
 *
 * **NOTES:**
 *
 * 1. *Select a specific JavaScript module for more examples of how to utilize its API and to determine what to import.*
 * 2. *The files are TypeScript compliant so they can be utilized with TypeScript and get full code completion.*
 * 3. *The examples above should work whether downloaded for direct inclusion into your project or accessed via jsdelivr for a website.*
 *
 * **AUTHOR:** mark.shaffer@codemelted.com / dev.codemelted.com <br>
 * **COPYRIGHT:** © 2025 - 2026 Mark Shaffer. All Rights Reserved. <br>
 * **LICENSE:** MIT License
 * <br><br>
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 * <br><br>
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * <br><br>
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 * <br>
 * <script>
 * function open_test(url) {
 *   let height = 600;
 *   let width = 900;
 *   let top = (globalThis.screen.availHeight - height) / 2;
 *   let left = (globalThis.screen.availWidth - width) / 2;
 *   let settings = `toolbar=no, location=no, ` +
 *     `directories=no, status=no, menubar=no, ` +
 *     `scrollbars=no, resizable=yes, copyhistory=no, ` +
 *     `width=${width}, height=${height}, top=${top}, left=${left}`;
 *   globalThis.open(url, "_blank", settings);
 * }
 * </script>
 * <b>TEST RESULTS:</b>&nbsp;
 * <button style="cursor: pointer;" onclick="open_test('coverage-browser/index.html');">Browser</button>
 * <button style="cursor: pointer;" onclick="open_test('coverage-bun/js/index.html');">Bun</button>
 * <button style="cursor: pointer;" onclick="open_test('coverage-deno/js/index.html');">Deno</button>
 * <button style="cursor: pointer;" onclick="open_test('coverage-node/js/index.html');">NodeJS</button>
 *
 * **VERSION:** vYY.X.Y (MMM-DD)
 *
 * *- vYY.X.Y (MMM-DD):* Change 1
 *
 * **FUTURE WORK:**
 * - A thing 1
 * - A thing 2
 *
 * @module codemelted
 *
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Beacon_API
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Bluetooth
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CookieStore
 * @see https://developer.mozilla.org/en-US/docs/Web/API/console
 * @see https://developer.mozilla.org/en-US/docs/Web/API/EventSource
 * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
 * @see https://developer.mozilla.org/en-US/docs/Web/API/File_System_API
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Location
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLAnchorElement/download
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Navigator
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Screen
 * @see https://developer.mozilla.org/en-US/docs/Web/API/USB
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Web_Serial_API
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Web_MIDI_API
 * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
 * @see https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API
 * @see https://developer.mozilla.org/en-US/docs/Web/API/WebTransport
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Worker
 * @see https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope/indexedDB
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/file
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
 * @see https://doc.rust-lang.org/std/result/
 * @see https://en.cppreference.com/cpp/thread/future
 * @see https://web.dev/articles/files/save-a-file
 */
// ============================================================================
// [MODULE CORE] ==============================================================
// ============================================================================

// [ENUMS] --------------------------------------------------------------------

/**
 * Provides the request actions of the {@link runtime_event} function.
 * @readonly
 * @enum {string}
 * @property {string} Add Will provide ability to add event listeners.
 * @property {string} Remove Will provide the ability to remove event
 * listeners.
 */
export const EVENT_REQUEST = Object.freeze({
  Add: "add",
  Remove: "remove",
});

/**
 * Identifies the event handled via the fired {@link CProtocolEvent} handled
 * via the {@link CProtocolEventHandler} callback when a protocol is opened.
 * @readonly
 * @enum {string}
 * @property {string} Close Signifies an onclose listener received an
 * CloseEvent.
 * @property {string} Error Signifies an onerror listener received an
 * ErrorEvent.
 * @property {string} Message Signifies a onmessage listener received a
 * MessageEvent that contains received data via its data property
 * @property {string} MessageError Signifies a onmessageerror listener
 * received MessageEvent containing an error accessible via its data
 * property.
 * @property {string} ModuleError Signifies an unhandled error occurred
 * where one was not expected. It will be treated as a ModuleError as it
 * should not occur with the protocols and either means developer is not
 * doing something properly within the protocol or a bug exists with the
 * module itself that requires a GitHub Issue to be filed.
 * @property {string} Open Signifies a {@link CProtocol} has opened a
 * connection to a distant system.
 */
export const PROTOCOL_EVENT = Object.freeze({
  Close: "close",
  Error: "error",
  Message: "message",
  MessageError: "message_error",
  ModuleError: "module_error",
  Open: "open",
});

/**
 * Provides the different asynchronous {@link CProtocol} that can be created
 * via the codemelted modules.
 * @readonly
 * @enum {string}
 * @property {string} Audio
 * @property {string} BroadcastChannel
 * @property {string} Bluetooth
 * @property {string} EventSource
 * @property {string} Gamepad
 * @property {string} MIDI
 * @property {string} Orientation
 * @property {string} Timer Supports the creation of the
 *  {@link CTimerProtocol}
 * @property {string} SerialPort
 * @property {string} TextToSpeech
 * @property {string} USB
 * @property {string} WebSocket
 * @property {string} WebRTC
 * @property {string} WebTransport
 * @property {string} Worker Supports the creation of the
 *  {@link CWorkerProtocol}
 */
export const PROTOCOL_TYPE = Object.freeze({
  Audio: "audio",
  Bluetooth: "bluetooth",
  BroadcastChannel: "broadcast_channel",
  EventSource: "event_source",
  Gamepad: "gamepad",
  MIDI: "midi",
  Orientation: "orientation",
  Timer: "timer",
  SerialPort: "serial_port",
  TextToSpeech: "text_to_speech",
  USB: "usb",
  WebSocket: "web_socket",
  WebRTC: "web_rtc",
  WebTransport: "web_transport",
  Worker: "worker",
});

// [DATA TYPES] ---------------------------------------------------------------

/**
 * Class that represents any codemelted.js API violations or caught exceptions
 * that were not handled properly as this module is intended to never throw
 * so any "unknown / unhandled" exception is either an API violation or an
 * exception not properly handled by this module.
 */
export class CModuleError extends Error {
  /**
   * Identifies a misuse of the module API.
   * @readonly
   * @type {string}
   */
  static get MISUSE() { return "Module logic was not used properly!"; }

  /**
   * Identifies a not implemented feature of the module.
   * @readonly
   * @type {string}
   */
  static get NOT_IMPLEMENTED() { return "NOT IMPLEMENTED!"; }

  /**
   * Identifies an unexpected parameter type with a module function call.
   * @readonly
   * @type {string}
   */
  static get TYPE_VIOLATION() { return "Data was not an expected data type!"; }

  /**
   * Identifies an unsupported JavaScript runtime was called with a public
   * function.
   * @readonly
   * @type {string}
   */
  static get UNSUPPORTED_RUNTIME() {return "Unsupported JavaScript Runtime!"; }

  /**
   * Utility function to chain together a stack trace of module API failures.
   * @param {any} err The error caught to log and rethrow.
   */
  static handle_error(err) {
    console.error("codemelted.js module error encountered.", err);
  }

  /**
   * Provides custom printout of the module error providing the name, message,
   * and stack_trace to chain together the call failure sequence.
   * @override
   * @returns {string}
   */
  toString() {
    let name = this.name ? this.name : "UnknownError";
    let msg = this.message ? this.message : "unknown message";
    let stack_trace = this.stack ? this.stack : "no stack trace";
    return `${name}: ${msg}\n${stack_trace}`;
  }

  /**
   * Constructor for the module error.
   * @param {string} message The module API violation.
   * @param {any} [cause] Capture a chaining of failure detections to create
   * a stack trace for debugging.
   */
  constructor(message, cause) {
    super(message, cause ? {cause: cause} : undefined);
    if ("captureStackTrace" in Error) {
      // @ts-ignore IF statement above protects us from this.
      Error.captureStackTrace(this, CModuleError);
    }
  }
}

/**
 * Provides a result where either the value or the error can be signaled for
 * later usage. A better construct then throwing exceptions and is adapted
 * from Rust programming concepts.
 * @template T The data type that will be held by the value().
 */
export class CResult {
  /** @type {string | Error | null} */
  #error;
  /** @type {T?} */
  #value;

  /**
   * Holds any error message associated with a failed transaction request.
   * @returns {string | Error | null}
   */
  error() { return this.#error; }

  /**
   * Signals whether an error was captured or not.
   * @returns {boolean}
   */
  is_error() { return this.error() != null; }

  /**
   * Signals the transaction completed with no errors.
   * @returns {boolean}
   */
  is_ok() { return !this.is_error(); }

  /**
   * Hold the value of the given result or nothing if the CResult is
   * being used to signal there was no error.
   * @returns {T?}
   */
  value() { return this.#value; }

  /**
   * Constructor for the class.
   * @param {object} params The named parameters for the object.
   * @param {T?} [params.value] The value associated with the result.
   * @param {any} [params.error] The error associated with the result.
   */
  constructor({value = null, error = null} = {}) {
    try {
      if (value && error) {
        throw new CModuleError(CModuleError.MISUSE);
      }
      this.#value = value;
      if (error instanceof Error || typeof error === "string") {
        this.#error = error;
      } else if (typeof error === "object" && error != null) {
        this.#error = JSON.stringify(error);
      } else {
        // Assumed to be null at this point
        this.#error = error;
      }
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError("CLogRecord construction error.", err);
    }
  }
}

// [PROTOCOL BASE DEFINITION] -------------------------------------------------

/**
 * An event handled by a currently opened {@link CProtocol}. The event is
 * handled via the {@link CProtocolEventHandler}.
 * @template T The event objects a protocol is working with.
 */
export class CProtocolEvent {
  /** @type {CProtocol<T>} */
  #protocol;
  /** @type {T} */
  #data;
  /** @type {PROTOCOL_EVENT} */
  #event_fired;

  /**
   * Identification of the protocol. Utilized for logging purposes.
   * @returns {CProtocol<T>}
   */
  protocol() { return this.#protocol; }

  /**
   * The data received by the event. Utilize the as_xxx() functions to
   * retrieve a specific data type for the given protocol_type().
   * @returns {T}
   */
  data() {return this.#data; }

  /**
   * Retrieves the event that was fired with the open protocol.
   * @returns {PROTOCOL_EVENT}
   */
  event_fired() { return this.#event_fired; }

  /**
   * Constructor for the event.
   * @param {object} params The named parameters.
   * @param {CProtocol<T>} params.protocol The protocol associated with the
   * event.
   * @param {any} params.data The data handled by the protocol.
   * @param {PROTOCOL_EVENT} params.event_fired The event that was handled.
   */
  constructor({protocol, data, event_fired}) {
    try {
      json_check_type({type: CProtocol, data: protocol, should_throw: true});
      json_has_value({
        obj: PROTOCOL_EVENT,
        value: event_fired,
        should_throw: true
      });
      this.#protocol = protocol;
      this.#data = data;
      this.#event_fired = event_fired;
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError("CProtocolEvent construction error.", err);
    }
  }
}

/**
 * @template T The event objects the protocol event wraps.
 * @public
 * @callback CProtocolEventHandler  Supports the {@link CProtocol} for data
 * received as part of a protocol.
 * @param {CProtocolEvent<T>} evt The event handled by an open protocol.
 */

/**
 * Defines the "rules" for objects that will setup a protocol that directly
 * exchanges data with an external item, will continuously run until
 * terminated, requires the ability to know it is running, and get any
 * errors that have occurred during its run.
 * @template T
 */
export class CProtocol {
  /** @type {string} */
  #name;
  /** @type {CProtocolEventHandler<T>} */
  #rx_handler;
  /** @type {PROTOCOL_TYPE} */
  #type;

  /**
   * Helper function for the implementing protocols to report events.
   * @protected
   * @param {object} params The named parameters.
   * @param {PROTOCOL_EVENT} params.event_fired The event handled by the
   * protocol.
   * @param {any} params.data The data associated with the given event.
   */
  report({event_fired, data}) {
    const evt = new CProtocolEvent({
      protocol: this,
      data: data,
      event_fired: event_fired,
    });
    this.#rx_handler(evt);
  }

  /**
   * A log identification.
   * @returns {string}
   */
  name() { return this.#name; }

  /**
   * Identifies the type of protocol.
   * @returns {PROTOCOL_TYPE}
   */
  type() { return this.#type; }

  /**
   * Posts a given message to the given implementing protocol.
   * @param {any} [data] The data to post for the given protocol.
   * @returns {void}
   */
  post_message(data) {
    throw new CModuleError(CModuleError.NOT_IMPLEMENTED);
  }

  /**
   * Terminates the given protocol.
   * @returns {void}
   */
  terminate() {
    throw new CModuleError(CModuleError.NOT_IMPLEMENTED);
  }

  /**
   * Constructor for the class.
   * @param {object} params The named parameters.
   * @param {string} params.name The name to associate with the
   * protocol for logging purposes.
   * @param {CProtocolEventHandler<T>} params.rx_handler The callback for
   * received data.
   * @param {PROTOCOL_TYPE} params.type The type of protocol.
   */
  constructor({name, rx_handler, type}) {
    try {
      json_check_type({
        type: "function",
        data: rx_handler,
        count: 1,
        should_throw: true
      });
      json_check_type({type: "string", data: name, should_throw: true});
      json_check_type({type: "string", data: type, should_throw: true});
      this.#name = name;
      this.#rx_handler = rx_handler;
      this.#type = type;
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError("CProtocol construction error.", err);
    }
  }
}

// ============================================================================
// [ASYNC USE CASE IMPLEMENTATION] ============================================
// ============================================================================

// [DATA DEFINITION] ----------------------------------------------------------

/**
 * The resulting object from the {@link async_task} function call with a
 * promise of the future {@link CResult}.
 * @template T The data associated with the {@link CResult.value} function
 * call.
 */
export class CFuture {
  /** @type {T} */
  #data;
  /** @type {number} */
  #delay;
  /** @type {CTaskCB<T>} */
  #task;
  /** @type {Promise<CResult<T>>} */
  #result;
  /** @type {number} */
  #timeout_id = -1;

  /**
   * Will cancel a currently running task. If no task is running then this
   * action is a no-op.
   */
  cancel() {
    if (!this.has_completed()) {
      globalThis.clearTimeout(this.#timeout_id);
      this.#timeout_id = -1;
      this.#result = new Promise((resolve) => {
        resolve(new CResult({error: "future canceled"}));
      })
    }
  }

  /**
   * Allows for re-execution of the {@link CFuture} wrapped task.
   * @param {any} [data] The optional data to pass if necessary when
   * re-executing the task.
   * @returns {void}
   */
  execute(data) {
    try {
      // Ensure we have completed the previous task before kicking off
      // the task again.
      if (!this.has_completed()) {
        throw new CModuleError(
          `${CModuleError.MISUSE}: task has not completed.`
        );
      }

      // Go re-execute the wrapped task.
      this.#data = data;
      this.#result = this.#do_execute();
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError("CFuture::execute() error.", err);
    }
  }

  /**
   * Determines if the task has completed or not.
   * @returns {boolean} true if completed, false otherwise.
   */
  has_completed() { return this.#timeout_id === -1; }

  /**
   * Holds the result of the {@link async_task} function call.
   * @returns {Promise<CResult<T>>} The result of the asynchronous
   * processing.
   */
  result() {
    try {
      return this.#result;
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError("CFuture::result() error.", err);
    }
  }

  /**
   * Result for the {@link async_task} function call. Must call execute() to
   * kick-off the future task.
   * @param {object} params The named parameters.
   * @param {CTaskCB<T>} params.task The task to run.
   * @param {T} params.data The optional data to pass to the task.
   * @param {number} [params.delay=0] The delay to schedule the task in the
   * future. Defaults to 0 if not specified.
   */
  constructor({task, data, delay=0}) {
    try {
      json_check_type({type: "function", data: task, should_throw: true});
      json_check_type({type: "number", data: delay, should_throw: true});
      this.#task = task;
      this.#data = data;
      this.#delay = delay;
      this.#result = this.#do_execute();
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError("CFuture construction error.", err);
    }
  }

  /**
   * Performs the execution of the task.
   * @returns {Promise<CResult<T>>}
   */
  #do_execute() {
    return new Promise((resolve) => {
      // @ts-ignore node returns an object instead of a number
      this.#timeout_id = setTimeout(() => {
        try {
          let answer = this.#task(this.#data);
          this.#timeout_id = -1;
          resolve(new CResult({value: answer}));
        } catch (err) {
          this.#timeout_id = -1;
          resolve(new CResult({error: err}));
        }
      }, this.#delay);
    });
  }
}

/**
 * @callback CTaskCB The task to run as part of the {@link async_task} call.
 * @param {T} data Data to pass to the task.
 * @returns {T} The result of the task completing.
 * @template T The data associated with the CResult object accessed via the
 * result() function call.
 */

// [PROTOCOL IMPLEMENTATIONS] -------------------------------------------------

/**
 * Represents a firing timer for an open {@link PROTOCOL_TYPE} Timer.
 */
export class CTimerEvent {
  /** @type {number} */
  #interval;

  /**
   * The interval of the firing timer event.
   * @returns {number}
   */
  interval() { return this.#interval; }

  /**
   * Constructor for the class.
   * @param {number} interval The interval of the firing timer.
   */
  constructor(interval) {
    try {
      json_check_type({type: "number", data: interval});
      this.#interval = interval;
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError("CTimerEvent construction error.", err);
    }
  }
}

/**
 * Creates an asynchronous timer that fires on the specified interval until
 * terminated via the {@link async_timer} function.
 * @extends {CProtocol<CTimerEvent>}
 */
export class CTimerProtocol extends CProtocol {
  /** @type {number} */
  #interval;
  /** @type {number} */
  #timer_id = -1;

  /**
   * @inheritdoc
   * @override
   */
  terminate() {
    try {
      globalThis.clearInterval(this.#timer_id);
      this.#timer_id = -1;
    } catch (err) {
      CModuleError.handle_error(err);
      this.report({
        event_fired: PROTOCOL_EVENT.ModuleError,
        data: err
      });
    }
  }

  /**
   * Constructor for the protocol.
   * @param {object} params The named parameters.
   * @param {string} params.name The name to give to the protocol.
   * @param {number} params.interval How often to fire the timer.
   * @param {CProtocolEventHandler<CTimerEvent>} params.rx_handler Handler for
   * the protocol.
   */
  constructor({name, interval, rx_handler}) {
    super({
      name: name,
      type: PROTOCOL_TYPE.Timer,
      rx_handler: rx_handler,
    });
    try {
      json_check_type({type: "number", data: interval, should_throw: true});
      this.#interval = interval;
      // @ts-ignore node returns an object.
      this.#timer_id = globalThis.setInterval(() => {
        this.report({
          event_fired: PROTOCOL_EVENT.Message,
          data: new CTimerEvent(this.#interval),
        });
      }, interval);
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError("CTimerProtocol construction error.", err);
    }
  }
}

/**
 * Identifies event handled by the {@link PROTOCOL_TYPE.Worker}
 * protocol.
 */
export class CWorkerEvent {
  /** @type {ErrorEvent | MessageEvent} */
  #event;
  /** @type {boolean} */
  #is_error;

  /**
   * Treats the wrapped event as an error event.
   * @returns {ErrorEvent?}
   */
  as_error_event() {
    return this.#event instanceof ErrorEvent
      ? this.#event
      : null;
  }

  /**
   * Treats the wrapped event as a message event.
   * @returns {MessageEvent?}
   */
  as_message_event() {
    return this.#event instanceof MessageEvent
      ? this.#event
      : null;
  }

  /**
   * The event captured by the protocol.
   * @returns {ErrorEvent | MessageEvent}
   */
  event() { return this.#event; }

  /**
   * Indicates if the event captured was an error.
   * @returns {boolean}
   */
  is_error() { return this.#is_error; }

  /**
   * Constructor for the protocol event.
   * @param {object} params The named parameters
   * @param {ErrorEvent | MessageEvent} params.event The event handled by the
   * protocol.
   * @param {boolean} params.is_error true if it was an error event,
   * false otherwise.
   */
  constructor({event, is_error}) {
    try {
      if (!json_check_type({type: MessageEvent, data: event}) &&
          !json_check_type({type: ErrorEvent, data: event})) {
        throw new CModuleError(CModuleError.TYPE_VIOLATION);
      }
      json_check_type({type: "boolean", data: is_error, should_throw: true});
      this.#event = event;
      this.#is_error = is_error;
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError(
        "CWorkerEvent construction error.", err
      );
    }
  }
}

/**
 * An object containing option properties that can be set when creating the
 * object instance. Available properties are as follows.
 * @typedef {object} CWorkerOptions
 * @property {string} [credentials] A string specifying whether the browser
 * sends credentials when importing modules into a module worker. The allowed
 * values are the same as can be passed to the fetch()
 * request: omit, same-origin, or include.  The default is same-origin
 * (only include credentials for same-origin requests). This is ignored for
 * classic workers.
 * @property {string} [name] A string specifying an identifying name for the
 * DedicatedWorkerGlobalScope representing the scope of the worker, which is
 * mainly useful for debugging purposes.
 * @property {string} [type] A string specifying the type of worker to create.
 * The value can be classic or module. The default is classic.
 */

/**
 * Constructs a dedicated background worker off the JavaScript runtime main
 * thread via the {@link async_worker} function.
 * @extends {CProtocol<CWorkerEvent>}
 */
export class CWorkerProtocol extends CProtocol {
  /** @type {Worker} */
  #worker;

  /**
   * Identifies the number of background threads are available to the worker.
   * @returns {number}
   */
  static cpu_count() {
    return runtime_available({
      request: AVAILABILITY_REQUEST.AskRuntime,
      name: "hardwareConcurrency",
      obj: globalThis["navigator"]
    })
      // @ts-ignore This will be within the browser context
      ? globalThis.navigator.hardwareConcurrency
      : 1;
  }

  /**
   * Sends a message, which can be of any kind of Object, to the background
   * worker for processing based on how it was setup to be processed.
   * @override
   * @param {any} [data] The data to post. The data is serialized using the
   * structured clone algorithm. This means you can pass a broad variety of
   * data objects safely to the background for processing without having to
   * serialize them yourself.
   * @returns {void}
   */
  post_message(data) {
    try {
      this.#worker.postMessage(data);
    } catch (err) {
      CModuleError.handle_error(err);
      this.report({
        event_fired: PROTOCOL_EVENT.ModuleError,
        data: err
      });
    }
  }

  /**
   * @inheritdoc
   * @override
   */
  terminate() {
    try {
      this.#worker.terminate();
    } catch (err) {
      CModuleError.handle_error(err);
      this.report({
        event_fired: PROTOCOL_EVENT.ModuleError,
        data: err
      });
    }
  }

  /**
   * Constructs a worker protocol for asynchronous processing off the main
   * runtime thread.
   * @param {object} params The named parameters.
   * @param {string} params.name The optional name to give to the
   * protocol.
   * @param {CWorkerOptions} [params.options] Options for further
   * configuration of the worker. Defaults to a "module" type.
   * @param {CProtocolEventHandler<CWorkerEvent>} params.rx_handler The receive
   * handler for data and state changes.
   * @param {string} params.url The URL associated with the worker thread.
   */
  constructor({name, options = {type: "module"}, rx_handler, url}) {
    super({
      name: name,
      rx_handler: rx_handler,
      type: PROTOCOL_TYPE.Worker
    });
    try {
      if (!runtime_available({request: AVAILABILITY_REQUEST.WorkerAvailable})) {
        throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
      }
      json_check_type({type: "string", data: url, should_throw: true});
      json_check_type({type: "object", data: options, should_throw: true});
      this.#worker = new globalThis.Worker(
        new URL(url, import.meta.url).href,
        // @ts-ignore CWorkerOptions matches WorkerOptions from browser.
        options
      );
      this.#worker.onerror = (evt) => {
        this.report({
          event_fired: PROTOCOL_EVENT.Error,
          data: new CWorkerEvent({event: evt, is_error: true})
        });
        evt.preventDefault();
      }
      this.#worker.onmessageerror = (evt) => {
        this.report({
          event_fired: PROTOCOL_EVENT.MessageError,
          data: new CWorkerEvent({event: evt, is_error: true})
        });
        evt.preventDefault();
      }
      this.#worker.onmessage = (evt) => {
        this.report({
          event_fired: PROTOCOL_EVENT.Message,
          data: new CWorkerEvent({event: evt, is_error: false})
        });
        evt.preventDefault();
      }
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError("CWorkerProtocol construction error.", err);
    }
  }
}

// [PUBLIC API] ---------------------------------------------------------------

/**
 * Will put a currently running async task to sleep for a specified delay
 * in milliseconds.
 * @param {number} delay Time is milliseconds to delay the task.
 * @returns {Promise<void>} The promise to await on for the delay.
 * A rejected promise represents an API violation.
 * @example
 * // From within an async function, sleep 2 seconds.
 * await async_sleep(2000);
 */
export function async_sleep(delay) {
  return new Promise((resolve, reject) => {
    try {
      json_check_type({type: "number", data: delay, should_throw: true});
      setTimeout(() => {
        resolve();
      }, delay);
    } catch (err) {
      CModuleError.handle_error(err);
      reject(err);
    }
  });
}

/**
 * Will execute an asynchronous task and get its result in the future.
 * @template T The data to be processed through the {@link CFuture}.
 * @param {object} params The named parameters.
 * @param {CTaskCB<T>} params.task The task to run.
 * @param {T} params.data The optional data to pass to the task.
 * @param {number} [params.delay=0] The delay to schedule the task in the
 * future. Defaults to 0 if not specified.
 * @returns {CFuture<T>} An object to execute the asynchronous task. You can
 * also re-execute the future by calling the {@link CFuture.execute} method.
 * @example
 * // Schedule a task for getting a future result and write it to the
 * // console.
 * let future = async_task({
 *   task: (data) => { return data + 20; },
 *   data: 22,
 *   delay: 1000,
 *   execute: true,
 * });
 * let result = await future.result();
 * console.log("result = ", result.value());
 */
export function async_task({task, data, delay=0}) {
  try {
    let future = new CFuture({task: task, data: data, delay: delay});
    return future;
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("async_task() error.", err);
  }
}

/**
 * Create an asynchronous timer set on a specified interval. When the event
 * is fired, the rx_handler will receive the event.
 * @param {object} params The named parameters
 * @param {string} params.name Identification for the protocol.
 * @param {number} params.interval The interval the timer protocol will
 * fire a {@link CTimerEvent}.
 * @param {CProtocolEventHandler<CTimerEvent>} params.rx_handler The receive
 * handler for processing the event.
 * @returns {CTimerProtocol}
 * @example
 * // TBD
 */
export function async_timer({name, interval, rx_handler}) {
  try {
    return new CTimerProtocol({
      name: name,
      interval: interval,
      rx_handler: rx_handler
    });
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("async_task() error.", err);
  }
}

/**
 * Creates an background worker to offload processing to a background thread.
 * @param {object} params The named parameters.
 * @param {string} params.name The optional name to give to the
 * protocol.
 * @param {CWorkerOptions} [params.options] Options for further
 * configuration of the worker. Defaults to a "module" type.
 * @param {CProtocolEventHandler<CWorkerEvent>} params.rx_handler The receive
 * handler for data and state changes.
 * @param {string} params.url The URL associated with the worker thread.
 * @returns {CWorkerProtocol}
 * @example
 * // TBD
 */
export function async_worker({
  name,
  options = {type: "module"},
  rx_handler,
  url})
{
  try {
    return new CWorkerProtocol({
      name: name,
      options: options,
      rx_handler: rx_handler,
      url: url,
    });
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("async_task() error.", err);
  }
}

// ============================================================================
// [DB USE CASE] ==============================================================
// ============================================================================

/**
 * <mark>FUTURE DEVELOPMENT. DO NOT USE!</mark>
 * @private
 * @example
 * // TBD
 */
export function db_exists() {
  // TODO: IndexDB for browser / worker
  try {
    throw new CModuleError(CModuleError.NOT_IMPLEMENTED);
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("db_exists() error.", err);
  }
}

/**
 * <mark>FUTURE DEVELOPMENT. DO NOT USE!</mark>
 * @private
 * @example
 * // TBD
 */
export function db_manage() {
  // TODO: IndexDB for browser / worker
  try {
    throw new CModuleError(CModuleError.NOT_IMPLEMENTED);
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("db_manage() error.", err);
  }
}

/**
 * <mark>FUTURE DEVELOPMENT. DO NOT USE!</mark>
 * @private
 * @example
 * // TBD
 */
export function db_query() {
  // TODO: IndexDB for browser / worker
  try {
    throw new CModuleError(CModuleError.NOT_IMPLEMENTED);
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("db_query() error.", err);
  }
}

/**
 * <mark>FUTURE DEVELOPMENT. DO NOT USE!</mark>
 * @private
 * @example
 * // TBD
 */
export function db_update() {
  // TODO: IndexDB for browser / worker
  try {
    throw new CModuleError(CModuleError.NOT_IMPLEMENTED);
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("db_update() error.", err);
  }
}

/**
 * <mark>FUTURE DEVELOPMENT. DO NOT USE!</mark>
 * @private
 * @example
 * // TBD
 */
export function db_version() {
  // TODO: IndexDB for browser / worker
  try {
    throw new CModuleError(CModuleError.NOT_IMPLEMENTED);
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("db_version() error.", err);
  }
}

// ============================================================================
// [DISK USE CASE] ============================================================
// ============================================================================

// [ENUMS] --------------------------------------------------------------------

/**
 * Defines the data being read from or saved to disk from this module.
 * This is in support of the {@link disk_read_file} and
 * {@link disk_write_file} functions.
 * @readonly
 * @enum {string}
 * @property {string} ArrayBuffer Represents an ArrayBuffer data type.
 * @property {Text} Text Represents a string data type.
 * @property {Uint8Array} Uint8Array Represents a series of bytes data type.
 */
export const DISK_DATA_TYPE = Object.freeze({
  ArrayBuffer: "array_buffer",
  Text: "text",
  Uint8Array: "uint8_array",
});

// [PUBLIC API] ---------------------------------------------------------------

/**
 * Brings up a file chooser to select a file to read its data for later use.
 * @param {object} params The named parameters.
 * @param {DISK_DATA_TYPE} params.data_type The type of data being saved to
 * disk.
 * @param {string} [params.accept="*"] A comma separated list of either file
 * extensions or mime types representing files
 * @returns {Promise<CResult<ArrayBuffer | string | Uint8Array | null>>} The
 * data read from the particular file or null if an error occurred or no file
 * was selected.
 * A rejected promise represents a module API violation.
 * @example
 * // Read a text file from disk.
 * const data = await disk_read_file({
 *   data_type: DISK_DATA_TYPE.Text,
 *   accept: "*.txt"
 * });
 * if (data) {
 *   // Do something with the data.
 *   // Could be null if you don't select a file.
 * }
 */
export function disk_read_file({data_type, accept="*"}) {
  return new Promise((resolve, reject) => {
    try {
      json_has_value({
        obj: DISK_DATA_TYPE,
        value: data_type,
        should_throw: true
      });
      json_check_type({type: "string", data: accept, should_throw: true});

      // Go read the file from disk.
      // Build our in-memory control to select the file.
      // @ts-ignore document will exist in browser context.
      const w = globalThis.document.createElement('input');
      w.type = "file";
      w.accept = accept;

      // Setup to handle the data read.
      w.onchange = async (ev) => {
        try {
          let value = null;
          // @ts-ignore HTMLInputElement will exist in browser context.
          const file = ev.target instanceof HTMLInputElement
            ? ev.target.files != null
              ? ev.target.files[0]
              : null
            : null;
          if (!file) {
            resolve(new CResult());
          }
          switch (data_type) {
            case DISK_DATA_TYPE.ArrayBuffer:
              value = await file?.text();
              break;
            case DISK_DATA_TYPE.Text:
              value = await file?.bytes();
              break;
            case DISK_DATA_TYPE.Uint8Array:
              value = await file?.arrayBuffer();
              break;
          }
          resolve(new CResult({value: value}));
        } catch (err) {
          resolve(new CResult({error: err}));
        }
      };

      // Kick it off.
      w.click();
    } catch (err) {
      CModuleError.handle_error(err);
      reject(err);
    }
  });
}

/**
 * Will save the specified data to a filename in the operating system
 * download directory.
 * @param {object} params The named parameters.
 * @param {ArrayBuffer | string | Uint8Array} params.data The data to write
 * to disk.
 * @param {string} params.filename What to call the file in the download
 * directory.
 * @returns {Promise<CResult<void>>} The result of the save. A rejected
 * promise represents an API violation.
 * @example
 * // Go attempt to download the file contents from a blob
 * let result = await disk_write_file({
 *   data: image_blob,
 *   filename: "picture_of_me.png"
 * });
 * if (result.is_error()) {
 *   // handle the error
 * }
 */
export function disk_write_file({data, filename}) {
  // Async function for the modern way so we can call it within the promise
  const modern_save_file = async (
    /** @type {ArrayBuffer | string | Uint8Array} */ data,
    /** @type {any} */ filename
  ) => {
    try {
      // Show the file save dialog.
      // @ts-ignore Experimental but available
      const handle = await showSaveFilePicker({
        filename,
      });
      // Write the blob to the file.
      const writable = await handle.createWritable();
      // @ts-ignore Typescript does not know what is happening here.
      const blob = new Blob([data]);
      await writable.write(blob);
      await writable.close();
      return new CResult();
    } catch (err) {
      return new CResult({error: err});
    }
  };
  return new Promise((resolve, reject) => {
    try {
      const valid_type = json_check_type({type: ArrayBuffer, data: data}) ||
        json_check_type({type: "string", data: data}) ||
        json_check_type({type: Uint8Array, data: data});
      if (!valid_type) {
        throw new CModuleError(CModuleError.TYPE_VIOLATION);
      }
      json_check_type({type: "string", data: filename, should_throw: true});

      // Determine if we can perform the modern way of saving a file
      const is_modern_available = !runtime_available({
        request: AVAILABILITY_REQUEST.IFrame
      }) && runtime_available({
        request: AVAILABILITY_REQUEST.AskRuntime,
        name: "showSaveFilePicker"
      });

      if (is_modern_available) {
        // We have the modern way available, present the save file picker.
        modern_save_file(data, filename).then((value) => {
          resolve(value);
        });
      } else {
        // Traditional download with name specified shall be utilized.
        try {
          // @ts-ignore Typescript does not know what is happening here.
          const blob = new Blob([data]);
          const blobURL = URL.createObjectURL(blob);
          // @ts-ignore document will exist in browser context.
          const a = globalThis.document.createElement('a');
          a.href = blobURL;
          a.download = filename;
          a.style.display = "none";
          // @ts-ignore document will exist in browser context.
          a.click();
          setTimeout(() => {
            URL.revokeObjectURL(blobURL);
            resolve(new CResult());
          }, 1000);
        } catch (err) {
          resolve(new CResult({error: err}));
        }
      }
    } catch (err) {
      CModuleError.handle_error(err);
      reject(err);
    }
  });
}

// ============================================================================
// [HW USE CASE] ==============================================================
// ============================================================================

// [DATA DEFINITION] ----------------------------------------------------------

/**
 * @typedef {object} COrientationOptions
 * @property {number} [maximumAge] A positive long value indicating the
 * maximum age in milliseconds of a possible cached position that is
 * acceptable to return. If set to 0, it means that the device cannot use a
 * cached position and must attempt to retrieve the real current position.
 * If set to Infinity the device must return a cached position regardless of
 * its age. Default: 0.
 * @property {number} [timeout] A positive long value representing the maximum
 * length of time (in milliseconds) the device is allowed to take in order to
 * return a position. The default value is Infinity, meaning that
 * getCurrentPosition() won't return until the position is available.
 * @property {boolean} [enableHighAccuracy] boolean value that indicates the
 * application would like to receive the best possible results. If true and if
 * the device is able to provide a more accurate position, it will do so. Note
 * that this can result in slower response times or increased power
 * consumption (with a GPS chip on a mobile device for example). On the other
 * hand, if false, the device can take the liberty to save resources by
 * responding more quickly and/or using less power. Default: false.
 */

/**
 * @typedef {object} DeviceOrientationEvent Defined to support proper typing
 * in the JSDocs when type checking in a TypeScript environment.
 * @property {boolean} absolute A boolean that indicates whether or not the
 * device is providing orientation data absolutely.
 * @property {number?} alpha A number representing the motion of the device
 * around the z axis, express in degrees with values ranging from 0
 * (inclusive) to 360 (exclusive).
 * @property {number?} beta A number representing the motion of the device
 * around the x axis, express in degrees with values ranging from -180
 * (inclusive) to 180 (exclusive). This represents a front to back motion of
 *  the device.
 * @property {number?} gamma A number representing the motion of the device
 * around the y axis, express in degrees with values ranging from -90
 * (inclusive) to 90 (exclusive). This represents a left to right motion of
 * the device.
 */

/**
 * @typedef {object} GeolocationCoordinates The GeolocationCoordinates
 * interface represents the position and altitude of the device on Earth,
 * as well as the accuracy with which these  properties are calculated. The
 * geographic position information is provided in terms of World Geodetic
 * System coordinates (WGS84).
 * @property {number} latitude Returns a double representing the position's
 * latitude in decimal degrees.
 * @property {number} longitude Returns a double representing the position's
 * longitude in decimal degrees.
 * @property {number | null} altitude Returns a double representing the
 * position's altitude in meters, relative to nominal sea level. This value
 * can be null if the implementation cannot provide the data.
 * @property {number} accuracy Returns a double representing the accuracy
 * of the latitude and longitude properties, expressed in meters.
 * @property {number | null} altitudeAccuracy Returns a double representing
 * the accuracy of the altitude expressed in meters. This value can be null
 * if the implementation cannot provide the data.
 * @property {number | null} heading Returns a double representing the
 * direction towards which the device is facing. This value, specified in
 * degrees, indicates how far off from heading true north the device is. 0
 * degrees represents true north, and the direction is determined clockwise
 * (which means that east is 90 degrees and west is 270 degrees). If speed
 * is 0 or the device is unable to provide heading information, heading is
 * null.
 * @property {number | null} speed Returns a double representing the
 * velocity of the device in meters per second. This value can be null.
 */

/**
 * @private
 * Represents the geodetic data captured from the
 * {@link PROTOCOL_TYPE.Orientation} opened protocol.
 */
export class CGeodeticEvent {
  /** @type {Date} */
  #timestamp = new Date();
  /** @type {number} */
  #latitude = NaN;
  /** @type {number} */
  #longitude = NaN;
  /** @type {number?} */
  #altitude = null;
  /** @type {number} */
  #heading = NaN;
  /** @type {number} */
  #speed = NaN;
  /** @type {number?} */
  #alpha = null;
  /** @type {number?} */
  #beta = null;
  /** @type {number?} */
  #gamma = null;

  /** @type {number?} */
  #code;
  /** @type {string?} */
  #message;

  /**
   * The acquisition of the geolocation information failed because the page
   * didn't have the necessary permissions.
   * @readonly
   * @type {number}
   */
  static get PERMISSION_DENIED() { return 1; }

  /**
   * The acquisition of the geolocation failed because at least one internal
   * source of position returned an internal error.
   * @readonly
   * @type {number}
   */
  static get POSITION_UNAVAILABLE() { return 2; }

  /**
   * The time allowed to acquire the geolocation was reached before the
   * information was obtained.
   * @readonly
   * @type {number}
   */
  static get TIMEOUT() { return 3; }

  /**
   * The code of the error message.
   * @returns {number?}
   */
  code() { return this.#code; }

  /**
   * The message associated with the error.
   * @returns {string?}
   */
  message() { return this.#message; }

  /**
   * The time the orientation data was last updated.
   * @returns {Date}
   */
  timestamp() { return this.#timestamp; }

  /**
   * Returns a double representing the position's latitude in decimal
   * degrees.
   * @returns {number}
   */
  latitude() { return this.#latitude; }

  /**
   * Returns a double representing the position's longitude in decimal
   * degrees.
   * @returns {number}
   */
  longitude() { return this.#longitude; }

  /**
   * Returns a double representing the position's altitude in meters,
   * relative to sea level. This value can be null if the implementation
   * cannot provide the data.
   * @returns {number?}
   */
  altitude() { return this.#altitude; }

  /**
   * Returns a double representing the direction towards which the
   * device is facing. This value, specified in degrees, indicates how
   * far off from heading true north the device is. 0 degrees represents
   * true north, and the direction is determined clockwise (which means
   * that east is 90 degrees and west is 270 degrees). Null if heading could
   * not be determined. Utilize the {@link calculate_heading} in this
   * circumstance.
   * @returns {number?}
   */
  heading() { return this.#heading; }

  /**
   * Returns a double representing the velocity of the device in meters
   * per second or null if unable to be determined. Utilize the
   * {@link calculate_speed} if this occurs.
   * @return {number?}
   */
  speed() { return this.#speed; }

  /**
   * A number representing the motion of the device around the z axis,
   * express in degrees with values ranging from 0 (inclusive) to
   * 360 (exclusive).
   * @returns {number?}
   */
  alpha() { return this.#alpha; }

  /**
   * A number representing the motion of the device around the x axis,
   * expressed in degrees with values ranging from -180 (inclusive) to
   * 180 (exclusive). This represents the front to back motion of the
   * device.
   * @returns {number?}
   */
  beta() { return this.#beta; }

  /**
   * A number representing the motion of the device around the y axis,
   * expressed in degrees with values ranging from -90 (inclusive) to 90
   * (exclusive). This represents the left to right motion of the device.
   * @returns {number?}
   */
  gamma() { return this.#gamma; }

  /**
   * Determines the distance between two geodetic points.
   * @param {CGeodeticEvent} p The secondary point to determine the distance.
   * @returns {number} The distance in meters.
   */
  calculate_distance(p) {
    // Convert degrees to radians
    let lat1 = this.latitude() * Math.PI / 180.0;
    let lon1 = this.longitude() * Math.PI / 180.0;

    let lat2 = p.latitude() * Math.PI / 180.0;
    let lon2 = p.longitude() * Math.PI / 180.0;

    // radius of earth in metres
    let r = 6378100.0;

    // P
    let rho1 = r * Math.cos(lat1);
    let z1 = r * Math.sin(lat1);
    let x1 = rho1 * Math.cos(lon1);
    let y1 = rho1 * Math.sin(lon1);

    // Q
    let rho2 = r * Math.cos(lat2);
    let z2 = r * Math.sin(lat2);
    let x2 = rho2 * Math.cos(lon2);
    let y2 = rho2 * Math.sin(lon2);

    // Dot product
    let dot = x1 * x2 + y1 * y2 + z1 * z2;
    let cos_theta = dot / (r * r);
    let theta = Math.acos(cos_theta);

    // Distance in meters
    return r * theta;
  }

  /**
   * Calculates the geodetic heading.
   * @param {CGeodeticEvent} p The secondary point to determine heading.
   * @returns {number} Heading in degrees between 0 (N) - 359
   */
  calculate_heading(p) {
    // Get the initial data from our variables:
    let lat1 = this.latitude() * (Math.PI / 180.0);
    let lon1 = this.longitude() * (Math.PI / 180.0);
    let lat2 = p.latitude() * (Math.PI  / 180.0);
    let lon2 = p.longitude() * (Math.PI  / 180.0);

    // Set up our calculations
    let y = Math.sin(lon2 - lon1) * Math.cos(lat2);
    let x = (Math.cos(lat1) * Math.sin(lat2)) -
      (Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1));
    let rtnval = Math.atan2(y, x) * (180.0 / Math.PI);
    return (rtnval + 360.0) % 360.0;
  }

  /**
   * Calculates the geodetic speed.
   * @param {CGeodeticEvent} p The secondary point to determine speed.
   * @returns {number} The speed in meters per second.
   */
   calculate_speed(p) {
    let dist_meters = this.calculate_distance(p);
    let time_s = (p.timestamp().getMilliseconds() -
                  this.timestamp().getMilliseconds()) / 1000.0;
    return dist_meters / time_s;
  }

  /**
   * Updates the currently held data with the newest iteration of the data
   * set.
   * @param {DeviceOrientationEvent | GeolocationCoordinates} data  The data
   * to update with. Data not of a matching type is ignored.
   * @returns {void}
   */
  update(data) {
    let now = new Date();
    // @ts-ignore DeviceOrientationEvent part of browser runtime.
    if (data instanceof DeviceOrientationEvent) {
      this.#timestamp = now;
      // @ts-ignore data will have specified property
      this.#alpha = data.alpha;
      // @ts-ignore data will have specified property
      this.#beta = data.beta;
      // @ts-ignore data will have specified property
      this.#gamma = data.gamma;
    // @ts-ignore GeolocationCoordinates part of browser runtime.
    } else if (data instanceof GeolocationCoordinates) {
      this.#timestamp = now;
      // @ts-ignore data will have specified property
      this.#heading = data.heading;
      // @ts-ignore data will have specified property
      this.#speed = data.speed;
      // @ts-ignore data will have specified property
      this.#latitude = data.latitude;
      // @ts-ignore data will have specified property
      this.#longitude = data.longitude;
      // @ts-ignore data will have specified property
      this.#altitude = data.altitude;
    }
  }

  /**
   * Constructor for the class.
   * @param {object} params The named parameters
   * @param {number} [params.code] The error code detected
   * @param {string} [params.message] Message associated with the error.
   */
  constructor({code, message} = {}) {
    try {
      if (code && message) {
        json_check_type({type: "number", data: code, should_throw: true});
        json_check_type({type: "string", data: message, should_throw: true});
        this.#code = code;
        this.#message = message;
      } else {
        this.#code = null;
        this.#message = null;
      }
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError("CGeodeticError construction error.", err);
    }
  }
}

/**
 * @private
 * Represents the data to send to a connected {@link PROTOCOL_TYPE}
 * SerialPort protocol. Supports raising High / Low signals, writing bytes,
 * and requesting a read of the current data available on the port and the
 * current signal status.
 */
export class CSerialPortData {
  /** @type {string} */
  #request;
  /** @type {boolean | Uint8Array | null} */
  #data;

  /**
   * Signals to set the BREAK signal on the serial port.
   * @type {string}
   */
  static get BREAK() { return "break"; }

  /**
   * Signals to write a series of bytes to the serial port.
   * @type {string}
   */
  static get DATA_BYTES() { return "data_bytes_write"; }

  /**
   * Signals to set the DATA_TERMINAL_READY signal on the serial port.
   * @type {string}
   */
  static get DATA_TERMINAL_READY() { return "dataTerminalReady"; }

  /**
   * Signals to set the REQUEST_TO_SEND signal on the serial port.
   * @type {string}
   */
  static get REQUEST_TO_SEND() { return "requestToSend"; }

  /**
   * Signals to query the serial port for the latest signals and any
   * available byte data on the line.
   * @type {string}
   */
  static get QUERY_DATA() { return "query_data"; }

  /**
   * The data associated with the given request.
   * @returns {boolean | Uint8Array | null}
   */
  data() { return this.#data; }

  /**
   * Identifies the request being made of the serial port.
   * @returns {string}
   */
  request() { return this.#request; }

  /**
   * Constructs a request for a {@link protocol_post_message} to an open
   * serial port protocol.
   * @param {object} params The named parameters
   * @param {string} params.request One of the request associated with this
   * object.
   * @param {boolean | Uint8Array} [params.data] The data associated with the
   * request. May only be not specified when just performing a QUERY_DATA
   * request.
   */
  constructor({request, data}) {
    try {
      if (request === CSerialPortData.BREAK ||
          request === CSerialPortData.DATA_TERMINAL_READY ||
          request === CSerialPortData.REQUEST_TO_SEND) {
        json_check_type({type: "boolean", data: data, should_throw: true});
        this.#request = request;
        // @ts-ignore json_check_type handle checking for valid boolean.
        this.#data = data;
      } else if (request === CSerialPortData.REQUEST_TO_SEND) {
        json_check_type({type: Uint8Array, data: data, should_throw: true});
        this.#request = request;
        // @ts-ignore json_check_type handle checking for valid boolean.
        this.#data = data;
      } else if (request === CSerialPortData.QUERY_DATA) {
        this.#request = request;
        this.#data = null;
      } else {
        throw new CModuleError(CModuleError.MISUSE);
      }
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError("CSerialPortData construction error.", err);
    }
  }
}

/**
 * @private
 */
export class CSerialPortEvent {

}

// /**
//  * The SerialPort interface of the Web Serial API provides access to a
//  * serial port on the host device.
//  * @typedef {object} SerialPort
//  * @property {boolean} connected Returns a boolean value that indicates
//  * whether the port is logically connected to the device.
//  * @property {ReadableStream} readable Returns a ReadableStream for
//  * receiving data from the device connected to the port.
//  * @property {WritableStream} writable Returns a WritableStream for sending
//  * data to the device connected to the port.
//  * @property {function} forget Returns a Promise that resolves when access
//  * to the serial port is revoked. Calling this "forgets" the device,
//  * resetting any previously-set permissions so the calling site can no
//  * longer communicate with the port.
//  * @property {function} getInfo Returns an object containing identifying
//  * information for the device available via the port.
//  * @property {function} open Returns a Promise that resolves when the port
//  * is opened. By default the port is opened with 8 data bits, 1 stop bit
//  * and no parity checking.
//  * @property {function} setSignals Sets control signals on the port and
//  * returns a Promise that resolves when they are set.
//  * @property {function} getSignals Returns a Promise that resolves with an
//  * object containing the current state of the port's control signals.
//  * @property {function} close Returns a Promise that resolves when the port
//  * closes.
//  */

// /**
//  * Provides the support to the {@link CSerialPortProtocol.post_message} serial
//  * port communications.
//  * @enum {string}
//  * @property {string} Break Sends a break signal (boolean) to the port.
//  * @property {string} CarrierDetect Line control status of the port reported
//  * as { carrier_detect: boolean }
//  * @property {string} ClearToSend Line control status of the port reported
//  * as { clear_to_send: boolean }
//  * @property {string} DataBytesRead Read data from the serial port reported
//  * as { data_bytes_read: Uint8Array }
//  * @property {string} DataBytesWrite Writes data to the serial port.
//  * @property {string} DataSetReady Line control status of the port reported
//  * as { data_set_ready: boolean }
//  * @property {string} DataTerminalReady Sends a data terminal ready
//  * (boolean) signal to the port.
//  * @property {string} RequestToSend Sends a request to send signal
//  * (boolean) to the port.
//  * @property {string} RingIndicator Line control status of the port reported
//  * as { ring_indicator: boolean }
//  */
// export const SERIAL_PORT_DATA_REQUEST = Object.freeze({
//   Break: "break",
//   CarrierDetect: "carrier_detect",
//   ClearToSend: "clear_to_send",
//   DataBytesRead: "data_bytes_read",
//   DataBytesWrite: "data_bytes_write",
//   DataSetReady: "data_set_ready",
//   DataTerminalReady: "data_terminal_ready",
//   RequestToSend: "request_to_send",
//   RingIndicator: "ring_indicator",
// });

// [PROTOCOL IMPLEMENTATION] --------------------------------------------------

/**
 * <mark>UNDER DEVELOPMENT</mark>
 * @private
 * @template T
 * @extends {CProtocol<T>}
 */
class CBluetoothProtocol extends CProtocol {

}

/**
 * @private
 * <mark>UNDER DEVELOPMENT</mark>
 * @template T
 * @extends {CProtocol<T>}
 */
class CMidiProtocol extends CProtocol {

}

/**
 * @private
 * Creates the ability to get a devices geodetic orientation
 * (GPS location, 3D orientation).
 * @extends {CProtocol<CGeodeticEvent>}
 */
export class COrientationProtocol extends CProtocol {
  /** @type {boolean} */
  static #is_created = false;
  /** @type {CGeodeticEvent} */
  #data = new CGeodeticEvent();
  /** @type {CEventHandler} */
  #on_device_orientation;
  /** @type {number} */
  #watch_id;

  /**
   * @inheritdoc
   * @override
   */
  terminate() {
    try {
      // @ts-ignore Object exists in browser runtime.
      globalThis.navigator.geolocation.clearWatch(this.#watch_id);
      this.#watch_id = -1;
      // @ts-ignore Object exists in browser runtime.
      globalThis.removeEventListener(
        "deviceorientation",
        this.#on_device_orientation
      );
      COrientationProtocol.#is_created = false;
    } catch (err) {
      CModuleError.handle_error(err);
      this.report({
        event_fired: PROTOCOL_EVENT.ModuleError,
        data: err
      });
    }
  }

  /**
   * Constructor for the protocol.
   * @param {object} params The named parameters.
   * @param {string} params.name The name to give to the protocol.
   * @param {object} [params.options={}] Options specific to the protocol.
   * @param {CProtocolEventHandler<CGeodeticEvent>} params.rx_handler The
   * handler to receive data.
   */
  constructor({name, options={}, rx_handler}) {
    super({
      name: name,
      type: PROTOCOL_TYPE.Orientation,
      rx_handler: rx_handler,
    });
    try {
      if (COrientationProtocol.#is_created) {
        throw new CModuleError(
          `${CModuleError.MISUSE}: only one COrientationProtocol can exist`
        );
      }
      if (!runtime_available({request: AVAILABILITY_REQUEST.Orientation})) {
        throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
      }
      json_check_type({type: "object", data: options, should_throw: true});
      // @ts-ignore Object exists in browser runtime.
      this.#on_device_orientation =
        (/** @type {DeviceOrientationEvent} */ evt) => {
          this.#data.update(evt);
          this.report({
            event_fired: PROTOCOL_EVENT.Message,
            data: Object.assign({}, this.#data)
          });
      };
      // @ts-ignore Object exists in browser runtime.
      globalThis.addEventListener(
        "deviceorientation",
        this.#on_device_orientation
      );
      // @ts-ignore Property exists in browser runtime.
      this.#watch_id = globalThis.navigator.geolocation.watchPosition(
        // @ts-ignore This will work in Browser runtime.
        (/** @type {GeolocationPosition} */ evt) => {
          this.#data.update(evt.coords);
          this.report({
            event_fired: PROTOCOL_EVENT.Message,
            data: Object.assign({}, this.#data)
          });
        },
        // @ts-ignore This will work in Browser runtime.
        (/** @type {GeolocationPositionError} */evt) => {
          this.report({
            event_fired: PROTOCOL_EVENT.Error,
            data: new CGeodeticEvent({code: evt.code, message: evt.message})
          });
        },
        options
      );
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError("COrientationProtocol construction error.", err);
    }
  }
}

// /**
//  * Creates a protocol allowing communication with an attached serial port
//  * device. Provides the ability to interact with the device setting signals
//  * data, and querying the current line status of the port. This is all
//  * handled via the {@link SERIAL_PORT_DATA_REQUEST} via
//  * the post_message() call.
//  * @private
//  * @extends {CProtocol}
//  */
// class CSerialPortProtocol extends CProtocol {
//   /** @type {SerialPort} */
//   #port;

//   /**
//    * Carries out either a request for data from an open serial port or to send
//    * data to that open port.
//    * @override
//    * @param {object} params The named parameters.
//    * @param {SERIAL_PORT_DATA_REQUEST} params.request The request to make of the
//    * protocol.
//    * @param {any} [params.data] Any data associated with the given request.
//    * @returns {Promise<void>}
//    */
//   async post_message({request, data}) {
//     try {
//       let resp = null;
//       switch (request) {
//         case SERIAL_PORT_DATA_REQUEST.Break:
//           json_check_type({
//             type: "boolean",
//             data: data,
//             should_throw: true
//           });
//           await this.#port.setSignals("break", data);
//           break;
//         case SERIAL_PORT_DATA_REQUEST.CarrierDetect:
//           resp = await this.#port.getSignals();
//           this.on_data_rx({
//             state: PROTOCOL_EVENT.Message,
//             value: {carrier_detect: resp["carrierDetect"]}
//           });
//           break;
//         case SERIAL_PORT_DATA_REQUEST.ClearToSend:
//           resp = await this.#port.getSignals();
//           this.on_data_rx({
//             state: PROTOCOL_EVENT.Message,
//             value: {clear_to_send: resp["clearToSend"]}
//           });
//           break;
//         case SERIAL_PORT_DATA_REQUEST.DataBytesRead:
//           if (!this.#port.readable) {
//             this.on_data_rx({
//               state: PROTOCOL_EVENT.Message,
//               value: {data_bytes_read: new Uint8Array()}
//             });
//           }
//           const reader = this.#port.readable.getReader();
//           // @ts-ignore This will exist in the browser runtime.
//           const { value, done } = await reader.read();
//           reader.releaseLock();
//           this.on_data_rx({
//             state: PROTOCOL_EVENT.Message,
//             value: {data_bytes_read: value}
//           });
//           break;
//         case SERIAL_PORT_DATA_REQUEST.DataBytesWrite:
//           json_check_type({
//             type: Uint8Array,
//             data: data,
//             should_throw: true
//           });
//           const writer = this.#port.writable.getWriter();
//           await writer.write(data);
//           writer.releaseLock();
//           break;
//         case SERIAL_PORT_DATA_REQUEST.DataSetReady:
//           resp = await this.#port.getSignals();
//           this.on_data_rx({
//             state: PROTOCOL_EVENT.Message,
//             value: {data_set_ready: resp["dataSetReady"]}
//           });
//           break;
//         case SERIAL_PORT_DATA_REQUEST.DataTerminalReady:
//           json_check_type({
//             type: "boolean",
//             data: data,
//             should_throw: true
//           });
//           await this.#port.setSignals("dataTerminalReady", data);
//           break;
//         case SERIAL_PORT_DATA_REQUEST.RequestToSend:
//           json_check_type({
//             type: "boolean",
//             data: data,
//             should_throw: true
//           });
//           await this.#port.setSignals("requestToSend", data);
//           break;
//         case SERIAL_PORT_DATA_REQUEST.RingIndicator:
//           resp = await this.#port.getSignals();
//           this.on_data_rx({
//             state: PROTOCOL_EVENT.Message,
//             value: {ring_indicator: resp["ringIndicator"]}
//           });
//           break;
//         default:
//           throw new CModuleError(CModuleError.MISUSE);
//       }
//     } catch (err) {
//       CModuleError.handle_error(err);
//       this.report({
//         event_fired: PROTOCOL_EVENT.ModuleError,
//         data: err
//       });
//     }
//   }

//   /**
//    * @inheritdoc
//    * @override
//    */
//   terminate() {
//     try {
//       this.#port.close();
//     } catch (err) {
//       CModuleError.handle_error(err);
//       this.report({
//         event_fired: PROTOCOL_EVENT.ModuleError,
//         data: err
//       });
//     }
//   }

//   /**
//    * Constructor for the protocol.
//    * @param {object} params The named parameters.
//    * @param {CProtocolEventHandler} params.rx_handler  The receive handler
//    * for data from the protocol.
//    * @param {SerialPort} params.port The physical serial port opened by the
//    * protocol.
//    */
//   constructor({rx_handler, port}) {
//     super({
//       id: `CSerialPortProtocol_${port.getInfo().usbVendorId}` +
//       `_${[port.getInfo().usbProductId]}`,
//       rx_handler: rx_handler,
//       type: PROTOCOL_TYPE.SerialPort
//     });
//     try {
//       if (!is_defined({property: "serial",
//                                    obj: globalThis["navigator"]})) {
//         throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
//       }
//       // @ts-ignore SerialPort exists as a type in Browser context.
//       json_check_type({type: SerialPort, data: port, should_throw: true});
//       this.#port = port;
//     } catch (err) {
//       CModuleError.handle_error(err);
//       throw new CModuleError(
//         "CSerialPortProtocol construction error.",
//         err
//       );
//     }
//   }
// }

/**
 * <mark>UNDER DEVELOPMENT</mark>
 * @private
 * @template T
 * @extends {CProtocol<T>}
 */
class CUsbProtocol extends CProtocol {

}

// [PUBLIC API] ---------------------------------------------------------------



// ============================================================================
// [JSON USE CASE] ============================================================
// ============================================================================

/**
 * Decodes a string of data which has been encoded using Base64 encoding.
 * @param {string} data Base64 encoded string.
 * @returns {string | null} The decoded string or null if the encoding
 * failed.
 * @example
 * // Encode base64
 * let encoded = json_btoa("Hello World!");
 * // Decode base64
 * let decoded = json_atob(encoded);
 */
export function json_atob(data) {
  try {
    json_check_type({type: "string", data: data, should_throw: true});
    return globalThis.atob(data);
  } catch (err) {
    if (err instanceof CModuleError) {
      CModuleError.handle_error(err);
      throw new CModuleError("json_atob() error.", err);
    }
    return null;
  }
}

/**
 * Creates a Base64-encoded ASCII string from a binary string (i.e. a
 * string in which each character in the string is treated as a byte of
 * binary data).
 * @param {string} data The binary string.
 * @returns {string | null} The base64 encoded string or null if the
 * encoding failed.
 * @example
 * // Encode base64
 * let encoded = json_btoa("Hello World!");
 * // Decode base64
 * let decoded = json_atob(encoded);
 */
export function json_btoa(data) {
  try {
    json_check_type({type: "string", data: data, should_throw: true});
    return globalThis.btoa(data);
  } catch (err) {
    if (err instanceof CModuleError) {
      CModuleError.handle_error(err);
      throw new CModuleError("json_btoa() error.", err);
    }
    return null;
  }
}

/**
 * Utility to check parameters of a function to ensure they are of an
 * expected type.
 * @param {object} params The named parameters
 * @param {string | any} params.type
 * @param {any} params.data The parameter to be checked.
 * @param {number} [params.count] Checks the v parameter function
 * signature to ensure the appropriate number of parameters are specified.
 * @param {boolean} [params.should_throw=false] Whether to throw instead of
 * returning a value upon failure.
 * @returns {boolean} true if it meets the expectations, false otherwise.
 * @example
 * // Check if data is an expected type
 * let is_expected = json_check_type({type: "string", data: some_data});
 * if (is_expected) {
 *   // Do your processing
 * }
 *
 * // Throw if not an expected type
 * json_check_type({type: "string", data: some_data, should_throw: true});
 *
 * // Check complex data type
 * let is_expected = json_check_type({
 *   type: Uint8Array,
 *   data: some_data,
 * });
 *
 * // Check callback function follows expectations of 2 parameters.
 * json_check_type({
 *   type: "function",
 *   data: some_callback,
 *   count: 2,
 *   should_throw: true,
 * });
 */
export function json_check_type({
  type,
  data,
  count = undefined,
  should_throw = false
}) {
  try {
    const is_expected_type = typeof type !== "string"
      ? (data instanceof type)
      : typeof data === type;
    let valid = typeof count === "number"
      ? is_expected_type && data.length === count
      : is_expected_type;
    if (should_throw && !valid) {
      throw new CModuleError(CModuleError.TYPE_VIOLATION);
    }
    return valid;
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("json_check_type() error.", err);
  }
}

/**
 * Creates a JavaScript compliant JSON array with ability to copy data
 * from a previous array.
 * @param {any[]} [data] An optional array of data to copy
 * @returns {any[]} The newly created array with optional data.
 * @example
 * // To create an empty array
 * let array = json_create_array();
 *
 * // To make a copy of an array
 * let array_copy = json_create_array(array);
 */
export function json_create_array(data) {
  if (json_check_type({type: Array, data: data})) {
    let stringified = json_stringify(data);
    if (stringified) {
      return json_parse(stringified) ?? [];
    }
  }
  return [];
}

/**
 * Creates a JavaScript compliant JSON object with ability to copy data
 * from a previous array.
 * @param {object} [data] An optional object of data to copy
 * @returns {object} The newly created object with optional data.
 * @example
 * // To create an empty object
 * let obj = json_create_array();
 *
 * // To make a copy of an object
 * let obj_copy = json_create_array(obj);
 */
export function json_create_object(data) {
  if (json_check_type({type: "object", data})) {
    return Object.assign({}, data);
  }
  return {};
}

/**
 * Determines if the specified object has the specified property.
 * @param {object} params
 * @param {object} params.obj The object to check.
 * @param {string} params.key The property to find.
 * @param {boolean} [params.should_throw=false] Whether to throw instead
 * of returning a value upon failure.
 * @returns {boolean} true if property was found, false otherwise.
 * @example
 * // Check if object has field
 * if (json_has_key({obj: obj, key: "id"})) {
 *   // Do your processing
 * }
 *
 * // Throw if not expected
 * json_has_key({obj: obj, key: "id", should_throw: true});
 */
export function json_has_key({obj, key, should_throw = false}) {
  try {
    json_check_type({type: "object", data: obj, should_throw: true});
    json_check_type({type: "string", data: key, should_throw: true});
    var has_key = key in obj;
    if (should_throw && !has_key) {
      throw new CModuleError(CModuleError.TYPE_VIOLATION);
    }
    return has_key;
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("json_has_key() error.", err);
  }
}

/**
 * Determines if the specified object has the specified value
 * @param {object} params
 * @param {object} params.obj The object to check.
 * @param {string} params.value The value to find.
 * @param {boolean} [params.should_throw=false] Whether to throw instead
 * of returning a value upon failure.
 * @returns {boolean} true if property was found, false otherwise.
 * @example
 * // Check if object has field
 * if (json_has_value({obj: obj, value: "id"})) {
 *   // Do your processing
 * }
 *
 * // Throw if not expected
 * json_has_value({obj: obj, value: "id", should_throw: true});
 */
export function json_has_value({obj, value, should_throw = false}) {
  try {
    json_check_type({type: "object", data: obj, should_throw: true});
    json_check_type({type: "string", data: value, should_throw: true});
    const has_value = Object.values(obj).includes(value);
    if (should_throw && !has_value) {
      throw new CModuleError(CModuleError.TYPE_VIOLATION);
    }
    return has_value;
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("json_has_key() error.", err);
  }
}

/**
 * Converts a string to a supported JSON data type.
 * @param {string} data The data to parse.
 * @returns {any | null} The JSON data type or null if the parsing fails.
 * @example
 * // To parse and stringify JSON data or types supported by JSON
 * // Where data is an object, array, boolean, string, number, or null
 * // Invalid data will return as null.
 * let stringified = json_stringify(data);
 * let parsed = json_parse(stringified);
 */
export function json_parse(data) {
  try {
    let parsed = JSON.parse(data);
    return parsed
      ? parsed
      : null;
  } catch (ex) {
    return null;
  }
}

/**
 * Converts a JSON supported data type into a string.
 * @param {any} data The data to convert.
 * @returns {string | null} The string representation or null if the
 * stringify failed.
 * @example
 * // To parse and stringify JSON data or types supported by JSON
 * // Where data is an object, array, boolean, string, number, or null
 * // Invalid data will return as null.
 * let stringified = json_stringify(data);
 * let parsed = json_parse(stringified);
 */
export function json_stringify(data) {
  try {
    let stringified = JSON.stringify(data);
    return stringified
      ? stringified
      : null;
  } catch (ex) {
    return null;
  }
}

// ============================================================================
// [LOGGER USE CASE] ==========================================================
// ============================================================================

// [ENUMS] --------------------------------------------------------------------

/**
 * Holds the logger configuration information for log level and labels for
 * the {@link logger_level} and {@link logger_log} functions.
 *
 * @readonly
 * @enum {object}
 * @property {object} Debug   level (0) / label "DEBUG"
 * @property {object} Info    level (1) / label "INFO"
 * @property {object} Warning level (2) / label "WARNING"
 * @property {object} Error   level (3) / label "ERROR"
 * @property {object} Off     level (4) / label "OFF"
 */
export const LOGGER = Object.freeze({
  Debug:   { level: 0, label: "DEBUG"   },
  Info:    { level: 1, label: "INFO"    },
  Warning: { level: 2, label: "WARNING" },
  Error:   { level: 3, label: "ERROR"   },
  Off:     { level: 4, label: "OFF"     },
});

// [DATA DEFINITION] ----------------------------------------------------------

/**
 * @callback CLogHandler A log handler for further processing of a logged
 * event.
 * @param {CLogRecord} record The record logged.
 * @returns {void}
 */

/**
 * The log record processed via the {@link CLogHandler} post logging event.
 */
export class CLogRecord {
  /** @type {Date} */
  #time = new Date();
  /** @type {LOGGER} */
  #level;
  /** @type {any} */
  #data = undefined;

  /**
   * The time the logged event was created.
   * @returns {Date}
   */
  time() { return this.#time; }

  /**
   * The object representation of the log level.
   * @returns {LOGGER}
   */
  level() { return this.#level; }

  /**
   * The data associated with the log event.
   * @returns {any}
   */
  data() { return this.#data; }

  /**
   * Constructor for the class.
   * @param {object} params The named parameters.
   * @param {LOGGER} params.level object information.
   * @param {any} params.data The data to log.
   */
  constructor({level, data}) {
    try {
      json_check_type({type: "object", data: level, should_throw: true});
      json_has_key({obj: level, key: "level", should_throw: true});
      json_has_key({obj: level, key: "label", should_throw: true});
      this.#level = level;
      this.#data = data;
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError("CLogRecord construction error.", err);
    }
  }
}

// [PUBLIC API] ---------------------------------------------------------------

/**
 * Holds the current log level of the module
 * @private
 * @type {LOGGER}
 */
let _logger_level = LOGGER.Error;

/**
 * Holds the logger handler for post logging events.
 * @private
 * @type {CLogHandler?}
 */
let _logger_handler = null;

/**
 * Sets the logger handler for post logging processing.
 * @param {CLogHandler} [handler] The handler to utilize.
 * @returns {void}
 * @example
 * // To set a logger for post logging processing
 * function log_handler(record) {
 *   // Do something with the log record.
 * }
 * logger_handler(log_handler);
 *
 * // To unset it
 * logger_handler();
 */
export function logger_handler(handler) {
  try {
    if (handler === null || handler === undefined) {
      _logger_handler = null;
    } else {
      json_check_type({
        type: "function",
        data: handler,
        count: 1,
        should_throw: true
      });
      _logger_handler = handler;
    }
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("logger_handler() error.", err);
  }
}

/**
 * Sets / retrieves the current module log level.
 * @param {object | undefined} [level] The optional log level to set
 * based on the {@link LOGGER} object configuration.
 * @returns {string} The string representation of the log level.
 * @example
 * // To determine the current logger level
 * let logger_level = logger_level();
 *
 * // To set the module logger level
 * logger_level(LOGGER.info);
 *
 * // To turn off all logging
 * logger_level(LOGGER.Off);
 */
export function logger_level(level) {
  try {
    if (level) {
      json_check_type({type: "object", data: level, should_throw: true});
      json_has_key({obj: level, key: "level", should_throw: true});
      json_has_key({obj: level, key: "label", should_throw: true});
      _logger_level = level;
    }
    // @ts-ignore Property exists on the struct.
    return _logger_level.label;
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("logger_level() error.", err);
  }
}

/**
 * Logs an event with the module logger.
 * @param {object} params The named parameters.
 * @param {LOGGER} params.level The log level for the logged event.
 * @param {any} params.data The data to log with the event.
 * @returns {void}
 * @example
 * // When the logger is on and you want to log an event
 * // It will only log if the log level is set to log those events.
 * logger_log({level: Logger.Warning, data: "A thing happened"});
 */
export function logger_log({level, data}) {
  try {
    json_check_type({type: "object", data: level, should_throw: true});
    json_has_key({obj: level, key: "level", should_throw: true});
    json_has_key({obj: level, key: "label", should_throw: true});
    if (!data) {
      throw new CModuleError(CModuleError.TYPE_VIOLATION);
    }

    // Check to see if our logging is on or off.
    // @ts-ignore Property exists on the struct.
    if (_logger_level.label == "OFF") {
      return;
    }

    // It's on, go create the log record and go log some stuff.
    const record = new CLogRecord({level: level, data: data});
    // @ts-ignore Property exists on the struct.
    if (record.level().level >= _logger_level.level) {
      // @ts-ignore Property exists on the struct.
      switch (record.level().label) {
        case "DEBUG":
        case "INFO":
          console.log(
            record.time().toISOString(),
            // @ts-ignore Property exists on the struct.
            record.level().label,
            record.data()
          );
        case "WARNING":
          console.warn(
            record.time().toISOString(),
            // @ts-ignore Property exists on the struct.
            record.level().label,
            record.data()
          );
          break;
        case "ERROR":
          console.error(
            record.time().toISOString(),
            // @ts-ignore Property exists on the struct.
            record.level().label,
            record.data()
          );
          break;
      }

      if (_logger_handler) {
        _logger_handler(record);
      }
    }
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("logger_log() error.", err);
  }
}

// ============================================================================
// [NETWORK USE CASE] =========================================================
// ============================================================================

// [DATA DEFINITION] ----------------------------------------------------------

/**
 * @private
 * Identifies event handled by the {@link PROTOCOL_TYPE.BroadcastChannel}
 * protocol.
 */
export class CBroadcastChannelEvent {
  /** @type {MessageEvent} */
  #event
  /** @type {boolean} */
  #is_error;

  /**
   * The message event received by the protocol.
   * @returns {MessageEvent}
   */
  event() { return this.#event; }

  /**
   * Indicates whether the wrapped MessageEvent is an error or not.
   * @returns {boolean}
   */
  is_error() { return this.#is_error; }

  /**
   * Constructor for the object.
   * @param {object} params The named parameters.
   * @param {MessageEvent} params.event The event received by the protocol.
   * @param {boolean} params.is_error true if the MessageEvent was
   * associated with an error, false otherwise.
   */
  constructor({event, is_error}) {
    try {
      json_check_type({type: MessageEvent, data: event, should_throw: true});
      json_check_type({type: "boolean", data: is_error, should_throw: true});
      this.#event = event;
      this.#is_error = is_error;
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError(
        "CBroadcastChannelEvent construction error.", err
      );
    }
  }
}

/**
 * @private
 * Identifies event handled by the {@link PROTOCOL_TYPE.EventSource}
 * protocol.
 */
export class CEventSourceEvent {
  /** @type {Event | MessageEvent} */
  #event;
  /** @type {boolean} */
  #is_error;
  /** @type {number} */
  #ready_state;

  /**
   * Signals the ready_state() is in a connecting state.
   * @readonly
   * @type {number}
   */
  static get CONNECTING() { return 0; }

  /**
   * Signals the ready_state() is in a connecting state.
   * @readonly
   * @type {number}
   */
  static get OPEN() { return 1; }

  /**
   * Signals the ready_state() is in a connecting state.
   * @readonly
   * @type {number}
   */
  static get CLOSED() { return 2; }

  /**
   * Treats the wrapped event as a message event.
   * @returns {MessageEvent?}
   */
  as_message_event() {
    return this.#event instanceof MessageEvent
      ? this.#event
      : null;
  }

  /**
   * The event captured by the protocol.
   * @returns {Event | MessageEvent}
   */
  event() { return this.#event; }

  /**
   * Indicates if the event captured was an error.
   * @returns {boolean}
   */
  is_error() { return this.#is_error; }

  /**
   * The current state of the protocol.
   * @returns {number}
   */
  ready_state() { return this.#ready_state; }

  /**
   * Constructor for the class.
   * @param {object} params The named parameters
   * @param {Event | MessageEvent} params.event The event handled by the
   * protocol.
   * @param {boolean} params.is_error true if it was an error event,
   * false otherwise.
   * @param {number} params.ready_state The current state of the protocol.
   */
  constructor({event, is_error, ready_state}) {
    try {
      if (!json_check_type({type: MessageEvent, data: event}) &&
          !json_check_type({type: Event, data: event})) {
        throw new CModuleError(CModuleError.TYPE_VIOLATION);
      }
      json_check_type({type: "boolean", data: is_error, should_throw: true});
      json_check_type({
        type: "number",
        data: ready_state,
        should_throw: true
      });
      this.#event = event;
      this.#is_error = is_error;
      this.#ready_state = ready_state;
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError(
        "CEventSourceEvent construction error.", err
      );
    }
  }
}

/**
 * @private
 * The result of a  {@link network_fetch} call containing any data from the
 * call along with the HTTP Status Code  of the transaction.
 */
export class CFetchResult {
  /** @type {number} */
  #status = -1;
  /** @type {any} */
  #data;

  /**
   * Will get the data if it is a Uint8Array or null if not that object
   * type.
   * @returns {Uint8Array?}
   */
  as_binary() {
    return json_check_type({type: Uint8Array, data: this.#data})
        ? this.#data
        : null;
  }

  /**
   * Will get the data if it is a Blob or null if not that object type.
   * @returns {Blob?}
   */
  as_blob() {
    return json_check_type({type: Blob, data: this.#data})
      ? this.#data
      : null;
  }

  /**
   * Will get the value if it is a FormData or null if not that object
   * type.
   * @returns {FormData?}
   */
  as_form_data() {
    return json_check_type({type: FormData, data: this.#data})
      ? this.#data
      : null;
  }

  /**
   * Will get the value if it is a Object or null if not that object
   * type.
   * @returns {object?}
   */
  as_object() {
    return json_check_type({type: "object", data: this.#data})
      ? this.#data
      : null;
  }

  /**
   * Will get the value if it is a string or null if not that object
   * type.
   * @returns {string?}
   */
  as_string() {
    return json_check_type({type: "string", data: this.#data})
      ? this.#data
      : null;
  }

  /**
   * The HTTP Status Code
   * @returns {number}
   */
  status() { return this.#status; }

  /**
   * Constructor for the class.
   * @param {object} params The named parameters.
   * @param {number} params.status The HTTP status code of the fetch request.
   * @param {any} [params.data] Any data associated with the request.
   * @param {any} [params.error] Any captured errors as a result of the
   * request.
   */
  constructor({status, data=null}) {
    try {
      json_check_type({type: "number", data: status, should_throw: true});
      this.#status = status;
      this.#data = data;
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError("CFetchResult construction error.", err);
    }
  }
}

/**
 * @private
 * Represents the data to send to a connected web socket to a server. Supports
 * the {@link PROTOCOL_TYPE} WebSocket protocol.
 */
export class CWebSocketData {
  /** @type {"arraybuffer" | "blob"} */
  #binary_type;
  /** @type {ArrayBuffer | Blob | string} */
  #data;

  /**
   * Identifies the web sockets primary transmission type across the web
   * socket.
   * @returns {"arraybuffer" | "blob"}
   */
  binary_type() { return this.#binary_type; }

  /**
   * The data to transmit
   * @returns {ArrayBuffer | Blob | string}
   */
  data() { return this.#data; }

  /**
   * Constructor for the data to send to a web socket.
   * @param {object} params The named parameters
   * @param {ArrayBuffer | Blob | string} params.data The data to send to
   * the server.
   * @param {"arraybuffer" | "blob"} [params.binary_type="blob"] How to
   * configure the socket when sending / receiving the data.
   */
  constructor({data, binary_type="blob"}) {
    try {
      if (!json_check_type({type: ArrayBuffer, data: data}) &&
          !json_check_type({type: Blob, data: data}) &&
          !json_check_type({type: "string", data: data})) {
        throw new CModuleError(CModuleError.TYPE_VIOLATION);
      }
      json_check_type({type: "string", data: binary_type, should_throw: true});
      this.#data = data;
      this.#binary_type = binary_type;
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError("CWebSocketData construction error.", err);
    }
  }
}

/**
 * @private
 * Represents a firing timer for an open {@link PROTOCOL_TYPE} WebSocket.
 */
export class CWebSocketEvent {
  /** @type {number} */
  #buffered_amount;
  /** @type {CloseEvent | Event | MessageEvent} */
  #event;
  /** @type {boolean} */
  #is_error;
  /** @type {number} */
  #ready_state;
  /** @type {string} */
  #url;

  /**
   * Signals the ready_state() is in a connecting state.
   * @readonly
   * @type {number}
   */
  static get CONNECTING() { return 0; }

  /**
   * Signals the ready_state() is in a connecting state.
   * @readonly
   * @type {number}
   */
  static get OPEN() { return 1; }

  /**
   * Signals the ready_state() is in a closing state.
   * @readonly
   * @type {number}
   */
  static get CLOSING() { return 2; }

  /**
   * Signals the ready_state() is in a closed state.
   * @readonly
   * @type {number}
   */
  static get CLOSED() { return 3; }

  /**
   * Treats the captured event as a close event.
   * @returns {CloseEvent?}
   */
  as_close_event() {
    return this.#event instanceof CloseEvent
      ? this.#event
      : null;
  }

  /**
   * Treats the captured event as a message event.
   * @returns {MessageEvent?}
   */
  as_message_event() {
    return this.#event instanceof MessageEvent
      ? this.#event
      : null;
  }

  /**
   * The buffered amount of data to send to the server protocol.
   * @returns {number}
   */
  buffered_amount() { return this.#buffered_amount; }

  /**
   * The event captured by the protocol.
   * @returns {CloseEvent | Event | MessageEvent}
   */
  event() { return this.#event; }

  /**
   * Indicates if the event captured was an error.
   * @returns {boolean}
   */
  is_error() { return this.#is_error; }

  /**
   * The current state of the protocol.
   * @returns {number}
   */
  ready_state() { return this.#ready_state; }

  /**
   * The URL of the server.
   * @returns {string}
   */
  url() { return this.#url; }

  /**
   * Constructor for the class.
   * @param {object} params The named parameters
   * @param {number} params.buffered_amount The amount of data queued to be
   * transmitted to the server.
   * @param {Event | MessageEvent} params.event The event handled by the
   * protocol.
   * @param {boolean} params.is_error true if it was an error event,
   * false otherwise.
   * @param {number} params.ready_state The current state of the protocol.
   * @param {string} params.url The url of the server the protocol is
   * connected.
   */
  constructor({buffered_amount, event, is_error, ready_state, url}) {
    try {
      if (!json_check_type({type: MessageEvent, data: event}) &&
          !json_check_type({type: CloseEvent, data: event}) &&
          !json_check_type({type: Event, data: event})) {
        throw new CModuleError(CModuleError.TYPE_VIOLATION);
      }
      json_check_type({
        type: "number",
        data: buffered_amount,
        should_throw: true
      });
      json_check_type({type: "boolean", data: is_error, should_throw: true});
      json_check_type({
        type: "number",
        data: ready_state,
        should_throw: true
      });
      json_check_type({type: "string", data: url, should_throw: true});
      this.#buffered_amount = buffered_amount;
      this.#event = event;
      this.#is_error = is_error;
      this.#ready_state = ready_state;
      this.#url = url;
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError(
        "CWebSocketEvent construction error.", err
      );
    }
  }
}

// [PROTOCOL IMPLEMENTATION] --------------------------------------------------

/**
 * @private
 * This protocol represents a named channel that any browsing context of a
 * given origin can subscribe to. It allows communication between different
 * documents (in different windows, tabs, frames, iframes, or worker) of the
 * same origin.
 * @template T
 * @extends {CProtocol<CBroadcastChannelEvent>}
 */
export class CBroadcastChannelProtocol extends CProtocol {
  /** @type {BroadcastChannel} */
  #channel;

  /**
   * Sends a message, which can be of any kind of Object, to each listener
   * in any browsing context with the same origin. The message is
   * transmitted as a message event targeted at each BroadcastChannel
   * bound to the channel.
   * @override
   * @param {any} [data] The data to broadcast. The data is
   * serialized using the structured clone algorithm. This means you can
   * pass a broad variety of data objects safely to the destination window
   * without having to serialize them yourself.
   * @returns {void}
   */
  post_message(data) {
    try {
      this.#channel.postMessage(data);
    } catch (err) {
      CModuleError.handle_error(err);
      this.report({
        event_fired: PROTOCOL_EVENT.ModuleError,
        data: err
      });
    }
  }

  /**
   * @inheritdoc
   * @override
   */
  terminate() {
    try {
      this.#channel.close();
    } catch (err) {
      CModuleError.handle_error(err);
      this.report({
        event_fired: PROTOCOL_EVENT.ModuleError,
        data: err
      });
    }
  }

  /**
   * Constructor for the protocol.
   * @param {object} params The named parameters.
   * @param {string} params.name The name to give to the protocol.
   * @param {string} params.url The URL to connect this broadcast channel on.
   * @param {CProtocolEventHandler<CBroadcastChannelEvent>} params.rx_handler
   * The handler to receive data from the protocol.
   */
  constructor({name, rx_handler, url}) {
    super({
      name: name,
      rx_handler: rx_handler,
      type: PROTOCOL_TYPE.BroadcastChannel
    });
    try {
      if (!runtime_available({request: AVAILABILITY_REQUEST.BroadcastChannel})) {
        throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
      }
      this.#channel = new globalThis.BroadcastChannel(url);
      this.#channel.onmessage = (evt) => {
        this.report({
          event_fired: PROTOCOL_EVENT.Message,
          data: new CBroadcastChannelEvent({event: evt, is_error: false})
        });
        evt.preventDefault();
      };
      this.#channel.onmessageerror = (evt) => {
        this.report({
          event_fired: PROTOCOL_EVENT.MessageError,
          data: new CBroadcastChannelEvent({event: evt, is_error: true})
        });
        evt.preventDefault();
      };
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError("CBroadcastChannel construction error.", err);
    }
  }
}

/**
 * @private
 * Opens a persistent connection to an HTTP server, which sends events in
 * text/event-stream format. The connection remains open until terminate is
 * called.
 * @extends {CProtocol<CBroadcastChannelEvent>}
 */
export class CEventSourceProtocol extends CProtocol {
  /** @type {EventSource} */
  #sse

  /**
   * @inheritdoc
   * @override
   */
  terminate() {
    try {
      this.#sse.close();
    } catch (err) {
      CModuleError.handle_error(err);
      this.report({
        event_fired: PROTOCOL_EVENT.ModuleError,
        data: err
      });
    }
  }

  /**
   * Constructor for the protocol.
   * @param {object} params The named parameters.
   * @param {string} params.name The name to give to the protocol.
   * @param {CProtocolEventHandler<CBroadcastChannelEvent>} params.rx_handler
   * The protocol handler to receive those events.
   * @param {string} params.url URL of the server sending the events.
   * @param {boolean} [params.with_credentials=false] True to utilize CORS,
   * false otherwise.
   */
  constructor({name, rx_handler, url, with_credentials=false}) {
    super({
      name: name,
      rx_handler: rx_handler,
      type: PROTOCOL_TYPE.EventSource
    });
    try {
      if (!runtime_available({request: AVAILABILITY_REQUEST.EventSource})) {
        throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
      }
      json_check_type({
        type: "boolean",
        data: with_credentials,
        should_throw: true
      });
      this.#sse = new globalThis.EventSource(
        url,
        {withCredentials: with_credentials}
      );
      this.#sse.onerror = (evt) => {
        this.report({
          event_fired: PROTOCOL_EVENT.Error,
          data: new CEventSourceEvent({
            event: evt,
            is_error: true,
            ready_state: this.#sse.readyState
          })
        });
        evt.preventDefault();
      };
      this.#sse.onmessage = (evt) => {
        this.report({
          event_fired: PROTOCOL_EVENT.Message,
          data: new CEventSourceEvent({
            event: evt,
            is_error: false,
            ready_state: this.#sse.readyState
          })
        });
        evt.preventDefault();
      };
      this.#sse.onopen = (evt) => {
        this.report({
          event_fired: PROTOCOL_EVENT.Open,
          data: new CEventSourceEvent({
            event: evt,
            is_error: false,
            ready_state: this.#sse.readyState
          })
        });
        evt.preventDefault();
      };
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError("CEventSourceProtocol error.", err);
    }
  }
}

/**
 * @private
 * Creates a WebSocket connection to a server allowing a dedicated
 * bi-directional exchange of data. This socket will continuously attempt
 * reconnecting to the server on connection loss until the protocol is
 * terminated. {@link network_connect} creates this protocol.
 * @extends {CProtocol<CWebSocketEvent>}
 */
class CWebSocketProtocol extends CProtocol {
  /** @type {WebSocket} */
  // @ts-ignore The #connect_socket() creates this member field.
  #socket;

  /**
   * Enqueues the specified data to be transmitted to the server over the
   * WebSocket connection, increasing the value of bufferedAmount by the
   * number of bytes needed to contain the data. If the data can't be sent
   * (for example, because it needs to be buffered but the buffer is full),
   * the socket is closed automatically.
   * @override
   * @param {CWebSocketData} data Data to send to the server
   * for further processing.
   * @returns {void}
   */
  post_message(data) {
    try {
      if (this.#socket.readyState == this.#socket.OPEN) {
        this.#socket.binaryType = data.binary_type();
        this.#socket.send(data.data());
      }
    } catch (err) {
      CModuleError.handle_error(err);
      this.report({
        event_fired: PROTOCOL_EVENT.ModuleError,
        data: err
      });
    }
  }

  /**
   * @inheritdoc
   * @override
   */
  terminate() {
    try {
      this.#socket.close();
    } catch (err) {
      CModuleError.handle_error(err);
      this.report({
        event_fired: PROTOCOL_EVENT.ModuleError,
        data: err
      });
    }
  }

  /**
   * Constructor for the protocol.
   * @param {object} params The named parameters.
   * @param {string} params.name The name to give to the protocol.
   * @param {CProtocolEventHandler<CWebSocketEvent>} params.rx_handler The
   * handler for receiving data from this protocol.
   * @param {string} params.url The URL of the server to connect.
   */
  constructor({name, rx_handler, url}) {
    super({
      name: name,
      rx_handler: rx_handler,
      type: PROTOCOL_TYPE.WebSocket
    });
    try {
      if (!runtime_available({request: AVAILABILITY_REQUEST.WebSocket})) {
        throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
      }
      json_check_type({type: "string", data: url, should_throw: true});
      // @ts-ignore URL will not be null.
      this.#socket = new globalThis.WebSocket(url);
      this.#socket.onclose = (evt) => {
        this.report({
          event_fired: PROTOCOL_EVENT.Close,
          data: new CWebSocketEvent({
            buffered_amount: this.#socket.bufferedAmount,
            event: evt,
            is_error: false,
            ready_state: this.#socket.readyState,
            url: this.#socket.url
          })
        });
        evt.preventDefault();
      }
      this.#socket.onerror = (evt) => {
        this.report({
          event_fired: PROTOCOL_EVENT.Error,
          data: new CWebSocketEvent({
            buffered_amount: this.#socket.bufferedAmount,
            event: evt,
            is_error: true,
            ready_state: this.#socket.readyState,
            url: this.#socket.url
          })
        });
        evt.preventDefault();
      }
      this.#socket.onmessage = (evt) => {
        this.report({
          event_fired: PROTOCOL_EVENT.Message,
          data: new CWebSocketEvent({
            buffered_amount: this.#socket.bufferedAmount,
            event: evt,
            is_error: false,
            ready_state: this.#socket.readyState,
            url: this.#socket.url
          })
        });
        evt.preventDefault();
      }
      this.#socket.onopen = (evt) => {
        this.report({
          event_fired: PROTOCOL_EVENT.Open,
          data: new CWebSocketEvent({
            buffered_amount: this.#socket.bufferedAmount,
            event: evt,
            is_error: false,
            ready_state: this.#socket.readyState,
            url: this.#socket.url
          })
        });
        evt.preventDefault();
      }
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError("CWebSocketProtocol construction error.", err);
    }
  }
}

/**
 * <mark>UNDER DEVELOPMENT - DO NOT USE</mark>
 * @private
 * @template T
 * @extends {CProtocol<T>}
 */
class CWebRtcProtocol extends CProtocol {

}

/**
 * <mark>UNDER DEVELOPMENT - DO NOT USE</mark>
 * @private
 * @template T
 * @extends {CProtocol<T>}
 */
class CWebTransportProtocol extends CProtocol {

}

// [PUBLIC API] ---------------------------------------------------------------

/**
 * @private
 * TODO: Attach these to classes....
 */
export function network_query() {
    // case QUERY_REQUEST.Online:
    //   return is_defined({
    //     property: "onLine",
    //     obj: globalThis["navigator"]
    //   })
    //     // @ts-ignore Property exists in a browser runtime.
    //     ? globalThis.navigator.onLine
    //     : false;
    // case QUERY_REQUEST.Hostname:
    //   return is_defined({property: "HTMLElement"})
    //     // @ts-ignore Property exists in a browser runtime.
    //     ? globalThis.location.hostname
    //     : "UNKNOWN";
}

/**
 * @private
 * Sends an HTTP POST request containing a small amount of data to a web
 * server.
 * @param {object} params The named parameters
 * @param {string} params.url Where to send the beacon.
 * @param {any | null} [params.data] The data to send with the beacon.
 * @returns {boolean} true if queued up by user agent, false otherwise.
 * @example
 * // TBD
 */
export function network_beacon({url, data}) {
  try {

    if (!runtime_available({request: AVAILABILITY_REQUEST.Beacon})) {
      throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
    }
    json_check_type({type: "string", data: url, should_throw: true});
    // @ts-ignore Will exist in a browser context.
    return globalThis.navigator.sendBeacon(url, data);
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("network_beacon() error.", err);
  }
}

/**
 * @private
 * Provides the ability to make requests from a hosted server REST API.
 * @param {object} params The named parameters
 * @param {string} params.url The URL to the server REST API to
 * communicate.
 * @param {object} params.options The data to configure / go along with
 * the request. See the attached URL for detailed
 * @returns {Promise<CFetchResult>} The result of the request. A rejected
 * promise is an API violation.
 * @example
 * // TBD
 */
export async function network_fetch({url, options}) {
  try {
    json_check_type({type: "string", data: url, should_throw: true});
    json_check_type({type: "object", data: options, should_throw: true});
    const resp = await globalThis.fetch(url, options);
    const contentType = resp.headers.get("Content-Type") ?? "";
    const status = resp.status;
    const data = contentType.includes("application/json")
      ? await resp.json()
      : contentType.includes("form-data")
        ? await resp.formData()
        : contentType.includes("application/octet-stream")
          ? await resp.blob()
          : contentType.includes("text/")
            ? await resp.text()
            : "";
    return new CFetchResult({status: status, data: data});
  } catch (err) {
    if (json_check_type({type: CModuleError, data: err})) {
      CModuleError.handle_error(err);
      throw new CModuleError("network_connect() error.", err);
    }
    return new CFetchResult({status: -1, data: err});
  }
}

// ============================================================================
// [NPU USE CASE] =============================================================
// ============================================================================

// [ENUMS] --------------------------------------------------------------------

/**
 * The math formula to execute with the {@link npu_math} call.
 * @readonly
 * @enum {string}
 * @property {string} GeodeticDistance
 * Distance in meters between two WGS84 points. The parameters for the
 * formula are start_latitude / start_longitude / end_latitude / end_longitude
 * @property {string} GeodeticHeading
 * Heading in °N true North 0 - 359. The parameters for the
 * formula are start_latitude / start_longitude / end_latitude / end_longitude
 * @property {string} GeodeticSpeed
 * Speed in meters per second between two WGS84 points. The parameters for the
 * formula are start_milliseconds / start_latitude / start_longitude /
 * end_milliseconds / end_latitude / end_longitude
 * @property {string} TemperatureCelsiusToFahrenheit
 * °F = (°C x 9/5) + 32
 * @property {string} TemperatureCelsiusToKelvin
 * °K = °C + 273.15
 * @property {string} TemperatureFahrenheitToCelsius
 * °C = (°F − 32) × 5/9
 * @property {string} TemperatureFahrenheitToKelvin
 * °K = (°F − 32) × 5/9 + 273.15
 * @property {string} TemperatureKelvinToCelsius
 * °C = °K − 273.15
 * @property {string} TemperatureKelvinToFahrenheit
 * °F = (°K − 273.15) × 9/5 + 32
 */
export const MATH_FORMULA = Object.freeze({
  GeodeticDistance: "geodetic_distance",
  GeodeticHeading: "geodetic_heading",
  GeodeticSpeed: "geodetic_speed",
  TemperatureCelsiusToFahrenheit: "temperature_celsius_to_fahrenheit",
  TemperatureCelsiusToKelvin: "temperature_celsius_to_kelvin",
  TemperatureFahrenheitToCelsius: "temperature_fahrenheit_to_celsius",
  TemperatureFahrenheitToKelvin: "temperature_fahrenheit_to_kelvin",
  TemperatureKelvinToCelsius: "temperature_kelvin_to_celsius",
  TemperatureKelvinToFahrenheit: "temperature_kelvin_to_fahrenheit"
});

// [PUBLIC API] ---------------------------------------------------------------

/**
 * @private
 * TO BE IMPLEMENTED
 */
export function npu_compute() {
  throw new CModuleError(CModuleError.NOT_IMPLEMENTED);
}

/**
 * @private
 * TO BE IMPLEMENTED
 */
export function npu_math() {
  throw new CModuleError(CModuleError.NOT_IMPLEMENTED);
}

// ============================================================================
// [RUNTIME USE CASE] =========================================================
// ============================================================================

// [ENUMS] --------------------------------------------------------------------

/**
 * Determines if a particular object, function, or feature is available
 * within the current runtime supporting the {@link runtime_available}
 * function.
 * @readonly
 * @enum {string}
 * @property {string} AskRuntime When performing a search for a specific
 * definition on a particular object or globalThis namespace.
 * @property {string} Audio Determines if audio is available in the
 * runtime.
 * @property {string} Beacon Determines if the network_beacon is available
 * to the runtime.
 * @property {string} BroadcastChannel Determines if a BroadcastChannel
 * protocol is available.
 * @property {string} Browser Determine if the runtime is a Web Browser.
 * @property {string} Bun Determines if the runtime is Bun.
 * @property {string} Bluetooth Determines if bluetooth is available.
 * @property {string} Deno Determines if the runtime is Deno.
 * @property {string} CookieStore Determines if cookie store is
 * available to the runtime.
 * @property {string} EventSource Determines if an EventSource protocol
 * is available.
 * @property {string} IFrame Determines if a web site is running under
 * an iframe or not.
 * @property {string} LocalStorage Determines if local storage is
 * available to the runtime.
 * @property {string} Midi Determines if MIDI devices are available.
 * @property {string} Node Determines if the runtime is Node.
 * @property {string} Open Determines if ui_open is available to the
 * runtime.
 * @property {string} Orientation Determines if Orientation is available
 * (i.e. GPS and 3D space device orientation.)
 * @property {string} Pwa Determines if the browser window represents an
 * installed Progressive Web Application.
 * @property {string} SerialPort Determines if SerialPort protocols are
 * available.
 * @property {string} SecureContext indicating whether the current context
 * is secure (true) or not (false).
 * @property {string} Share Determines if sharing is available to the
 * runtime.
 * @property {string} SessionStorage Determines if session storage is
 * available to the runtime.
 * @property {string} TextToSpeech Determines if text-to-speech is
 * available to the runtime.
 * @property {string} TouchEnabled Identifies if the browser is accessible
 * via a touch device.
 * @property {string} Usb Determines if USB is available to the runtime.
 * @property {string} Vibrate Determines if the vibrate function is
 * available to the runtime.
 * @property {string} WebSocket Determines if WebSocket is available to the
 * runtime.
 * @property {string} WorkerAvailable Determines if a Worker can be created
 * with the runtime.
 * @property {string} WorkerRuntime Determines if the runtime is a Worker
 * runtime.
 */
export const AVAILABILITY_REQUEST = Object.freeze({
  AskRuntime: "ask_runtime",
  Audio: "audio",
  Beacon: "beacon",
  BroadcastChannel: "broadcast_channel",
  Browser: "browser",
  Bun: "bun",
  Bluetooth: "bluetooth",
  CookieStore: "cookie_store",
  Deno: "deno",
  EventSource: "event_source",
  IFrame: "iframe",
  LocalStorage: "local_storage",
  Midi: "midi",
  Node: "node",
  Open: "open",
  Orientation: "orientation",
  Pwa: "pwa",
  SerialPort: "serial_port",
  SecureContext: "secure_context",
  SessionStorage: "session_storage",
  Share: "share",
  TextToSpeech: "text_to_speech",
  TouchEnabled: "touch_enabled",
  Usb: "usb",
  Vibrate: "vibrate",
  WebSocket: "websocket",
  WorkerAvailable: "worker_available",
  WorkerRuntime: "worker_runtime",
});

// [DATA DEFINITION] ----------------------------------------------------------

/**
 * @callback CEventHandler The event handler utilized within a given
 * JavaScript runtime. This represents a global event handler that should
 * suffice any JavaScript event callback.
 * @param {Event} evt The event object that was triggered
 * @returns {void}
 */

// [PUBLIC API] ---------------------------------------------------------------

/**
 *
 * @param {object} params The named parameters.
 * @param {AVAILABILITY_REQUEST} params.request The item to query about the runtime.
 * @param {string} [params.name = ""] An additional name to aid in the query.
 * @param {object} [params.obj = globalThis] The object to check for a given
 * named feature. Only valid with the {@link AVAILABILITY_REQUEST.AskRuntime}
 * request.
 * @returns {boolean}
 */
export function runtime_available({request, name="", obj = globalThis}) {
  /**
   * Internal lookup function.
   * @private
   * @param {object} params The named parameters.
   * @param {string} params.property The property to look up.
   * @param {object} [params.obj=globalThis] The object to check.
   * @returns  true if defined, false otherwise.
   */
  const is_available = ({property, obj = globalThis}) => {
    json_check_type({type: "object", data: obj, should_throw: true});
    json_check_type({type: "string", data: property, should_throw: true});
    let available = false;
    if (json_check_type({type: "object", data: obj})) {
      available = property in obj;
    }
    return available;
  };

  try {
    switch (request) {
      case AVAILABILITY_REQUEST.AskRuntime:
        return is_available({property: name, obj: obj});
      case AVAILABILITY_REQUEST.Audio:
        return is_available({property: "HTMLAudioElement"});
      case AVAILABILITY_REQUEST.Beacon:
        return is_available({
          property: "sendBeacon",
          obj: globalThis["navigator"]
        });
      case AVAILABILITY_REQUEST.Bluetooth:
        return is_available({property: "bluetooth",
                           obj: globalThis["navigator"]});
      case AVAILABILITY_REQUEST.BroadcastChannel:
        return is_available({property: "BroadcastChannel"});
      case AVAILABILITY_REQUEST.Browser:
        return is_available({property: "HTMLElement"});
      case AVAILABILITY_REQUEST.Bun:
        return is_available({property: "Bun"});
      case AVAILABILITY_REQUEST.Deno:
        return is_available({property: "Deno"});
      case AVAILABILITY_REQUEST.CookieStore:
        return is_available({property: "cookieStore"});
      case AVAILABILITY_REQUEST.EventSource:
        return is_available({property: "EventSource"});
      case AVAILABILITY_REQUEST.LocalStorage:
        return is_available({property: "localStorage"});
      case AVAILABILITY_REQUEST.IFrame:
        try {
          return is_available({property: "HTMLElement"}) &&
            // @ts-ignore This will be within the browser context
            globalThis.self === globalThis.top;
        } catch {
          return false;
        }
      case AVAILABILITY_REQUEST.Midi:
        return is_available({
          property: "requestMIDIAccess",
          obj: globalThis["navigator"]
        });
      case AVAILABILITY_REQUEST.Node:
        return is_available({property: "process"}) &&
          !is_available({property: "Deno"}) &&
          !is_available({property: "Bun"});
      case AVAILABILITY_REQUEST.Open:
        return is_available({property: "open"});
      case AVAILABILITY_REQUEST.Orientation:
        return is_available({
          property: "geolocation",
          obj: globalThis["navigator"]
        });
      case AVAILABILITY_REQUEST.Pwa:
        return is_available({property: "matchMedia"}) &&
          // @ts-ignore This is in a browser context
          globalThis.matchMedia("(display-mode: standalone)"
        ).matches;
      case AVAILABILITY_REQUEST.SecureContext:
        return is_available({property: "isSecureContext"}) &&
          // @ts-ignore This is in a browser context
          globalThis.isSecureContext;
      case AVAILABILITY_REQUEST.SerialPort:
        return is_available({
          property: "serial",
          obj: globalThis["navigator"]
        });
      case AVAILABILITY_REQUEST.SessionStorage:
        return is_available({property: "sessionStorage"});
      case AVAILABILITY_REQUEST.Share:
        return is_available({
          property: "share",
          obj: globalThis["navigator"]
        });
      case AVAILABILITY_REQUEST.TextToSpeech:
        return is_available({property: "SpeechSynthesisUtterance"});
      case AVAILABILITY_REQUEST.TouchEnabled:
        return is_available({
          property: "maxTouchPoints",
          obj: globalThis["navigator"]
        }) &&
          // @ts-ignore This is in a browser context
          globalThis.navigator.maxTouchPoints > 0;
      case AVAILABILITY_REQUEST.Usb:
        return is_available({
          property: "usb",
          obj: globalThis["navigator"]
        });
      case AVAILABILITY_REQUEST.Vibrate:
        return is_available({
          property: "vibrate",
          obj: globalThis["navigator"]
        });
      case AVAILABILITY_REQUEST.WebSocket:
        return is_available({property: "WebSocket"});
      case AVAILABILITY_REQUEST.WorkerAvailable:
        return is_available({property: "Worker"});
      case AVAILABILITY_REQUEST.WorkerRuntime:
        return is_available({property: "WorkerGlobalScope"});
      default:
        throw new CModuleError(CModuleError.MISUSE);
    }
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("runtime_available() error.", err);
  }
}

/**
 * Adds or removes an event handler to the JavaScript runtime or
 * individual element.
 * @param {object} params The named parameters.
 * @param {EVENT_REQUEST} params.request The request to carry out.
 * @param {string} params.type The event handler identifier.
 * @param {CEventHandler} params.handler The
 * handler called when the identified event is triggered or being removed.
 * @param {EventTarget} [params.target=globalThis] The element to attach an
 * event handler to if it supports it.
 * @returns {void}
 * @example
 * // Listen for browser messages.
 * let message_handler = (evt) => {
 *   // Does something
 * };
 * runtime_event({
 *   request: EVENT_REQUEST.Add,
 *   type: "message",
 *   handler: message_handler,
 * });
 *
 * // Then on app cleanup, remove the listener
 * runtime_event({
 *   request: EVENT_REQUEST.Remove,
 *   type: "message",
 *   handler: message_handler,
 * });
 */
export function runtime_event({
  request,
  type,
  handler,
  target = globalThis,
}) {
  try {
    const supported = runtime_available({
      request: AVAILABILITY_REQUEST.AskRuntime,
      name: "addEventListener",
      obj: target
    });
    if (!supported) {
      throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
    }
    json_check_type({type: "string", data: type, should_throw: true});
    json_check_type({
      type: "function",
      data: handler,
      count: 1,
      should_throw: true
    });
    if (request === "add") {
      target.addEventListener(type, handler);
    } else if (request === "remove") {
      target.removeEventListener(type, handler);
    } else {
      throw new CModuleError(CModuleError.MISUSE);
    }
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("runtime_event() error.", err);
  }
}

// ============================================================================
// [STORAGE USE CASE] =========================================================
// ============================================================================

// [ENUMS] --------------------------------------------------------------------

/**
 * Provides the {@link storage_clear}, {@link storage_get},
 * {@link storage_key}, {@link storage_length}, {@link storage_remove}, and
 * {@link storage_set} calls.
 * @readonly
 * @enum {string}
 * @property {string} Cookie To utilize cookies as the storage method.
 * @property {string} Local To utilize local storage which lives once a
 * session is closed.
 * @property {string} Session To utilize session storage which clears once
 * a session is closed.
 */
export const STORAGE_TYPE = Object.freeze({
  Cookie: "cookie",
  Local: "local",
  Session: "session",
});

// [PUBLIC API] ---------------------------------------------------------------

/**
 * Clears the local storage of the module.
 * @param {STORAGE_TYPE} [type=STORAGE_TYPE.Local] The storage to act upon.
 * @returns {Promise<void>} A rejected promise represents an API violation.
 * @example
 * // To clear all elements in the specified storage type
 * // Defaults to STORAGE_TYPE.Local
 * await storage_clear();
 * // To specify type
 * await storage_clear(STORAGE_TYPE.Session);
 */
export async function storage_clear(type = STORAGE_TYPE.Local) {
  try {
    switch (type) {
      case STORAGE_TYPE.Cookie:
        if (!runtime_available({request: AVAILABILITY_REQUEST.CookieStore})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        const cookies = await globalThis.cookieStore.getAll();
        for (const cookie of cookies) {
          let name = cookie.name;
          if (name) {
            await globalThis.cookieStore.delete(name);
          }
        }
        break;
      case STORAGE_TYPE.Local:
        if (!runtime_available({request: AVAILABILITY_REQUEST.LocalStorage})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        globalThis.localStorage.clear();
        break;
      case STORAGE_TYPE.Session:
        if (!runtime_available({request: AVAILABILITY_REQUEST.SessionStorage})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        globalThis.sessionStorage.clear();
        break;
      default:
        throw new CModuleError(CModuleError.MISUSE);
    }
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("storage_clear() error.", err);
  }
}

/**
 * Gets the value associated with the key from the module's local storage.
 * @param {object} params The named parameters.
 * @param {STORAGE_TYPE} [params.type=STORAGE_TYPE.Local] The storage to act
 * upon.
 * @param {string} params.key The key to search.
 * @returns {Promise<string?>} The value associated with the key if found. A
 * rejected promise represents an API violation.
 * @example
 * // To get an element from storage. Either string or null if not found
 * // Defaults to STORAGE_TYPE.Local
 * let value = await storage_get({key: "cool"});
 * // To specify type
 * let value = await storage_get({type: STORAGE_TYPE.Session, key: "cool"});
 */
export async function storage_get({type = STORAGE_TYPE.Local, key}) {
  try {
    json_check_type({type: "string", data: key, should_throw: true});
    switch (type) {
      case STORAGE_TYPE.Cookie:
        if (!runtime_available({request: AVAILABILITY_REQUEST.CookieStore})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        let entry = await globalThis.cookieStore.get(key)
        return entry
          ? entry.value != undefined
            ? entry.value
            : null
          : null;
      case STORAGE_TYPE.Local:
        if (!runtime_available({request: AVAILABILITY_REQUEST.LocalStorage})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        return globalThis.localStorage.getItem(key);
      case STORAGE_TYPE.Session:
        if (!runtime_available({request: AVAILABILITY_REQUEST.SessionStorage})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        return globalThis.sessionStorage.getItem(key);
      default:
        throw new CModuleError(CModuleError.MISUSE);
    }
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("storage_get() error.", err);
  }
}

/**
 * Retrieves the key at the specified index.
 * @param {object} params The named parameters
 * @param {STORAGE_TYPE} [params.type=STORAGE_TYPE.Local] The storage to act
 * upon.
 * @param {number} params.index The key entry to look up.
 * @returns {Promise<string?>} The key at the specified index or null if
 * beyond the storage capacity. A rejected promise represents an API
 * violation.
 * @example
 * // To get a key at an index. Either string or null if not found
 * // Defaults to STORAGE_TYPE.Local
 * let key = await storage_key({index: 0});
 * // To specify type
 * let key = await storage_key({type: STORAGE_TYPE.Session, index: 0});
 */
export async function storage_key({type = STORAGE_TYPE.Local, index}) {
  try {
    json_check_type({type: "number", data: index, should_throw: true});
    switch (type) {
      case STORAGE_TYPE.Cookie:
        if (!runtime_available({request: AVAILABILITY_REQUEST.CookieStore})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        const cookies = await globalThis.cookieStore.getAll();
        const key = cookies.at(index)?.name;
        return key != undefined
          ? key
          : null;
      case STORAGE_TYPE.Local:
        if (!runtime_available({request: AVAILABILITY_REQUEST.LocalStorage})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        return index < globalThis.localStorage.length
          ? globalThis.localStorage.key(index)
          : null;
      case STORAGE_TYPE.Session:
        if (!runtime_available({request: AVAILABILITY_REQUEST.SessionStorage})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        return index < globalThis.sessionStorage.length
          ? globalThis.sessionStorage.key(index)
          : null;
      default:
        throw new CModuleError(CModuleError.MISUSE);
    }
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("storage_key() error.", err);
  }
}

/**
 * Retrieves the number of entries within the module's local storage.
 * @param {STORAGE_TYPE} [type=STORAGE_TYPE.Local] The storage to act
 * upon.
 * @returns {Promise<number>} The number in storage. A rejected promise
 * represents an API violation.
 * @example
 * // To get the number of elements in storage
 * // Assumes no errors with the CResult.
 * // Defaults to STORAGE_TYPE.Local
 * let length = await storage_length());
 * // To specify type
 * let length = await storage_length(type: STORAGE_TYPE.Session));
 */
export async function storage_length(type = STORAGE_TYPE.Local) {
  try {
    switch (type) {
      case STORAGE_TYPE.Cookie:
        if (!runtime_available({request: AVAILABILITY_REQUEST.CookieStore})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        // @ts-ignore Will exist in browser context
        return (await globalThis.cookieStore.getAll()).length;
      case STORAGE_TYPE.Local:
        if (!runtime_available({request: AVAILABILITY_REQUEST.LocalStorage})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        // @ts-ignore Will exist in browser context
        return globalThis.localStorage.length;
      case STORAGE_TYPE.Session:
        if (!runtime_available({request: AVAILABILITY_REQUEST.SessionStorage})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        // @ts-ignore Will exist in browser context
        return globalThis.sessionStorage.length;
      default:
        throw new CModuleError(CModuleError.MISUSE);
    }
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("storage_length() error.", err);
  }
}

/**
 * Removes a given entry from the module's local storage.
 * @param {object} params The named parameters.
 * @param {STORAGE_TYPE} [params.type=STORAGE_TYPE.Local] The storage to act
 * upon.
 * @param {string} params.key The key to remove.
 * @returns {Promise<void>} Rejected promise represents an API violation.
 * @example
 * // To remove an element from storage.
 * // Defaults to STORAGE_TYPE.Local
 * await storage_remove({key: "cool"});
 * // To specify type
 * await storage_remove({type: STORAGE_TYPE.Session, key: "cool"});
 */
export async function storage_remove({type = STORAGE_TYPE.Local, key}) {
  try {
    json_check_type({type: "string", data: key, should_throw: true});
    switch (type) {
      case STORAGE_TYPE.Cookie:
        if (!runtime_available({request: AVAILABILITY_REQUEST.CookieStore})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        // @ts-ignore Will exist in browser context
        await globalThis.cookieStore.delete(key, value);
        break;
      case STORAGE_TYPE.Local:
        if (!runtime_available({request: AVAILABILITY_REQUEST.LocalStorage})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        // @ts-ignore Will exist in browser context
        globalThis.localStorage.removeItem(key);
        break;
      case STORAGE_TYPE.Session:
        if (!runtime_available({request: AVAILABILITY_REQUEST.SessionStorage})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        // @ts-ignore Will exist in browser context
        globalThis.sessionStorage.removeItem(key);
        break;
      default:
        throw new CModuleError(CModuleError.MISUSE);
    }
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("storage_remove() error.", err);
  }
}

/**
 * Sets a key/value pair within the module's local storage.
 * @function codemelted.storage_set
 * @param {object} params The named parameters
 * @param {STORAGE_TYPE} [params.type=STORAGE_TYPE.Local] The storage to act
 * upon.
 * @param {string} params.value The storage entry.
 * @param {string} params.key The key to store.
 * @returns {Promise<void>} Rejected promise represents an API violation.
 * @example
 * // To add an element to storage.
 * // Defaults to STORAGE_TYPE.Local
 * await storage_set({key: "cool", value: "guy"});
 * // To specify type
 * await storage_set({type: STORAGE_TYPE.Session, key: "cool", value: "guy"});
 */
export async function storage_set({type = STORAGE_TYPE.Local, key, value}) {
  try {
    json_check_type({type: "string", data: key, should_throw: true});
    json_check_type({type: "string", data: value, should_throw: true});
    switch (type) {
      case STORAGE_TYPE.Cookie:
        if (!runtime_available({request: AVAILABILITY_REQUEST.CookieStore})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        // @ts-ignore Will exist in browser context
        await globalThis.cookieStore.set(key, value);
        break;
      case STORAGE_TYPE.Local:
        if (!runtime_available({request: AVAILABILITY_REQUEST.LocalStorage})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        // @ts-ignore Will exist in browser context
        globalThis.localStorage.setItem(key, value);
        break;
      case STORAGE_TYPE.Session:
        if (!runtime_available({request: AVAILABILITY_REQUEST.SessionStorage})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        // @ts-ignore Will exist in browser context
        globalThis.sessionStorage.setItem(key, value);
        break;
      default:
        throw new CModuleError(CModuleError.MISUSE);
    }
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("storage_set() error.", err);
  }
}

// ============================================================================
// [UI USE CASE] ==============================================================
// ============================================================================

// [ENUMS] --------------------------------------------------------------------

// BREAK APART BETWEEN DOCUMENT / SCREEN public functions.
// /**
//  * Provides a {@link runtime_query} request to learn about the particular
//  * environment.
//  * @readonly
//  * @enum {string}

//  * @property {string} AvailableHeight the height of the screen, in pixels,
//  * minus permanent or semipermanent user interface features displayed by
//  * the operating system, such as the Taskbar on Windows.
//  * @property {string} AvailableWidth the amount of horizontal space in
//  * pixels available to the window.
//  * @property {string} ColorDepth the color depth of the screen.
//  * @property {string} CpuCount The number of CPUs available for background
//  * worker processing.
//  * @property {string} CssVariable Will query the document for a CSS variable.
//  * @property {string} DevicePixelRatio the ratio of the resolution in
//  * physical pixels to the resolution in CSS pixels for the current display
//  * device.
//  * @property {string} ElementById Will query the document for a particular
//  * HTMLElement.
//  * @property {string} ElementsByClassName Will query for a collection of
//  * HTMLElements by class name.
//  * @property {string} ElementsByTagName Will query for a collection of
//  * HTMLElements by tag name.
//  * @property {string} Environment Determines any passed parameters to the
//  * runtime.
//  * @property {string} Height the height of the screen in pixels.
//  * @property {string} Hostname the hostname of the runtime.
//  * @property {string} InnerHeight the interior height of the window in
//  * pixels, including the height of the horizontal scroll bar, if present.
//  * @property {string} InnerWidth interior width of the window in pixels
//  * (that is, the width of the window's layout viewport). That includes the
//  * width of the vertical scroll bar, if one is present.
//  * @property {string} Name The name of the particular JS runtime.
//  * @property {string} Online Identifies if their is an Internet connection.
//  * @property {string} OuterHeight the height in pixels of the whole browser
//  * window, including any sidebar, window chrome, and window-resizing
//  * borders/handles.
//  * @property {string} OuterWidth the width of the outside of the browser
//  * window. It represents the width of the whole browser window including
//  * sidebar (if expanded), window chrome and window resizing borders /
//  * handles.
//  * @property {string} PixelDepth the bit depth of the screen.
//  * @property {string} ScreenLeft the horizontal distance, in CSS pixels,
//  * from the left border of the user's browser viewport to the left side of
//  * the screen.
//  * @property {string} ScreenOrientationAngle the document's current
//  * orientation angle.
//  * @property {string} ScreenOrientationType the document's current
//  * orientation type, one of portrait-primary, portrait-secondary,
//  * landscape-primary, or landscape-secondary.
//  * @property {string} ScreenTop the vertical distance, in CSS pixels, from
//  * the top border of the user's browser viewport to the top side of the
//  * screen.
//  * @property {string} ScreenX the horizontal distance, in CSS pixels, of the
//  * left border of the user's browser viewport to the left side of the
//  * screen.
//  * @property {string} ScreenY the vertical distance, in CSS pixels, of the
//  * top border of the user's browser viewport to the top edge of the screen.
//  * @property {string} ScrollX the number of pixels by which the document is
//  * currently scrolled horizontally. This value is subpixel precise in modern
//  * browsers, meaning that it isn't necessarily a whole number.
//  * @property {string} ScrollY the number of pixels by which the document is
//  * currently scrolled vertically. This value is subpixel precise in modern
//  * browsers, meaning that it isn't necessarily a whole number.
//  * @property {string} Width the width of the screen.
//  */
// export const QUERY_REQUEST = Object.freeze({
//   AvailableHeight: "available_height",
//   AvailableWidth: "available_width",
//   ColorDepth: "color_depth",
//   CpuCount: "cpu_count",
//   CssVariable: "css_variable",
//   DevicePixelRatio: "device_pixel_ratio",
//   ElementById: "element_by_id",
//   ElementsByClassName: "elements_by_class_name",
//   ElementsByTagName: "elements_by_tag_name",
//   Environment: "environment",
//   Height: "height",
//   Hostname: "hostname",
//   InnerHeight: "inner_height",
//   InnerWidth: "inner_width",
//   Name: "name",
//   Online: "online",
//   OuterHeight: "outer_height",
//   OuterWidth: "outer_width",
//   PixelDepth: "pixel_depth",
//   ScreenLeft: "screen_left",
//   ScreenOrientationAngle: "screen_orientation_angle",
//   ScreenOrientationType: "screen_orientation_type",
//   ScreenTop: "screen_top",
//   ScreenX: "screen_x",
//   ScreenY: "screen_y",
//   ScrollX: "scroll_x",
//   ScrollY: "scroll_y",
//   Width: "width",
// });


/**
 * Provides the request actions for the {@link ui_action} function call.
 * @readonly
 * @enum {string}
 * @property {string} Copy Copies the specified text to the system clipboard.
 * @property {string} Focus Makes a request to bring the window to the
 * front. It may fail due to user settings and the window isn't guaranteed
 * to be front most before this method returns.
 * @property {string} MoveBy moves the current window by a specified
 * amount.
 * @property {string} MoveTo moves the current window to the specified
 * coordinates.
 * @property {string} Paste Retrieves the data from the system clipboard.
 * @property {string} PostMessage Posts a message to another window in
 * the browser context.
 * @property {string} Print Opens the print dialog to print the current
 * document.
 * @property {string} ResizeBy resizes the current window by a specified
 * amount.
 * @property {string} ResizeTo dynamically resizes the window.
 * @property {string} Scroll scrolls the window to a particular place in
 * the document.
 * @property {string} ScrollBy scrolls the document in the window by the
 * given amount.
 * @property {string} ScrollTo scrolls to a particular set of coordinates
 * in the document.
 * @property {string} Share invokes the native sharing mechanism of the
 * device to share data such as text, URLs, or files. The available share
 * targets depend on the device, but might include the clipboard, contacts
 * and email applications, websites, Bluetooth, etc.
 * @property {string} Vibrate Most modern mobile devices include vibration
 * hardware, which lets software code provide physical feedback to the user
 * by causing the device to shake. The Vibration API offers Web apps the
 * ability to access this hardware, if it exists, and does nothing if the
 * device doesn't support it.
 */
export const ACTION_REQUEST = Object.freeze({
  Copy: "copy",
  Focus: "focus",
  MoveBy: "move_by",
  MoveTo: "move_to",
  Paste: "paste",
  PostMessage: "post_message",
  Print: "print",
  ResizeBy: "resize_by",
  ResizeTo: "resize_to",
  Scroll: "scroll",
  ScrollBy: "scroll_by",
  ScrollTo: "scroll_to",
  Share: "share",
  Vibrate: "vibrate",
});

/**
 * Provides the request actions of the {@link ui_notify} function.
 * @readonly
 * @enum {string}
 * @property {string} Alert Alert a user to a condition.
 * @property {string} Choose Provides a selection to the user.
 * @property {string} Close Closes any given prompt to the user.
 * @property {string} Confirm Get confirmation from a user.
 * @property {string} Custom Provides a custom notification mechanism to the
 * user.
 * @property {string} Prompt Prompt the user for input.
 * @property {string} SnackBar Tell the user something happened passively.
 * @property {string} SystemNotification Provides an operating system
 * notification even when the page is not active. Requires permission to be
 * granted to the website.
 * @property {string} Wait Tell the user to wait for an action to complete.
 */
export const NOTIFY_REQUEST = Object.freeze({
  Alert: "alert",
  Choose: "choose",
  Close: "close",
  Confirm: "confirm",
  Custom: "custom",
  Prompt: "prompt",
  SnackBar: "snack_bar",
  SystemNotification: "system_notification",
  Wait: "wait",
});

/**
 * Identifies the schema to {@link ui_open} with the browser desktop
 * services.
 * @readonly
 * @enum {string}
 * @property {string} File Opens an item via the file protocol.
 * @property {string} Http Opens a web resource with the HTTP protocol.
 * @property {string} Https Same as Http but with security.
 * @property {string} Mailto Opens the default mail provider.
 * @property {string} Sms Opens the standard app for texting.
 * @property {string} Tel Opens the default calling application.
 */
export const SCHEMA_TYPE = Object.freeze({
  File: "file:",
  Http: "http://",
  Https: "https://",
  Mailto: "mailto:",
  Sms: "sms:",
  Tel: "tel:",
});

/**
 * Supports the target parameter of the {@link ui_open} action which handles
 * opening related apps based on the specified {@link SCHEMA_TYPE}.
 * @readonly
 * @enum {string}
 * @property {string} Blank Opens the linked document in a new window or tab
 * @property {string} Parent Opens the linked document in the same frame as
 * it was clicked (this is default)
 * @property {string} Self Opens the linked document in the parent frame
 * @property {string} Top Opens the linked document in the full body of the
 * window
 */
export const TARGET_TYPE = Object.freeze({
  Blank: "_blank",
  Parent: "_parent",
  Self: "_self",
  Top: "_top",
});

// [PROTOCOL IMPLEMENTATION] --------------------------------------------------

/**
 * <mark>UNDER DEVELOPMENT</mark>
 * @private
 * @template T
 * @extends {CProtocol<T>}
 */
class CAudioProtocol extends CProtocol {

}

/**
 * <mark>UNDER DEVELOPMENT</mark>
 * @template T
 * @extends {CProtocol<T>}
 */
class CGamepadProtocol extends CProtocol {

}

/**
 * <mark>UNDER DEVELOPMENT</mark>
 * @private
 * @template T
 * @extends {CProtocol<T>}
 */
class CTextToSpeechProtocol extends CProtocol {

}

// [PUBLIC API] ---------------------------------------------------------------

/**
 * Provides the ability to carry out actions with the open browser window.
 * @param {object} params The named parameters.
 * @param {ACTION_REQUEST} params.request The enumerated value to carry
 * out with the open browser window.
 * @param {object | string} [params.data] The optional object data associated
 * with the {@link ACTION_REQUEST.Share} or {@link ACTION_REQUEST.PostMessage}
 * requests or string data for the  {@link ACTION_REQUEST.Copy} option.
 * @param {string} [params.target_origin="*"] Specifies the target origin
 * when posting a message to a window or frame.
 * @param {number[]} [params.pattern] Provides a pattern of vibration and
 * pause intervals. Each value indicates a number of milliseconds to
 * vibrate or pause, in alternation.
 * @param {number} [params.x] An X coordinate or delta coordinate for a
 * given action that moves / sets position of the browser window or item
 * on the browser window.
 * @param {number} [params.y] An X coordinate or delta coordinate for a
 * given action that moves / sets position of the browser window or item
 * on the browser window.
 * @returns {Promise<CResult<string | boolean | null>>} Reflecting success
 * or failure of the given request. A rejected promise is an API violation.
 * @example
 * // TBD
 */
export async function ui_action({
  request,
  data,
  target_origin="*",
  pattern=[],
  x,
  y
}) {
  try {
    let value = null;
    switch (request) {
      case ACTION_REQUEST.Copy:
        json_check_type({type: "string", data: data, should_throw: true});
        // @ts-ignore Data was checked above.
        await globalThis.navigator.clipboard.writeText(data);
        break;
      case ACTION_REQUEST.Focus:
        globalThis.focus();
        break;
      case ACTION_REQUEST.MoveBy:
        json_check_type({type: "number", data: x, should_throw: true});
        json_check_type({type: "number", data: y, should_throw: true});
        // @ts-ignore check types above will validate number is not null.
        globalThis.moveBy(x, y);
        break;
      case ACTION_REQUEST.MoveTo:
        json_check_type({type: "number", data: x, should_throw: true});
        json_check_type({type: "number", data: y, should_throw: true});
        // @ts-ignore check types above will validate number is not null.
        globalThis.moveTo(x, y);
        break;
      case ACTION_REQUEST.Paste:
        value = await globalThis.navigator.clipboard.readText();
        break;
      case ACTION_REQUEST.PostMessage:
        globalThis.postMessage(data, target_origin);
        break;
      case ACTION_REQUEST.Print:
        globalThis.print();
        break;
      case ACTION_REQUEST.ResizeBy:
        json_check_type({type: "number", data: x, should_throw: true});
        json_check_type({type: "number", data: y, should_throw: true});
        // @ts-ignore check types above will validate number is not null.
        globalThis.resizeBy(x, y);
        break;
      case ACTION_REQUEST.ResizeTo:
        json_check_type({type: "number", data: x, should_throw: true});
        json_check_type({type: "number", data: y, should_throw: true});
        // @ts-ignore check types above will validate number is not null.
        globalThis.resizeTo(x, y);
        break;
      case ACTION_REQUEST.Scroll:
        json_check_type({type: "number", data: x, should_throw: true});
        json_check_type({type: "number", data: y, should_throw: true});
        // @ts-ignore check types above will validate number is not null.
        globalThis.scroll(x, y);
        break;
      case ACTION_REQUEST.ScrollBy:
        json_check_type({type: "number", data: x, should_throw: true});
        json_check_type({type: "number", data: y, should_throw: true});
        // @ts-ignore check types above will validate number is not null.
        globalThis.scrollBy(x, y);
        break;
      case ACTION_REQUEST.ScrollTo:
        json_check_type({type: "number", data: x, should_throw: true});
        json_check_type({type: "number", data: y, should_throw: true});
        // @ts-ignore check types above will validate number is not null.
        globalThis.scrollTo(x, y);
        break;
      case ACTION_REQUEST.Share:
        if (!runtime_available({request: AVAILABILITY_REQUEST.Share})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        // @ts-ignore This is in a browser context
        await globalThis.navigator.share(data);
        break;
      case ACTION_REQUEST.Vibrate:
        if (!runtime_available({request: AVAILABILITY_REQUEST.Vibrate})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        json_check_type({type: Array, data: pattern, should_throw: true});
        // @ts-ignore Will exist in the browser context
        value = globalThis.navigator.vibrate(pattern);
        break;
      default:
        throw new CModuleError(CModuleError.MISUSE);
    }
    return new CResult({value: value});
  } catch (err) {
    if (json_check_type({type: CModuleError, data: err})) {
      CModuleError.handle_error(err);
      throw new CModuleError("runtime_action() error.", err);
    }
    return new CResult({error: err});
  }
}

// TODO - Update @see with the document object.

export class ui_document({request, name}) {
  try {
    switch (request) {
      case QUERY_REQUEST.CssVariable:
        let cs = globalThis.window.getComputedStyle(
          globalThis.document.documentElement
        );
        return cs.getPropertyValue(name) ?? "";
      case QUERY_REQUEST.ElementById:
        let el = globalThis.document.getElementById(name);
        if (!el) {
          throw new CModuleError(CModuleError.MISUSE + name + " not found");
        }
        return el;
      case QUERY_REQUEST.ElementsByClassName:
        let col1 = globalThis.document.getElementsByClassName(name);
        if (col1.length === 0) {
          throw new CModuleError(CModuleError.MISUSE + name + " not found");
        }
        return Array.from(col1);
      case QUERY_REQUEST.ElementsByTagName:
        let col2 = globalThis.document.getElementsByTagName(name);
        if (col2.length === 0) {
          throw new CModuleError(CModuleError.MISUSE + name + " not found");
        }
        return Array.from(col2);
      case QUERY_REQUEST.Environment:
          return (new URLSearchParams(
            globalThis.location.search)
          ).get(name);
      default:
        throw new CModuleError(CModuleError.MISUSE);
    }
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("ui_document() error.", err);
  }
}

/**
 * Provides a mechanism for interacting with a user by gather data or
 * useful information.
 * @param {object} params The named parameters
 * @param {NOTIFY_REQUEST} params.request The request to carry out.
 * @param {string} params.message The message to associate with the request.
 * @returns {Promise<boolean | string | void>} The data associated with the
 * notification request. Any rejected promise is an API violation.
 * @example
 * // TBD
 */
export async function ui_notify({request, message}) {
  try {
    let value;
    switch (request) {
      case NOTIFY_REQUEST.Alert:
        json_check_type({type: "string", data: message, should_throw: true});
        // @ts-ignore This is in a browser context
        globalThis.alert(data);
        break;
      case NOTIFY_REQUEST.Confirm:
        json_check_type({type: "string", data: message, should_throw: true});
        // @ts-ignore This is in a browser context
        value = globalThis.confirm(data);
        break;
      case NOTIFY_REQUEST.Prompt:
        json_check_type({type: "string", data: message, should_throw: true});
        // @ts-ignore This is in a browser context
        value = globalThis.prompt(data) ?? "";
        break;
      default:
        throw new CModuleError(CModuleError.MISUSE);
    }
    return value;
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("runtime_message() error.", err);
  }
}

// TODO - Update @see with the Screen object.

export function ui_screen({}) {
  try {
    json_check_type({type: "string", data: name, should_throw: true});
    json_check_type({type: "object", data: obj, should_throw: true});
    switch (request) {
      case QUERY_REQUEST.AvailableHeight:
        return globalThis.screen.availHeight;
      case QUERY_REQUEST.AvailableWidth:
        return globalThis.screen.availWidth;
      case QUERY_REQUEST.ColorDepth:
        return globalThis.screen.colorDepth;
      case QUERY_REQUEST.DevicePixelRatio:
        return globalThis.devicePixelRatio;
      case QUERY_REQUEST.Height:
        return globalThis.screen.height;
      case QUERY_REQUEST.InnerHeight:
        return globalThis.innerHeight;
      case QUERY_REQUEST.InnerWidth:
        return globalThis.innerWidth;
      case QUERY_REQUEST.OuterHeight:
        return globalThis.outerHeight;
      case QUERY_REQUEST.OuterWidth:
        return globalThis.outerWidth;
      case QUERY_REQUEST.PixelDepth:
        return globalThis.screen.pixelDepth;
      case QUERY_REQUEST.ScreenLeft:
        return globalThis.screenLeft;
      case QUERY_REQUEST.ScreenOrientationAngle:
        return globalThis.screen.orientation.angle;
      case QUERY_REQUEST.ScreenOrientationType:
        return globalThis.screen.orientation.type;
      case QUERY_REQUEST.ScreenTop:
        return globalThis.screenTop;
      case QUERY_REQUEST.ScreenX:
        return globalThis.screenX;
      case QUERY_REQUEST.ScreenY:
        return globalThis.screenY;
      case QUERY_REQUEST.ScrollX:
        return globalThis.scrollX;
      case QUERY_REQUEST.ScrollY:
        return globalThis.scrollY
      case QUERY_REQUEST.Width:
        return globalThis.screen.width
      default:
        throw new CModuleError(CModuleError.MISUSE);
    }
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("ui_screen() error.", err);
  }
}

/**
 * Opens the specified protocol to a browser window or native app
 * configured to handle the given specified schema.
 * @param {object} params The named parameters
 * @param {SCHEMA_TYPE} params.schema The schema to open.
 * @param {boolean} [params.popup_window=false] Whether to open the protocol in
 * a separate browser window.
 * @param {string} [params.url] The url of the protocol unless utilizing
 * "mailto:" schema with [params.mailtoParams] which will already be
 * formatted.
 * @param {string[]} [params.mailto=[]] The primary addresses to send the
 * email.
 * @param {string[]} [params.cc=[]] The carbon copy email addresses to send
 * the email.
 * @param {string[]} [params.bcc=[]] The people you don't want others to know
 * about on the email.
 * @param {string} [params.subject=""] The subject of the email.
 * @param {string} [params.body=""] The actual email message.
 * @param {TARGET_TYPE} [params.target=TARGET_TYPE.Self] The type of a tab
 * behavior.
 * @param {number} [params.width=900] The width of a popup window. Defaulted
 * to 900.0 when not set.
 * @param {number} [params.height=600] The height of a popup window.
 * Defaulted  to 600.0 when not set.
 * @returns {Window | null} Reference to the newly opened browser window.
 * @example
 * // TBD
 */
export function ui_open({
  schema,
  popup_window = false,
  url,
  mailto = [],
  cc = [],
  bcc = [],
  subject = "",
  body = "",
  target = TARGET_TYPE.Self,
  width=900,
  height=600
}) {
  try {
    // Ensure the runtime function is available
    if (!runtime_available({request: AVAILABILITY_REQUEST.Open})) {
      throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
    }

    // Basic validation of runtime and required parameters.
    json_check_type({type: "boolean", data: popup_window, should_throw: true});
    json_check_type({type: "string", data: target, should_throw: true});
    json_check_type({type: "number", data: width, should_throw: true});
    json_check_type({type: "number", data: height, should_throw: true});
    json_check_type({type: Array, data: mailto, should_throw: true});
    json_check_type({type: Array, data: cc, should_throw: true});
    json_check_type({type: Array, data: bcc, should_throw: true});
    json_check_type({type: "string", data: subject, should_throw: true});
    json_check_type({type: "string", data: body, should_throw: true});

    // Now go build the URL to open.
    let urlToLaunch = schema;
    if (schema === "file:" ||
        schema === "http://" ||
        schema === "https://" ||
        schema === "sms:" ||
        schema === "tel:") {
      json_check_type({type: "string", data: url, should_throw: true});
      urlToLaunch += url;
    } else if (schema === "mailto:") {
      if (url) {
        json_check_type({type: "string", data: url, should_throw: true});
        urlToLaunch += url;
      } else {
        // Form the mailto parameters to better control the URL formatting.
        if (mailto.length > 0) {
          mailto.forEach((addr) => {
            urlToLaunch += `${addr};`;
          });
          urlToLaunch.substring(0, urlToLaunch.length - 1);
        }

        let delimiter = "?";
        if (cc.length > 0) {
          urlToLaunch += `${delimiter}cc=`;
          delimiter = "&";
          cc.forEach((addr) => {
            urlToLaunch += `${addr};`;
          });
          urlToLaunch.substring(0, urlToLaunch.length - 1);
        }

        if (bcc.length > 0) {
          urlToLaunch += `${delimiter}bcc=`;
          delimiter = "&";
          bcc.forEach((addr) => {
            urlToLaunch += `${addr};`;
          });
          urlToLaunch.substring(0, urlToLaunch.length - 1);
        }

        if (subject.trim().length > 0) {
          urlToLaunch += `${delimiter}subject=${subject.trim()}`;
          delimiter = "&";
        }

        if (body.trim().length > 0) {
          urlToLaunch += `${delimiter}body=${body.trim()}`;
          delimiter = "&";
        }
      }
    } else {
      throw new CModuleError(CModuleError.MISUSE);
    }

    // Determine how we are opening the item.
    if (popup_window) {
      // @ts-ignore Will return a number.
      let top = (runtime_query(QUERY_REQUEST.Height) - height) / 2;
      // @ts-ignore Will return a number.
      let left = (runtime_query(QUERY_REQUEST.Width) - width) / 2;
      let settings = `toolbar=no, location=no, ` +
        `directories=no, status=no, menubar=no, ` +
        `scrollbars=no, resizable=yes, copyhistory=no, ` +
        `width=${width}, height=${height}, top=${top}, left=${left}`;
      // @ts-ignore Property exists in a browser runtime.
      return globalThis.open(urlToLaunch, "_blank", settings);
    }
    // @ts-ignore Property exists in a browser runtime.
    return globalThis.open(urlToLaunch, target);
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("runtime_online() error.", err);
  }
}

// [UI COMPONENTS] ------------------------------------------------------------

/**
 * @callback CAttributeChangeCB Callback to handle any changes in
 * observedAttributes within the base {@link CHtmlComponent} class.
 * @param {string} name The name of the observable attribute fired.
 * @param {string} old_value The old value associated with the attribute.
 * @param {string} new_value The nw value to apply to the attribute.
 * @returns {void}
 */

/**
 * @callback CHtmlComponentCB A generalized callback for the void no parameter
 * {@link CHtmlComponent} class. Allows for the constructor to define these
 * callbacks and the base class to invoke them allowing for a cleaner
 * definition of the implementing HTML custom component.
 */

/**
 * Sets up the base class for defining custom HTMLElements to build a user
 * interface for a Single Page App (SPA) / Progressive Web App (PWA) or
 * Rust desktop / mobile TAURI app.
 * @abstract
 * @extends {HTMLElement}
 */
export class CHtmlComponent extends HTMLElement {
  /** @type {CHtmlComponentCB | undefined} */
  #adopted_cb;
  /** @type {CAttributeChangeCB | undefined} */
  #attribute_changed_cb;
  /** @type {CHtmlComponentCB | undefined} */
  #connected_cb;
  /** @type {CHtmlComponentCB | undefined} */
  #connected_move_cb;
  /** @type {CHtmlComponentCB | undefined} */
  #disconnected_cb;
  /** @type {ShadowRoot} */
  #shadow_root;

  /**
   * Creates the HTMLElement and attaches a closed shadow DOM to only allow
   * styling via this component.
   * @param {object} params The named parameters
   * @param {CHtmlComponentCB} [params.adopted_cb] The callback that handles
   * the {@link adoptedCallback} method.
   * @param {CAttributeChangeCB} [params.attribute_changed_cb] The callback
   * that handles the {@link attributeChangedCallback} method.
   * @param {CHtmlComponentCB} [params.connected_cb] The callback that handles
   * the {@link connectedCallback} method.
   * @param {CHtmlComponentCB} [params.connected_move_cb] The callback that handles
   * the {@link connectedMoveCallback} method.
   * @param {CHtmlComponentCB} [params.disconnected_cb] The callback that handles
   * the {@link disconnectedCallback} method.
   */
  constructor({
    adopted_cb,
    attribute_changed_cb,
    connected_cb,
    connected_move_cb,
    disconnected_cb
  }) {
    super();
    try {
      if (adopted_cb) {
        json_check_type({
          type: "function",
          data: adopted_cb,
          count: 0,
          should_throw: true
        });
      }
      if (attribute_changed_cb) {
        json_check_type({
          type: "function",
          data: attribute_changed_cb,
          count: 3,
          should_throw: true
        });
      }
      if (connected_cb) {
        json_check_type({
          type: "function",
          data: connected_cb,
          count: 0,
          should_throw: true
        });
      }
      if (connected_move_cb) {
        json_check_type({
          type: "function",
          data: connected_move_cb,
          count: 0,
          should_throw: true
        });
      }
      if (disconnected_cb) {
        json_check_type({
          type: "function",
          data: disconnected_cb,
          count: 0,
          should_throw: true
        });
      }
      this.#adopted_cb = adopted_cb;
      this.#attribute_changed_cb = attribute_changed_cb;
      this.#connected_cb = connected_cb;
      this.#connected_move_cb = connected_move_cb;
      this.#disconnected_cb = disconnected_cb;
      this.#shadow_root = this.attachShadow({mode: "closed"});
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError(CModuleError.MISUSE);
    }
  }

  /**
   * Provides access to the shadow DOM for constructing the custom component.
   * @protected
   * @readonly
   * @type {ShadowRoot}
   */
  get shadow_root() { return this.#shadow_root; }

  // /**
  //  * Provides the ability to query the DOM for a given css_value by
  //  * variable name. The design of this function is if a variable name is not
  //  * what is specified, it is assumed to be the actual property so it is
  //  * returned instead.
  //  * @param {string} attr The variable name to search
  //  * @returns {string} The value of the CssVariable or the attr returned
  //  * as it is assumed to be the actual style.
  //  */
  // get_css_value(attr) {
  //   let css_value = runtime_query({
  //     request: QUERY_REQUEST.CssVariable,
  //     name: attr
  //   });
  //   // @ts-ignore It will return a string value
  //   return css_value.length > 0
  //     // @ts-ignore It will return a string value
  //     ? css_value
  //     : attr;
  // }

  /**
   * Called each time the element is moved to a new document.
   * @returns {void}
   */
  adoptedCallback() { this.#adopted_cb?.(); }

  /**
   * Called when attributes are changed, added, removed, or replaced.
   * @param {string} name The name of a observedAttributes allowing access
   * into the internals of the custom component.
   * @param {string} old_value The original value held by the attribute.
   * @param {string} new_value The new value to apply.
   * @returns {void}
   */
  attributeChangedCallback(name, old_value, new_value) {
    this.#attribute_changed_cb?.(name, old_value, new_value);
  }

  /**
   * Called each time the element is added to the document. The specification
   * recommends that, as far as possible, developers should implement custom
   * element setup in this callback rather than the constructor.
   * @returns {void}
   */
  connectedCallback() { this.#connected_cb?.(); }

  /**
   * When defined, this is called instead of connectedCallback() and
   * disconnectedCallback() each time the element is moved to a different
   * place in the DOM via Element.moveBefore(). Use this to avoid running
   * initialization/cleanup code in the connectedCallback() and
   * disconnectedCallback() callbacks when the element is not actually
   * being added to or removed from the DOM. See Lifecycle callbacks and
   * state-preserving moves for more details.
   * @returns {void}
   */
  connectedMoveCallback() { this.#connected_move_cb?.(); }

  /**
   * Called each time the element is removed from the document.
   * @returns {void}
   */
  disconnectedCallback() { this.#disconnected_cb?.(); }

  /**
   * Forces a refresh of the component.
   * @returns {void}
   */
  refresh() {
    const display = this.style.display;
    this.style.display = "";
    this.style.display = display;
  }

  /**
   * Utility function to register a custom component if it has not already
   * been defined.
   * @param {string} name The name of the component.
   * @param {any} element_def The constructor definition.
   */
  static register_component(name, element_def) {
    const is_defined =  !!customElements.get(name);
    if (!is_defined) {
      customElements.define(name, element_def);
    }
  }
}

/**
 * Provides a Material3 icon based button where the icon is to the left of
 * the label (if specified) or it is just the icon.
 * <br><br>
 * <b>DECLARE:</b><br>
 * ```html
 * <cm-icon-button
 *   cm_icon="emoji or URL"
 *   cm_label="Label (optional)"
 *   cm_tooltip="Tooltip (optional)"
 * ></cm-icon-button>
 * ```
 * <br><br>
 * <b>STYLE:</b><br>
 * ```css
 *
 * ```
 * @extends {CHtmlComponent}
 */
class CIconButton extends CHtmlComponent {
  constructor() {
    super({
      connected_cb: () => {
        try {
          // Get the attributes and validate them.
          this.title = this.getAttribute("cm_tooltip") ?? "";
          let label = this.getAttribute("cm_label") ?? "";
          let icon = this.getAttribute("cm_icon") ?? "";

          // Setup our style
          // TODO: Setup :host
          // TODO: Have :host fill container
          let style = `
            <style>

            </style>
          `;

          // Now go build the component
          if (label.length === 1) {

          } else if (label.length > 1) {

          } else {
            throw new CModuleError(
              `${CModuleError.MISUSE}: cm_icon must be emoji or url`
            );
          }

        } catch (err) {
          CModuleError.handle_error(err);
          throw new CModuleError(CModuleError.MISUSE, err);
        }
      }
    });
  }
}
CHtmlComponent.register_component("cm-icon-button", CIconButton);
