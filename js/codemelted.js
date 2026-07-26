// @ts-check
// ============================================================================
/**
 * @file
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
 * <p>
 * <b>Test Results:</b>&nbsp;
 * <button style="cursor: pointer;" onclick="open_test('coverage-browser/index.html');">Browser</button>
 * <button style="cursor: pointer;" onclick="open_test('coverage-bun/js/index.html');">Bun</button>
 * <button style="cursor: pointer;" onclick="open_test('coverage-deno/js/index.html');">Deno</button>
 * <button style="cursor: pointer;" onclick="open_test('coverage-node/js/index.html');">NodeJS</button>
 * @author Mark Shaffer
 * @copyright © 2024-26 Mark Shaffer. All Rights Reserved.
 * @version 26.1.2 (Last Modified 2026-mm-dd)
 * @license MIT <br />
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 * <br /><br />
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * <br /><br />
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

// ============================================================================
// [FAKE OUT TYPEDEFS] ========================================================
// ============================================================================
// NOTE: Defined to support proper typing in the JSDocs when type checking
//       in a TypeScript environment.
// ============================================================================

/**
 * Defined to support proper typing in the JSDocs when type checking in a
 * TypeScript environment.
 * @typedef {object} DeviceOrientationEvent
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
 * The GeolocationCoordinates interface represents the position and
 * altitude of the device on Earth, as well as the accuracy with which
 * these  properties are calculated. The geographic position information is
 * provided in terms of World Geodetic System coordinates (WGS84).
 * @typedef {object} GeolocationCoordinates
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
 * The SerialPort interface of the Web Serial API provides access to a
 * serial port on the host device.
 * @typedef {object} SerialPort
 * @property {boolean} connected Returns a boolean value that indicates
 * whether the port is logically connected to the device.
 * @property {ReadableStream} readable Returns a ReadableStream for
 * receiving data from the device connected to the port.
 * @property {WritableStream} writable Returns a WritableStream for sending
 * data to the device connected to the port.
 * @property {function} forget Returns a Promise that resolves when access
 * to the serial port is revoked. Calling this "forgets" the device,
 * resetting any previously-set permissions so the calling site can no
 * longer communicate with the port.
 * @property {function} getInfo Returns an object containing identifying
 * information for the device available via the port.
 * @property {function} open Returns a Promise that resolves when the port
 * is opened. By default the port is opened with 8 data bits, 1 stop bit
 * and no parity checking.
 * @property {function} setSignals Sets control signals on the port and
 * returns a Promise that resolves when they are set.
 * @property {function} getSignals Returns a Promise that resolves with an
 * object containing the current state of the port's control signals.
 * @property {function} close Returns a Promise that resolves when the port
 * closes.
 */

// ============================================================================
// [MODULE ENUMERATIONS] ======================================================
// ============================================================================

/**
 * Provides the request actions for the {@link runtime_action} function call.
 * @readonly
 * @enum {string}
 * @property {string} Alert Opens the browser alert dialog to alert the user
 * to a condition.
 * @property {string} Confirm Opens the browser confirm dialog to ask a
 * question of the user.
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
 * @property {string} Prompt Opens a browser prompt dialog for user input.
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
  Alert: "alert",
  Confirm: "confirm",
  Copy: "copy",
  Focus: "focus",
  MoveBy: "move_by",
  MoveTo: "move_to",
  Paste: "paste",
  PostMessage: "post_message",
  Print: "print",
  Prompt: "prompt",
  ResizeBy: "resize_by",
  ResizeTo: "resize_to",
  Scroll: "scroll",
  ScrollBy: "scroll_by",
  ScrollTo: "scroll_to",
  Share: "share",
  Vibrate: "vibrate",
});

/**
 * FILL THIS IN
 * @readonly
 * @enum {string}
 */
export const AUDIO_REQUEST = Object.freeze({
  AudioPlayer: "audio_player",
  TextToSpeech: "text_to_speech",
});

/**
 * Provides the ability to connect to different server protocols via the
 * {@link network_connect} function.
 * @readonly
 * @enum {string}
 * @property {string} BroadcastChannel Creates a
 * {@link CBroadcastChannelProtocol} that allows
 * basic communication between browsing contexts (that is, windows, tabs,
 * frames, or iframes) and workers on the same origin.
 * @property {string} EventSource Creates a {@link CEventSourceProtocol}
 * that opens a persistent connection to an HTTP server, which sends events
 * in text/event-stream format.
 * @property {string} WebSocket Creates a {@link CWebSocketProtocol}
 * connection to a server supporting a bi-directional exchange of
 * information.
 * @property {string} WebRTC Creates a {@link CWebRtcProtocol} connecting
 * to allow for peer-to-peer communication (voice, video, etc) with other
 * users.
 */
export const CONNECT_REQUEST = Object.freeze({
  BroadcastChannel: "broadcast_channel",
  EventSource: "event_source",
  WebSocket: "web_socket",
  WebRTC: "web_rtc",
});

/**
 * Provides the request actions of the {@link runtime_defined} function call.
 * @readonly
 * @enum {string}
 * @property {string} AskRuntime When performing a search for a specific
 * definition on a particular object or globalThis namespace.
 * @property {string} Audio Determines if audio is available in the runtime.
 * @property {string} Browser Determine if the runtime is a Web Browser.
 * @property {string} Bun Determines if the runtime is Bun.
 * @property {string} Bluetooth Determines if bluetooth is available.
 * @property {string} Deno Determines if the runtime is Deno.
 * @property {string} MIDI Determines if MIDI devices are available.
 * @property {String} Node Determines if the runtime is Node.
 * @property {String} Orientation Determines if Orientation is available
 * (i.e. GPS and 3D space device orientation.)
 * @property {string} PWA Determines if the browser window represents an
 * installed Progressive Web Application.
 * @property {string} SerialPort Determines if SerialPort protocols are
 * available.
 * @property {string} SecureContext indicating whether the current context
 * is secure (true) or not (false).
 * @property {string} Share Determines if sharing is available to the
 * runtime.
 * @property {string} TextToSpeech Determines if text-to-speech is available
 * to the runtime.
 * @property {string} TouchEnabled Identifies if the browser is accessible
 * via a touch device.
 * @property {string} USB Determines if USB is available to the runtime.
 * @property {string} WorkerAvailable Determines if a Worker can be created
 * with the runtime.
 * @property {string} WorkerRuntime Determines if the runtime is a Worker.
 */
export const DEFINED_REQUEST = Object.freeze({
  AskRuntime: "ask_runtime",
  Audio: "audio",
  Browser: "browser",
  Bun: "bun",
  Bluetooth: "bluetooth",
  Deno: "deno",
  MIDI: "midi",
  Node: "node",
  Orientation: "orientation",
  PWA: "pwa",
  SerialPort: "serial_port",
  SecureContext: "secure_context",
  Share: "share",
  TextToSpeech: "text_to_speech",
  TouchEnabled: "touch_enabled",
  USB: "usb",
  WorkerAvailable: "worker_available",
  WorkerRuntime: "worker_runtime",
});

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

/**
 * Provides the request actions of the {@link runtime_document} function.
 * @readonly
 * @enum {string}
 * @property {string} CssVariable Will query the document for a CSS variable.
 * @property {string} ElementById Will query the document for a particular
 * HTMLElement.
 * @property {string} ElementsByClassName Will query for a collection of
 * HTMLElements by class name.
 * @property {string} ElementsByTagName Will query for a collection of
 * HTMLElements by tag name.
 * @property {string} IsIframe Will determine if the document is within an
 * iframe or not.
 */
