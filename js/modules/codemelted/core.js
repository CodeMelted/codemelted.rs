// @ts-check
/**
 * <b>ABOUT:</b> Represents the core of the codemelted JavaScript modules. It
 * is the core to all the other codemelted_xxx.js modules. It covers the
 * domain use cases of Async I/O, JSON, Logger, Numerical Processing Unit
 * (NPU), and Runtime. It also provides the base CProtocol to support
 * asynchronous that exist within this and the other supporting modules. The
 * <br><br>
 * <img style="width: 100%;" src="models/codemelted_core.png" />
 * <br><br>
 * <b>COPYRIGHT:</b> © 2025 - 2026 Mark Shaffer. All Rights Reserved. <br>
 * <b>LICENSE:</b> MIT License
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
 * <br>
 * @module core
 * @see https://developer.mozilla.org/en-US/docs/Web/API/console
 * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Location
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Navigator
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Screen
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Worker
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
 * @see https://doc.rust-lang.org/std/result/
 * @see https://en.cppreference.com/cpp/thread/future
 */

// ============================================================================
// [ENUM DEFINITIONS] =========================================================
// ============================================================================

/**
 * Determines if a particular object, function, or feature is available
 * within the current runtime.
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

/**
 * Provides a {@link runtime_query} request to learn about the particular
 * environment.
 * @readonly
 * @enum {string}

 * @property {string} AvailableHeight the height of the screen, in pixels,
 * minus permanent or semipermanent user interface features displayed by
 * the operating system, such as the Taskbar on Windows.
 * @property {string} AvailableWidth the amount of horizontal space in
 * pixels available to the window.
 * @property {string} ColorDepth the color depth of the screen.
 * @property {string} CpuCount The number of CPUs available for background
 * worker processing.
 * @property {string} CssVariable Will query the document for a CSS variable.
 * @property {string} DevicePixelRatio the ratio of the resolution in
 * physical pixels to the resolution in CSS pixels for the current display
 * device.
 * @property {string} ElementById Will query the document for a particular
 * HTMLElement.
 * @property {string} ElementsByClassName Will query for a collection of
 * HTMLElements by class name.
 * @property {string} ElementsByTagName Will query for a collection of
 * HTMLElements by tag name.
 * @property {string} Environment Determines any passed parameters to the
 * runtime.
 * @property {string} Height the height of the screen in pixels.
 * @property {string} Hostname the hostname of the runtime.
 * @property {string} InnerHeight the interior height of the window in
 * pixels, including the height of the horizontal scroll bar, if present.
 * @property {string} InnerWidth interior width of the window in pixels
 * (that is, the width of the window's layout viewport). That includes the
 * width of the vertical scroll bar, if one is present.
 * @property {string} Name The name of the particular JS runtime.
 * @property {string} Online Identifies if their is an Internet connection.
 * @property {string} OuterHeight the height in pixels of the whole browser
 * window, including any sidebar, window chrome, and window-resizing
 * borders/handles.
 * @property {string} OuterWidth the width of the outside of the browser
 * window. It represents the width of the whole browser window including
 * sidebar (if expanded), window chrome and window resizing borders /
 * handles.
 * @property {string} PixelDepth the bit depth of the screen.
 * @property {string} ScreenLeft the horizontal distance, in CSS pixels,
 * from the left border of the user's browser viewport to the left side of
 * the screen.
 * @property {string} ScreenOrientationAngle the document's current
 * orientation angle.
 * @property {string} ScreenOrientationType the document's current
 * orientation type, one of portrait-primary, portrait-secondary,
 * landscape-primary, or landscape-secondary.
 * @property {string} ScreenTop the vertical distance, in CSS pixels, from
 * the top border of the user's browser viewport to the top side of the
 * screen.
 * @property {string} ScreenX the horizontal distance, in CSS pixels, of the
 * left border of the user's browser viewport to the left side of the
 * screen.
 * @property {string} ScreenY the vertical distance, in CSS pixels, of the
 * top border of the user's browser viewport to the top edge of the screen.
 * @property {string} ScrollX the number of pixels by which the document is
 * currently scrolled horizontally. This value is subpixel precise in modern
 * browsers, meaning that it isn't necessarily a whole number.
 * @property {string} ScrollY the number of pixels by which the document is
 * currently scrolled vertically. This value is subpixel precise in modern
 * browsers, meaning that it isn't necessarily a whole number.
 * @property {string} Width the width of the screen.
 */