export const DOCUMENT_REQUEST = Object.freeze({
  CssVariable: "css_variable",
  ElementById: "element_by_id",
  ElementsByClassName: "elements_by_class_name",
  ElementsByTagName: "elements_by_tag_name",
  IsIFrame: "is_iframe",
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
 * Holds the logger configuration information for log level and labels.
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
 * Provides the current state of the {@link CProtocol.state()} object.
 * @readonly
 * @enum {string}
 * @property {string} Error Signifies an onerror listener received an
 * ErrorEvent.
 * @property {string} Message Signifies a onmessage listener received a
 * MessageEvent that contains received data via its data property
 * @property {string} MessageError Signifies a onmessageerror listener
 * received MessageEvent containing an error accessible via its data
 * property.
 * @property {string} Open Signifies a {@link CProtocol} has opened a
 * connection to a distant system.
 * @property {string} Started Signifies a {@link CProtocol} object has been
 * constructed and is running.
 * @property {string} Terminated Signifies a {@link CProtocol} object has
 * been terminated and is no longer running.
 */
export const PROTOCOL_EVENT = Object.freeze({
  Error: "error",
  Message: "message",
  MessageError: "message_error",
  Open: "open",
  Started: "started",
  Terminated: "terminated",
});

/**
 * Provides the type of protocol for the {@link CProtocol.type()} object.
 * @readonly
 * @enum {string}
 * @property {string} BroadcastChannel Identifies a
 * {@link CBroadcastChannelProtocol} object.
 * @property {string} EventSource Identifies a {@link CEventSourceProtocol}
 * object.
 * @property {string} Orientation Identifies a {@link COrientationProtocol}
 * object.
 * @property {string} Timer Identifies a {@link CTimerProtocol} object.
 * @property {string} SerialPort Identifies a {@link CSerialPortProtocol}
 * object.
 * @property {string} WebSocket Identifies a {@link CWebSocketProtocol}
 * object.
 * @property {string} Worker Identifies a {@link CWorkerProtocol} object.
 */
export const PROTOCOL_TYPE = Object.freeze({
  BroadcastChannel: "broadcast_channel",
  EventSource: "event_source",
  Orientation: "orientation",
  Timer: "timer",
  SerialPort: "serial_port",
  WebSocket: "web_socket",
  Worker: "worker",
});

/**
 * Identifies the schema to {@link runtime_open} with the browser desktop
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
 * Identifies queryable requests via {@link runtime_screen} discover more about
 * your application running in the given browser.
 * @readonly
 * @enum {string}
 * @property {string} AvailableHeight the height of the screen, in pixels,
 * minus permanent or semipermanent user interface features displayed by
 * the operating system, such as the Taskbar on Windows.
 * @property {string} AvailableWidth the amount of horizontal space in
 * pixels available to the window.
 * @property {string} ColorDepth the color depth of the screen.
 * @property {string} DevicePixelRatio the ratio of the resolution in
 * physical pixels to the resolution in CSS pixels for the current display
 * device.
 * @property {string} Height the height of the screen in pixels.
 * @property {string} InnerHeight the interior height of the window in
 * pixels, including the height of the horizontal scroll bar, if present.
 * @property {string} InnerWidth interior width of the window in pixels
 * (that is, the width of the window's layout viewport). That includes the
 * width of the vertical scroll bar, if one is present.
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
export const SCREEN_REQUEST = Object.freeze({
  AvailableHeight: "available_height",
  AvailableWidth: "available_width",
  ColorDepth: "color_depth",
  DevicePixelRatio: "device_pixel_ratio",
  Height: "height",
  InnerHeight: "inner_height",
  InnerWidth: "inner_width",
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
 * Provides the support to the {@link CSerialPortProtocol.post_message} serial
 * port communications.
 * @enum {string}
 * @property {string} Break Sends a break signal (boolean) to the port.
 * @property {string} CarrierDetect Line control status of the port reported
 * as { carrier_detect: boolean }
 * @property {string} ClearToSend Line control status of the port reported
 * as { clear_to_send: boolean }
 * @property {string} DataBytesRead Read data from the serial port reported
 * as { data_bytes_read: Uint8Array }
 * @property {string} DataBytesWrite Writes data to the serial port.
 * @property {string} DataSetReady Line control status of the port reported
 * as { data_set_ready: boolean }
 * @property {string} DataTerminalReady Sends a data terminal ready
 * (boolean) signal to the port.
 * @property {string} RequestToSend Sends a request to send signal
 * (boolean) to the port.
 * @property {string} RingIndicator Line control status of the port reported
 * as { ring_indicator: boolean }
 */
export const SERIAL_PORT_DATA_REQUEST = Object.freeze({
  Break: "break",
  CarrierDetect: "carrier_detect",
  ClearToSend: "clear_to_send",
  DataBytesRead: "data_bytes_read",
  DataBytesWrite: "data_bytes_write",
  DataSetReady: "data_set_ready",
  DataTerminalReady: "data_terminal_ready",
  RequestToSend: "request_to_send",
  RingIndicator: "ring_indicator",
});

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

/**
 * Supports the target parameter of the {@link runtime_open} action which handles
 * opening related apps based on the specified {@link SCHEMA_TYPE}.
 * @readonly
 * @enum {string}
 * @property {string} Blank Opens the linked document in a new window or tab
 * @property {string} Parent Opens the linked document in the same frame as
 * it was clicked (this is default)
 * @property {string} Self Opens the linked document in the parent frame
 * @property {string} Top Opens the linked document in the full body of the window
 */
export const TARGET_TYPE = Object.freeze({
  Blank: "_blank",
  Parent: "_parent",
  Self: "_self",
  Top: "_top",
});

// ============================================================================
// [MODULE CALLBACKS] =========================================================
// ============================================================================

/**
 * The event handler utilized within a given JavaScript runtime. This
 * represents a global event handler that should suffice any JavaScript
 * event callback.
 * @callback CEventHandler
 * @param {Event} evt The event object that was triggered
 * @returns {void}
 */

/**
 * A log handler for further processing of a logged event.
 * @callback CLogHandler
 * @param {CLogRecord} record The record logged.
 * @returns {void}
 */

/**
 * Supports the {@link CProtocol} for data received as part of a
 * protocol.
 * @callback CProtocolEventHandler
 * @param {CProtocolEvent} evt The event handled by a given protocol.
 */

/**
 * The task to run as part of the {@link async_task} call.
 * @callback CTaskCB
 * @param {any} [data] Optional data to pass to the task.
 * @returns {any} The result of the task completing.
 */

// ============================================================================
// [MODULE UTILITY OBJECTS] ===================================================
// ============================================================================

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
  static MISUSE = "codemelted.js module logic was not used properly!";

  /**
   * Identifies a not implemented feature of the module.
   * @readonly
   * @type {string}
   */
  static NOT_IMPLEMENTED = "NOT IMPLEMENTED LOGIC. DO NOT CALL!";

  /**
   * Identifies an unexpected parameter type with a module function call.
   * @readonly
   * @type {string}
   */
  static TYPE_VIOLATION = "codemelted.js module encountered a parameter " +
    "of an unexpected type!";

  /**
   * Identifies an unsupported JavaScript runtime was called with a public
   * function.
   * @readonly
   * @type {string}
   */
  static UNSUPPORTED_RUNTIME =  "codemelted.js module function called " +
    "on an unsupported JavaScript runtime!";

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
 * Supports the module public facing APIs to hold state necessary for tracking
 * for initialization and or settings necessary to support the public API
 * functions.
 * @private
 */
class ModuleUtils {
  /**
   * Holds the logger level object for module logging.
   * One of the {@link LOGGER} settings.
   * @type {object}
   */
   static logger_level = LOGGER.Error;

  /**
   * Holds the logger handler for post logging events.
   * @type {CLogHandler?}
   */
  static logger_handler = null;

  /**
   * Helper function for the {@link runtime_defined} to search for properties
   * within the runtime.
   * @param {object} params The named parameters.
   * @param {string} params.property The name of the property to find on the given
   * object.
   * @param {object} [params.obj = globalThis] The object to identify if the given
   * property exists on it.
   * @returns true if property defined on object, false otherwise.
   */
  static is_defined({property, obj = globalThis}) {
    json_check_type({type: "string", data: property, should_throw: true});
    if (json_check_type({type: "object", data: obj})) {
      return property in obj;
    }
    return false;
  }
}

// ============================================================================
// [MODULE DATA CLASSES] ======================================================
// ============================================================================

/**
 * The resulting object from the {@link async_task} function call with a
 * promise of the future {@link CResult}.
 * @template T The data associated with the CResult object accessed via the
 * result() function call.
 */
export class CFuture {
  /** @type {any} */
  #data;
  /** @type {number} */
  #delay;
  /** @type {CTaskCB} */
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
    }
  }

  /**
   * Allows for re-execution of the CFuture wrapped task.
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
   * @param {CTaskCB} params.task The task to run.
   * @param {any} [params.data] The optional data to pass to the task.
   * @param {number} [params.delay=0] The delay to schedule the task in the
   * future.
   */
  constructor({task, data, delay = 0}) {
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
 * Represents the geodetic data captured from the [COrientationProtocol]
 * object when created via the [hw_request_orientation] function call.
 */
export class CGeodeticData {
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
   * @param {CGeodeticData} p The secondary point to determine the distance.
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
   * @param {CGeodeticData} p The secondary point to determine heading.
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
   * @param {CGeodeticData} p The secondary point to determine speed.
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
   * Default constructor
   */
  constructor() { }
}

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
      json_has_key({data: level, key: "level", should_throw: true});
      json_has_key({data: level, key: "label", should_throw: true});
      this.#level = level;
      this.#data = data;
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError("CLogRecord construction error.", err);
    }
  }
}

/**
 * Support object for the {@link CProtocol} and any other object to
 * provide a result where either the value or the error can be signaled for
 * later checking by a user.
 * @template T
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
      } else if (typeof error === "object") {
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
 * An event handled by a implementing {@link CProtocol} object via their
 * individually implemented protocol specific handlers to bubble up events
 * in a common manner via the {@link CProtocolEventHandler}.
 * @extends {CResult<MessageEvent>}
 */
export class CProtocolEvent extends CResult {
  /** @type {PROTOCOL_EVENT} */
  #event_fired;
  /** @type {CProtocol} */
  #protocol;

  /**
   * Retrieves the event fired from within {@link CProtocol} that created
   * this event.
   * @returns {PROTOCOL_EVENT}
   */
  event_fired() { return this.#event_fired; }

  /**
   * Retrieves a reference to the protocol that fired the event.
   * @returns {CProtocol}
   */
  protocol() { return this.#protocol; }

  /**
   * Constructor for the event.
   * @param {object} params The named parameters.
   * @param {CProtocol} params.protocol The protocol that handled the event.
   * @param {PROTOCOL_EVENT} params.event_fired The event that fired
   * that produced this event.
   * @param {any} [params.value] The value associated with the result.
   * @param {any} [params.error] The error associated with the result.
   */
  constructor({protocol, event_fired, error=null, value=null}) {
    try {
      super({error: error, value: value});
      json_check_type({type: "string", data: event_fired, should_throw: true});
      json_check_type({type: CProtocol, data: protocol, should_throw: true});
      this.#event_fired = event_fired;
      this.#protocol = protocol;
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError("CProtocolEvent construction error.", err);
    }
  }
}

// ============================================================================
// [MODULE PROTOCOLS] =========================================================
// ============================================================================

/**
 * Defines the "rules" for objects that will setup a protocol that directly
 * exchanges data with an external item, will continuously run until
 * terminated, requires the ability to know it is running, and get any
 * errors that have occurred during its run.
 */
export class CProtocol {
  /** @type {string} */
  #id = "";
  /** @type {CProtocolEventHandler} */
  #rx_handler;
  /** @type {PROTOCOL_TYPE} */
  #type;
  /** @type {boolean} */
  #is_running = false;

  /**
   * Helper function to process received data on a protocol.
   * @protected
   * @param {object} params The named parameters for the object.
   * @param {boolean} [params.terminated=false] true if terminated, false
   * otherwise.
   * @param {PROTOCOL_EVENT} params.event_fired The event that occurred with
   * the protocol.
   * @param {any} [params.value] The value associated with the result.
   * @param {any} [params.error] The error associated with the result.
   * @returns {void}
   */
  on_data_rx({event_fired, error, value}) {
    this.#is_running = event_fired != PROTOCOL_EVENT.Terminated;
    let evt = new CProtocolEvent({
      protocol: this,
      event_fired: event_fired,
      error: error,
      value: value
    });
    this.#rx_handler(evt);
  }

  /**
   * A unique ID for the protocol.
   * @returns {string}
   */
  id() { return this.#id; }

  /**
   * Determines if the protocol is running or terminated.
   * @returns {boolean} true if running, false if terminated.
   */
  is_running() { return this.#is_running; }

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
   * @param {string} params.id Identification for the protocol for debugging
   * purposes.
   * @param {CProtocolEventHandler} params.rx_handler The callback for
   * received data.
   * @param {PROTOCOL_TYPE} params.type The type of protocol.
   */
  constructor({id, rx_handler, type}) {
    try {
      json_check_type({type: "string", data: id, should_throw: true});
      json_check_type({
        type: "function",
        data: rx_handler,
        count: 2,
        should_throw: true
      });
      json_check_type({type: "string", data: type, should_throw: true});
      this.#id = id;
      this.#rx_handler = rx_handler;
      this.#type = type;
      this.#is_running = true;
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError("CProtocol construction error.", err);
    }
  }
}

/**
 * This protocol represents a named channel that any browsing context of a
 * given origin can subscribe to. It allows communication between different
 * documents (in different windows, tabs, frames, iframes, or worker) of the
 * same origin. {@link network_connect} creates this protocol.
 * @extends {CProtocol}
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
      if (!this.is_running()) {
        throw new CModuleError(CModuleError.MISUSE);
      }
      this.#channel.postMessage(data);
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError("CBroadcastChannel.post_message() error", err);
    }
  }

  /**
   * @inheritdoc
   * @override
   */
  terminate() {
    try {
      if (!this.is_running()) {
        throw new CModuleError(CModuleError.MISUSE);
      }
      this.#channel.close();
      this.on_data_rx({
        terminated: true,
        event_fired: PROTOCOL_EVENT.Terminated
      });
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError(
        "CBroadcastChannelProtocol.terminate() error",
        err
      );
    }
  }

  /**
   * Constructor for the protocol.
   * @param {object} params The named parameters.
   * @param {string} params.url The URL to connect this broadcast channel on.
   * @param {CProtocolEventHandler} params.rx_handler The handler to receive
   * data from the protocol.
   */
  constructor({url, rx_handler}) {
    super({
      id: `CBroadcastChannel-${url}`,
      rx_handler: rx_handler,
      type: PROTOCOL_TYPE.BroadcastChannel
    });
    try {
      if (!ModuleUtils.is_defined({property: "BroadcastChannel"})) {
        throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
      }
      this.#channel = new globalThis.BroadcastChannel(url);
      this.#channel.onmessage = (evt) => {
        this.on_data_rx({event_fired: PROTOCOL_EVENT.Message, value: evt});
      };
      this.#channel.onmessageerror = (evt) => {
        this.on_data_rx({
          event_fired: PROTOCOL_EVENT.MessageError,
          error: evt
        });
      };
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError("CBroadcastChannel construction error.", err);
    }
  }
}

/**
 * Opens a persistent connection to an HTTP server, which sends events in
 * text/event-stream format. The connection remains open until terminate is
 * called. {@link network_connect} creates this protocol.
 * @extends {CProtocol}
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
      if (!this.is_running()) {
        throw new CModuleError(CModuleError.MISUSE);
      }
      this.#sse.close();
      this.on_data_rx({event_fired: PROTOCOL_EVENT.Terminated});
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError(
        "CEventSourceProtocol construction error.",
        err
      );
    }
  }

  /**
   * Constructor for the protocol.
   * @param {object} params The named parameters.
   * @param {string} params.url URL of the server sending the events.
   * @param {CProtocolEventHandler} params.rx_handler The protocol handler
   * to receive those events.
   */
  constructor({url, rx_handler}) {
    super({
      id: `CEventSourceProtocol-${url}`,
      rx_handler: rx_handler, type: PROTOCOL_TYPE.EventSource
    });
    try {
      if (!ModuleUtils.is_defined({property: "EventSource"})) {
        throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
      }
      this.#sse = new globalThis.EventSource(url);
      this.#sse.onerror = (evt) => {
        this.on_data_rx({event_fired: PROTOCOL_EVENT.Error, error: evt});
      };
      this.#sse.onmessage = (evt) => {
        this.on_data_rx({event_fired: PROTOCOL_EVENT.Message, value: evt});
      };
      this.#sse.onopen = (evt) => {
        this.on_data_rx({event_fired: PROTOCOL_EVENT.Open, value: evt});
      };
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError("CEventSourceProtocol error.", err);
    }
  }
}

/**
 * Creates the ability to get a devices geodetic orientation
 * (GPS location, 3D orientation). Protocol created via the
 * {@link hw_request_orientation} function call.
 * @extends {CProtocol}
 */
export class COrientationProtocol extends CProtocol {
  /** @type {CGeodeticData} */
  #data = new CGeodeticData();
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
      if (this.state() == PROTOCOL_EVENT.Terminated) {
        throw new CModuleError(CModuleError.MISUSE);
      }
      // @ts-ignore Object exists in browser runtime.
      globalThis.navigator.geolocation.clearWatch(this.#watch_id);
      this.#watch_id = -1;
      // @ts-ignore Object exists in browser runtime.
      globalThis.removeEventListener(
        "deviceorientation",
        this.#on_device_orientation
      );
      this.on_data_rx({state: PROTOCOL_EVENT.Terminated});
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError("COrientationProtocol.terminate() error.", err);
    }
  }

  /**
   * Constructor for the protocol.
   * @param {object} params The named parameters.
   * @param {CProtocolEventHandler} params.rx_handler The handler to receive
   * data.
   * @param {object} [params.options={}] Options specific to the  protocol.
   */
  constructor({rx_handler, options={}}) {
    super({
      id: "COrientationProtocol",
      rx_handler: rx_handler,
      type: PROTOCOL_TYPE.Orientation
    });
    try {
      if (!ModuleUtils.is_defined({property: "geolocation",
                                   obj: globalThis["navigator"]})) {
        throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
      }
      json_check_type({type: "object", data: options, should_throw: true});
      // @ts-ignore Object exists in browser runtime.
      this.#on_device_orientation =
        (/** @type {DeviceOrientationEvent} */ evt) => {
          this.#data.update(evt);
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
          this.on_data_rx({
            state: PROTOCOL_EVENT.Message,
            value: Object.assign({}, this.#data)
          });
        },
        // @ts-ignore This will work in Browser runtime.
        (/** @type {GeolocationPositionError} */evt) => {
          this.on_data_rx({state: PROTOCOL_EVENT.MessageError, error: evt});
        },
        options
      );
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError("COrientationProtocol construction error.", err);
    }
  }
}

/**
 * Creates a protocol allowing communication with an attached serial port
 * device. Provides the ability to interact with the device setting signals
 * data, and querying the current line status of the port. This is all
 * handled via the {@link SERIAL_PORT_DATA_REQUEST} via
 * the post_message() call.
 * @extends {CProtocol}
 */
export class CSerialPortProtocol extends CProtocol {
  /** @type {SerialPort} */
  #port;