export const QUERY_REQUEST = Object.freeze({
  AvailableHeight: "available_height",
  AvailableWidth: "available_width",
  ColorDepth: "color_depth",
  CpuCount: "cpu_count",
  CssVariable: "css_variable",
  DevicePixelRatio: "device_pixel_ratio",
  ElementById: "element_by_id",
  ElementsByClassName: "elements_by_class_name",
  ElementsByTagName: "elements_by_tag_name",
  Environment: "environment",
  Height: "height",
  Hostname: "hostname",
  InnerHeight: "inner_height",
  InnerWidth: "inner_width",
  Name: "name",
  Online: "online",
  OuterHeight: "outer_height",
  OuterWidth: "outer_width",
  PixelDepth: "pixel_depth",
  ScreenLeft: "screen_left",
  ScreenOrientationAngle: "screen_orientation_angle",
  ScreenOrientationType: "screen_orientation_type",
  ScreenTop: "screen_top",
  ScreenX: "screen_x",
  ScreenY: "screen_y",
  ScrollX: "scroll_x",
  ScrollY: "scroll_y",
  Width: "width",
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

// ============================================================================
// [DATA DEFINITIONS] =========================================================
// ============================================================================

/**
 * @callback CEventHandler The event handler utilized within a given
 * JavaScript runtime. This represents a global event handler that should
 * suffice any JavaScript event callback.
 * @param {Event} evt The event object that was triggered
 * @returns {void}
 */

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

/**
 * @callback CTaskCB The task to run as part of the {@link async_task} call.
 * @param {T} data Data to pass to the task.
 * @returns {T} The result of the task completing.
 * @template T The data associated with the CResult object accessed via the
 * result() function call.
 */

/**
 * NOTE: Defined to support proper typing in the JSDocs when type checking
 *       in a TypeScript environment.
 * @typedef {object} HTMLElement
 */

// ============================================================================
// [PROTOCOL BASE DEFINITION] =================================================
// ============================================================================

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
// [ASYNC PROTOCOL IMPLEMENTATIONS] ===========================================
// ============================================================================

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
   * @param {import("./codemelted_core.js")
   *   .CProtocolEventHandler<CTimerEvent>} params.rx_handler Handler for
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
   * @param {import("./codemelted_core.js")
   *  .CProtocolEventHandler<CWorkerEvent>} params.rx_handler The receive
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

// ============================================================================
// [PUBLIC API] ===============================================================
// ============================================================================

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
 * @param {import("./codemelted_core.js")
 *  .CProtocolEventHandler<CTimerEvent>} params.rx_handler The receive
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
 * @param {import("./codemelted_core.js")
 *  .CProtocolEventHandler<CWorkerEvent>} params.rx_handler The receive
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

/**
 *
 * @param {object} params The named parameters.
 * @param {AVAILABILITY_REQUEST} params.request The item to query about the runtime.
 * @param {string} [params.name = ""] An additional name to aid in the query.
 * @param {object} [params.obj = globalThis] The object to check for a given
 * named feature. Only valid with the {@link QUERY_REQUEST.AskRuntime}
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
 * @param {import("./codemelted_core.js").CEventHandler} params.handler The
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

/**
 * Queries the underlying JavaScript runtime for information held by it or
 * just checking for the availability of a given resource. If a request
 * cannot be carried out, then a default value is returned.
 * (i.e. -1 / "UNKNOWN" / null / false)
 * @param {object} params The named parameters.
 * @param {QUERY_REQUEST} params.request The item to query about the runtime.
 * @param {string} [params.name = ""] An additional name to aid in the query.
 * @param {object} [params.obj = globalThis] The object to check for a given
 * named feature. Only valid with the {@link QUERY_REQUEST.AskRuntime}
 * request.
 * @returns {boolean | HTMLElement | HTMLElement[] | number | string | null}
 * @example
 * // TBD
 */
export function runtime_query({request, name="", obj = globalThis}) {



}