  /**
   * Carries out either a request for data from an open serial port or to send
   * data to that open port.
   * @override
   * @param {object} params The named parameters.
   * @param {SERIAL_PORT_DATA_REQUEST} params.request The request to make of the
   * protocol.
   * @param {any} [params.data] Any data associated with the given request.
   * @returns {Promise<void>}
   */
  async post_message({request, data}) {
    try {
      if (this.state() === PROTOCOL_EVENT.Terminated) {
        throw new CModuleError(CModuleError.MISUSE);
      }
      let resp = null;
      switch (request) {
        case SERIAL_PORT_DATA_REQUEST.Break:
          json_check_type({
            type: "boolean",
            data: data,
            should_throw: true
          });
          await this.#port.setSignals("break", data);
          break;
        case SERIAL_PORT_DATA_REQUEST.CarrierDetect:
          resp = await this.#port.getSignals();
          this.on_data_rx({
            state: PROTOCOL_EVENT.Message,
            value: {carrier_detect: resp["carrierDetect"]}
          });
          break;
        case SERIAL_PORT_DATA_REQUEST.ClearToSend:
          resp = await this.#port.getSignals();
          this.on_data_rx({
            state: PROTOCOL_EVENT.Message,
            value: {clear_to_send: resp["clearToSend"]}
          });
          break;
        case SERIAL_PORT_DATA_REQUEST.DataBytesRead:
          if (!this.#port.readable) {
            this.on_data_rx({
              state: PROTOCOL_EVENT.Message,
              value: {data_bytes_read: new Uint8Array()}
            });
          }
          const reader = this.#port.readable.getReader();
          // @ts-ignore This will exist in the browser runtime.
          const { value, done } = await reader.read();
          reader.releaseLock();
          this.on_data_rx({
            state: PROTOCOL_EVENT.Message,
            value: {data_bytes_read: value}
          });
          break;
        case SERIAL_PORT_DATA_REQUEST.DataBytesWrite:
          json_check_type({
            type: Uint8Array,
            data: data,
            should_throw: true
          });
          const writer = this.#port.writable.getWriter();
          await writer.write(data);
          writer.releaseLock();
          break;
        case SERIAL_PORT_DATA_REQUEST.DataSetReady:
          resp = await this.#port.getSignals();
          this.on_data_rx({
            state: PROTOCOL_EVENT.Message,
            value: {data_set_ready: resp["dataSetReady"]}
          });
          break;
        case SERIAL_PORT_DATA_REQUEST.DataTerminalReady:
          json_check_type({
            type: "boolean",
            data: data,
            should_throw: true
          });
          await this.#port.setSignals("dataTerminalReady", data);
          break;
        case SERIAL_PORT_DATA_REQUEST.RequestToSend:
          json_check_type({
            type: "boolean",
            data: data,
            should_throw: true
          });
          await this.#port.setSignals("requestToSend", data);
          break;
        case SERIAL_PORT_DATA_REQUEST.RingIndicator:
          resp = await this.#port.getSignals();
          this.on_data_rx({
            state: PROTOCOL_EVENT.Message,
            value: {ring_indicator: resp["ringIndicator"]}
          });
          break;
        default:
          throw new CModuleError(CModuleError.MISUSE);
      }
    } catch (err) {
      if (err instanceof CModuleError) {
        CModuleError.handle_error(err);
      }
      this.on_data_rx({state: PROTOCOL_EVENT.MessageError, error: err});
    }
  }

  /**
   * @inheritdoc
   * @override
   */
  terminate() {
    try {
      if (this.state() === PROTOCOL_EVENT.Terminated) {
        throw new CModuleError(CModuleError.MISUSE);
      }
      this.#port.close();
      this.on_data_rx({state: PROTOCOL_EVENT.Terminated});
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError(
        "CSerialPortProtocol.terminate() error.",
        err
      );
    }
  }

  /**
   * Constructor for the protocol.
   * @param {object} params The named parameters.
   * @param {CProtocolEventHandler} params.rx_handler  The receive handler
   * for data from the protocol.
   * @param {SerialPort} params.port The physical serial port opened by the
   * protocol.
   */
  constructor({rx_handler, port}) {
    super({
      id: `CSerialPortProtocol_${port.getInfo().usbVendorId}` +
      `_${[port.getInfo().usbProductId]}`,
      rx_handler: rx_handler,
      type: PROTOCOL_TYPE.SerialPort
    });
    try {
      if (!ModuleUtils.is_defined({property: "serial",
                                   obj: globalThis["navigator"]})) {
        throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
      }
      // @ts-ignore SerialPort exists as a type in Browser context.
      json_check_type({type: SerialPort, data: port, should_throw: true});
      this.#port = port;
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError(
        "CSerialPortProtocol construction error.",
        err
      );
    }
  }
}

/**
 * Creates an asynchronous timer that fires on the specified interval until
 * terminated. Created via the {@link async_timer} call.
 * @extends {CProtocol}
 */
export class CTimerProtocol extends CProtocol {
  /** @type {number} */
  #timer_id = -1;

  /**
   * @inheritdoc
   * @override
   */
  terminate() {
    try {
      if (this.state() == PROTOCOL_EVENT.Terminated) {
        throw new CModuleError(CModuleError.MISUSE);
      }
      globalThis.clearInterval(this.#timer_id);
      this.#timer_id = -1;
      this.on_data_rx({state: PROTOCOL_EVENT.Terminated});
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError("CTimerProtocol terminate error.", err);
    }
  }

  /**
   * Constructor for the protocol.
   * @param {object} params The named parameters.
   * @param {CProtocolEventHandler} params.rx_handler Handler for the
   * protocol.
   * @param {number} params.interval How often to fire the timer.
   */
  constructor({rx_handler, interval}) {
    super({
      id: `CTimerProtocol-${interval}`,
      rx_handler: rx_handler,
      type: PROTOCOL_TYPE.Timer
    });
    try {
      json_check_type({type: "number", data: interval, should_throw: true});
      // @ts-ignore node returns an object.
      this.#timer_id = globalThis.setInterval(() => {
        try {
          this.on_data_rx({state: PROTOCOL_EVENT.Message,
                           value: "timer_expired"});
        } catch (err) {
          CModuleError.handle_error(err);
          throw new CModuleError("CTimerProtocol on_data_rx() error.", err);
        }
      }, interval);
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError("CTimerProtocol construction error.", err);
    }
  }
}

/**
 * Creates a WebSocket connection to a server allowing a dedicated
 * bi-directional exchange of data. This socket will continuously attempt
 * reconnecting to the server on connection loss until the protocol is
 * terminated. {@link network_connect} creates this protocol.
 * @extends {CProtocol}
 */
export class CWebSocketProtocol extends CProtocol {
  /** @type {string} */
  #url;
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
   * @param {string | ArrayBuffer | Blob } data Data to send to the server
   * for further processing.
   * @returns {void}
   */
  post_message(data) {
    try {
      if (this.state() === PROTOCOL_EVENT.Terminated) {
        throw new CModuleError(CModuleError.MISUSE);
      }
      this.#socket.send(data);
    } catch (err) {
      if (err instanceof CModuleError) {
        CModuleError.handle_error(err);
        throw new CModuleError(
          "CWebSocketProtocol.post_message() error.",
          err
        );
      }
      this.on_data_rx({state: PROTOCOL_EVENT.Error, error: err});
    }
  }

  /**
   * @inheritdoc
   * @override
   */
  terminate() {
    try {
      if (this.state() === PROTOCOL_EVENT.Terminated) {
        throw new CModuleError(CModuleError.MISUSE);
      }
      this.#socket.close();
      this.on_data_rx({state: PROTOCOL_EVENT.Terminated});
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError("CWebSocketProtocol.terminate() error.", err);
    }
  }

  /**
   * Handles creating a web socket to connect to a server.
   */
  #connect_socket() {
    // @ts-ignore URL will not be null.
    this.#socket = new globalThis.WebSocket(this.#url);
    this.#socket.onmessage = (evt) => {
      this.on_data_rx({state: PROTOCOL_EVENT.Message, value: evt});
    }
    this.#socket.onerror = (evt) => {
      this.on_data_rx({state: PROTOCOL_EVENT.Error, error: evt});
    }
    this.#socket.onclose = (evt) => {
      this.on_data_rx({state: PROTOCOL_EVENT.Message, value: evt});
      this.#socket.close();
      this.#connect_socket();
    }
  }

  /**
   * Constructor for the protocol.
   * @param {object} params The named parameters.
   * @param {string} params.url The URL of the server to connect.
   * @param {CProtocolEventHandler} params.rx_handler The handler for
   * receiving data from this protocol.
   */
  constructor({url, rx_handler}) {
    super({
      id: `CWebSocketProtocol-${url}`,
      rx_handler: rx_handler,
      type: PROTOCOL_TYPE.WebSocket
    });
    try {
      if (!ModuleUtils.is_defined({property: "WebSocket"})) {
        throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
      }
      json_check_type({type: "string", data: url, should_throw: true});
      this.#url = url;
      this.#connect_socket();
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError("CWebSocketProtocol construction error.", err);
    }
  }
}

/**
 * <mark>UNDER DEVELOPMENT - DO NOT USE</mark>
 * @extends {CProtocol}
 */
export class CWebRtcProtocol extends CProtocol {

}

/**
 * Constructs a dedicated background worker off the JavaScript runtime main
 * thread. Object constructed via the {@link async_worker} call.
 * @extends {CProtocol}
 */
export class CWorkerProtocol extends CProtocol {
  /** @type {Worker} */
  #worker;

  /**
   * Data specific to how you construct your dedicated background worker.
   * @override
   * @param {any} data The data to send to the background worker.
   * @returns {void}
   */
  post_message(data) {
    try {
      if (this.state() == PROTOCOL_EVENT.Terminated) {
        throw new CModuleError(CModuleError.MISUSE);
      }
      this.#worker.postMessage(data);
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError("CWorkerProtocol.post_message() error.", err);
    }
  }

  /**
   * @inheritdoc
   * @override
   */
  terminate() {
    try {
      if (this.state() == PROTOCOL_EVENT.Terminated) {
        throw new CModuleError(CModuleError.MISUSE);
      }
      this.#worker.terminate();
      this.on_data_rx({state: PROTOCOL_EVENT.Terminated});
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError("CWorkerProtocol.terminate() error.", err);
    }
  }

  /**
   * Constructs a worker protocol for asynchronous processing off the main
   * runtime thread.
   * @param {object} params The named parameters.
   * @param {string} params.url A unique ID for the protocol.
   * @param {CProtocolEventHandler} params.rx_handler The receive handler
   * for data and state changes
   * @param {object} [params.options] Options for further configuration of
   * the worker.
   */
  constructor({url, rx_handler, options = {type: "module"}}) {
    super({
      id: `Worker-${url}`,
      rx_handler: rx_handler,
      type: PROTOCOL_TYPE.Worker
    });
    try {
      if (!ModuleUtils.is_defined({property: "Worker"})) {
        throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
      }
      json_check_type({type: "string", data: url, should_throw: true});
      json_check_type({type: "object", data: options, should_throw: true});
      this.#worker = new globalThis.Worker(
        new URL(url, import.meta.url).href,
        options
      );
      this.#worker.onerror = (evt) => {
        this.on_data_rx({state: PROTOCOL_EVENT.Error, error: evt});
        evt.preventDefault();
      }
      this.#worker.onmessageerror = (evt) => {
        this.on_data_rx({state: PROTOCOL_EVENT.MessageError, error: evt});
        evt.preventDefault();
      }
      this.#worker.onmessage = (evt) => {
        this.on_data_rx({state: PROTOCOL_EVENT.Message, value: evt});
        evt.preventDefault();
      }
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError("CWorkerProtocol construction error.", err);
    }
  }
}

// ============================================================================
// [ASYNC I/O UC FUNCTIONS] ===================================================
// ============================================================================

/**
 * Will put a currently running async task to sleep for a specified delay
 * in milliseconds.
 * @param {number} delay Time is milliseconds to delay the task.
 * @returns {Promise<void>} The promise to await on for the delay.
 * A rejected promise represents an API violation.
 * @example
 * // From within an async function, sleep 2 seconds.
 * await codemelted.async_sleep(2000);
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
      reject(`async_sleep() error. ${err}`);
    }
  });
}

/**
 * Will execute an asynchronous task and get its result in the future.
 * @template T
 * @param {object} params The named parameters.
 * @param {CTaskCB} params.task The task to run.
 * @param {any} [params.data] The optional data to pass to the task.
 * @param {number} [params.delay=0] The delay to schedule the task in the
 * future.
 * @param {boolean} [params.execute=true] Flag to indicate to immediately
 * execute the future or not to execute it and leave it to developer's
 * choice.
 * @returns {CFuture<CResult<T>>} An object to execute the asynchronous task. You can
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
export function async_task({task, data, delay = 0, execute=true}) {
  try {
    let future = new CFuture({task: task, data: data, delay: delay});
    if (execute) {
      future.execute();
    }
    return future;
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("async_task() error.", err);
  }
}

/**
 * Creates an asynchronous timer protocol on the main thread.
 * @param {object} params The named parameters.
 * @param {CProtocolEventHandler} params.rx_handler The handler to run when
 * the timer expires on the interval.
 * @param {number} params.interval The interval in milliseconds to repeat
 * the given task.
 * @returns {CTimerProtocol} The timer that runs the task on
 * the specified interval.
 * @example
 * // Schedule a repeating task on a quarter second interval.
 * let counter = 0;
 * let timer = async_timer({
 *   task: (protocol, result) => { counter += 1; },
 *   interval: 250,
 * });
 * await async_sleep(1000);
 * console.log("counter = ", counter); // Should be roughly 4
 * timer.terminate();
 */
export function async_timer({rx_handler, interval}) {
  try {
    return new CTimerProtocol({rx_handler: rx_handler, interval: interval});
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("async_timer() error.", err);
  }
}

/**
 * Constructs a dedicated background worker off the main JS runtime thread.
 * @param {object} params The named parameters.
 * @param {string} params.url The URL of the dedicated worker.
 * @param {CProtocolEventHandler} params.rx_handler The receive handler to receive
 * events back from the dedicated worker.
 * @param {object} [params.options={type: "module"}] Options to specify with
 * the construction of the worker. Defaults to ES6 module type worker.
 * @returns {CWorkerProtocol}
 * @example
 * // Construct a dedicated background worker
 * let rx_handler = (protocol, result) => {
 *   // Do your processing.
 * };
 * let protocol = async_worker({
 *  url: "path/to/worker.js",
 *  rx_handler: rx_handler,
 * });
 *
 * // During processing
 * protocol.post_message({data: 42});
 *
 * // Terminate it
 * protocol.terminate();
 */
export function async_worker({url, rx_handler, options = {type: "module"}}) {
  try {
    return new CWorkerProtocol({
      url: url,
      rx_handler: rx_handler,
      options: options
    });
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("async_worker() error.", err);
  }
}

// ============================================================================
// [DB UC FUNCTIONS] ==========================================================
// ============================================================================

/**
 * <mark>FUTURE DEVELOPMENT. DO NOT USE!</mark>
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
// [Disk UC FUNCTIONS] ========================================================
// ============================================================================

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
  try {
    // Validate the data before attempting the save
    if (!runtime_defined({request: DEFINED_REQUEST.Browser})) {
      throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
    } else if (!(data_type in DISK_DATA_TYPE)) {
      throw new CModuleError(
        `${CModuleError.MISUSE}: ${data_type} specified not supported`
      );
    }
    json_check_type({type: "string", data: accept, should_throw: true});

    // Go read the file from disk.
    return new Promise((resolve) => {
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
    });
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("disk_read_file() error.", err);
  }
}

/**
 * Will save the specified data to a filename in the operating system
 * download directory.
 * @param {object} params The named parameters.
 * @param {ArrayBuffer | string | Uint8Array} params.data The data to write
 * to disk.
 * @param {string} params.filename What to call the file in the download
 * directory.
 * @returns {Promise<CResult<null>>} The result of the save.
 * @see https://web.dev/patterns/files/save-a-file
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
  try {
    // Validate the data before attempting the save
    if (!runtime_defined({request: DEFINED_REQUEST.Browser})) {
      throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
    }
    const valid_type = json_check_type({type: ArrayBuffer, data: data}) ||
      json_check_type({type: "string", data: data}) ||
      json_check_type({type: Uint8Array, data: data});
    if (!valid_type) {
      throw new CModuleError(CModuleError.TYPE_VIOLATION);
    }
    json_check_type({type: "string", data: filename, should_throw: true});

    // Spawn an immediate executing future to attempt the save.
    return new Promise((resolve, reject) => {
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
        globalThis.document.body.append(a);
        a.click();
        setTimeout(() => {
          URL.revokeObjectURL(blobURL);
          a.remove();
          resolve(new CResult());
        }, 1000);
      } catch (err) {
        resolve(new CResult({error: err}));
      }
    });
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("disk_write_file() error.", err);
  }
}

// ============================================================================
// [HW UC FUNCTIONS] ==========================================================
// ============================================================================

/**
 * <mark>FUTURE DEVELOPMENT. DO NOT USE!</mark>
 * @example
 * // TBD
 */
export function hw_request_bluetooth() {
  // TODO: Develop actual protocol against CProtocol
  try {
    throw new CModuleError(CModuleError.NOT_IMPLEMENTED);
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("hw_request_bluetooth() error.", err);
  }
}

/**
 * <mark>FUTURE DEVELOPMENT. DO NOT USE!</mark>
 * @example
 * // TBD
 */
export function hw_request_midi() {
  // TODO: Develop actual protocol against CProtocol
  try {
    throw new CModuleError(CModuleError.NOT_IMPLEMENTED);
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("hw_request_midi() error.", err);
  }
}

/**
 * Requests a device orientation protocol to retrieve the devices current
 * geodetic orientation in 3D space.
 * @param {object} params The named parameters.
 * @param {CProtocolEventHandler} params.rx_handler The handler for received data.
 * @param {object} [params.options = {}] The options for tuning the protocol to
 * watch for geolocation position updates.
 * @return {COrientationProtocol} The protocol that handles
 * device orientation changes until terminated.
 * @example
 * // TBD
 */
export function hw_request_orientation({rx_handler, options = {}}) {
  try {
    return new COrientationProtocol({
      rx_handler: rx_handler,
      options: options
    });
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("hw_request_bluetooth() error.", err);
  }
}

/**
 * Provides the mechanism to request permission to connect to an attached
 * serial port device.
 * @param {CProtocolEventHandler} rx_handler Handler to receive processed serial
 * port data. See {@link SERIAL_PORT_DATA_REQUEST} for what the data would
 * look like when calling CSerialPortProtocol.post_message().
 * @returns {Promise<CSerialPortProtocol?>} The requested
 * connected serial port or null if request was canceled or could not be
 * connected.
 * @example
 * // Determine if serial port processing is supported.
 * const handler = (protocol, data) => {
 *  // Do something with received data.
 * };
 * const supported = runtime_defined({request: DEFINED_REQUEST.SerialPort});
 * if (supported) {
 *   const port = await hw_request_serial_port(handler);
 *   if (port) {
 *     // Do something with port
 *   }
 * }
 */
export async function hw_request_serial_port(rx_handler) {
  try {
    if (!runtime_defined({request: DEFINED_REQUEST.SerialPort})) {
      throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
    }
    // @ts-ignore This is available in some web browsers
    const port = await globalThis.navigator.serial.requestPort();
    return new CSerialPortProtocol({
      rx_handler: rx_handler,
      port: port
    });
   } catch (err) {
    if (err instanceof CModuleError) {
      CModuleError.handle_error(err);
      throw new CModuleError("hw_request_serial_port() error.", err);
    }
    return null;
  }
}

/**
 * <mark>FUTURE DEVELOPMENT. DO NOT USE!</mark>
 * @example
 * // TBD
 */
export function hw_request_usb() {
  // TODO: Develop actual protocol against CProtocol
  try {
    throw new CModuleError(CModuleError.NOT_IMPLEMENTED);
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("hw_request_bluetooth() error.", err);
  }
}

// ============================================================================
// [JSON UC FUNCTIONS] ========================================================
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
 * @param {object} params.data The object to check.
 * @param {string} params.key The property to find.
 * @param {boolean} [params.should_throw=false] Whether to throw instead
 * of returning a value upon failure.
 * @returns {boolean} true if property was found, false otherwise.
 * @example
 * // Check if object has field
 * if (json_has_key({data: obj, key: "id"})) {
 *   // Do your processing
 * }
 *
 * // Throw if not expected
 * json_has_key({data: obj, key: "id", should_throw: true});
 */
export function json_has_key({data, key, should_throw = false}) {
  try {
    json_check_type({type: "object", data: data, should_throw: true});
    json_check_type({type: "string", data: key, should_throw: true});
    var hasKey = key in data;
    if (should_throw && !hasKey) {
      throw new CModuleError(CModuleError.TYPE_VIOLATION);
    }
    return hasKey;
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
// [LOGGER UC FUNCTIONS] ======================================================
// ============================================================================

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
      ModuleUtils.logger_handler = null;
    } else {
      json_check_type({
        type: "function",
        data: handler,
        count: 1,
        should_throw: true
      });
      ModuleUtils.logger_handler = handler;
    }
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("logger_handler() error.", err);
  }
}

/**
 * Sets / retrieves the current module log level.
 * @param {object | undefined} [level] The optional log level to set
 * based on the {@link codemelted LOGGER} object configuration.
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
      json_has_key({data: level, key: "level", should_throw: true});
      json_has_key({data: level, key: "label", should_throw: true});
      ModuleUtils.logger_level = level;
    }
    // @ts-ignore Property exists on the struct.
    return ModuleUtils.logger_level.label;
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
    json_has_key({data: level, key: "level", should_throw: true});
    json_has_key({data: level, key: "label", should_throw: true});
    if (!data) {
      throw new CModuleError(CModuleError.TYPE_VIOLATION);
    }

    // Check to see if our logging is on or off.
    // @ts-ignore Property exists on the struct.
    if (ModuleUtils.logger_level.label == "OFF") {
      return;
    }

    // It's on, go create the log record and go log some stuff.
    const record = new CLogRecord({level: level, data: data});
    // @ts-ignore Property exists on the struct.
    if (record.level().level >= ModuleUtils.logger_level.level) {
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

      if (ModuleUtils.logger_handler) {
        ModuleUtils.logger_handler(record);
      }
    }
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("logger_log() error.", err);
  }
}

// ============================================================================
// [NETWORK UC IMPLEMENTATION] ================================================
// ============================================================================

/**
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

    if (!ModuleUtils.is_defined({property: "sendBeacon",
                                 obj: globalThis["navigator"]})) {
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
 * Provides the ability to create client side protocols to send / receive
 * data with other items within the network / Internet.
 * @param {object} params The named parameters.
 * @param {CONNECT_REQUEST} params.request The protocol to connect.
 * @param {string} params.url The server hosting the protocol to connect.
 * @param {CProtocolEventHandler} params.rx_handler The receive handler for
 * the given protocol.
 * @returns {CBroadcastChannelProtocol | CEventSourceProtocol |
 * CWebSocketProtocol | CWebRtcProtocol} The protocol to communicate
 * with the connected server.
 * @example
 * // TBD
 */
export function network_connect({request, url, rx_handler}) {
  try {
    switch (request) {
      case CONNECT_REQUEST.BroadcastChannel:
        return new CBroadcastChannelProtocol({
          url: url,
          rx_handler: rx_handler
        });
      case CONNECT_REQUEST.EventSource:
        return new CEventSourceProtocol({
          url: url,
          rx_handler: rx_handler
        });
      case CONNECT_REQUEST.WebSocket:
        return new CWebSocketProtocol({
          url: url,
          rx_handler: rx_handler
        });
      case CONNECT_REQUEST.WebRTC:
        throw new CModuleError(CModuleError.NOT_IMPLEMENTED);
      default:
        throw new CModuleError(CModuleError.MISUSE);
    }
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("network_connect() error.", err);
  }
}

/**
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
// [RUNTIME UC FUNCTIONS] =====================================================
// ============================================================================

/**
 * Provides the ability to carry out actions with the open browser window.
 * @param {object} params The named parameters.
 * @param {ACTION_REQUEST} params.request The enumerated value to carry
 * out with the open browser window.
 * @param {object | string} [params.data] The optional object data associated
 * with the {@link ACTION_REQUEST.Share} or {@link ACTION_REQUEST.PostMessage}
 * requests or string data for the  {@link ACTION_REQUEST.Alert},
 * {@link ACTION_REQUEST.Confirm}, {@link ACTION_REQUEST.Prompt}, and
 * {@link ACTION_REQUEST.Copy} options.
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
export async function runtime_action({
  request,
  data,
  target_origin="*",
  pattern=[],
  x,
  y
}) {
  try {
    if (!runtime_defined({request: DEFINED_REQUEST.Browser})) {
      throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
    }

    let value = null;
    switch (request) {
      case ACTION_REQUEST.Alert:
        json_check_type({type: "string", data: data, should_throw: true});
        // @ts-ignore This is in a browser context
        globalThis.alert(data);
        break;
      case ACTION_REQUEST.Copy:
        json_check_type({type: "string", data: data, should_throw: true});
        // @ts-ignore This is in a browser context
        await globalThis.navigator.clipboard.writeText(data);
        break;
      case ACTION_REQUEST.Confirm:
        json_check_type({type: "string", data: data, should_throw: true});
        // @ts-ignore This is in a browser context
        value = globalThis.confirm(data);
        break;
      case ACTION_REQUEST.Focus:
        // @ts-ignore This is in a browser context
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
        // @ts-ignore This is in a browser context
        value = await globalThis.navigator.clipboard.readText();
        break;
      case ACTION_REQUEST.PostMessage:
        // @ts-ignore This is in a browser context
        globalThis.postMessage(data, target_origin);
        break;
      case ACTION_REQUEST.Print:
        // @ts-ignore This is in a browser context
        globalThis.print();
        break;
      case ACTION_REQUEST.Prompt:
        json_check_type({type: "string", data: data, should_throw: true});
        // @ts-ignore This is in a browser context
        value = globalThis.prompt(data);
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
        // @ts-ignore This is in a browser context
        await globalThis.navigator.share(data);
        break;
      case ACTION_REQUEST.Vibrate:
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
      throw new CModuleError("runtime_defined() error.", err);
    }
    return new CResult({error: err});
  }
}

/**
 * Determines the available CPU processors for background workers.
 * @returns {number} The available hardware processors or 1 if it can't
 * be determined.
 * @example
 * // To get the number of CPUs
 * let cpu_count = runtime_cpu_count();
 * if (cpu_count > 1) {
 *   // Do what you will with it.
 * }
 */
export function runtime_cpu_count() {
  if (runtime_defined({property: "navigator"}) &&
      runtime_defined({property: "hardwareConcurrency",
                        obj: globalThis["navigator"]})) {
    return globalThis.navigator.hardwareConcurrency;
  } else {
    return 1;
  }
}

/**
 * Utility function to determine what is available to the module within a
 * given JavaScript runtime environment.
 * @param {object} params The named parameters.
 * @param {DEFINED_REQUEST} [params.request = DEFINED_REQUEST.AskRuntime] The
 * requested item to determine if it is defined within the runtime or not.
 * Also can perform a general query  utilizing the property / obj properties.
 * @param {string} [params.property] The name of the object, function, or
 * member data to check for in a given object when the
 * {@link DEFINED_REQUEST.AskRuntime} is specified.
 * @param {object} [params.obj = globalThis] The object to check the property.
 * Defaults to globalThis to facilitate determining JavaScript runtimes.
 * @returns {boolean} true if property exists on object, false otherwise.
 * @example
 * // Determine if Bun V8 runtime based on globalThis
 * let is_bun = runtime_defined({request: DEFINED_REQUEST.Bun});
 * if (is_bun) {
 *   // Do bun runtime processing
 * }
 *
 * // Determine if share feature available in browser
 * let is_share_supported = runtime_defined({
 *   property: "share",
 *   obj: globalThis["navigator"]
 * });
 * if (is_share_supported) {
 *   // Do share logic
 * }
 */
export function runtime_defined({
    request = DEFINED_REQUEST.AskRuntime,
    property,
    obj = globalThis
}) {
  try {
    json_check_type({type: "object", data: obj, should_throw: true});
    switch (request) {
      case DEFINED_REQUEST.AskRuntime:
        // @ts-ignore This is in a browser context
        return ModuleUtils.is_defined({property: property, obj: obj});
      case DEFINED_REQUEST.Audio:
        return ModuleUtils.is_defined({property: "HTMLAudioElement"});
      case DEFINED_REQUEST.Bluetooth:
        return ModuleUtils.is_defined({property: "bluetooth",
                                       obj: globalThis["navigator"]});
      case DEFINED_REQUEST.Browser:
        return ModuleUtils.is_defined({property: "HTMLElement"});
      case DEFINED_REQUEST.Bun:
        return ModuleUtils.is_defined({property: "Bun"});
      case DEFINED_REQUEST.Deno:
        return ModuleUtils.is_defined({property: "Deno"});
      case DEFINED_REQUEST.MIDI:
        return ModuleUtils.is_defined({property: "requestMIDIAccess",
                                       obj: globalThis["navigator"]});
      case DEFINED_REQUEST.Node:
        return ModuleUtils.is_defined({property: "process"}) &&
          !ModuleUtils.is_defined({property: "Deno"}) &&
          !ModuleUtils.is_defined({property: "Bun"});
      case DEFINED_REQUEST.Orientation:
        return ModuleUtils.is_defined({property: "geolocation",
                                       obj: globalThis["navigator"]});
      case DEFINED_REQUEST.PWA:
        return ModuleUtils.is_defined({property: "matchMedia"}) &&
          // @ts-ignore This is in a browser context
          globalThis.matchMedia("(display-mode: standalone)"
        ).matches;
      case DEFINED_REQUEST.SecureContext:
        return ModuleUtils.is_defined({property: "isSecureContext"}) &&
          // @ts-ignore This is in a browser context
          globalThis.isSecureContext;
      case DEFINED_REQUEST.SerialPort:
        return ModuleUtils.is_defined({property: "serial",
                                       obj: globalThis["navigator"]});
      case DEFINED_REQUEST.Share:
        return ModuleUtils.is_defined({property: "share",
                                       obj: globalThis["navigator"]});
      case DEFINED_REQUEST.TextToSpeech:
        return ModuleUtils.is_defined({property: "SpeechSynthesisUtterance"});
      case DEFINED_REQUEST.TouchEnabled:
        return ModuleUtils.is_defined({property: "maxTouchPoints",
                                       obj: globalThis["navigator"]}) &&
          // @ts-ignore This is in a browser context
          globalThis.navigator.maxTouchPoints > 0;
      case DEFINED_REQUEST.USB:
        return ModuleUtils.is_defined({property: "navigator"}) &&
          ModuleUtils.is_defined({property: "usb",
                                  obj: globalThis["navigator"]});
      case DEFINED_REQUEST.WorkerAvailable:
        return ModuleUtils.is_defined({property: "Worker"});
      case DEFINED_REQUEST.WorkerRuntime:
        return ModuleUtils.is_defined({property: "WorkerGlobalScope"});
      default:
        throw new CModuleError(CModuleError.MISUSE);
    }
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("runtime_defined() error.", err);
  }
}

/**
 * Provides a queryable interface to the browser runtime loaded document or
 * in this case, the User Interface.
 * @param {object} params The named parameters.
 * @param {DOCUMENT_REQUEST} params.request The enumerated request of
 * the document.
 * @param {string} [params.name] The name of the element to access. It is
 * assumed that an element will be found or an API MISUSE will be thrown.
 * This parameter is not utilized for {@link DOCUMENT_REQUEST.IsIFrame}
 * request.
 * @returns {string | HTMLElement | HTMLElement[] | boolean} CssVariable will
 * return the value of the given CSS variable or an empty string if no CSS
 * variable exists. This allows for swapping out with custom CSS with the
 * modules custom components set via attributes and not CSS files. The
 * remaining objects are guaranteed to be returned or a API violation occurs.
 * The boolean is for detection if the document is within an iframe or not.
 * @example
 * // TBD
 */
export function runtime_document({request, name}) {
  try {
    if (!runtime_defined({request: DEFINED_REQUEST.Browser})) {
      throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
    }
    json_check_type({type: "string", data: name, should_throw: true});
    switch (request) {
      case DOCUMENT_REQUEST.CssVariable:
        // @ts-ignore exists in a browser context
        let cs = globalThis.window.getComputedStyle(
          // @ts-ignore exists in a browser context
          globalThis.document.documentElement
        );
        // @ts-ignore json_check_type will throw if not set properly
        return cs.getPropertyValue(name) ?? "";
      case DOCUMENT_REQUEST.ElementById:
        let el = globalThis.document.getElementById(name);
        if (!el) {
          throw new CModuleError(CModuleError.MISUSE + name + " not found");
        }
        return el;
      case DOCUMENT_REQUEST.ElementsByClassName:
        // @ts-ignore exists in a browser context
        let col1 = globalThis.document.getElementsByClassName(name);
        if (col1.length === 0) {
          throw new CModuleError(CModuleError.MISUSE + name + " not found");
        }
        // @ts-ignore This will be a collection of HTMLElement objects.
        return Array.from(col1);
      case DOCUMENT_REQUEST.ElementsByTagName:
        // @ts-ignore exists in a browser context
        let col2 = globalThis.document.getElementsByTagName(name);
        if (col2.length === 0) {
          throw new CModuleError(CModuleError.MISUSE + name + " not found");
        }
        // @ts-ignore This will be a collection of HTMLElement objects.
        return Array.from(col2);
      case DOCUMENT_REQUEST.IsIFrame:
        try {
          // @ts-ignore This will be within the browser context
          return globalThis.self === globalThis.top;
        } catch {
          return false;
        }
      default:
        throw new CModuleError(CModuleError.MISUSE);
    }
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("runtime_document() error.", err);
  }
}

/**
 * Searches for a URL parameter specified in the host URL.
 * @param {string} name The name of the operating system variable to
 * lookup.
 * @returns {string?} The value associated with the name or null if not
 * found.
 * @example
 * // Find a search parameter based on a search redirect
 * let search_param = runtime_environment("search");
 * if (search_param) {
 *   // Go do your search based on the value.
 * }
 */
export function runtime_environment(name) {
  try {
    json_check_type({type: "string", data: name, should_throw: true});
    if (runtime_defined({request: DEFINED_REQUEST.Browser})) {
      let params = new URLSearchParams(globalThis.location.search);
      return params.get(name);
    }
    throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("runtime_environment() error.", err);
  }
}

/**
 * Adds or removes an event listener to the JavaScript runtime or
 * individual element.
 * @param {object} params The named parameters.
 * @param {EVENT_REQUEST} params.request The request to carry out.
 * @param {string} params.type The event listener identifier.
 * @param {CEventHandler} params.listener The listener called
 * when the identified event is triggered or being removed.
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
 *   listener: message_handler,
 * });
 *
 * // Then on app cleanup, remove the listener
 * runtime_event({
 *   request: EVENT_REQUEST.Remove,
 *   type: "message",
 *   listener: message_handler,
 * });
 */
export function runtime_event({
  request,
  type,
  listener,
  target = globalThis,
}) {
  try {
    json_check_type({type: "string", data: type, should_throw: true});
    json_check_type({
      type: "function",
      data: listener,
      count: 1,
      should_throw: true
    });
    if (request === "add") {
      target.addEventListener(type, listener);
    } else if (request === "remove") {
      target.removeEventListener(type, listener);
    } else {
      throw new CModuleError(CModuleError.MISUSE);
    }
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("runtime_event() error.", err);
  }
}

/**
 * Determines the hostname of the host operating system.
 * @returns {string} The hostname of the computer.
 * @example
 * // To get the hostname of the browser platform
 * let hostname = runtime_hostname();
 */
export function runtime_hostname() {
  try {
    if (runtime_defined({request: DEFINED_REQUEST.Browser})) {
      // @ts-ignore Property exists in a browser runtime.
      return globalThis.location.hostname;
    }
    throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("runtime_hostname() error.", err);
  }
}

/**
 * Determines what JavaScript runtime the app is running.
 * @returns {string} The name of JavaScript runtime or "UNKNOWN BROWSER" for
 * an identified browser runtime or "UNKNOWN V8 RUNTIME" for an unidentified
 * V8 runtime.
 * @example
 * // To get the name of the JavaScript runtime.
 * let runtime = runtime_name();
 * if (runtime.includes("UNKNOWN")) {
 *   // Handle running in an unknown JavaScript runtime...
 * }
 */
export function runtime_name() {
  if (runtime_defined({request: DEFINED_REQUEST.Browser})) {
    const userAgent = globalThis.navigator.userAgent.toLowerCase();
    if (userAgent.includes("firefox/")) {
      return "firefox";
    } else if (userAgent.includes("opr/")
        || userAgent.includes("presto/")) {
      return "opera";
    } else if (userAgent.includes("mobile/")
        || userAgent.includes("version/")) {
      return "safari";
    } else if (userAgent.includes("edg/")) {
      return "edge";
    } else if (userAgent.includes("chrome/")) {
      return "chrome";
    } else {
      return "UNKNOWN BROwSER";
    }
  } else if (runtime_defined({request: DEFINED_REQUEST.Bun})) {
    return "bun";
  } else if (runtime_defined({request: DEFINED_REQUEST.Deno})) {
    return "deno";
  } else if (runtime_defined({request: DEFINED_REQUEST.Node})) {
    return "node";
  } else if (runtime_defined({request: DEFINED_REQUEST.WorkerRuntime})) {
    return "worker";
  } else {
    return "UNKNOWN V8 RUNTIME";
  }
}

/**
 * Determines if the web app has access to the Internet.
 * @returns {boolean} true if path to Internet available, false otherwise.
 * @example
 * // Determine if the web page has Internet access (useful for PWAs)
 * if (!runtime_online()) {
 *   // Do something when you don't have Internet access.
 * }
 */
export function runtime_online() {
  try {
    if (runtime_defined({property: "navigator"}) &&
        runtime_defined({property: "onLine",
                         obj: globalThis["navigator"]})) {
      // @ts-ignore Property exists in a browser runtime.
      return globalThis.navigator.onLine;
    }
    throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("runtime_online() error.", err);
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
export function runtime_open({
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
    if (!ModuleUtils.is_defined({property: "open"})) {
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
      let top = (runtime_screen(SCREEN_REQUEST.Height) - height) / 2;
      // @ts-ignore Will return a number.
      let left = (runtime_screen(SCREEN_REQUEST.Width) - width) / 2;
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

/**
 * Provides a mechanism for discovering information about the current
 * browser screen the web app is running in.
 * @param {SCREEN_REQUEST} request The enumerated value identifying the
 * different aspects to request information about.
 * @returns {number | string} Number for all requests except
 * ScreenOrientationType request.
 * @example
 * // TBD
 */
export function runtime_screen(request) {
  try {
    if (!runtime_defined({request: DEFINED_REQUEST.Browser})) {
      throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
    }
    switch (request) {
      case SCREEN_REQUEST.AvailableHeight:
        // @ts-ignore This is in a browser context
        return globalThis.screen.availHeight;
      case SCREEN_REQUEST.AvailableWidth:
        // @ts-ignore This is in a browser context
        return globalThis.screen.availWidth;
      case SCREEN_REQUEST.ColorDepth:
        // @ts-ignore This is in a browser context
        return globalThis.screen.colorDepth;
      case SCREEN_REQUEST.DevicePixelRatio:
        // @ts-ignore This is in a browser context
        return globalThis.devicePixelRatio;
      case SCREEN_REQUEST.Height:
        // @ts-ignore This is in a browser context
        return globalThis.screen.height;
      case SCREEN_REQUEST.InnerHeight:
        // @ts-ignore This is in a browser context
        return globalThis.innerHeight;
      case SCREEN_REQUEST.InnerWidth:
        // @ts-ignore This is in a browser context
        return globalThis.innerWidth;
      case SCREEN_REQUEST.OuterHeight:
        // @ts-ignore This is in a browser context
        return globalThis.outerHeight;
      case SCREEN_REQUEST.OuterWidth:
        // @ts-ignore This is in a browser context
        return globalThis.outerWidth;
      case SCREEN_REQUEST.PixelDepth:
        // @ts-ignore This is in a browser context
        return globalThis.screen.pixelDepth;
      case SCREEN_REQUEST.ScreenLeft:
        // @ts-ignore This is in a browser context
        return globalThis.screenLeft;
      case SCREEN_REQUEST.ScreenOrientationAngle:
        // @ts-ignore This is in a browser context
        return globalThis.screen.orientation.angle;
      case SCREEN_REQUEST.ScreenOrientationType:
        // @ts-ignore This is in a browser context
        return globalThis.screen.orientation.type;
      case SCREEN_REQUEST.ScreenTop:
        // @ts-ignore This is in a browser context
        return globalThis.screenTop;
      case SCREEN_REQUEST.ScreenX:
        // @ts-ignore This is in a browser context
        return globalThis.screenX
      case SCREEN_REQUEST.ScreenY:
        // @ts-ignore This is in a browser context
        return globalThis.screenY
      case SCREEN_REQUEST.ScrollX:
        // @ts-ignore This is in a browser context
        return globalThis.scrollX;
      case SCREEN_REQUEST.ScrollY:
        // @ts-ignore This is in a browser context
        return globalThis.scrollY;
      case SCREEN_REQUEST.Width:
        // @ts-ignore This is in a browser context
        return globalThis.screen.width;
      default:
        throw new CModuleError(CModuleError.MISUSE);
    }
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("runtime_screen() error.", err);
  }
}

// ============================================================================
// [STORAGE UC IMPLEMENTATION] ================================================
// ============================================================================

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
        if (!ModuleUtils.is_defined({property: "cookieStore"})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        // @ts-ignore Will exist in browser context
        const cookies = await globalThis.cookieStore.getAll();
        for (const cookie of cookies) {
          let name = cookie.name;
          if (name) {
            // @ts-ignore Will exist in browser context
            await globalThis.cookieStore.delete(name);
          }
        }
        break;
      case STORAGE_TYPE.Local:
        if (!ModuleUtils.is_defined({property: "localStorage"})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        // @ts-ignore Will exist in browser context
        globalThis.localStorage.clear();
        break;
      case STORAGE_TYPE.Session:
        if (!ModuleUtils.is_defined({property: "sessionStorage"})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        // @ts-ignore Will exist in browser context
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
        if (!ModuleUtils.is_defined({property: "cookieStore"})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        // @ts-ignore Will exist in browser context
        let entry = await globalThis.cookieStore.get(key)
        return entry
          ? entry.value != undefined
            ? entry.value
            : null
          : null;
      case STORAGE_TYPE.Local:
        if (!ModuleUtils.is_defined({property: "localStorage"})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        // @ts-ignore Will exist in browser context
        return globalThis.localStorage.getItem(key);
      case STORAGE_TYPE.Session:
        if (!ModuleUtils.is_defined({property: "sessionStorage"})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        // @ts-ignore Will exist in browser context
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
        if (!ModuleUtils.is_defined({property: "cookieStore"})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        // @ts-ignore Will exist in browser context
        const cookies = await globalThis.cookieStore.getAll();
        const key = cookies.at(index)?.name;
        return key != undefined
          ? key
          : null;
      case STORAGE_TYPE.Local:
        if (!ModuleUtils.is_defined({property: "localStorage"})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        // @ts-ignore Will exist in browser context
        return index < globalThis.localStorage.length
          // @ts-ignore Will exist in browser context
          ? globalThis.localStorage.key(index)
          : null;
      case STORAGE_TYPE.Session:
        if (!ModuleUtils.is_defined({property: "sessionStorage"})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        // @ts-ignore Will exist in browser context
        return index < globalThis.sessionStorage.length
          // @ts-ignore Will exist in browser context
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
        if (!ModuleUtils.is_defined({property: "cookieStore"})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        // @ts-ignore Will exist in browser context
        return (await globalThis.cookieStore.getAll()).length;
      case STORAGE_TYPE.Local:
        if (!ModuleUtils.is_defined({property: "localStorage"})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        // @ts-ignore Will exist in browser context
        return globalThis.localStorage.length;
      case STORAGE_TYPE.Session:
        if (!ModuleUtils.is_defined({property: "sessionStorage"})) {
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
        if (!ModuleUtils.is_defined({property: "cookieStore"})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        // @ts-ignore Will exist in browser context
        await globalThis.cookieStore.delete(key, value);
        break;
      case STORAGE_TYPE.Local:
        if (!ModuleUtils.is_defined({property: "localStorage"})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        // @ts-ignore Will exist in browser context
        globalThis.localStorage.removeItem(key);
        break;
      case STORAGE_TYPE.Session:
        if (!ModuleUtils.is_defined({property: "sessionStorage"})) {
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
        if (!ModuleUtils.is_defined({property: "cookieStore"})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        // @ts-ignore Will exist in browser context
        await globalThis.cookieStore.set(key, value);
        break;
      case STORAGE_TYPE.Local:
        if (!ModuleUtils.is_defined({property: "localStorage"})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        // @ts-ignore Will exist in browser context
        globalThis.localStorage.setItem(key, value);
        break;
      case STORAGE_TYPE.Session:
        if (!ModuleUtils.is_defined({property: "sessionStorage"})) {
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
// [UI UC DEFINITION] =========================================================
// ============================================================================

// The following code only runs if we are in a browser runtime and our custom
// HTML components have not been defined. If those conditions are met, then our
// custom components are created for defining HTML / CSS based frontend code.
if (runtime_defined({request: DEFINED_REQUEST.Browser}) &&
    !globalThis.customElements.get("codemelted-dialog")) {

}
