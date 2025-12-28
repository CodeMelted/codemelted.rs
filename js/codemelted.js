// @ts-check
// TODO 1: Implement snackbar ui_action.
// TODO 2: Implement copy of text.
// TODO 3: Spread logging throughout this module for API_VIOLATIONs to explain
//         what is happening.
// ============================================================================
/**
 * @file <br />
 * <center>
 * <img style="width: 100%; max-width: 375px;"
 *  src="https://codemelted.com/assets/images/logo-codemelted-rs.png"
 * /></center>
 * <h3>Introduction</h3>
 * <p>
 * The <code>codemelted.js</code> module is an ES6 module that mirrors the
 * <code>codemelted.rs</code> module. It's goal is to implement the domain
 * use cases wrapping the Web APIs exposed in a browser runtime. This provides
 * the client side single page app (SPA) / progressive web app (PWA)
 * development support utilizing web technologies. By supporting the SPA / PWA
 * client side development, the <code>codemelted.js</code> module will also
 * provide WASM bindings to support client side application development in
 * Rust whether a native desktop application or a web hosted client.
 * </p>
 * </p>
 * <table style="width: 100%;">
 * <tr>
 * <td style="width: 275px;">
 * <img style= "width: 275px;" src="https://codemelted.com/developer/mdbook/models/use-case-model.drawio.png" />
 * </td>
 * <td>
 * <ul>
 * <li> Implements the identified domain use cases as a series of exported functions. </li>
 * <li> Function names match that of the <code>codemelted.rs</code> rust function names. </li>
 * <li> Function parameters / returns are abstracted from JS runtime specific objects. </li>
 * <li> This provides for the support of multiple JS runtimes. </li>
 * <li> This provides support for TypeScript development / checking. </li>
 * </ul>
 * </td>
 * </tr>
 * <tr>
 * <td style="width: 275px;">
 * <img style= "width: 275px;" src="https://codemelted.com/developer/mdbook/models/wasm-build-process.drawio.png" />
 * </td>
 * <td>
 * <ul>
 * <li> The <code>codemelted.js</code> module is ran through the targeted runtime tests. </li>
 * <li> When all tests PASS, the <code>codemelted.rs</code> WASM build occurs. </li>
 * <li> When the cargo doc, build, and tests all PASS you end up with two build targets. </li>
 * <li> The ability to write a pure rust desktop / web app via the <code>codemelted.rs</code> crate. </li>
 * <li> The ability to write a JS / TS frontend / backend regardless frontend development framework. </li>
 * </ul>
 * </td>
 * </tr>
 * </table>
 * <table><br />
 * <h3>How To Use</h3>
 * <p>
 * <mark>TBD (Working out how to do this)</mark> <br />
 * URL to the latest updates JavaScript file. <br />
 * https://cdn.jsdelivr.net/gh/codemelted/codemelted.rs/js/codemelted.js
 * <br />
 * URL to specific version once we start versioning a stable version. <br />
 * https://cdn.jsdelivr.net/gh/codemelted/codemelted.rs@X.Y.Z/js/codemelted.js <br />
 * </p>
 * <h3>JS Runtime Support</h3>
 * <p>
 * The following table reflects the public facing functions implementing the
 * domain use cases for client side browser runtime development. It signals
 * what other server JS runtimes this module can be utilized within even though
 * its primary purpose is client side browser development.
 * </p>
 * <thead>
 * <tr><th>Function</th><th>D</th><th>N</th><th>W</th></tr>
 * </thead>
 * <tbody>
 * <tr><td>async_sleep                </td><td>X</td><td>X</td><td>X</td></tr>
 * <tr><td>async_task                 </td><td>X</td><td>X</td><td>X</td></tr>
 * <tr><td>async_timer                </td><td>X</td><td>X</td><td>X</td></tr>
 * <tr><td>async_worker               </td><td>X</td><td>X</td><td>X</td></tr>
 * <tr><td>db_exists                  </td><td> </td><td> </td><td>X</td></tr>
 * <tr><td>db_manage                  </td><td> </td><td> </td><td>X</td></tr>
 * <tr><td>db_query                   </td><td> </td><td> </td><td>X</td></tr>
 * <tr><td>db_update                  </td><td> </td><td> </td><td>X</td></tr>
 * <tr><td>db_version                 </td><td> </td><td> </td><td>X</td></tr>
 * <tr><td>hw_request_bluetooth       </td><td> </td><td> </td><td>X</td></tr>
 * <tr><td>hw_request_midi            </td><td> </td><td> </td><td>X</td></tr>
 * <tr><td>hw_request_orientation     </td><td> </td><td> </td><td>X</td></tr>
 * <tr><td>hw_request_serial_port     </td><td> </td><td> </td><td>X</td></tr>
 * <tr><td>hw_request_usb             </td><td> </td><td> </td><td>X</td></tr>
 * <tr><td>hw_support_bluetooth       </td><td>X</td><td>X</td><td>X</td></tr>
 * <tr><td>hw_support_midi            </td><td>X</td><td>X</td><td>X</td></tr>
 * <tr><td>hw_support_orientation     </td><td>X</td><td>X</td><td>X</td></tr>
 * <tr><td>hw_support_serial_port     </td><td>X</td><td>X</td><td>X</td></tr>
 * <tr><td>hw_support_usb             </td><td>X</td><td>X</td><td>X</td></tr>
 * <tr><td>if_def                     </td><td>X</td><td>X</td><td>X</td></tr>
 * <tr><td>json_atob                  </td><td>X</td><td>X</td><td>X</td></tr>
 * <tr><td>json_btoa                  </td><td>X</td><td>X</td><td>X</td></tr>
 * <tr><td>json_check_type            </td><td>X</td><td>X</td><td>X</td></tr>
 * <tr><td>json_create_array          </td><td>X</td><td>X</td><td>X</td></tr>
 * <tr><td>json_create_object         </td><td>X</td><td>X</td><td>X</td></tr>
 * <tr><td>json_has_key               </td><td>X</td><td>X</td><td>X</td></tr>
 * <tr><td>json_parse                 </td><td>X</td><td>X</td><td>X</td></tr>
 * <tr><td>json_stringify             </td><td>X</td><td>X</td><td>X</td></tr>
 * <tr><td>json_valid_url             </td><td>X</td><td>X</td><td>X</td></tr>
 * <tr><td>logger_handler             </td><td>X</td><td>X</td><td>X</td></tr>
 * <tr><td>logger_level               </td><td>X</td><td>X</td><td>X</td></tr>
 * <tr><td>logger_log                 </td><td>X</td><td>X</td><td>X</td></tr>
 * <tr><td>network_beacon             </td><td> </td><td> </td><td> </td></tr>
 * <tr><td>network_connect            </td><td>X</td><td>X</td><td>X</td></tr>
 * <tr><td>network_fetch              </td><td>X</td><td>X</td><td>X</td></tr>
 * <tr><td>npu_compute                </td><td>X</td><td>X</td><td>X</td></tr>
 * <tr><td>npu_math                   </td><td>X</td><td>X</td><td>X</td></tr>
 * <tr><td>runtime_cpu_count          </td><td> </td><td>X</td><td>X</td></tr>
 * <tr><td>runtime_environment        </td><td> </td><td> </td><td> </td></tr>
 * <tr><td>runtime_event              </td><td>X</td><td>X</td><td>X</td></tr>
 * <tr><td>runtime_hostname           </td><td> </td><td> </td><td> </td></tr>
 * <tr><td>runtime_is_browser         </td><td>X</td><td>X</td><td>X</td></tr>
 * <tr><td>runtime_is_deno            </td><td>X</td><td>X</td><td>X</td></tr>
 * <tr><td>runtime_is_nodejs          </td><td>X</td><td>X</td><td>X</td></tr>
 * <tr><td>runtime_is_worker          </td><td>X</td><td>X</td><td>X</td></tr>
 * <tr><td>runtime_name               </td><td>X</td><td>X</td><td>X</td></tr>
 * <tr><td>runtime_online             </td><td> </td><td> </td><td> </td></tr>
 * <tr><td>storage_clear              </td><td>X</td><td> </td><td> </td></tr>
 * <tr><td>storage_get                </td><td>X</td><td> </td><td> </td></tr>
 * <tr><td>storage_key                </td><td>X</td><td> </td><td> </td></tr>
 * <tr><td>storage_length             </td><td>X</td><td> </td><td> </td></tr>
 * <tr><td>storage_remove             </td><td>X</td><td> </td><td> </td></tr>
 * <tr><td>storage_set                </td><td>X</td><td> </td><td> </td></tr>
 * <tr><td>ui_action                  </td><td> </td><td> </td><td> </td></tr>
 * <tr><td>ui_audio                   </td><td> </td><td> </td><td> </td></tr>
 * <tr><td>ui_dialog                  </td><td> </td><td> </td><td> </td></tr>
 * <tr><td>ui_is                      </td><td> </td><td> </td><td> </td></tr>
 * <tr><td>ui_message                 </td><td> </td><td> </td><td> </td></tr>
 * <tr><td>ui_open                    </td><td> </td><td> </td><td> </td></tr>
 * <tr><td>ui_screen                  </td><td> </td><td> </td><td> </td></tr>
 * <tr><td>ui_widget                  </td><td> </td><td> </td><td> </td></tr>
 * </tbody>
 * </table><br />
 * <b>Legend:</b>
 * <ul>
 * <li>D - Deno Runtime</li>
 * <li>N - NodeJS Runtime</li>
 * <li>W - Worker Runtime</li>
 * </ul>
 * <h3>About Module</h3>
 * @author Mark Shaffer
 * @copyright © 2025 Mark Shaffer. All Rights Reserved.
 * @version 0.0.0 (Last Modified 2025-mm-dd)
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
// [MODULE COMMON DATA] =======================================================
// ============================================================================

/**
 * Error thrown when the module is not used as intended providing the
 * error for a developer to fix their code.
 * @constant {SyntaxError} API_MISUSE
 */
export const API_MISUSE = new SyntaxError(
  "codemelted.js module logic was not used properly!"
);

/**
 * Identifies a piece of logic that is not implemented within the
 * codemelted.js module. This identifies future implementation logic or
 * represents a base class element not utilized in a child.
 * @constant {SyntaxError} API_NOT_IMPLEMENTED
 */
export const API_NOT_IMPLEMENTED = new SyntaxError(
  "NOT IMPLEMENTED LOGIC. DO NOT CALL!"
);

/**
 * Error thrown when the parameters specified to a codemelted.js module
 * function are not of an expected type.
 * @constant {SyntaxError} API_TYPE_VIOLATION
 */
export const API_TYPE_VIOLATION = new SyntaxError(
  "codemelted.js module encountered a parameter of an unexpected type!"
);

/**
 * Error thrown when the codemelted.js module function is called on an
 * unsupported runtime.
 * @constant {SyntaxError} API_UNSUPPORTED_RUNTIME
 */
export const API_UNSUPPORTED_RUNTIME = new SyntaxError(
  "codemelted.js module function called on an unsupported " +
  "JavaScript runtime!"
);

/**
 * The event handler utilized within a given JavaScript runtime. This
 * represents a global event handler that should suffice any JavaScript
 * event callback.
 * @callback CEventHandler
 * @param {Event} e The event object that was triggered
 * @returns {void}
 */

/**
 * Defines the "rules" for objects that will setup a protocol that directly
 * exchanges data with an external item, will continuously run until
 * terminated, requires the ability to know it is running, and get any
 * errors that have occurred during its run.
 */
export class CProtocolHandler {
  /** @type {string} */
  #id = "";

  /**
   * Gets the latest data received from the protocol.
   * @param {string} [request] Optional request string to add additional
   * queries from the protocol.
   * @returns {Promise<CResult>} The result of the request
   */
  // @ts-ignore
  async get_message(request="") { throw API_NOT_IMPLEMENTED; }

  /**
   * The identification of the protocol.
   * @returns {string}
   */
  id() { return this.#id; }

  /**
   * Determines if the protocol is running or has been terminated.
   * @returns {boolean}
   */
  is_running() { throw API_NOT_IMPLEMENTED; }

  /**
   * Posts a given message to the given implementing protocol.
   * @param {any} data
   * @returns {Promise<CResult>} The result of the request.
   */
  // @ts-ignore
  async post_message(data) { throw API_NOT_IMPLEMENTED; }

  /**
   * Terminates the given protocol.
   * @returns {void}
   */
  terminate() { throw API_NOT_IMPLEMENTED; }

  /**
   * Constructor for the class.
   * @param {string} id Identification for the protocol for debugging
   * purposes.
   */
  constructor(id) {
    this.#id = id;
  }
}

/**
 * Support object for the [CProtocolHandler] and any other object to
 * provide a result where either the value or the error can be signaled for
 * later checking by a user.
 */
export class CResult {
  /** @type {any} */
  #error = null;

  /** @type {any} */
  #value = null;

  /**
   * Holds any error message associated with a failed transaction request.
   * @returns {any}
   */
  error() { return this.#error; }

  /**
   * Signals whether an error was captured or not.
   * @returns {boolean}
   */
  is_error() {
    if (this.error() instanceof Error) {
      return true;
    }
    return this.error() != null && this.error().length > 0;
  }

  /**
   * Signals the transaction completed with no errors.
   * @returns {boolean}
   */
  is_ok() { return !this.is_error(); }

  /**
   * Hold the value of the given result or nothing if the [CResult] is
   * being used to signal there was no error.
   * @returns {any}
   */
  value() { return this.#value; }

  /**
   * Constructor for the class.
   * @param {object} params The named parameters for the object.
   * @param {any} [params.value] The value associated with the result
   * @param {any} [params.error] The error associated with the
   * result.
   */
  constructor({value = null, error = null} = {}) {
    if (value && error) { throw API_MISUSE; }
    this.#value = value;
    this.#error = error;
  }
}

/**
 * A C-style checker for seeing if a given property (object, function,
 * member) exists on a given object. Useful when trying to write
 * cross-runtime JavaScript.
 * @param {string} property The name of the object, function, or member
 * data to check for in a given object.
 * @param {object} [obj = globalThis] The object to check these properties.
 * Defaults to globalThis to facilitate determining JavaScript runtimes.
 * @returns {boolean} true if property exists on object, false otherwise.
 */
export function if_def(property, obj = globalThis) {
  return property in obj;
}

// ============================================================================
// [ASYNC I/O UC IMPLEMENTATION] ==============================================
// ============================================================================

/**
 * The task to run as part of the [asyncTask] call.
 * @callback CTaskCB
 * @param {any} [data] Optional data to pass to the task.
 * @returns {any} The result of the task completing.
 */

/**
 * The task to run as part of the [asyncTimer] function call.
 * @callback CTimerCB
 * @returns {void}
 */

/**
 * The result object from the [async_timer] call to allow for stopping the
 * running timer in the future.
 */
export class CTimerResult {
  /** @type {number} */
  #id = -1;

  /**
   * Determines if the timer is still running.
   * @readonly
   * @type {boolean}
   */
  get is_running() { return this.#id !== -1; }

  /**
   * Stops the running timer.
   * @returns {void}
   * @throws {API_MISUSE} When called on an already terminated
   * timer.
   */
  stop() {
    if (!this.is_running) {
      throw API_MISUSE;
    }
    clearInterval(this.#id);
    this.#id = -1;
  }

  /**
   * Constructor for the object.
   * @param {CTimerCB} task The task to run.
   * @param {number} interval The interval to repeat.
   */
  constructor(task, interval) {
    this.#id = setInterval(task, interval);
  }
}

/**
 * Will put a currently running async task to sleep for a specified delay
 * in milliseconds.
 * @param {number} delay Time is milliseconds to delay the task.
 * @returns {Promise<void>} The promise to await on for the delay.
 * @throws {SyntaxError} Reflecting either {@link API_MISUSE},
 * {@link API_NOT_IMPLEMENTED}, {@link API_TYPE_VIOLATION}, or
 * {@link API_UNSUPPORTED_RUNTIME} codemelted.js module API
 * violations. You should not try-catch these as they serve as asserts
 * to the developer.
 * @example
 * // From within an async function, sleep 2 seconds.
 * await codemelted.async_sleep(2000);
 */
export function async_sleep(delay) {
  json_check_type({type: "number", data: delay, should_throw: true});
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}

// TODO: Come up with a CTaskResult concept to match design.

/**
 * Will execute an asynchronous task with the ability to delay it into the
 * future and return a result if necessary.
 * @param {object} params The named parameters.
 * @param {CTaskCB} params.task The task to run.
 * @param {any} [params.data] The optional data to pass to the task.
 * @param {number} [params.delay=0] The delay to schedule the task in the
 * future.
 * @returns {Promise<CResult>} A future promise with the result of the
 * task.
 * @throws {SyntaxError} Reflecting either {@link API_MISUSE},
 * {@link API_NOT_IMPLEMENTED}, {@link API_TYPE_VIOLATION}, or
 * {@link API_UNSUPPORTED_RUNTIME} codemelted.js module API
 * violations. You should not try-catch these as they serve as asserts
 * to the developer.
 * @example
 * // TBD
 */
export function async_task({task, data, delay = 0}) {
  json_check_type({type: "function", data: task, should_throw: true});
  json_check_type({type: "number", data: delay, should_throw: true});
  return new Promise((resolve) => {
    try {
      setTimeout(() => {
        let answer = task(data);
        resolve(new CResult(answer));
      }, delay);
    } catch (err) {
      logger_log({
        level: LOGGER.error,
        data: `async_task() error occurred. ${err}`
      });
      resolve(new CResult({error: err}));
    }
  });
}

/**
 * Creates an asynchronous repeating task on the main thread.
 * @param {object} params The named parameters.
 * @param {CTimerCB} params.task The task to run on the specified
 * interval.
 * @param {number} params.interval The interval in milliseconds to repeat
 * the given task.
 * @returns {CTimerResult} The timer that runs the task on
 * the specified interval.
 * @throws {SyntaxError} Reflecting either {@link API_MISUSE},
 * {@link API_NOT_IMPLEMENTED}, {@link API_TYPE_VIOLATION}, or
 * {@link API_UNSUPPORTED_RUNTIME} codemelted.js module API
 * violations. You should not try-catch these as they serve as asserts
 * to the developer.
 * @example
 * // TBD
 */
export function async_timer({task, interval}) {
  json_check_type({
    type: "function",
    data: task,
    count: 0,
    should_throw: true
  });
  json_check_type({type: "number", data: interval, should_throw: true});
  return new CTimerResult(task, interval);
}

/**
 * <mark>IN DEVELOPMENT! DON'T USE!!</mark
 * @throws {SyntaxError} Reflecting either {@link API_MISUSE},
 * {@link API_NOT_IMPLEMENTED}, {@link API_TYPE_VIOLATION}, or
 * {@link API_UNSUPPORTED_RUNTIME} codemelted.js module API
 * violations. You should not try-catch these as they serve as asserts
 * to the developer.
 * @example
 * // TBD
 */
export function async_worker() {
  throw API_NOT_IMPLEMENTED;
}

// ============================================================================
// [DB UC IMPLEMENTATION] =====================================================
// ============================================================================

/**
 * <mark>FUTURE DEVELOPMENT. DO NOT USE!</mark>
 * @throws {SyntaxError} Reflecting either {@link API_MISUSE},
 * {@link API_NOT_IMPLEMENTED}, {@link API_TYPE_VIOLATION}, or
 * {@link API_UNSUPPORTED_RUNTIME} codemelted.js module API
 * violations. You should not try-catch these as they serve as asserts
 * to the developer.
 * @example
 * // TBD
 */
export function db_exists() {
  // TODO: IndexDB for browser / worker
  //       DenoKV for Deno
  //       Possibly Sqlite for NodeJS. If no third party items involved.
  throw API_NOT_IMPLEMENTED;
}

/**
 * <mark>FUTURE DEVELOPMENT. DO NOT USE!</mark>
 * @throws {SyntaxError} Reflecting either {@link API_MISUSE},
 * {@link API_NOT_IMPLEMENTED}, {@link API_TYPE_VIOLATION}, or
 * {@link API_UNSUPPORTED_RUNTIME} codemelted.js module API
 * violations. You should not try-catch these as they serve as asserts
 * to the developer.
 * @example
 * // TBD
 */
export function db_manage() {
  // TODO: IndexDB for browser / worker
  //       DenoKV for Deno
  //       Possibly Sqlite for NodeJS. If no third party items involved.
  throw API_NOT_IMPLEMENTED;
}

/**
 * <mark>FUTURE DEVELOPMENT. DO NOT USE!</mark>
 * @throws {SyntaxError} Reflecting either {@link API_MISUSE},
 * {@link API_NOT_IMPLEMENTED}, {@link API_TYPE_VIOLATION}, or
 * {@link API_UNSUPPORTED_RUNTIME} codemelted.js module API
 * violations. You should not try-catch these as they serve as asserts
 * to the developer.
 * @example
 * // TBD
 */
export function db_query() {
  // TODO: IndexDB for browser / worker
  //       DenoKV for Deno
  //       Possibly Sqlite for NodeJS. If no third party items involved.
  throw API_NOT_IMPLEMENTED;
}

/**
 * <mark>FUTURE DEVELOPMENT. DO NOT USE!</mark>
 * @throws {SyntaxError} Reflecting either {@link API_MISUSE},
 * {@link API_NOT_IMPLEMENTED}, {@link API_TYPE_VIOLATION}, or
 * {@link API_UNSUPPORTED_RUNTIME} codemelted.js module API
 * violations. You should not try-catch these as they serve as asserts
 * to the developer.
 * @example
 * // TBD
 */
export function db_update() {
  // TODO: IndexDB for browser / worker
  //       DenoKV for Deno
  //       Possibly Sqlite for NodeJS. If no third party items involved.
  throw API_NOT_IMPLEMENTED;
}

/**
 * <mark>FUTURE DEVELOPMENT. DO NOT USE!</mark>
 * @throws {SyntaxError} Reflecting either {@link API_MISUSE},
 * {@link API_NOT_IMPLEMENTED}, {@link API_TYPE_VIOLATION}, or
 * {@link API_UNSUPPORTED_RUNTIME} codemelted.js module API
 * violations. You should not try-catch these as they serve as asserts
 * to the developer.
 * @example
 * // TBD
 */
export function db_version() {
  // TODO: IndexDB for browser / worker
  //       DenoKV for Deno
  //       Possibly Sqlite for NodeJS. If no third party items involved.
  throw API_NOT_IMPLEMENTED;
}

// ============================================================================
// [HW UC IMPLEMENTATION] =====================================================
// ============================================================================

/**
 * Represents the geodetic data captured from the [COrientationProtocol]
 * object when created via the [hw_request_orientation] function call.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/GeolocationCoordinates
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/deviceorientation_event
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
  /** @type {number?} */
  #heading = null;
  /** @type {number?} */
  #speed = null;
  /** @type {number?} */
  #alpha = null;
  /** @type {number?} */
  #beta = null;
  /** @type {number?} */
  #gamma = null;

  /**
   * The time the orientation data was last updated.
   * @readonly
   * @type {Date}
   */
  get timestamp() { return this.#timestamp; }

  /**
   * Returns a double representing the position's latitude in decimal
   * degrees.
   * @readonly
   * @type {number}
   */
  get latitude() { return this.#latitude; }

  /**
   * Returns a double representing the position's longitude in decimal
   * degrees.
   * @readonly
   * @type {number}
   */
  get longitude() { return this.#longitude; }

  /**
   * Returns a double representing the position's altitude in meters,
   * relative to sea level. This value can be null if the implementation
   * cannot provide the data.
   * @readonly
   * @type {number?}
   */
  get altitude() { return this.#altitude; }

  /**
   * Returns a double representing the direction towards which the
   * device is facing. This value, specified in degrees, indicates how
   * far off from heading true north the device is. 0 degrees represents
   * true north, and the direction is determined clockwise (which means
   * that east is 90 degrees and west is 270 degrees). If speed is 0,
   * heading is NaN. If the device is unable to provide heading
   * information, this value is null.
   * @readonly
   * @type {number?}
   */
  get heading() { return this.#heading; }

  /**
   * Returns a double representing the velocity of the device in meters
   * per second. This value can be null.
   * @readonly
   * @type {number?}
   */
  get speed() { return this.#speed; }

  /**
   * A number representing the motion of the device around the z axis,
   * express in degrees with values ranging from 0 (inclusive) to
   * 360 (exclusive).
   * @readonly
   * @type {number?}
   */
  get alpha() { return this.#alpha; }

  /**
   * A number representing the motion of the device around the x axis,
   * expressed in degrees with values ranging from -180 (inclusive) to
   * 180 (exclusive). This represents the front to back motion of the
   * device.
   * @readonly
   * @type {number?}
   */
  get beta() { return this.#beta; }

  /**
   * A number representing the motion of the device around the y axis,
   * expressed in degrees with values ranging from -90 (inclusive) to 90
   * (exclusive). This represents the left to right motion of the device.
   * @readonly
   * @type {number?}
   */
  get gamma() { return this.#gamma; }

  /**
   * Processes a device orientation event to get the particular device's
   * orientation in 3D space.
   * @param {DeviceOrientationEvent} data The event object to process.
   * @returns {void}
   */
  updateDeviceOrientation(data) {
    // @ts-ignore DeviceOrientationEvent part of browser runtime.
    if (json_check_type({type: DeviceOrientationEvent, data: data})) {
      this.#timestamp = new Date();
      this.#alpha = data.alpha ?? NaN;
      this.#beta = data.beta ?? NaN;
      this.#gamma = data.gamma ?? NaN;
    }
  }

  /**
   * Processes the current WGS84 geo location information for the devices
   * position in the world.
   * @param {GeolocationCoordinates} data The data to process.
   * @returns {void}
   */
  updateGeolocation(data) {
    // @ts-ignore Object exists in browser runtime.
    if (json_check_type({type: GeolocationCoordinates, data: data})) {
      this.#timestamp = new Date();
      this.#latitude = data.latitude;
      this.#longitude = data.longitude;
      this.#altitude = data.altitude;
      this.#heading = data.heading;
      this.#speed = data.speed;
    }
  }

  /**
   * Default constructor
   */
  constructor() { }
}

/**
 * Implements the orientation protocol to determine your application's
 * position in 3D space based on the sensors on the device.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/deviceorientation_event
 * @extends {CProtocolHandler}
 */
export class COrientationProtocol extends CProtocolHandler {
  /** @type {CGeodeticData} */
  #data = new CGeodeticData();
  #onDeviceOrientation;
  #watchId;
  /** @type {string?} */
  #errorRx = null;

  /**
   * Will retrieve the latest [CGeodeticData] object from the returned
   * [CResult] object.
   * @override
   */
  // @ts-ignore
  async get_message(request="") {
    if (this.#errorRx) {
      const result = new CResult({
        error: this.#errorRx
      });
      this.#errorRx = null;
      return result;
    }
    return new CResult({
      value: Object.assign({}, this.#data),
    });
  }

  /**
   * @inheritdoc
   * @override
   */
  is_running() {
    return this.#watchId != -1;
  }

  /**
   * NOT USED. WILL THROW EXCEPTION.
   * @override
   * @param {any} data
   * @returns {Promise<CResult>}
   */
  // @ts-ignore
  post_message(data) { throw API_NOT_IMPLEMENTED; }

  /**
   * @inheritdoc
   * @override
   */
  terminate() {
    if (!this.is_running) {
      throw API_MISUSE;
    }
    // @ts-ignore Object exists in browser runtime.
    globalThis.navigator.geolocation.clearWatch(this.#watchId);
    this.#watchId = -1;
    // @ts-ignore Object exists in browser runtime.
    globalThis.removeEventListener(
      "deviceorientation",
      this.#onDeviceOrientation
    );
  }

  /**
   * Constructor for the protocol.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
   * @param {object} [options] Optional options for fine tuning the
   * watch of geolocation changes.
   */
  constructor(options) {
    super("COrientationProtocol");

    // Setup to listen for device orientation changes.
    // @ts-ignore Object exists in browser runtime.
    this.#onDeviceOrientation =
      (/** @type {DeviceOrientationEvent} */ e) => {
        this.#data.updateDeviceOrientation(e);
      };
    // @ts-ignore Object exists in browser runtime.
    globalThis.addEventListener(
      "deviceorientation",
      this.#onDeviceOrientation
    );

    // Setup listening for geolocation updates
    // @ts-ignore Property exists in browser runtime.
    this.#watchId = globalThis.navigator.geolocation.watchPosition(
      // @ts-ignore Object exists in browser runtime.
      (/** @type {GeolocationPosition} */ position) => {
        this.#data.updateGeolocation(position.coords);
      },
      // @ts-ignore Object exists in browser runtime.
      (/** @type {GeolocationError} */ err) => {
        this.#errorRx = err.message;
      },
      options
    )
  }
}

/**
 * The data that supports a [CSerialPortProtocol::get_message] or
 * [CSerialPortProtocol::post_message] function calls to communicate with
 * the connected serial port.
 * @typedef {object} CSerialPortPostRequest
 * @property {SERIAL_PORT_DATA_REQUEST} request The request to either
 * read or write to the serial port via the {@link CSerialPortProtocol}.
 * @property {any} data The data associated with the request.
 */

/**
 * Object created from the [hw_request_serial_port] function call opening a
 * connection to the requested serial port connected to the host computer.
 * With the opened serial port, utilize the [CSerialPort::get_message] and
 * [CSerialPort::post_message] to interact with the port until it is
 * [CSerialPort::terminate].
 * @extends {CProtocolHandler}
 */
export class CSerialPortProtocol extends CProtocolHandler {
  /** @type {SerialPort} */
  #port;

  /**
   * Reads the requested data from the currently connected serial port.
   * @override
   * @param {SERIAL_PORT_DATA_REQUEST} request The request to read
   * the current state of the serial port or actual data. The supported items
   * to query are ClearToSend, CarrierDetect, DataSetReady, RingIndicator,
   * and DataBytes.
   * @returns {Promise<CResult>} holding the data associated with the
   * request. A rejected promise is the result of an API violation.
   */
  async get_message(request) {
    try {
      if (!this.is_running) {
        throw API_MISUSE;
      }
      let resp = null;
      let data = null;
      switch (request) {
        case SERIAL_PORT_DATA_REQUEST.ClearToSend:
          resp = await this.#port.getSignals();
          data = resp["clearToSend"];
          break;
        case SERIAL_PORT_DATA_REQUEST.CarrierDetect:
          resp = await this.#port.getSignals();
          data = resp["dataCarrierDetect"];
          break;
        case SERIAL_PORT_DATA_REQUEST.DataSetReady:
          resp = await this.#port.getSignals();
          data = resp["dataSetReady"];
          break;
        case SERIAL_PORT_DATA_REQUEST.RingIndicator:
          resp = await this.#port.getSignals();
          data = resp["ringIndicator"];
          break;
        case SERIAL_PORT_DATA_REQUEST.DataBytes:
          if (!this.#port.readable) {
            return new CResult({
              error: "Serial port was unreadable at this time"
            });
          }
          const reader = this.#port.readable.getReader();
          // @ts-ignore
          const { value, done } = await reader.read();
          data = value;
          reader.releaseLock();
          break;
        default:
          throw API_MISUSE;
      }
      return new CResult({value: data});
    } catch (err) {
      logger_log({
        level: LOGGER.error,
        data: `CSerialPortProtocol::get_message() error occurred. ${err}`
      });
      return new CResult({error: err});
    }
  }

  /**
   * @inheritdoc
   * @override
   */
  is_running() {
    return this.#port.connected;
  }

  /**
   * Will process the data request and perform the requested transaction
   * with the connected serial port returning a result of if it was
   * successfully carried out.
   * @override
   * @param {CSerialPortPostRequest} data The request to make to the
   * connected serial port with associated data.
   * @return {Promise<CResult>} The result of the posted data to the port.
   * A rejected promise is the result of an API violation.
   */
  async post_message(data) {
    try {
      json_check_type({type: "object", data: data, should_throw: true});
      let request = data.request;
      switch (request) {
        case SERIAL_PORT_DATA_REQUEST.DataTerminalReady:
          json_check_type({
            type: "boolean",
            data: data.data,
            should_throw: true
          });
          await this.#port.setSignals("dataTerminalReady", data.data);
          break;
        case SERIAL_PORT_DATA_REQUEST.RequestToSend:
          json_check_type({
            type: "boolean",
            data: data.data,
            should_throw: true
          });
          await this.#port.setSignals("requestToSend", data.data);
          break;
        case SERIAL_PORT_DATA_REQUEST.Break:
          json_check_type({
            type: "boolean",
            data: data.data,
            should_throw: true
          });
          await this.#port.setSignals("break", data.data);
          break;
        case SERIAL_PORT_DATA_REQUEST.DataBytes:
          json_check_type({
            type: Uint8Array,
            data: data.data,
            should_throw: true
          });
          const writer = this.#port.writable.getWriter();
          await writer.write(data.data);
          writer.releaseLock();
          break;
        default:
          throw API_MISUSE;
      }
      return new CResult();
    } catch (err) {
      logger_log({
        level: LOGGER.error,
        data: `CSerialPortProtocol::post_message() error occurred. ${err}`
      });
      return new CResult({error: err});
    }
  }

  /**
   * @inheritdoc
   * @override
   */
  terminate() {
    if (!this.is_running) {
      throw API_MISUSE;
    }
    this.#port.close();
  }

  /**
   * Constructor for the class.
   * @param {SerialPort} port The port that we are connecting to.
   */
  constructor(port) {
    super(
      `CSerialPort_${port.getInfo().usbVendorId}` +
      `_${[port.getInfo().usbProductId]}`
    );
    this.#port = port;
  }
}

/**
 * Defined to support proper typing in the JSDocs when type checking in a
 * TypeScript environment.
 * NOTE: Defined to support proper typing in the JSDocs when type checking
 *       in a TypeScript environment.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/DeviceOrientationEvent
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
 * NOTE: Defined to support proper typing in the JSDocs when type checking
 *       in a TypeScript environment.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/GeolocationCoordinates
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
 * NOTE: Defined to support proper typing in the JSDocs when type checking
 *       in a TypeScript environment.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/SerialPort
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

/**
 * Provides the support to the {@link CSerialPort} get_message and
 * post_message calls to interact with the connect serial port hardware.
 * @enum {string}
 * @property {string} Break Line control status of the
 * [CSerialPortProtocol].
 * @property {string} CarrierDetect Line control status of the
 * [CSerialPortProtocol].
 * @property {string} ClearToSend Line control status of the
 * [CSerialPortProtocol].
 * @property {string} DataSetReady Line control status of the
 * [CSerialPortProtocol].
 * @property {string} DataTerminalReady Line control status of the
 * [CSerialPortProtocol].
 * @property {string} RequestToSend Line control status of the
 * [CSerialPortProtocol].
 * @property {string} RingIndicator Line control status of the
 * [CSerialPortProtocol].
 * @property {string} DataBytes Read / Write from the
 * [CSerialPortProtocol].
 */
export const SERIAL_PORT_DATA_REQUEST = Object.freeze({
  Break: "Break",
  CarrierDetect: "CarrierDetect",
  ClearToSend: "ClearToSend",
  DataSetReady: "DataSetReady",
  DataTerminalReady: "DataTerminalReady",
  RequestToSend: "RequestToSend",
  RingIndicator: "RingIndicator",
  DataBytes: "DataBytes",
});


/**
 * <mark>FUTURE DEVELOPMENT. DO NOT USE!</mark>
 * @throws {SyntaxError} Reflecting either {@link API_MISUSE},
 * {@link API_NOT_IMPLEMENTED}, {@link API_TYPE_VIOLATION}, or
 * {@link API_UNSUPPORTED_RUNTIME} codemelted.js module API
 * violations. You should not try-catch these as they serve as asserts
 * to the developer.
 * @example
 * // TBD
 */
export function hw_request_bluetooth() {
  // TODO: Develop actual protocol against CProtocolHandler
  throw API_NOT_IMPLEMENTED;
}

/**
 * <mark>FUTURE DEVELOPMENT. DO NOT USE!</mark>
 * @throws {SyntaxError} Reflecting either {@link API_MISUSE},
 * {@link API_NOT_IMPLEMENTED}, {@link API_TYPE_VIOLATION}, or
 * {@link API_UNSUPPORTED_RUNTIME} codemelted.js module API
 * violations. You should not try-catch these as they serve as asserts
 * to the developer.
 * @example
 * // TBD
 */
export function hw_request_midi() {
  // TODO: Develop actual protocol against CProtocolHandler
  throw API_NOT_IMPLEMENTED;
}

/**
 * Requests a device orientation protocol to retrieve the devices current
 * geodetic orientation in 3D space.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition#options
 * @param {object} [options] The options for tuning the protocol to
 * watch for geolocation position updates.
 * @return {COrientationProtocol} The protocol that handles
 * device orientation changes until terminated.
 * @throws {SyntaxError} Reflecting either {@link API_MISUSE},
 * {@link API_NOT_IMPLEMENTED}, {@link API_TYPE_VIOLATION}, or
 * {@link API_UNSUPPORTED_RUNTIME} codemelted.js module API
 * violations. You should not try-catch these as they serve as asserts
 * to the developer.
 * @example
 * // TBD
 */
export function hw_request_orientation(options) {
  if (!hw_support_orientation()) {
    throw API_UNSUPPORTED_RUNTIME;
  }
  return new COrientationProtocol(options)
}

/**
 * Provides the mechanism to request permission to connect to an attached
 * serial port device.
 * @returns {Promise<CSerialPortProtocol?>} The requested
 * connected serial port or null if request was canceled or could not be
 * connected.
 * @throws {SyntaxError} Reflecting either {@link API_MISUSE},
 * {@link API_NOT_IMPLEMENTED}, {@link API_TYPE_VIOLATION}, or
 * {@link API_UNSUPPORTED_RUNTIME} codemelted.js module API
 * violations. You should not try-catch these as they serve as asserts
 * to the developer.
 * @example
 * // Determine if serial port processing is supported.
 * const supported = hw_serial_ports_supported();
 * if (supported) {
 *    const port = await hw_request_serial_port();
 *    if (port) {
 *      // Do something with port
 *    }
 * }
 */
export async function hw_request_serial_port() {
  if (!hw_support_serial_port()) {
    throw API_UNSUPPORTED_RUNTIME;
  }

  try {
    // @ts-ignore This is available in some web browsers
    const port = await globalThis.navigator.serial.requestPort();
    return new CSerialPortProtocol(port);
  } catch (err) {
    return null;
  }
}

/**
 * <mark>FUTURE DEVELOPMENT. DO NOT USE!</mark>
 * @throws {SyntaxError} Reflecting either {@link API_MISUSE},
 * {@link API_NOT_IMPLEMENTED}, {@link API_TYPE_VIOLATION}, or
 * {@link API_UNSUPPORTED_RUNTIME} codemelted.js module API
 * violations. You should not try-catch these as they serve as asserts
 * to the developer.
 */
export function hw_request_usb() {
  // TODO: Develop actual protocol against CProtocolHandler
  throw API_NOT_IMPLEMENTED;
}

/**
 * Determines if the JavaScript runtime support connecting to external
 * devices via bluetooth protocol.
 * @returns {boolean} Indication of runtime support.
 * @throws {SyntaxError} Reflecting either {@link API_MISUSE},
 * {@link API_NOT_IMPLEMENTED}, {@link API_TYPE_VIOLATION}, or
 * {@link API_UNSUPPORTED_RUNTIME} codemelted.js module API
 * violations. You should not try-catch these as they serve as asserts
 * to the developer.
 * @example
 * // TBD
 */
export function hw_support_bluetooth() {
  return if_def("navigator") &&
    if_def("bluetooth", globalThis["navigator"]);
}

/**
 * Determines if the JavaScript runtime support connecting to Musical
 * Instrument Digital Interface (MIDI) Devices.
 * @returns {boolean} Indication of runtime support.
 * @throws {SyntaxError} Reflecting either {@link API_MISUSE},
 * {@link API_NOT_IMPLEMENTED}, {@link API_TYPE_VIOLATION}, or
 * {@link API_UNSUPPORTED_RUNTIME} codemelted.js module API
 * violations. You should not try-catch these as they serve as asserts
 * to the developer.
 * @example
 * // TBD
 */
export function hw_support_midi() {
  return if_def("navigator") &&
    if_def("requestMIDIAccess", globalThis["navigator"]);
}

/**
 * Determines if the JavaScript runtime will support the ability to
 * retrieve device orientation.
 * @returns {boolean} Indication of runtime support.
 * @throws {SyntaxError} Reflecting either {@link API_MISUSE},
 * {@link API_NOT_IMPLEMENTED}, {@link API_TYPE_VIOLATION}, or
 * {@link API_UNSUPPORTED_RUNTIME} codemelted.js module API
 * violations. You should not try-catch these as they serve as asserts
 * to the developer.
 * @example
 * // TBD
 */
export function hw_support_orientation() {
  return if_def("navigator") &&
    if_def("geolocation", globalThis["navigator"]);
}

/**
 * Determines if the JavaScript runtime will provide the ability to
 * connect with serial ports.
 * @returns {boolean} true if available, false otherwise.
 * @throws {SyntaxError} Reflecting either {@link API_MISUSE},
 * {@link API_NOT_IMPLEMENTED}, {@link API_TYPE_VIOLATION}, or
 * {@link API_UNSUPPORTED_RUNTIME} codemelted.js module API
 * violations. You should not try-catch these as they serve as asserts
 * to the developer.
 * @example
 * // Determine if serial port processing is supported.
 * const supported = hw_serial_ports_supported();
 * if (supported) {
 *    const port = await hw_request_serial_port();
 *    if (port) {
 *      // Do something with port!
 *    }
 * }
 */
export function hw_support_serial_port() {
  return if_def("navigator") && if_def("serial", globalThis["navigator"]);
}

/**
 * Determines if the JavaScript runtime supports connecting to a usb
 * device.
 * @returns {boolean} Indication of runtime support.
 * @throws {SyntaxError} Reflecting either {@link API_MISUSE},
 * {@link API_NOT_IMPLEMENTED}, {@link API_TYPE_VIOLATION}, or
 * {@link API_UNSUPPORTED_RUNTIME} codemelted.js module API
 * violations. You should not try-catch these as they serve as asserts
 * to the developer.
 * @example
 * // TBD
 */
export function hw_support_usb() {
  return if_def("navigator") && if_def("usb", globalThis["navigator"]);
}

// ============================================================================
// [JSON UC IMPLEMENTATION] ===================================================
// ============================================================================

/**
 * Decodes a string of data which has been encoded using Base64 encoding.
 * @param {string} data Base64 encoded string.
 * @returns {string | null} The decoded string or null if the encoding
 * failed.
 * @throws {SyntaxError} Reflecting either {@link API_MISUSE},
 * {@link API_NOT_IMPLEMENTED}, {@link API_TYPE_VIOLATION}, or
 * {@link API_UNSUPPORTED_RUNTIME} codemelted.js module API
 * violations. You should not try-catch these as they serve as asserts
 * to the developer.
 * @example
 * // TBD
 */
export function json_atob(data) {
  json_check_type({type: "string", data: data, should_throw: true});
  try {
    return globalThis.atob(data);
  } catch (err) {
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
 * @throws {SyntaxError} Reflecting either {@link API_MISUSE},
 * {@link API_NOT_IMPLEMENTED}, {@link API_TYPE_VIOLATION}, or
 * {@link API_UNSUPPORTED_RUNTIME} codemelted.js module API
 * violations. You should not try-catch these as they serve as asserts
 * to the developer.
 * @example
 * // TBD
 */
export function json_btoa(data) {
  json_check_type({type: "string", data: data, should_throw: true});
  try {
    return globalThis.btoa(data);
  } catch (err) {
    return null;
  }
}

/**
 * Creates a JavaScript compliant JSON array with ability to copy data
 * from a previous array.
 * @param {any[]} [data] An optional array of data to copy
 * @returns {any[]} The newly created array with optional data.
 * @throws {SyntaxError} Reflecting either {@link API_MISUSE},
 * {@link API_NOT_IMPLEMENTED}, {@link API_TYPE_VIOLATION}, or
 * {@link API_UNSUPPORTED_RUNTIME} codemelted.js module API
 * violations. You should not try-catch these as they serve as asserts
 * to the developer.
 * @example
 * // TBD
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
 * @throws {SyntaxError} Reflecting either {@link API_MISUSE},
 * {@link API_NOT_IMPLEMENTED}, {@link API_TYPE_VIOLATION}, or
 * {@link API_UNSUPPORTED_RUNTIME} codemelted.js module API
 * violations. You should not try-catch these as they serve as asserts
 * to the developer.
 * @example
 * // TBD
 */
export function json_create_object(data) {
  if (json_check_type({type: "object", data})) {
    return Object.assign({}, data);
  }
  return {};
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
 * @throws {SyntaxError} Reflecting either {@link API_MISUSE},
 * {@link API_NOT_IMPLEMENTED}, {@link API_TYPE_VIOLATION}, or
 * {@link API_UNSUPPORTED_RUNTIME} codemelted.js module API
 * violations. You should not try-catch these as they serve as asserts
 * to the developer.
 * @example
 * // TBD
 */
export function json_check_type({
  type,
  data,
  count = undefined,
  should_throw = false
}) {
  try {
    const isExpectedType = typeof type !== "string"
      ? (data instanceof type)
      : typeof data === type;
    let valid = typeof count === "number"
      ? isExpectedType && data.length === count
      : isExpectedType;
    if (should_throw && !valid) {
      logger_log({
        level: LOGGER.error,
        data: "json_check_type() - type specified not of an expected type."
      })
      throw API_TYPE_VIOLATION;
    }
    return valid;
  } catch (err) {
    throw API_MISUSE;
  }
}

/**
 * Determines if the specified object has the specified property.
 * @param {object} params
 * @param {object} params.data The object to check.
 * @param {string} params.key The property to find.
 * @param {boolean} [params.should_throw=false] Whether to throw instead
 * of returning a value upon failure.
 * @returns {boolean} true if property was found, false otherwise.
 * @throws {SyntaxError} Reflecting either {@link API_MISUSE},
 * {@link API_NOT_IMPLEMENTED}, {@link API_TYPE_VIOLATION}, or
 * {@link API_UNSUPPORTED_RUNTIME} codemelted.js module API
 * violations. You should not try-catch these as they serve as asserts
 * to the developer.
 * @example
 * // TBD
 */
export function json_has_key({data, key, should_throw = false}) {
  json_check_type({type: "object", data: data, should_throw: true});
  json_check_type({type: "string", data: key, should_throw: true});
  var hasKey = Object.hasOwn(data, key);
  if (should_throw && !hasKey) {
    throw API_TYPE_VIOLATION;
  }
  return hasKey;
}

/**
 * Converts a string to a supported JSON data type.
 * @param {string} data The data to parse.
 * @returns {any | null} The JSON data type or null if the parsing fails.
 * @throws {SyntaxError} Reflecting either {@link API_MISUSE},
 * {@link API_NOT_IMPLEMENTED}, {@link API_TYPE_VIOLATION}, or
 * {@link API_UNSUPPORTED_RUNTIME} codemelted.js module API
 * violations. You should not try-catch these as they serve as asserts
 * to the developer.
 * @example
 * // TBD
 */
export function json_parse(data) {
  try {
    return JSON.parse(data);
  } catch (ex) {
    return null;
  }
}

/**
 * Converts a JSON supported data type into a string.
 * @param {any} data The data to convert.
 * @returns {string | null} The string representation or null if the
 * stringify failed.
 * @throws {SyntaxError} Reflecting either {@link API_MISUSE},
 * {@link API_NOT_IMPLEMENTED}, {@link API_TYPE_VIOLATION}, or
 * {@link API_UNSUPPORTED_RUNTIME} codemelted.js module API
 * violations. You should not try-catch these as they serve as asserts
 * to the developer.
 * @example
 * // TBD
 */
export function json_stringify(data) {
  try {
    return JSON.stringify(data);
  } catch (ex) {
    return null;
  }
}

/**
 * Checks for a valid URL.
 * @param {object} params
 * @param {string} params.data String to parse to see if it is a valid
 * URL.
 * @param {boolean} [params.should_throw=false] Whether to throw instead
 * of returning a value upon failure.
 * @returns {boolean} true if valid, false otherwise.
 * @throws {SyntaxError} Reflecting either {@link API_MISUSE},
 * {@link API_NOT_IMPLEMENTED}, {@link API_TYPE_VIOLATION}, or
 * {@link API_UNSUPPORTED_RUNTIME} codemelted.js module API
 * violations. You should not try-catch these as they serve as asserts
 * to the developer.
 * @example
 * // TBD
 */
export function json_valid_url({data, should_throw = false}) {
  json_check_type({type: "string", data: data, should_throw: true});
  let url = undefined;
  try {
    url = new URL(data);
  } catch (_err) {
    url = undefined;
  }
  let valid = json_check_type({type: URL, data: url});
  if (should_throw && !valid) {
    throw API_TYPE_VIOLATION;
  }
  return valid;
}

// ============================================================================
// [LOGGER UC IMPLEMENTATION] =================================================
// ============================================================================

/**
 * A log handler for further processing of a logged event.
 * @callback CLogHandler
 * @param {CLogRecord} record The record logged.
 * @returns {void}
 */

/**
 * The log record processed via the [CLogHandler] post logging event.
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
   * @readonly
   * @type {Date}
   */
  get time() { return this.#time; }

  /**
   * The [CLogLevel] representation of the log level.
   * @readonly
   * @type {LOGGER}
   */
  get level() { return this.#level; }

  /**
   * The data associated with the log event.
   * @readonly
   * @type {any}
   */
  get data() { return this.#data; }

  /**
   * Constructor for the class.
   * @param {LOGGER} level object information.
   * @param {any} data The data to log.
   */
  constructor(level, data) {
    this.#level = level;
    this.#data = data;
  }
}

/**
 * Holds the logger configuration information for log level and labels.
 * @readonly
 * @enum {object}
 * @property {object} debug   level (0) / label "DEBUG"
 * @property {object} info    level (1) / label "INFO"
 * @property {object} warning level (2) / label "WARNING"
 * @property {object} error   level (3) / label "ERROR"
 * @property {object} off     level (4) / label "OFF"
 */
export const LOGGER = Object.freeze({
  debug:   { level: 0, label: "DEBUG"   },
  info:    { level: 1, label: "INFO"    },
  warning: { level: 2, label: "WARNING" },
  error:   { level: 3, label: "ERROR"   },
  off:     { level: 4, label: "OFF"     },
});

/**
 * Holds the logger level object for module logging.
 * One of the {@link LOGGER} settings.
 * @private
 * @type {object}
 */
let _logger_level = LOGGER.error;

/**
 * Holds the logger handler for post logging events.
 * @private
 * @type {CLogHandler?}
 */
let _logger_handler = null;


/**
 * Sets the logger handler for post logging processing.
 * @param {CLogHandler | null} handler The handler to utilize.
 * @returns {void}
 * @throws {SyntaxError} Reflecting either {@link API_MISUSE},
 * {@link API_NOT_IMPLEMENTED}, {@link API_TYPE_VIOLATION}, or
 * {@link API_UNSUPPORTED_RUNTIME} codemelted.js module API
 * violations. You should not try-catch these as they serve as asserts
 * to the developer.
 * @example
 * // TBD
 */
export function logger_handler(handler) {
  if (json_check_type({type: "function", data: handler, count: 1})) {
    _logger_handler = handler;
  } else if (handler === null) {
    _logger_handler = handler;
  } else {
    throw API_TYPE_VIOLATION;
  }
}

/**
 * Sets / retrieves the current module log level.
 * @param {object | undefined} [level] The optional log level to set
 * based on the {@link codemelted LOGGER} object configuration.
 * @returns {string} The string representation of the log level.
 * @throws {SyntaxError} Reflecting either {@link API_MISUSE},
 * {@link API_NOT_IMPLEMENTED}, {@link API_TYPE_VIOLATION}, or
 * {@link API_UNSUPPORTED_RUNTIME} codemelted.js module API
 * violations. You should not try-catch these as they serve as asserts
 * to the developer.
 * @example
 * // TBD
 */
export function logger_level(level) {
  if (level) {
    json_check_type({type: "object", data: level, should_throw: true});
    json_has_key({data: level, key: "level", should_throw: true});
    json_has_key({data: level, key: "label", should_throw: true});
    _logger_level = level;
  }
  // @ts-ignore Property exists on the struct.
  return _logger_level.label;
}

/**
 * Logs an event with the module logger.
 * @param {object} params The named parameters.
 * @param {LOGGER} params.level The log level for the logged event.
 * @param {any} params.data The data to log with the event.
 * @returns {void}
 * @throws {SyntaxError} Reflecting either {@link API_MISUSE},
 * {@link API_NOT_IMPLEMENTED}, {@link API_TYPE_VIOLATION}, or
 * {@link API_UNSUPPORTED_RUNTIME} codemelted.js module API
 * violations. You should not try-catch these as they serve as asserts
 * to the developer.
 * @example
 * // TBD
 */
export function logger_log({level, data}) {
  json_check_type({type: "object", data: level, should_throw: true});
  if (!data) {
    throw API_TYPE_VIOLATION;
  }
  // Check to see if our logging is on or off.
  // @ts-ignore Property exists on the struct.
  if (_logger_level.label == "OFF") {
    return;
  }

  // It's on, go create the log record and go log some stuff.
  const record = new CLogRecord(level, data);
  // @ts-ignore Property exists on the struct.
  if (record.level.level >= _logger_level.level) {
    // @ts-ignore Property exists on the struct.
    switch (record.level.label) {
      case "DEBUG":
      case "INFO":
        console.info(
          record.time.toISOString(),
          // @ts-ignore Property exists on the struct.
          record.level.label,
          record.data
        );
      case "WARNING":
        console.warn(
          record.time.toISOString(),
          // @ts-ignore Property exists on the struct.
          record.level.label,
          record.data
        );
        break;
      case "ERROR":
        console.error(
          record.time.toISOString(),
          // @ts-ignore Property exists on the struct.
          record.level.label,
          record.data
        );
        break;
    }

    if (_logger_handler) {
      _logger_handler(record);
    }
  }
}

// ============================================================================
// [NETWORK UC IMPLEMENTATION] ================================================
// ============================================================================

/**
 * The BroadcastChannel interface represents a named channel that any browsing
 * context of a given origin can subscribe to. It allows communication between
 * different documents (in different windows, tabs, frames or iframes) of the
 * same origin.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API
 * @extends {CProtocolHandler}
 */
export class CBroadcastChannelProtocol extends CProtocolHandler {
  /** @type {BroadcastChannel} */
  #channel

  /** @type {MessageEvent[]} */
  #rxData = [];

  /** @type {MessageEvent[]} */
  #rxError = [];

  /**
   * Gets the latest data received from the protocol.
   * @override
   * @param {string} [request=""] NOT USED.
   * @returns {Promise<CResult>} The result containing the given
   * information. Errors are processed first if they have been received.
   */
  // @ts-ignore
  async get_message(request="") {
    return new Promise((resolve) => {
      if (!this.is_running) {
        resolve(new CResult({error: API_MISUSE}));
      }
      setTimeout(() => {
        if (this.#rxError.length > 0) {
          resolve(new CResult({error: this.#rxError.shift()}));
        } else {
          if (this.#rxData.length > 0) {
            resolve(new CResult({value: this.#rxData.shift()}));
          } else {
            resolve(new CResult());
          }
        }
      });
    });
  }

  /**
   * @override
   * @inheritdoc
   */
  is_running() {
    return this.#channel.onmessage !=null
      && this.#channel.onmessageerror != null;
  }

  /**
   * Sends a message, which can be of any kind of Object, to each listener
   * in any browsing context with the same origin. The message is
   * transmitted as a message event targeted at each BroadcastChannel
   * bound to the channel.
   * @override
   * @param {any} data Data to be sent to the other window. The data is
   * serialized using the structured clone algorithm. This means you can
   * pass a broad variety of data objects safely to the destination window
   * without having to serialize them yourself.
   * @returns {Promise<CResult>} The result of the transmission.
   */
  async post_message(data) {
    try {
      if (!this.is_running()) {
        throw API_MISUSE;
      }
      this.#channel.postMessage(data);
      return new CResult();
    } catch (err) {
      logger_log({
        level: LOGGER.error,
        data: `CBroadcastChannelProtocol::post_message() error ` +
          `occurred. ${err}`
      })
      return new CResult({error: err});
    }
  }

  /**
   * @override
   * @inheritdoc
   */
  terminate() {
    if (!this.is_running()) {
      logger_log({
        level: LOGGER.error,
        data: `CBroadcastChannelProtocol::terminate() error. ${API_MISUSE}`
      });
      throw API_MISUSE;
    }
    // Close the connection and clear the channel items.
    this.#channel.onmessage = null;
    this.#channel.onmessageerror = null;
    this.#channel.close();
    this.#rxData.length = 0;
    this.#rxError.length = 0;
  }

  /**
   * Constructor for the class.
   * @param {string} url The URL to open a connection to broadcast data to
   * other listeners.
   */
  constructor(url) {
    super(`CBroadcastChannelProtocol-${url}`);
    this.#channel = new globalThis.BroadcastChannel(url);
    this.#channel.onmessage = (evt) => {
      setTimeout(() => {
        this.#rxData.push(evt);
      });
    };
    this.#channel.onmessageerror = (evt) => {
      setTimeout(() => {
        this.#rxError.push(evt);
      });
    };
  }
}

/**
 * Provides the ability to connect to different server protocols via the
 * {@link network_connect} function.
 * @readonly
 * @enum {string}
 * @property {string} BroadcastChannel The Broadcast Channel API allows
 * basic communication between browsing contexts (that is, windows, tabs,
 * frames, or iframes) and workers on the same origin.
 * @property {string} EventSource An EventSource instance opens a
 * persistent connection to an HTTP server, which sends events in
 * text/event-stream format.
 * @property {string} WebSocket Provides the API for creating and managing
 * a WebSocket connection to a server, as well as for sending and receiving
 * data on the connection.
 * @property {string} WebRTC Provides the API for creating and connecting
 * to a WebRTC server allowing for voice / video connection with another
 * user.
 */
export const CONNECT_REQUEST = Object.freeze({
  BroadcastChannel: "broadcast_channel",
  EventSource: "event_source",
  WebSocket: "web_socket",
  WebRTC: "web_rtc",
});

/**
 * Opens a persistent connection to an HTTP server, which sends events in
 * text/event-stream format. The connection remains open until terminate is
 * called.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/EventSource
 * @extends {CProtocolHandler}
 */
export class CEventSourceProtocol extends CProtocolHandler {
  /**
   * Supports the [CEventSourceProtocol.state] function.
   * @constant {number}
   */
  static get CONNECTING() { return  0; }

  /**
   * Supports the [CEventSourceProtocol.state] function.
   * @constant {number}
   */
  static get OPEN() { return  1; }

  /**
   * Supports the [CEventSourceProtocol.state] function.
   * @constant {number}
   */
  static get CLOSED() { return  2; }

  /** @type {EventSource} */
  #sse

  /** @type {MessageEvent[]} */
  #rxData = [];

  /** @type {Event[]} */
  #rxError = [];

  /**
   * Retrieves the current state of the [CEventSourceProtocol]. -1 returns
   * if protocol has been terminated.
   * @readonly
   * @type {number}
   */
  get state() {
    return this.is_running() ?
      this.#sse.readyState
      : -1;
  }

  /**
   * Gets the latest data received from the protocol.
   * @override
   * @param {string} [request=""] NOT USED.
   * @returns {Promise<CResult>} The result containing the given
   * information. Errors are processed first if they have been received.
   */
  // @ts-ignore
  async get_message(request="") {
    return new Promise((resolve) => {
      if (!this.is_running()) {
        resolve(new CResult({error: API_MISUSE}));
      }
      setTimeout(() => {
        if (this.#rxError.length > 0) {
          resolve(new CResult({error: this.#rxError.shift()}));
        } else {
          if (this.#rxData.length > 0) {
            resolve(new CResult({value: this.#rxData.shift()}));
          } else {
            resolve(new CResult());
          }
        }
      });
    });
  }

  /**
   * @override
   * @inheritdoc
   */
  is_running() {
    return this.#sse.onmessage !=null
      && this.#sse.onerror != null;
  }

  /**
   * NOT USED. DON'T CALL.
   * @override
   * @param {any} data
   * @returns {Promise<CResult>}
   */
  // @ts-ignore
  async post_message(data) { throw API_NOT_IMPLEMENTED; }

  /**
   * @override
   * @inheritdoc
   */
  terminate() {
    if (!this.is_running()) {
      throw API_MISUSE;
    }
    // Close the connection and clear the channel items.
    this.#sse.close();
    this.#sse.onerror = null;
    this.#sse.onmessage = null;
    this.#rxData.length = 0;
    this.#rxError.length = 0;
  }

  /**
   * Constructor for the protocol
   * @param {string} url The URL to connect to receive events.
   */
  constructor(url) {
    super(`CEventSourceProtocol-${url}`);
    this.#sse = new globalThis.EventSource(url);
    this.#sse.onerror = (evt) => {
      setTimeout(() => {
        this.#rxError.push(evt);
      });
    }
    this.#sse.onmessage = (evt) => {
      setTimeout(() => {
        this.#rxData.push(evt);
      });
    }
  }
}

/**
 * The result object from a [network_fetch] call containing any data
 * from the call along with the HTTP Status Code of the transaction.
 * @extends {CResult}
 */
export class CFetchResult extends CResult {
  /** @type {number} */
  #status = -1;

  /**
   * Will get the data if it is a Uint8Array or null if not that object
   * type.
   * @readonly
   * @type {Uint8Array?}
   */
  get asBinary() {
    return json_check_type({type: Uint8Array,
      data: this.value()})
        ? this.value()
        : null;
  }

  /**
   * Will get the data if it is a Blob or null if not that object type.
   * @readonly
   * @type {Blob?}
   */
  get asBlob() {
    return json_check_type({type: Blob, data: this.value()})
      ? this.value()
      : null;
  }

  /**
   * Will get the value if it is a FormData or null if not that object
   * type.
   * @readonly
   * @type {FormData?}
   */
  get asFormData() {
    return json_check_type({type: FormData, data: this.value()})
      ? this.value()
      : null;
  }

  /**
   * Will get the value if it is a Object or null if not that object
   * type.
   * @readonly
   * @type {object?}
   */
  get asObject() {
    return json_check_type({type: "object", data: this.value()})
      ? this.value()
      : null;
  }

  /**
   * Will get the value if it is a string or null if not that object
   * type.
   * @readonly
   * @type {string?}
   */
  get asString() {
    return json_check_type({type: "string", data: this.value()})
      ? this.value()
      : null;
  }

  /**
   * Provides additional check of status code along with super property.
   * @override
   */
  is_error() {
    return super.is_error() || this.status < 200 || this.status > 299;
  }

  /**
   * The HTTP Status Code
   * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status
   * @readonly
   * @type {number}
   */
  get status() { return this.#status; }

  /**
   * Constructor for the class.
   * @param {object} params
   * @param {number} params.status
   * @param {any} [params.data]
   * @param {any} [params.error]
   */
  constructor({status, data, error=null}) {
    super({value: data, error: error});
    this.#status = status;
  }
}

/**
 * Provides the API for creating and managing a WebSocket connection to a
 * server, as well as for sending and receiving data on the connection.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
 * @extends {CProtocolHandler}
 */
export class CWebSocketProtocol extends CProtocolHandler {
  /**
   * Supports the [CWebSocketProtocol.state] function.
   * @constant {number}
   */
  static get CONNECTING() { return  0; }

  /**
   * Supports the [CWebSocketProtocol.state] function.
   * @constant {number}
   */
  static get OPEN() { return  1; }

  /**
   * Supports the [CWebSocketProtocol.state] function.
   * @constant {number}
   */
  static get CLOSING() { return  2; }

  /**
   * Supports the [CWebSocketProtocol.state] function.
   * @constant {number}
   */
  static get CLOSED() { return  3; }

  /** @type {string} */
  #url;

  /** @type {any} */
  #socket

  /** @type {MessageEvent[]} */
  #rxData = [];

  /** @type {Event[]} */
  #rxError = [];

  /**
   * Retrieves the current state of the [CWebSocketProtocol]. -1 returns
   * if protocol has been terminated.
   * @readonly
   * @type {number}
   */
  get state() {
    return this.is_running() ?
      this.#socket.readyState
      : -1;
  }

  /**
   * Gets the latest data received from the protocol.
   * @override
   * @param {string} [request=""] NOT USED.
   * @returns {Promise<CResult>} The result containing the given
   * information. Errors are processed first if they have been received.
   */
  // @ts-ignore
  async get_message(request="") {
    if (!this.is_running) {
      throw API_MISUSE;
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        if (this.#rxError.length > 0) {
          resolve(new CResult({error: this.#rxError.shift()}));
        } else {
          if (this.#rxData.length > 0) {
            resolve(new CResult({value: this.#rxData.shift()}));
          } else {
            resolve(new CResult());
          }
        }
      });
    });
  }

  /**
   * @override
   * @inheritdoc
   */
  is_running() {
    return this.#socket.onmessage !=null
      && this.#socket.onerror != null;
  }

  /**
   * Enqueues the specified data to be transmitted to the server over the
   * WebSocket connection, increasing the value of bufferedAmount by the
   * number of bytes needed to contain the data. If the data can't be sent
   * (for example, because it needs to be buffered but the buffer is full),
   * the socket is closed automatically.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send#data
   * @override
   * @param {string | ArrayBuffer | Blob } data Data to send to the server
   * for further processing.
   * @returns {Promise<CResult>} The result of the transmission. A failure
   * will result in a disconnect and reconnect of the underlying protocol
   * socket.
   */
  async post_message(data) {
    if (!this.is_running) {
      throw API_MISUSE;
    }
    try {
      this.#socket.send(data);
      return new CResult();
    } catch (err) {
      this.#closeSocket();
      this.#connectSocket();
      return new CResult({error: err});
    }
  }

  /**
   * @override
   * @inheritdoc
   */
  terminate() {
    if (!this.is_running) {
      throw API_MISUSE;
    }
    this.#closeSocket();
  }

  /**
   * Constructs the given protocol connecting it to the server at url.
   * @param {object} params The named parameters
   * @param {string} params.url The url to connect to a server.
   */
  constructor({url}) {
    super(`CWebSocketProtocol-${url ?? 'server'}`);
    this.#url = url;
    this.#connectSocket();
  }

  /**
   * Handles creating a web socket to connect to a server.
   */
  #connectSocket() {
    // @ts-ignore URL will not be null.
    this.#socket = new globalThis.WebSocket(this.#url);
    this.#socket.onmessage = (/** @type {MessageEvent<any>} */ evt) => {
      setTimeout(() => {
        this.#rxData.push(evt);
      });
    }
    this.#socket.onerror = (/** @type {Event} */ evt) => {
      setTimeout(() => {
        this.#rxError.push(evt);
      });
    }
  }

  /**
   * Closes the socket.
   */
  #closeSocket() {
    this.#socket.close();
    this.#socket.onmessage = null;
    this.#socket.onerror = null;
    this.#rxData.length = 0;
    this.#rxError.length = 0;
  }
}

/**
 * Sends an HTTP POST request containing a small amount of data to a web
 * server.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon
 * @param {object} params The named parameters
 * @param {string} params.url Where to send the beacon.
 * @param {any | null} [params.data] The data to send with the beacon.
 * @returns {boolean} true if queued up by user agent, false otherwise.
 * @throws {SyntaxError} Reflecting either {@link API_MISUSE},
 * {@link API_NOT_IMPLEMENTED}, {@link API_TYPE_VIOLATION}, or
 * {@link API_UNSUPPORTED_RUNTIME} codemelted.js module API
 * violations. You should not try-catch these as they serve as asserts
 * to the developer.
 * @example
 * // TBD
 */
export function network_beacon({url, data}) {
  if (!runtime_is_browser()) {
    throw API_UNSUPPORTED_RUNTIME;
  }
  // @ts-ignore Will exist in a browser context.
  return globalThis.navigator.sendBeacon(url, data);
}

/**
 * Provides the ability to create client side protocols to send / receive
 * data with other items within the network / Internet.
 * @param {object} params The named parameters.
 * @param {CONNECT_REQUEST} params.request The protocol to connect.
 * @param {string} params.url The server hosting the protocol to connect.
 * @returns {CBroadcastChannelProtocol | CEventSourceProtocol |
 * CWebSocketProtocol } The protocol to communicate with the connected
 * server. {@link CBroadcastChannelProtocol},
 * {@link CEventSourceProtocol},
 * {@link CWebSocketProtocol}
 * @throws {SyntaxError} Reflecting either {@link API_MISUSE},
 * {@link API_NOT_IMPLEMENTED}, {@link API_TYPE_VIOLATION}, or
 * {@link API_UNSUPPORTED_RUNTIME} codemelted.js module API
 * violations. You should not try-catch these as they serve as asserts
 * to the developer.
 * @example
 * // TBD
 */
export function network_connect({request, url}) {
  switch (request) {
    case CONNECT_REQUEST.BroadcastChannel:
      return new CBroadcastChannelProtocol(url);
    case CONNECT_REQUEST.EventSource:
      return new CEventSourceProtocol(url);
    case CONNECT_REQUEST.WebSocket:
      return new CWebSocketProtocol({url: url});
    case CONNECT_REQUEST.WebRTC:
      throw API_NOT_IMPLEMENTED;
    default:
      throw API_MISUSE;
  }
}

/**
 * Provides the ability to make requests from a hosted server REST API.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/RequestInit
 * @param {object} params The named parameters
 * @param {string} params.url The URL to the server REST API to
 * communicate.
 * @param {object} params.options The data to configure / go along with
 * the request. See the attached URL for detailed
 * @returns {Promise<CFetchResult>} The result of the request.
 * @throws {SyntaxError} Reflecting either {@link API_MISUSE},
 * {@link API_NOT_IMPLEMENTED}, {@link API_TYPE_VIOLATION}, or
 * {@link API_UNSUPPORTED_RUNTIME} codemelted.js module API
 * violations. You should not try-catch these as they serve as asserts
 * to the developer.
 * @example
 * // TBD
 */
export async function network_fetch({url, options}) {
  try {
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
    return new CFetchResult({status: 418, error: err});
  }
}

// ============================================================================
// [NPU UC IMPLEMENTATION] ====================================================
// ============================================================================

/**
 * The math formula to execute with the {@link npu_math} call.
 * @readonly
 * @enum {string}
 * @property {string} GeodeticDistance
 * Distance in meters between two WGS84 points.
 * @property {string} GeodeticHeading
 * Heading in °N true North 0 - 359.
 * @property {string} GeodeticSpeed
 * Speed in meters per second between two WGS84 points.
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
  GeodeticDistance: "GeodeticDistance",
  GeodeticHeading: "GeodeticHeading",
  GeodeticSpeed: "GeodeticSpeed",
  TemperatureCelsiusToFahrenheit: "TemperatureCelsiusToFahrenheit",
  TemperatureCelsiusToKelvin: "TemperatureCelsiusToKelvin",
  TemperatureFahrenheitToCelsius: "TemperatureFahrenheitToCelsius",
  TemperatureFahrenheitToKelvin: "TemperatureFahrenheitToKelvin",
  TemperatureKelvinToCelsius: "TemperatureKelvinToCelsius",
  TemperatureKelvinToFahrenheit: "TemperatureKelvinToFahrenheit"
});

/**
 * Calculate the geodetic distance.
 * @private
 * @param {number} start_latitude
 * @param {number} start_longitude
 * @param {number} end_latitude
 * @param {number} end_longitude
 * @returns {number}
 */
function _geodetic_distance(start_latitude, start_longitude,
    end_latitude, end_longitude) {
  // Convert degrees to radians
  let lat1 = start_latitude * Math.PI / 180.0;
  let lon1 = start_longitude * Math.PI / 180.0;

  let lat2 = end_latitude * Math.PI / 180.0;
  let lon2 = end_longitude * Math.PI / 180.0;

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
 * @private
 * @param {number} start_latitude
 * @param {number} start_longitude
 * @param {number} end_latitude
 * @param {number} end_longitude
 * @returns {number}
 */
function _geodetic_heading(start_latitude, start_longitude,
    end_latitude, end_longitude) {
  // Get the initial data from our variables:
  let lat1 = start_latitude * (Math.PI / 180.0);
  let lon1 = start_longitude * (Math.PI / 180.0);
  let lat2 = end_latitude * (Math.PI  / 180.0);
  let lon2 = end_longitude * (Math.PI  / 180.0);

  // Set up our calculations
  let y = Math.sin(lon2 - lon1) * Math.cos(lat2);
  let x = (Math.cos(lat1) * Math.sin(lat2)) -
    (Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1));
  let rtnval = Math.atan2(y, x) * (180.0 / Math.PI);
  return (rtnval + 360.0) % 360.0;
}

/**
 * Calculates the geodetic speed.
 * @private
 * @param {number} start_milliseconds
 * @param {number} start_latitude
 * @param {number} start_longitude
 * @param {number} end_milliseconds
 * @param {number} end_latitude
 * @param {number} end_longitude
 * @returns {number}
 */
function _geodetic_speed(start_latitude, start_longitude,
    start_milliseconds, end_latitude, end_longitude, end_milliseconds) {
  let dist_meters = _geodetic_distance(
    start_latitude, start_longitude,
    end_latitude, end_longitude
  );
  let time_s = (end_milliseconds - start_milliseconds) / 1000.0;
  return dist_meters / time_s;
}

/**
 * <mark>FUTURE DEVELOPMENT. DO NOT USE!</mark>
 * @throws {SyntaxError} Reflecting either {@link API_MISUSE},
 * {@link API_NOT_IMPLEMENTED}, {@link API_TYPE_VIOLATION}, or
 * {@link API_UNSUPPORTED_RUNTIME} codemelted.js module API
 * violations. You should not try-catch these as they serve as asserts
 * to the developer.
 * @example
 * // TBD
 */
export function npu_compute() {
  // TBD: This will hook into rust wasm
  throw API_NOT_IMPLEMENTED;
}

/**
 * Function to execute the {@link MATH_FORMULA} specified within the named
 * parameters to get the calculated answer.
 * @param {object} params The named parameters.
 * @param {MATH_FORMULA} params.formula The formula to run.
 * @param {number[]} params.args The arguments to use with the formula.
 * @returns {number} The calculated answer or NaN if division by 0 or sqrt of
 * a negative number.
 * @throws {SyntaxError} Reflecting either {@link API_MISUSE},
 * {@link API_NOT_IMPLEMENTED}, {@link API_TYPE_VIOLATION}, or
 * {@link API_UNSUPPORTED_RUNTIME} codemelted.js module API
 * violations. You should not try-catch these as they serve as asserts
 * to the developer.
 * @example
 * // TBD
 */
export function npu_math({formula, args}) {
  json_check_type({type: "string", data: formula, should_throw: true});
  json_check_type({type: Array, data: args, should_throw: true});
  args.forEach((v) => {
    json_check_type({type: "number", data: v, should_throw: true});
  });
  try {
    switch (formula) {
      case MATH_FORMULA.GeodeticDistance:
        return _geodetic_distance(args[0], args[1], args[2], args[3]);
      case MATH_FORMULA.GeodeticHeading:
        return _geodetic_heading(args[0], args[1], args[2], args[3]);
      case MATH_FORMULA.GeodeticSpeed:
        return _geodetic_speed(args[0], args[1], args[2], args[3], args[4],
          args[5]);
      case MATH_FORMULA.TemperatureCelsiusToFahrenheit:
        return (args[0] * 9.0 / 5.0) + 32.0;
      case MATH_FORMULA.TemperatureCelsiusToKelvin:
        return args[0] + 273.15;
      case MATH_FORMULA.TemperatureFahrenheitToCelsius:
        return (args[0] - 32.0) * (5.0 / 9.0);
      case MATH_FORMULA.TemperatureFahrenheitToKelvin:
        return (args[0] - 32.0) * (5.0 / 9.0) + 273.15;
      case MATH_FORMULA.TemperatureKelvinToCelsius:
        return args[0] - 273.15;
      case MATH_FORMULA.TemperatureKelvinToFahrenheit:
        return (args[0] - 273.15) * (9.0 / 5.0) + 32.0;
    }
  } catch (err) {
    throw API_MISUSE;
  }
  throw API_NOT_IMPLEMENTED;
}

// ============================================================================
// [RUNTIME UC IMPLEMENTATION] ================================================
// ============================================================================

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
 * Determines the available CPU processors for background workers.
 * @returns {number} The available hardware processors.
 * @throws {SyntaxError} Reflecting either {@link API_MISUSE},
 * {@link API_NOT_IMPLEMENTED}, {@link API_TYPE_VIOLATION}, or
 * {@link API_UNSUPPORTED_RUNTIME} codemelted.js module API
 * violations. You should not try-catch these as they serve as asserts
 * to the developer.
 * @example
 * // TBD
 */
export function runtime_cpu_count() {
  if (runtime_is_browser() || runtime_is_deno() ||
      runtime_is_worker()) {
    return globalThis.navigator.hardwareConcurrency;
  }
  throw API_UNSUPPORTED_RUNTIME;
}

/**
 * Searches the host operating system / JavaScript runtime for a variable
 * value.
 * @param {string} name The name of the operating system variable to
 * lookup.
 * @returns {string?} The value associated with the name or null if not
 * found.
 * @throws {SyntaxError} Reflecting either {@link API_MISUSE},
 * {@link API_NOT_IMPLEMENTED}, {@link API_TYPE_VIOLATION}, or
 * {@link API_UNSUPPORTED_RUNTIME} codemelted.js module API
 * violations. You should not try-catch these as they serve as asserts
 * to the developer.
 * @example
 * // TBD
 */
export function runtime_environment(name) {
  if (runtime_is_browser()) {
    let params = new URLSearchParams(globalThis.location.search);
    return params.get(name);
  }
  throw API_UNSUPPORTED_RUNTIME;
}

/**
 * Adds or removes an event listener to the JavaScript runtime or
 * individual element.
 * @param {object} params The named parameters.
 * @param {EVENT_REQUEST} params.action The request to carry out.
 * @param {string} params.type The event listener identifier.
 * @param {CEventHandler} params.listener The listener called
 * when the identified event is triggered or being removed.
 * @param {EventSource} [params.obj] An optional element to attach an
 * event handler to if it supports it.
 * @returns {void}
 * @throws {SyntaxError} Reflecting either {@link API_MISUSE},
 * {@link API_NOT_IMPLEMENTED}, {@link API_TYPE_VIOLATION}, or
 * {@link API_UNSUPPORTED_RUNTIME} codemelted.js module API
 * violations. You should not try-catch these as they serve as asserts
 * to the developer.
 * @example
 * // TBD
 */
export function runtime_event({
  action,
  type,
  listener,
  obj = undefined,
}) {
  json_check_type({type: "string", data: type, should_throw: true});
  json_check_type({
    type: "function",
    data: listener,
    count: 1,
    should_throw: true
  });
  if (action === "add") {
    if (obj) {
      obj.addEventListener(type, listener);
    } else {
      globalThis.addEventListener(type, listener);
    }
  } else if (action === "remove") {
    if (obj) {
      obj.removeEventListener(type, listener);
    } else {
      globalThis.removeEventListener(type, listener);
    }
  } else {
    throw API_MISUSE;
  }
}

/**
 * Determines the hostname of the host operating system.
 * @returns {string} The hostname of the computer.
 * @throws {SyntaxError} Reflecting either {@link API_MISUSE},
 * {@link API_NOT_IMPLEMENTED}, {@link API_TYPE_VIOLATION}, or
 * {@link API_UNSUPPORTED_RUNTIME} codemelted.js module API
 * violations. You should not try-catch these as they serve as asserts
 * to the developer.
 * @example
 * // TBD
 */
export function runtime_hostname() {
  if (runtime_is_browser()) {
    return globalThis.location.hostname;
  }
  throw API_UNSUPPORTED_RUNTIME;
}

/**
 * Determines if the JavaScript runtime is web browser.
 * @returns {boolean} true if web browser, false otherwise.
 * @throws {SyntaxError} Reflecting either {@link API_MISUSE},
 * {@link API_NOT_IMPLEMENTED}, {@link API_TYPE_VIOLATION}, or
 * {@link API_UNSUPPORTED_RUNTIME} codemelted.js module API
 * violations. You should not try-catch these as they serve as asserts
 * to the developer.
 * @example
 * // TBD
 */
export function runtime_is_browser() {
  return if_def("document");
}

/**
 * Determines if the JavaScript runtime is Deno runtime.
 * @returns {boolean} true if Deno, false otherwise.
 * @throws {SyntaxError} Reflecting either {@link API_MISUSE},
 * {@link API_NOT_IMPLEMENTED}, {@link API_TYPE_VIOLATION}, or
 * {@link API_UNSUPPORTED_RUNTIME} codemelted.js module API
 * violations. You should not try-catch these as they serve as asserts
 * to the developer.
 * @example
 * // TBD
 */
export function runtime_is_deno() {
  // @ts-ignore
  return if_def("Deno") && if_def("version", globalThis["Deno"]);
}

/**
 * Determines if the JavaScript runtime is a NodeJS runtime.
 * @returns {boolean} true if NodeJS, false otherwise.
 * @throws {SyntaxError} Reflecting either {@link API_MISUSE},
 * {@link API_NOT_IMPLEMENTED}, {@link API_TYPE_VIOLATION}, or
 * {@link API_UNSUPPORTED_RUNTIME} codemelted.js module API
 * violations. You should not try-catch these as they serve as asserts
 * to the developer.
 * @example
 * // TBD
 */
export function runtime_is_nodejs() {
  return if_def("process") && !runtime_is_deno();
}

/**
 * Determines if the JavaScript runtime is a Worker thread.
 * @returns {boolean} true if worker, false otherwise.
 * @throws {SyntaxError} Reflecting either {@link API_MISUSE},
 * {@link API_NOT_IMPLEMENTED}, {@link API_TYPE_VIOLATION}, or
 * {@link API_UNSUPPORTED_RUNTIME} codemelted.js module API
 * violations. You should not try-catch these as they serve as asserts
 * to the developer.
 * @example
 * // TBD
 */
export function runtime_is_worker() {
  return if_def("WorkerGlobalScope");
}

/**
 * Determines what JavaScript runtime the app is running.
 * @returns {string} Either "deno" / "nodejs" for backend or
 * the name of the actual browser. Or "UNDETERMINED" if it could not
 * be determined.
 * @throws {SyntaxError} Reflecting either {@link API_MISUSE},
 * {@link API_NOT_IMPLEMENTED}, {@link API_TYPE_VIOLATION}, or
 * {@link API_UNSUPPORTED_RUNTIME} codemelted.js module API
 * violations. You should not try-catch these as they serve as asserts
 * to the developer.
 * @example
 * // TBD
 */
export function runtime_name() {
  if (runtime_is_browser()) {
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
  } else if (runtime_is_deno()) {
    return "deno";
  } else if (runtime_is_nodejs()) {
    return "nodejs";
  } else if (runtime_is_worker()) {
    return "worker";
  }
  return "UNDETERMINED";
}

/**
 * Determines if the web app has access to the Internet.
 * @returns {boolean} true if path to Internet available, false otherwise.
 * @throws {SyntaxError} Reflecting either {@link API_MISUSE},
 * {@link API_NOT_IMPLEMENTED}, {@link API_TYPE_VIOLATION}, or
 * {@link API_UNSUPPORTED_RUNTIME} codemelted.js module API
 * violations. You should not try-catch these as they serve as asserts
 * to the developer.
 * @example
 * // TBD
 */
export function runtime_online() {
  if (runtime_is_browser()) {
    // @ts-ignore Property exists in a browser runtime.
    return globalThis.navigator.onLine;
  }
  throw API_UNSUPPORTED_RUNTIME;
}

// ============================================================================
// [STORAGE UC IMPLEMENTATION] ================================================
// ============================================================================

/**
 * Static utility class to mirror that of Session / Local storage APIs.
 * @private
 */
class CCookieStorage {
  /** @type {number} */
  static #expireDays = 365;

  /** @type {string[]} */
  static #keyList = [];

  /**
   * Clears the cookie storage entries.
   */
  static clear() {
    // @ts-ignore Will exist in the browser context
    let cookies = globalThis.document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      // @ts-ignore Will exist in the browser context
      globalThis.document.cookie =
        `${cookies[i]}=;expires=Thu, 01 Jan 1970 00:00:00 UTC`;
    }
    CCookieStorage.initKeyList();
  }

  /**
   * Retrieves an entry from cookie storage.
   * @param {string} key The key to lookup.
   * @returns {string?} The found entry or null if not found.
   */
  static getItem(key) {
    let name = `${key}=`;
    // @ts-ignore Will exist in a browser context.
    let decodedCookie = decodeURIComponent(globalThis.document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return null;
  }

  /**
   * Retrieves the key name at the specified index.
   * @param {number} index The key to retrieve from the given index
   * @returns {string | null} The key entry or null if index went beyond
   * length.
   */
  static key(index) {
    return index < CCookieStorage.#keyList.length
      ? CCookieStorage.#keyList[index]
      : null;
  }

  /**
   * Retrieves the number of entries in cookie storage.
   * @readonly
   * @type {number}
   */
  static get length() { return CCookieStorage.#keyList.length; }

  /**
   * Sets an item within cookie storage.
   * @param {string} key The key entry in the cooke storage.
   * @param {string} value The value to set with the cookie.
   * @returns {void}
   */
  static setItem(key, value) {
    const d = new Date();
    d.setTime(d.getTime() + (this.#expireDays * 24 * 60 * 60 * 1000));
    let expires = `expires=${d.toUTCString()}`;
    // @ts-ignore Will exist in the browser context
    globalThis.document.cookie = `${key}=${value};${expires};path=/`;
    CCookieStorage.initKeyList();
  }

  /**
   * Removes an item from cookie storage.
   * @param {string} key The key to remove
   * @returns {void}
   */
  static removeItem(key) {
    // @ts-ignore Will exist in the browser context
    globalThis.document.cookie =
      `${key}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
    CCookieStorage.initKeyList();
  }

  /**
   * Provides the ability to get a list of keys to support the length
   * property and key method of the Storage interface.
   * @returns {void}
   */
  static initKeyList() {
    CCookieStorage.#keyList = [];
    // @ts-ignore Will exist in the browser context
    let decodedCookie = decodeURIComponent(globalThis.document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let key = ca[i].split("=");
      if (!key[0].includes("expires") && !key[0].includes("path")) {
        CCookieStorage.#keyList.push((key[0]));
      }
    }
  }
}

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
 * Clears the local storage of the module.
 * @param {STORAGE_TYPE} [type=STORAGE_TYPE.Local] The storage to act upon.
 * @returns {void}
 * @throws {SyntaxError} Reflecting either {@link API_MISUSE},
 * {@link API_NOT_IMPLEMENTED}, {@link API_TYPE_VIOLATION}, or
 * {@link API_UNSUPPORTED_RUNTIME} codemelted.js module API
 * violations. You should not try-catch these as they serve as asserts
 * to the developer.
 * @example
 * // TBD
 */
export function storage_clear(type = STORAGE_TYPE.Local) {
  if (runtime_is_nodejs() || runtime_is_worker()) {
    throw API_UNSUPPORTED_RUNTIME;
  }
  switch (type) {
    case STORAGE_TYPE.Cookie:
      CCookieStorage.clear();
      break;
    case STORAGE_TYPE.Local:
      globalThis.localStorage.clear();
      break;
    case STORAGE_TYPE.Session:
      globalThis.sessionStorage.clear();
      break;
    default:
      throw API_MISUSE;
  }
}

/**
 * Gets the value associated with the key from the module's local storage.
 * @param {object} params The named parameters.
 * @param {STORAGE_TYPE} [params.type=STORAGE_TYPE.Local] The storage to act
 * upon.
 * @param {string} params.key The key to search.
 * @returns {string?} The value associated with the key if found.
 * @throws {SyntaxError} Reflecting either {@link API_MISUSE},
 * {@link API_NOT_IMPLEMENTED}, {@link API_TYPE_VIOLATION}, or
 * {@link API_UNSUPPORTED_RUNTIME} codemelted.js module API
 * violations. You should not try-catch these as they serve as asserts
 * to the developer.
 * @example
 * // TBD
 */
export function storage_get({type = STORAGE_TYPE.Local, key}) {
  if (runtime_is_nodejs() || runtime_is_worker()) {
    throw API_UNSUPPORTED_RUNTIME;
  }
  json_check_type({type: "string", data: key, should_throw: true});
  switch (type) {
    case STORAGE_TYPE.Cookie:
      return CCookieStorage.getItem(key);
    case STORAGE_TYPE.Local:
      return globalThis.localStorage.getItem(key);
    case STORAGE_TYPE.Session:
      return globalThis.sessionStorage.getItem(key);
    default:
      throw API_MISUSE;
  }
}

/**
 * Retrieves the key at the specified index.
 * @param {object} params The named parameters
 * @param {STORAGE_TYPE} [params.type=STORAGE_TYPE.Local] The storage to act
 * upon.
 * @param {number} params.index The key entry to look up.
 * @returns {string?} The key at the specified index or null if beyond the
 * storage capacity.
 * @throws {SyntaxError} Reflecting either {@link API_MISUSE},
 * {@link API_NOT_IMPLEMENTED}, {@link API_TYPE_VIOLATION}, or
 * {@link API_UNSUPPORTED_RUNTIME} codemelted.js module API
 * violations. You should not try-catch these as they serve as asserts
 * to the developer.
 * @example
 * // TBD
 */
export function storage_key({type, index}) {
  if (runtime_is_nodejs() || runtime_is_worker()) {
    throw API_UNSUPPORTED_RUNTIME;
  }
  json_check_type({type: "number", data: index, should_throw: true});
  switch (type) {
    case STORAGE_TYPE.Cookie:
      return CCookieStorage.key(index);
    case STORAGE_TYPE.Local:
      return index < globalThis.localStorage.length
        ? globalThis.localStorage.key(index)
        : null;
    case STORAGE_TYPE.Session:
      return index < globalThis.sessionStorage.length
        ? globalThis.sessionStorage.key(index)
        : null;
    default:
      throw API_MISUSE;
  }
}

/**
 * Retrieves the number of entries within the module's local storage.
 * @param {STORAGE_TYPE} [type=STORAGE_TYPE.Local] The storage to act
 * upon.
 * @returns {number} The number of entries.
 * @throws {SyntaxError} Reflecting either {@link API_MISUSE},
 * {@link API_NOT_IMPLEMENTED}, {@link API_TYPE_VIOLATION}, or
 * {@link API_UNSUPPORTED_RUNTIME} codemelted.js module API
 * violations. You should not try-catch these as they serve as asserts
 * to the developer.
 * @example
 * // TBD
 */
export function storage_length(type = STORAGE_TYPE.Local) {
  if (runtime_is_nodejs() || runtime_is_worker()) {
    throw API_UNSUPPORTED_RUNTIME;
  }
  switch (type) {
    case STORAGE_TYPE.Cookie:
      return CCookieStorage.length;
    case STORAGE_TYPE.Local:
      return globalThis.localStorage.length;
    case STORAGE_TYPE.Session:
      return globalThis.sessionStorage.length;
    default:
      throw API_MISUSE;
  }
}

/**
 * Removes a given entry from the module's local storage.
 * @param {object} params The named parameters.
 * @param {STORAGE_TYPE} [params.type=STORAGE_TYPE.Local] The storage to act
 * upon.
 * @param {string} params.key The key to remove.
 * @returns {void}
 * @throws {SyntaxError} Reflecting either {@link API_MISUSE},
 * {@link API_NOT_IMPLEMENTED}, {@link API_TYPE_VIOLATION}, or
 * {@link API_UNSUPPORTED_RUNTIME} codemelted.js module API
 * violations. You should not try-catch these as they serve as asserts
 * to the developer.
 * @example
 * // TBD
 */
export function storage_remove({type = STORAGE_TYPE.Local, key}) {
  if (runtime_is_nodejs() || runtime_is_worker()) {
    throw API_UNSUPPORTED_RUNTIME;
  }
  json_check_type({type: "string", data: key, should_throw: true});
  switch (type) {
    case STORAGE_TYPE.Cookie:
      CCookieStorage.removeItem(key);
      break;
    case STORAGE_TYPE.Local:
      globalThis.localStorage.removeItem(key);
      break;
    case STORAGE_TYPE.Session:
      globalThis.sessionStorage.removeItem(key);
      break;
    default:
      throw API_MISUSE;
  }
}

/**
 * Sets a key/value pair within the module's local storage.
 * @param {object} params The named parameters
 * @param {STORAGE_TYPE} [params.type=STORAGE_TYPE.Local] The storage to act
 * upon.
 * @param {string} params.value The storage entry.
 * @param {string} params.key The key to store.
 * @returns {void}
 * @throws {SyntaxError} Reflecting either {@link API_MISUSE},
 * {@link API_NOT_IMPLEMENTED}, {@link API_TYPE_VIOLATION}, or
 * {@link API_UNSUPPORTED_RUNTIME} codemelted.js module API
 * violations. You should not try-catch these as they serve as asserts
 * to the developer.
 * @example
 * // TBD
 */
export function storage_set({type = STORAGE_TYPE.Local, key, value}) {
  if (runtime_is_nodejs() || runtime_is_worker()) {
    throw API_UNSUPPORTED_RUNTIME;
  }
  json_check_type({type: "string", data: key, should_throw: true});
  json_check_type({type: "string", data: value, should_throw: true});
  switch (type) {
    case STORAGE_TYPE.Cookie:
      CCookieStorage.setItem(key, value);
      break;
    case STORAGE_TYPE.Local:
      globalThis.localStorage.setItem(key, value);
      break;
    case STORAGE_TYPE.Session:
      globalThis.sessionStorage.setItem(key, value);
      break;
    default:
      throw API_MISUSE;
  }
}

// ============================================================================
// [UI UC IMPLEMENTATION] =====================================================
// ============================================================================

/**
 * Provides the request actions for the {@link ui_action} function call.
 * @readonly
 * @enum {string}
 * @property {string} Audio Will construct a {@link CAudioPlayer} object to
 * either playback a URL sound file or perform text-to-speech. Utilize the
 * load() function of the audio player.
 * @property {string} Focus Makes a request to bring the window to the
 * front. It may fail due to user settings and the window isn't guaranteed
 * to be front most before this method returns.
 * @property {string} MoveBy moves the current window by a specified
 * amount.
 * @property {string} MoveTo moves the current window to the specified
 * coordinates.
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
  Audio: "Audio",
  Focus: "Focus",
  MoveBy: "MoveBy",
  MoveTo: "MoveTo",
  Print: "Print",
  PostMessage: "PostMessage",
  ResizeBy: "ResizeBy",
  ResizeTo: "ResizeTo",
  Scroll: "Scroll",
  ScrollBy: "ScrollBy",
  ScrollTo: "ScrollTo",
  Share: "Share",
  Vibrate: "Vibrate",
});

/**
 * Object created from a call to the [ui_audio] function to allow for audio
 * playback on a document. This object is only valid with the data it is
 * created with. Once playback is completed or stopped, it can only be
 * started (i.e. played) again. To change the audio source requires a call
 * to [ui_audio] to get a new audio player.
 */
export class CAudioPlayer {
  /** @type {string} */
  #not_loaded_err = "No loaded src detected. You must call load() before " +
    "using CAudioPlayer.";
  /** @type {HTMLAudioElement | null} */
  #audio_player = null;
  /** @type {SpeechSynthesisUtterance | null} */
  #tts_utterance = null;
  /** @type {string} */
  #state;
  /** @type {CEventHandler | null} */
  #handler = null;

  /**
   * Indicates the ability to loop 'audio' types. Not valid for 'tts' types.
   * @type {boolean}
   */
  get loop() {
    try {
      if (this.#audio_player) {
        return this.#audio_player.loop;
      } else if (this.#tts_utterance) {
        throw "loop property not supported by 'tts' type"
      } else {
        logger_log({
          level: LOGGER.error,
          data: this.#not_loaded_err
        })
        throw API_MISUSE;
      }
    } catch (err) {
      logger_log({
        level: LOGGER.error,
        data: `CAudioPlayer::loop - ${err}`
      })
      throw API_MISUSE;
    }
   }
  set loop(v) {
    json_check_type({type: "boolean", data: v, should_throw: true});
    try {
      if (this.#audio_player) {
        this.#audio_player.loop = v;
      } else if (this.#tts_utterance) {
        throw "loop property not supported by 'tts' type"
      } else {
        throw this.#not_loaded_err
      }
    } catch (err) {
      logger_log({
        level: LOGGER.error,
        data: `CAudioPlayer::loop - ${err}`
      });
      throw API_MISUSE;
    }
  }

  /**
   * Sets / gets the playback rate of the audio player.
   * @type {number}
   */
  get rate() {
    try {
      if (this.#audio_player) {
        return this.#audio_player.playbackRate;
      } else if (this.#tts_utterance) {
        return this.#tts_utterance.rate;
      } else {
        throw this.#not_loaded_err;
      }
    } catch (err) {
      logger_log({
        level: LOGGER.error,
        data: `CAudioPlayer::rate - ${err}`
      });
      throw API_MISUSE;
    }
  }
  set rate(v) {
    json_check_type({type: "number", data: v, should_throw: true});
    let rate = v > 11
      ? 11
      : v < 0.1
        ? 0.1
        : v;
    try {
      if (this.#audio_player) {
        this.#audio_player.playbackRate = rate;
      } else if (this.#tts_utterance) {
        this.#tts_utterance.rate = rate;
      } else {
        throw this.#not_loaded_err;
      }
    } catch (err) {
      logger_log({
        level: LOGGER.error,
        data: `CAudioPlayer::rate - ${err}`
      });
      throw API_MISUSE;
    }
  }

  /**
   * Signal fired when the audio player has completed the audio source.
   * @param {CEventHandler} handler Handler that signals the
   * audio player has completed playing the data source.
    */
  set onended(handler) {
    if (handler) {
      json_check_type({type: "function", data: handler, should_throw: true});
      this.#handler = handler;
    } else {
      this.#handler = null;
    }
  }

  /**
   * Either "stopped" / "paused" / "playing" / "looping".
   * @readonly
   * @type {string}
   */
  get state() {
    return this.#state;
  }

  /**
   * Sets / gets the volume of the audio player.
   * @type {number}
   */
  get volume() {
    try {
      if (this.#audio_player) {
        return this.#audio_player.volume;
      } else if (this.#tts_utterance) {
        return this.#tts_utterance.volume;
      } else {
        throw this.#not_loaded_err;
      }
    } catch (err) {
      logger_log({
        level: LOGGER.error,
        data: `CAudioPlayer::volume - ${err}`
      })
      throw API_MISUSE;
    }
  }
  set volume(v) {
    json_check_type({type: "number", data: v, should_throw: true});
    let volume = v < 0
      ? 0
      : v > 1
        ? 1
        : v;
    try {
      if (this.#audio_player) {
        this.#audio_player.volume = volume;
      } else if (this.#tts_utterance) {
        this.#tts_utterance.volume = volume;
      } else {
        throw this.#not_loaded_err;
      }
    } catch (err) {
      logger_log({
        level: LOGGER.error,
        data: `CAudioPlayer::volume - ${err}`
      })
      throw API_MISUSE;
    }
  }

  /**
   * Loads audio content for playback via the audio player.
   * @param {string} type 'audio' / 'tts'
   * @param {string} data Either raw text for text-to-speech or a url to a
   * sound file for playback. Once constructed it can only work with that
   * type of data.
   * @returns {void}
   * @throws {SyntaxError} Reflecting either {@link API_MISUSE},
   * {@link API_NOT_IMPLEMENTED}, {@link API_TYPE_VIOLATION}, or
   * {@link API_UNSUPPORTED_RUNTIME} codemelted.js module API
   * violations. You should not try-catch these as they serve as asserts
   * to the developer.
   */
  load(type, data) {
    json_check_type({type: "string", data: data, should_throw: true});
    json_check_type({type: "string", data: data, should_throw: true});
    this.#audio_player = null;
    this.#tts_utterance = null;
    if (type === "audio") {
      // @ts-ignore This is in a browser context.
      this.#audio_player = new Audio(data);
      // @ts-ignore The audio player was created above.
      this.#audio_player.onended = () => {
        this.#state = "stopped";
        if (this.#handler) {
          this.#handler(new Event("stopped"));
        }
      }
    } else if (type === "tts") {
      // @ts-ignore This is proper form. Fake definition for deno has issues.
      this.#tts_utterance = new SpeechSynthesisUtterance(data);
      // @ts-ignore The utterance is created above.
      this.#tts_utterance.onend = () => {
        this.#state = "stopped";
        if (this.#handler) {
          this.#handler(new Event("stopped"));
        }
      }
      // @ts-ignore This is proper form. Fake definition for deno has issues.
      globalThis.speechSynthesis.cancel();
    } else {
      logger_log({
        level: LOGGER.error,
        data: "CAudioPlayer::load() - valid types are 'audio' / 'tts'"
      });
      throw API_MISUSE;
    }
  }

  /**
   * Will pause the audio player from a playing state.
   * @returns {Promise<CResult>} Identifying success / failure of
   * transitioning to the new audio state.
   */
  async pause() {
    try {
      if (this.#state != "playing") {
        throw "not in a 'playing' state";
      } else if (this.#audio_player) {
        this.#audio_player.pause();
      } else if (this.#tts_utterance) {
        // @ts-ignore This is in a browser context
        globalThis.speechSynthesis.pause();
      } else {
        throw this.#not_loaded_err;
      }
      this.#state = "paused";
      return new CResult();
    } catch (err) {
      logger_log({
        level: LOGGER.error,
        data: `CAudioPlayer::pause() - ${err}`
      });
      return new CResult({error: err});
    }
  }

  /**
   * Will play the audio player from a stopped state.
   * @returns {Promise<CResult>} Identifying success / failure of
   * transitioning to the new audio state.
   */
  async play() {
    try {
      if (this.#state != "stopped") {
        throw "not in a 'stopped' state"
      } else if (this.#audio_player) {
        await this.#audio_player.play();
      } else if (this.#tts_utterance) {
        // @ts-ignore This is in a browser context
        globalThis.speechSynthesis.speak(this.#tts_utterance);
      } else {
        throw this.#not_loaded_err;
      }
      this.#state = "playing";
      return new CResult();
    } catch (err) {
      logger_log({
        level: LOGGER.error,
        data: `CAudioPlayer::play() - ${err}`
      });
      return new CResult({error: err});
    }
  }

  /**
   * Will resume the audio player from a paused state.
   * @returns {Promise<CResult>} Identifying success / failure of
   * transitioning to the new audio state.
   */
  async resume() {
    try {
      if (this.#state != "paused") {
        throw "not in a 'paused' state";
      } else if (this.#audio_player) {
        await this.#audio_player.play();
      } else if (this.#tts_utterance) {
        // @ts-ignore This is in a browser context
        globalThis.speechSynthesis.resume();
      } else {
        throw this.#not_loaded_err;
      }
      this.#state = "playing";
      return new CResult();
    } catch (err) {
      logger_log({
        level: LOGGER.error,
        data: `CAudioPlayer::resume() - ${err}`
      });
      return new CResult({error: err});
    }
  }

  /**
   * Will stop the audio player from a paused or playing state.
   * @returns {CResult} Identifying success / failure of
   * transitioning to the new audio state.
   */
  stop() {
    if (this.#state === "stopped") {
      logger_log({
        level: LOGGER.error,
        data: "CAudioPlayer::stop() already in a stop stopped state"
      });
      throw API_MISUSE;
    }
    try {
      if (this.#audio_player) {
        this.#audio_player.load();
        this.#audio_player.currentTime = 0;
      } else if (this.#tts_utterance) {
        // @ts-ignore This is in a browser context
        globalThis.speechSynthesis.cancel();
      } else {
        throw this.#not_loaded_err;
      }
      this.#state = "stopped";
      return new CResult();
    } catch (err) {
      logger_log({
        level: LOGGER.error,
        data: `CAudioPlayer::stop() - ${err}`
      });
      return new CResult({error: err});
    }
  }

  /**
   * Constructor for the class.
   * @throws {SyntaxError} Reflecting either {@link API_MISUSE},
   * {@link API_NOT_IMPLEMENTED}, {@link API_TYPE_VIOLATION}, or
   * {@link API_UNSUPPORTED_RUNTIME} codemelted.js module API
   * violations. You should not try-catch these as they serve as asserts
   * to the developer.
   */
  constructor() {
    if (!runtime_is_browser()) {
      throw API_UNSUPPORTED_RUNTIME;
    }
    this.#state = "stopped";
  }
}

/**
 * Utility class to control the showing / hiding of dialogs on an HTML
 * document via the [ui_dialog] function.
 * @private
 */
class CDialog {
  /** @type {any} */
  static returnValue;

  /**
   * Closes an open dialog and removes it from the body
   * @param {string} id The HTML node id of the dialog opened.
   * @param {any} [returnValue] The optional return values associated
   * with the dialog.
   * @returns {void}
   */
  static close(id, returnValue) {
    // @ts-ignore In browser context, will not be null
    const dlg = globalThis.document.getElementById(id);
    CDialog.returnValue = returnValue;
    // @ts-ignore In browser context, will not be null
    dlg.close();
    // @ts-ignore In browser context, will not be null
    const divDialog = globalThis.document.getElementById(`div_${id}`);
    // @ts-ignore In browser context, will not be null
    globalThis.document.body.removeChild(divDialog);
  }

  /**
   * Supports the [ui_dialog] use case function in constructing
   * the HTML template to display embedded modal dialog content.
   * @param {string} icon An icon to put in the title bar.
   * @param {string} id The HTML node id that is unique on the page
   * @param {string} title The title to display in the title bar.
   * @param {string} content The HTML content to display
   * @param {string} [width="250px"] The width as px / % to size the dialog to.
   * @param {string} [height] The width as px / % to size the dialog to.
   * @returns {void}
   */
  static show(icon, id, title, content, width="250px", height) {
    const html = `
      <style>
        .codemelted-dialog {
          background-color: black;
          flex-flow: column;
          border: 5px solid black;
          padding: 0;
          width: ${width};
          height: ${height};
          overflow: hidden;
        }
        dialog::backdrop {
          background: rgba(0, 0, 0, 0.50);
        }
        .codemelted-dialog-title {
          flex: 0 1 auto;
          font-size: large;
          font-weight: bolder;
          text-align: center;
          vertical-align: middle;
          background-color: black;
          color: white;
          display: grid;
          grid-template-columns: auto 1fr auto;
          border-bottom: 3px solid black;
        }
        .codemelted-dialog-title button {
          margin-left: 5px;
          cursor: pointer;
        }
        .codemelted-dialog-content {
          background-color: gray;
          color: white;
          border: 0;
          margin: 0;
          padding: 0;
          width: 100%;
          flex: 1 1 auto;
        }
        .codemelted-dialog-content div {
          padding: 10px;
        }
        .codemelted-dialog-content input[type=text] {
          margin-left: 10px;
          margin-right: 10px;
          width: 85%;
        }
        .codemelted-dialog-content select {
          margin-left: 10px;
          margin-right: 10px;
          margin-bottom: 10px;
          width: 150px;
        }
        .codemelted-dialog-content button {
          cursor: pointer;
          height: 25px;
          width: 75px;
        }
        .codemelted-align-center {
          padding: 5px;
          text-align: center;
        }
      </style>
      <dialog id="${id}" class="codemelted-dialog">
        <div class="codemelted-dialog-title">
          <label>${icon}</label>
          <label style="margin-top: 2px;">${title}</label>
          <button id="${id}CloseDialog">X</button>
        </div>
        ${content}
      </dialog>
    `;

    // @ts-ignore In browser context
    const divDialog = globalThis.document.createElement("div");
    // @ts-ignore In browser context
    divDialog.id = `div_${id}`;
    // @ts-ignore In browser context
    divDialog.innerHTML = html;
    // @ts-ignore In browser context
    globalThis.document.body.appendChild(divDialog);
    // @ts-ignore In browser context
    const dialog = globalThis.document.getElementById(id);
    // @ts-ignore In browser context
    dialog.showModal();
  }
}

/**
 * Provides the request to render a {@link ui_dialog} to support
 * a Single Page Application (SPA) document to get information from the
 * user.
 * @readonly
 * @enum {string}
 * @property {string} Alert Displays an alert to the user.
 * @property {string} Choose Provides a half page selection of options.
 * @property {string} Close Will asynchronously close an open page.
 * @property {string} Confirm Provides a Yes/No confirmation to the user.
 * @property {string} Loading Provides a loading dialog closed via the Close
 * request.
 * @property {string} Prompt Provides a half-page text field prompt input
 * box.
 */
export const DIALOG_REQUEST = Object.freeze({
  Alert: "alert",
  Choose: "choose",
  Close: "close",
  Confirm: "confirm",
  Loading: "loading",
  Prompt: "prompt",
});

/**
 * Interface adds to HTMLElement the properties and methods needed to
 * support basic media-related capabilities that are common to audio and
 * video.
 * NOTE: Defined to support proper typing in the JSDocs when type checking
 *       in a TypeScript environment.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement
 * @typedef {object} HTMLAudioElement
 * @property {number} currentTime specifies the current playback time in
 * seconds.
 * @property {number} playbackRate property sets the rate at which the
 * media is being played back. This is used to implement user controls for
 * fast forward, slow motion, and so forth. The normal playback rate is
 * multiplied by this value to obtain the current rate, so a value of 1.0
 * indicates normal speed.
 * @property {number} volume sets the volume at which the media will be
 * played.
 * @property {boolean} loop indicates if audio element will loop or not.
 * @property {function} load resets the media element to its initial state
 * and begins the process of selecting a media source and loading the media
 * in preparation for playback to begin at the beginning.
 * @property {function} pause will pause playback of the media, if the
 * media is already in a paused state this method will have no effect.
 * @property {function} play method attempts to begin playback of the
 * media. It returns a Promise which is resolved when playback has been
 * successfully started.
 * @property {function} onerror Handles the error events.
 * @property {function} onended Handles the onended events.
 * @property {Event} error event is fired when the resource could not be
 * loaded due to an error (for example, a network connectivity problem).
 * @property {Event} ended event is fired when playback or streaming has
 * stopped because the end of the media was reached or because no further
 * data is available.
 */

/**
 * NOTE: Defined to support proper typing in the JSDocs when type checking
 *       in a TypeScript environment.
 * @typedef {object} HTMLElement
 */

/**
 * Provides the request actions of the {@link ui_is} function call.
 * @readonly
 * @enum {string}
 * @property {string} PWA Determines if the browser window represents an
 * installed Progressive Web Application.
 * @property {string} SecureContext indicating whether the current context
 * is secure (true) or not (false).
 * @property {string} TouchEnabled Identifies if the browser is accessible
 * via a touch device.
 */
export const IS_REQUEST = Object.freeze({
  PWA: "PWA",
  SecureContext: "SecureContext",
  TouchEnabled: "TouchEnabled",
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
 * Identifies queryable requests via {@link ui_screen} discover more about
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
  AvailableHeight: "availHeight",
  AvailableWidth: "availWidth",
  ColorDepth: "colorDepth",
  DevicePixelRatio: "devicePixelRatio",
  Height: "height",
  InnerHeight: "innerHeight",
  InnerWidth: "innerWidth",
  OuterHeight: "outerHeight",
  OuterWidth: "outerWidth",
  PixelDepth: "pixelDepth",
  ScreenLeft: "screenLeft",
  ScreenOrientationAngle: "screenOrientationAngle",
  ScreenOrientationType: "screenOrientationType",
  ScreenTop: "screenTop",
  ScreenX: "screenX",
  ScreenY: "screenY",
  ScrollX: "scrollX",
  ScrollY: "scrollY",
  Width: "width",
});

/**
 * Represents a speech request. It contains the content the speech service
 * should read and information about how to read it (e.g., language,
 * pitch and volume.)
 * NOTE: Defined to support proper typing in the JSDocs when type checking
 *       in a TypeScript environment.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance
 * @typedef {object} SpeechSynthesisUtterance
 * @property {number} rate gets and sets the speed at which the utterance
 * will be spoken.
 * @property {number} volume gets and sets the volume that the utterance
 * will be spoken.
 * @property {Event} end fired when the utterance has finished being
 * spoken.
 * @property {Event} error fired when an error occurs that prevents the
 * utterance from being successfully spoken.
 */

/**
 * Supports the target parameter of the {@link ui_open} action which handles
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

/**
 * Identifies actionable requests via {@link ui_widget} to define HTML user
 * interfaces for SPA / PWA.
 * @readonly
 * @enum {string}
 * @property {string} CssVariable Retrieves a custom defined CSS variable
 * in a :root definition.
 * @property {string} Define Defines the custom HTMLElements for defining a
 * codemelted SPA / PWA user interface.
 * @property {string} ElementById Executes a window.getElementById call but
 * will throw an {@link API_MISUSE} if the specified id is not found since it
 * is assumed to be found.
 */
export const WIDGET_REQUEST = Object.freeze({
  CssVariable: "CssVariable",
  Define: "Define",
  ElementById: "ElementById",
});

/**
 * Provides the ability to carry out actions with the open browser window.
 * @param {object} params The named parameters.
 * @param {ACTION_REQUEST} params.request The enumerated value to carry
 * out with the open browser window.
 * @param {object} [params.data] The optional data associated with the
 * {@link ACTION_REQUEST.Share} or {@link ACTION_REQUEST.PostMessage}
 * requests.
 * https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share#data
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
 * @returns {Promise<CResult>} Reflecting success or failure of the given
 * request.
 * @throws {SyntaxError} Reflecting either {@link API_MISUSE},
 * {@link API_NOT_IMPLEMENTED}, {@link API_TYPE_VIOLATION}, or
 * {@link API_UNSUPPORTED_RUNTIME} codemelted.js module API
 * violations. You should not try-catch these as they serve as asserts
 * to the developer.
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
  if (!runtime_is_browser()) {
    throw API_UNSUPPORTED_RUNTIME;
  }
  let value = null;
  switch (request) {
    case ACTION_REQUEST.Audio:
      value = new CAudioPlayer();
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
    case ACTION_REQUEST.PostMessage:
      // @ts-ignore This is in a browser context
      globalThis.postMessage(data, target_origin);
      break;
    case ACTION_REQUEST.Print:
      // @ts-ignore This is in a browser context
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
      try {
        // @ts-ignore This is in a browser context
        await globalThis.navigator.share(data);
      } catch (err) {
        logger_log({
          level: LOGGER.error,
          data: `ui_action() share failed. ${err}`
        });
        return new CResult({error: err});
      }
    case ACTION_REQUEST.Vibrate:
      json_check_type({type: Array, data: pattern, should_throw: true});
      try {
        // @ts-ignore Will exist in the browser context
        globalThis.navigator.vibrate(pattern);
      } catch (err) {
        logger_log({
          level: LOGGER.error,
          data: `ui_action() vibrate failed. ${err}`
        });
        return new CResult({error: err});
      }
    default:
      throw API_MISUSE;
  }
  return new CResult({value: value});
}

/**
 * An asynchronous function to display a dialog to inform user's of things
 * occurring with their HTML document.
 * @param {object} params The named parameters
 * @param {DIALOG_REQUEST} params.request The request to carry out.
 * @param {string} params.title A unique way of identifying the dialog.
 * @param {string | HTMLElement} [params.message=""] The message to use with
 * all DIALOG_REQUEST options except .Browser / .Close / .Loading
 * @param {string[]} [params.choices=[]] The choices to utilize with the
 * DIALOG_REQUEST.Choose option.
 * @param {any} [params.returnValue] The optional value to pass along with
 * the DIALOG_REQUEST.Close option.
 * @param {boolean} [params.use_native=false] Signals to use the browser
 * native of the given dialog request if available.
 * @param {string} [params.width] The optional width to set of the dialog
 * either by percentage or pixel.
 * @param {string} [params.height] The optional height to set of the dialog
 * either by percentage or pixel.
 * @returns {Promise<CResult>} The returned value from the dialog.
 * @throws {SyntaxError} Reflecting either {@link API_MISUSE},
 * {@link API_NOT_IMPLEMENTED}, {@link API_TYPE_VIOLATION}, or
 * {@link API_UNSUPPORTED_RUNTIME} codemelted.js module API
 * violations. You should not try-catch these as they serve as asserts
 * to the developer.
 * @example
 * // TBD
 */
export function ui_dialog({
  request,
  title,
  message="",
  choices = [],
  returnValue,
  use_native=false,
  width,
  height
}) {
  if (!runtime_is_browser()) {
    throw API_UNSUPPORTED_RUNTIME;
  }
  json_check_type({type: Array, data: choices, should_throw: true});
  json_check_type({type: "string", data: request, should_throw: true});
  json_check_type({type: "string", data: title, should_throw: true});
  if (!json_check_type({type: "string", data: message}) &&
    // @ts-ignore This will exist in a browser context
    !json_check_type({type: globalThis.HTMLElement, data: message})) {
    throw API_TYPE_VIOLATION;
  }
  const id = title.replace(/\s/g, '');
  switch (request) {
    case DIALOG_REQUEST.Alert:
      return new Promise((resolve) => {
        if (use_native) {
          // @ts-ignore This is in a browser context
          globalThis.alert(data);
          resolve(new CResult());
        } else {
          const content = `
            <div class="codemelted-dialog-content">
              <div>${message}</div>
              <div class="codemelted-align-center">
                <button id="${id}OK">OK</button>
              </div>
            </div>
          `;
          setTimeout(() => {
            // @ts-ignore Will exist in the browser context.
            const dlg = globalThis.document.getElementById(id);
            // @ts-ignore Will not be null
            dlg.onclose = () => {
              resolve(new CResult());
            }

            // @ts-ignore Will exist in the browser context
            const closeBtn = globalThis.document.getElementById(
              `${id}CloseDialog`
            );
            // @ts-ignore Will not be null
            closeBtn.onclick = () => {
              CDialog.close(id);
              resolve(new CResult());
            };

            // @ts-ignore Will exist in the browser context.
            const ok = globalThis.document.getElementById(`${id}OK`);
            // @ts-ignore Will not be null
            ok.onclick = () => {
              CDialog.close(id);
              resolve(new CResult());
            };
          });
          CDialog.show("💬", id, title, content, width, height);
        }
      });
    case DIALOG_REQUEST.Choose:
      return new Promise((resolve) => {
        /** @type {string[]} */
        const selectOptions = [];
        choices.forEach((e) => {
          selectOptions.push(`<option value="${e}">${e}</option>`);
        });
        const content = `
          <div class="codemelted-dialog-content">
            <div>${message}:</div>
            <select id="${id}Select">
              ${selectOptions.toString()}
            </select>
            <div class="codemelted-align-center">
              <button id="${id}OK">OK</button>
              <button id="${id}Cancel">Cancel</button>
            </div>
          </div>
        `;

        setTimeout(() => {
          // @ts-ignore Will exist in the browser context
          const dlg = globalThis.document.getElementById(id);
          // @ts-ignore Will not be null
          dlg.onclose = () => {
            resolve(new CResult());
          }

          // @ts-ignore Will exist in the browser context
          const closeBtn = globalThis.document.getElementById(
            `${id}CloseDialog`
          );
          // @ts-ignore Will not be null
          closeBtn.onclick = () => {
            CDialog.close(id, null);
            resolve(new CResult());
          };

          // @ts-ignore Will exist in the browser context
          const cancel = globalThis.document.getElementById(`${id}Cancel`);
          // @ts-ignore Will not be null
          cancel.onclick = () => {
            CDialog.close(id, null);
            resolve(new CResult());
          };

          // @ts-ignore Will exist in the browser context
          const cmbSelect = globalThis.document.getElementById(
            `${id}Select`);
          // @ts-ignore Will exist in the browser context
          const ok = globalThis.document.getElementById(`${id}OK`);
          // @ts-ignore Will not be null
          ok.onclick = () => {
            // @ts-ignore Will not be null
            CDialog.close(id, cmbSelect.value);
            const rtnval = CDialog.returnValue
              ? CDialog.returnValue
              : "";
            resolve(new CResult({value: rtnval}));
          };
        });
        CDialog.show("🤔", id, title, content, width, height);
      });
    case DIALOG_REQUEST.Close:
      return new Promise((resolve) => {
        CDialog.close(id, returnValue);
        resolve(new CResult());
      });
    case DIALOG_REQUEST.Confirm:
      return new Promise((resolve) => {
        if (use_native) {
          // @ts-ignore This is in a browser context
          let answer = globalThis.confirm(data);
          resolve(new CResult({value: answer}))
        } else {
          const content = `
            <div class="codemelted-dialog-content">
              <div>${message}</div>
              <div class="codemelted-align-center">
                <button id="${id}OK">OK</button>
                <button id="${id}Cancel">Cancel</button>
              </div>
            </div>
          `;
          setTimeout(() => {
            // @ts-ignore Will exist in the browser context
            const dlg = globalThis.document.getElementById(id);
            // @ts-ignore Will not be null.
            dlg.onclose = () => {
              resolve(new CResult());
            }

            // @ts-ignore Will exist in a browser context
            const closeBtn = globalThis.document.getElementById(
              `${id}CloseDialog`
            );
            // @ts-ignore This will not be null
            closeBtn.onclick = () => {
              CDialog.close(id, false);
              resolve(new CResult({value: CDialog.returnValue}));
            };

            // @ts-ignore Will exist in the browser context
            const ok = globalThis.document.getElementById(`${id}OK`);
            // @ts-ignore Will not be null
            ok.onclick = () => {
              CDialog.close(id, true);
              resolve(new CResult({value: CDialog.returnValue}));
            };

            // @ts-ignore Will exist in browser context
            const cancel = globalThis.document.getElementById(`${id}Cancel`);
            // @ts-ignore It will not be null
            cancel.onclick = () => {
              CDialog.close(id, false);
              resolve(new CResult({value: CDialog.returnValue}));
            };
          });
          CDialog.show("🙋‍♂️", id, title, content, width, height);
        }
      });
    case DIALOG_REQUEST.Loading:
      return new Promise((resolve) => {
        const content = `
          <div class="codemelted-dialog-content">
            <div>${message}</div>
            <div id="${id}-${request}"></div>
          </div>
        `;
        setTimeout(() => {
          // @ts-ignore Will exist in a browser context
          const txtProcessing = globalThis.document.getElementById(
            `${id}-${request}`
          );
          let x = 0;
          const timerId = setInterval(() => {
            let dots = "";
            if (x === 0) {
              dots = " .";
            } else if (x === 1) {
              dots = " . .";
            } else if (x == 2) {
              dots = " . . .";
              x = -1;
            }
            // @ts-ignore This will not be null
            txtProcessing.innerHTML = `Processing${dots}`;
            x += 1;
          }, 500);

          // @ts-ignore This will be in a browser context.
          const dlg = globalThis.document.getElementById(id);
          // @ts-ignore This will not be null
          dlg.onclose = () => {
            resolve(new CResult({value: CDialog.returnValue}));
            clearInterval(timerId);
          }
        });
        CDialog.show("⏳", id, title, content, width, height);
      });
    case DIALOG_REQUEST.Prompt:
      return new Promise((resolve) => {
        if (use_native) {
          // @ts-ignore This is in a browser context
          let answer = globalThis.prompt(data);
          resolve(new CResult({value: answer}));
        } else {
          const content = `
            <div class="codemelted-dialog-content">
              <div>${message}:</div>
              <input id="${id}Text" type="text" />
              <div class="codemelted-align-center">
                <button id="${id}OK">OK</button>
                <button id="${id}Cancel">Cancel</button>
              </div>
            </div>
          `;
          setTimeout(() => {
            // @ts-ignore Will exist in a browser context
            const dlg = globalThis.document.getElementById(id);
            // @ts-ignore Will not be null
            dlg.onclose = () => {
              resolve(new CResult());
            }

            // @ts-ignore Will exist in a browser context
            const closeBtn = globalThis.document.getElementById(
              `${id}CloseDialog`
            );
            // @ts-ignore Will not be null
            closeBtn.onclick = () => {
              CDialog.close(id, null);
              resolve(new CResult({value: CDialog.returnValue}));
            };

            // @ts-ignore Will exist in a browser context
            const txtField = globalThis.document.getElementById(`${id}Text`);
            // @ts-ignore Will exist in a browser context
            const ok = globalThis.document.getElementById(`${id}OK`);
            // @ts-ignore Won't be null
            ok.onclick = () => {
              // @ts-ignore Won't be null
              CDialog.close(id, txtField.value);
              const rtnval = CDialog.returnValue
                ? CDialog.returnValue
                : "";
              resolve(new CResult({value: rtnval}));
            };

            // @ts-ignore Exists in a browser context
            const cancel = globalThis.document.getElementById(`${id}Cancel`);
            // @ts-ignore Will not be null
            cancel.onclick = () => {
              CDialog.close(id, null);
              resolve(new CResult({value: CDialog.returnValue}));
            };
          });
          CDialog.show("🤨", id, title, content, width, height);
        }
      });
    default:
      throw API_MISUSE;
  }
}

/**
 * Boolean queries of the given browser runtime to discovery different
 * features about the given browser window.
 * @param {IS_REQUEST} request The enumerated value of different browser
 * properties.
 * @returns {boolean} true if the given property is supported, false
 * otherwise.
 * @throws {SyntaxError} Reflecting either {@link API_MISUSE},
 * {@link API_NOT_IMPLEMENTED}, {@link API_TYPE_VIOLATION}, or
 * {@link API_UNSUPPORTED_RUNTIME} codemelted.js module API
 * violations. You should not try-catch these as they serve as asserts
 * to the developer.
 * @example
 * // TBD
 */
export function ui_is(request) {
  if (!runtime_is_browser()) {
    throw API_UNSUPPORTED_RUNTIME;
  }
  switch (request) {
    case IS_REQUEST.PWA:
      // @ts-ignore This is in a browser context
      return globalThis.matchMedia("(display-mode: standalone)").matches;
    case IS_REQUEST.SecureContext:
      // @ts-ignore This is in a browser context
      return globalThis.isSecureContext;
    case IS_REQUEST.TouchEnabled:
      // @ts-ignore This is in a browser context
      return globalThis.navigator.maxTouchPoints > 0;
    default:
      throw API_MISUSE;
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
 * @throws {SyntaxError} Reflecting either {@link API_MISUSE},
 * {@link API_NOT_IMPLEMENTED}, {@link API_TYPE_VIOLATION}, or
 * {@link API_UNSUPPORTED_RUNTIME} codemelted.js module API
 * violations. You should not try-catch these as they serve as asserts
 * to the developer.
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
  // Basic validation of runtime and required parameters.
  if (!runtime_is_browser()) {
    throw API_UNSUPPORTED_RUNTIME;
  }
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
    throw API_MISUSE;
  }

  // Determine how we are opening the item.
  if (popup_window) {
    // @ts-ignore Will return a number.
    let top = (ui_screen(SCREEN_REQUEST.Height) - height) / 2;
    // @ts-ignore Will return a number.
    let left = (ui_screen(SCREEN_REQUEST.Width) - width) / 2;
    let settings = `toolbar=no, location=no, ` +
      `directories=no, status=no, menubar=no, ` +
      `scrollbars=no, resizable=yes, copyhistory=no, ` +
      `width=${width}, height=${height}, top=${top}, left=${left}`;
    // @ts-ignore Property exists in a browser runtime.
    return globalThis.open(urlToLaunch, "_blank", settings);
  }
  // @ts-ignore Property exists in a browser runtime.
  return globalThis.open(urlToLaunch, target);
}

/**
 * Provides a mechanism for discovering information about the current
 * browser screen the web app is running in.
 * @param {SCREEN_REQUEST} request The enumerated value identifying the
 * different aspects to request information about.
 * @returns {number | string} Number for all requests except
 * ScreenOrientationType request.
 * @throws {SyntaxError} Reflecting either {@link API_MISUSE},
 * {@link API_NOT_IMPLEMENTED}, {@link API_TYPE_VIOLATION}, or
 * {@link API_UNSUPPORTED_RUNTIME} codemelted.js module API
 * violations. You should not try-catch these as they serve as asserts
 * to the developer.
 * @example
 * // TBD
 */
export function ui_screen(request) {
  if (!runtime_is_browser()) {
    throw API_UNSUPPORTED_RUNTIME;
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
      throw API_MISUSE;
  }
}

/**
 * <mark>FUTURE DEVELOPMENT. DO NOT USE!</mark>
 * @param {object} params The named parameters.
 * @param {WIDGET_REQUEST} params.request The request to carry out.
 * @param {string} [params.data] The optional data associated with the
 * request.
 * @returns {HTMLElement | string | undefined} One of the following depending
 * on the request. {@link WIDGET_REQUEST.CssVariable} string value or empty
 * string of the queried variable, {@link WIDGET_REQUEST.Define} undefined,
 * and {@link WIDGET_REQUEST.ElementById} the HTMLElement of the queried ID.
 * @throws {SyntaxError} Reflecting either {@link API_MISUSE},
 * {@link API_NOT_IMPLEMENTED}, {@link API_TYPE_VIOLATION}, or
 * {@link API_UNSUPPORTED_RUNTIME} codemelted.js module API
 * violations. You should not try-catch these as they serve as asserts
 * to the developer.
 */
export function ui_widget({request, data}) {
  // Check if we are in a supported runtime or not.
  if (!if_def("HTMLElement")) {
    throw API_UNSUPPORTED_RUNTIME;
  }

  // We are supported, go carry out the request.
  if (request === WIDGET_REQUEST.CssVariable) {
    json_check_type({type: "string", data: data, should_throw: true});
    // @ts-ignore exists in a browser context
    let cs = globalThis.window.getComputedStyle(
      // @ts-ignore exists in a browser context
      globalThis.document.documentElement
    );
    // @ts-ignore json_check_type will throw if not set properly
    return cs.getPropertyValue(data);
  } else if (request === WIDGET_REQUEST.Define) {
    // @ts-ignore Helper function for all defined widgets.
    const get_css_var = (v) => {
      let css_var = ui_widget({
        request: WIDGET_REQUEST.CssVariable,
        data: v
      }) ?? "";
      // @ts-ignore Will be a string is this context.
      return css_var.length > 0 ? css_var : v;
    }

    // ------------------------------------------------------------------------
    // [APP WIDGETS] ----------------------------------------------------------
    // ------------------------------------------------------------------------

    // Sets up the "codemelted-ui-app-bar" to define a header / footer
    // container for a UI.
    // @ts-ignore Exists in a browser context.
    globalThis.customElements.define("codemelted-ui-app-bar",
      // @ts-ignore exists in a browser
      class extends globalThis.HTMLElement {
        // Build the component
        connectedCallback() {
          // Setup if we are a header / footer location.
          let type = this.getAttribute("cm_type");
          if (type === "header") {
            this.style.top = "0";
          } else if (type === "footer") {
            this.style.bottom = "0";
          } else {
            logger_log({
              level: LOGGER.error,
              data: "codemelted-ui-app-bar requires cm_type attribute"
            });
            throw API_MISUSE;
          }
          this.style.left = "0";
          this.style.right = "0";
          this.style.position = "fixed";

          // Now setup whether other required initial properties
          let attributes = [
            "cm_bg_color",
            "cm_border",
            "cm_fg_color",
            "cm_height",
            "cm_z_index",
          ];
          attributes.forEach((attr_val, index) => {
            // Ensure style was specified.
            let attr = this.getAttribute(attr_val)
            if (!attr) {
              logger_log({
                level: LOGGER.error,
                data: `codemelted-ui-app-bar requires ${attr_val}`
              });
              throw API_MISUSE;
            }

            let css_value = get_css_var(attr);
            switch (index) {
              case 0:
                this.style.backgroundColor = css_value.length > 0
                  ? css_value : attr;
                break;
              case 1:
                this.style.border = css_value.length > 0
                  ? css_value : attr;
                break;
              case 2:
                this.style.color = css_value.length > 0
                  ? css_value : attr;
                break;
              case 3:
                this.style.height = css_value.length > 0
                  ? css_value : attr;
                let height_margin = parseInt(
                  this.style.height.replaceAll("px", "")
                ) + 1;
                if (type === "header") {
                  // @ts-ignore exists in a browser context
                  globalThis.document.body.style.marginTop =
                    `${height_margin}px`;
                } else {
                  // @ts-ignore exists in a browser context
                  globalThis.document.body.style.marginBottom =
                    `${height_margin}px`;
                }
                break;
              case 4:
                this.style.zIndex = css_value.length > 0
                  ? css_value : attr;
                break;
              default:
                logger_log({
                  level: LOGGER.error,
                  data: `codemelted-ui-app-bar unknown ${attr_val}`
                });
                throw API_NOT_IMPLEMENTED;
            }
          });
        }
        // Register the wrapped component
        constructor() { super(); }
      }
    );

    // Sets up a full-page sheet to display and be closed once action is done.
    // Allows for adding multiple SPA views allowing for staying on a single
    // web page.
    // @ts-ignore Exists in a browser context.
    globalThis.customElements.define("codemelted-ui-app-sheet",
      // @ts-ignore exists in a browser
      class extends globalThis.HTMLElement {
        static observedAttributes = [
          "cm_title",
          "cm_img_src",
          "cm_img_type"
        ];

        #header;

        #render_header() {
          // Setup our worker variables
          let cm_title = this.getAttribute("cm_title");
          let cm_img_type = this.getAttribute("cm_img_type");
          let cm_img_src = this.getAttribute("cm_img_src");
          let img_src = "";

          // Do validity and setup of items
          if (!cm_title) {
            logger_log({
              level: LOGGER.error,
              data: "codemelted-ui-app-sheet cm_title attribute is required"
            });
            throw API_MISUSE;
          } else if (!cm_img_src) {
            logger_log({
              level: LOGGER.error,
              data: "codemelted-ui-app-sheet cm_img_src attribute is required"
            });
            throw API_MISUSE;
          } else if (cm_img_type === "emoji") {
            img_src = `<h2>${cm_img_src}</h2>`;
          } else if (cm_img_type === "img") {
            img_src = `<img style="height: 49px;" src="${cm_img_src} />"`;
          } else {
            logger_log({
              level: LOGGER.error,
              data: "codemelted-ui-app-sheet cm_img_type attribute valid " +
                "values are 'emoji' / 'img'"
            });
            throw API_MISUSE;
          }

          // Now go render the header for the app-sheet
          let btn_id = `id${globalThis.window.crypto.randomUUID()}`;
          let btn_style = "border: none; cursor: pointer; " +
            "background-color: transparent;"
          this.#header.innerHTML=`
            ${img_src}
            <h2>${cm_title}</h2>
            <button id=${btn_id} style="${btn_style}">❌</button>
          `;
          setTimeout(() => {
            // @ts-ignore exists in a browser context
            let btn = globalThis.document.getElementById(btn_id);
            if (!btn) {
              logger_log({
                level: LOGGER.error,
                data: "codemelted-ui-app-sheet close button could " +
                  "not be setup."
              })
              throw API_NOT_IMPLEMENTED;
            }
            // @ts-ignore exists in a browser context
            btn.onclick = (evt) => {
              this.hide();
            };
          });
        }

        // Build the component
        connectedCallback() {
          // Setup our sheet wrapper styles
          this.style.position = "fixed";
          this.style.flexDirection = "column";
          this.style.top = "0";
          this.style.left = "0";
          this.style.right = "0";
          this.style.bottom = "0";
          this.style.display = "none";

          // Now setup our configurable attributes
          let attributes = [
            "cm_bg_color",
            "cm_fg_color",
            "cm_border",
            "cm_z_index",
          ];
          attributes.forEach((attr, i) => {
            let attr_val = this.getAttribute(attr);
            if (!attr_val) {
              logger_log({
                level: LOGGER.error,
                data: `codemelted-ui-app-sheet ${attr} required`
              });
              throw API_MISUSE;
            }
            let css_val = get_css_var(attr_val);
            let css = css_val.length > 0 ? css_val : attr_val;
            switch (i) {
              case 0:
                this.style.backgroundColor = css;
                break;
              case 1:
                this.style.color = css;
                break;
              case 2:
                this.#header.style.border = css;
                break;
              case 3:
                this.style.zIndex = css;
                break;
              default:
                console.error(
                  `codemelted-ui-app-sheet ${attr} not implemented.`
                );
                throw API_NOT_IMPLEMENTED;
            }
          });
          // @ts-ignore exists in a browser context
          if (this.firstChild?.nextSibling instanceof globalThis.HTMLElement) {
            this.firstChild.nextSibling.style.flexGrow = "1";
          }
          this.#render_header();
          this.insertBefore(this.#header, this.firstChild);
        }
        // Register the wrapped component
        constructor() {
          super();
          // @ts-ignore exists in a browser context
          this.#header = globalThis.document.createElement("header");
          this.#header.style.display = "grid";
          this.#header.style.height = "50px";
          this.#header.style.display = "grid";
          this.#header.style.alignSelf = "center";
          this.#header.style.alignContent = "center";
          this.#header.style.alignItems = "center";
          this.#header.style.textAlign = "center";
          this.#header.style.width = "100%";
          this.#header.style.gridTemplateColumns = "75px auto 75px";
        }

        show() {
          this.#render_header();
          this.style.display = "flex";
        }
        hide() { this.style.display = "none"; }
      }
    );

    // ------------------------------------------------------------------------
    // [LAYOUT WIDGETS] -------------------------------------------------------
    // ------------------------------------------------------------------------

    // Sets up the "codemelted-ui-grid-layout" to define row / column layout
    // container.
    // @ts-ignore Exists in a browser context.
    globalThis.customElements.define("codemelted-ui-grid-layout",
      // @ts-ignore exists in a browser
      class extends globalThis.HTMLElement {
        // Build the component
        connectedCallback() {
          // Setup our basic grid
          this.style.display = "grid";

          // Now get our required controls
          let type = this.getAttribute("cm_type");
          let grid_template = this.getAttribute("cm_grid_template");
          if (!type) {
            logger_log({
              level: LOGGER.error,
              data: "codemelted-ui-grid-layout expects cm_type attribute"
            });
            throw API_MISUSE;
          } else if (!grid_template) {
            logger_log({
              level: LOGGER.error,
              data: "codemelted-ui-grid-layout expects cm_grid_template " +
                "attribute"
            });
            throw API_MISUSE;
          }

          if (type === "columns") {
            let css_value = get_css_var(grid_template);
            this.style.gridTemplateColumns = css_value.length > 0
              ? css_value : grid_template;
          } else if (type === "rows") {
            let css_value = get_css_var(grid_template);
            this.style.gridTemplateRows = css_value.length > 0
              ? css_value : grid_template;
          } else {
            console.error(
              "codemelted-ui-grid-layout cm_type must be 'rows' / 'columns'"
            );
            throw API_MISUSE;
          }
        }
        // Register the wrapped component
        constructor() {
          super();
        }
      }
    );

    // ------------------------------------------------------------------------
    // [COMPONENT WIDGETS] ----------------------------------------------------
    // ------------------------------------------------------------------------

    // Defines a basic button control ensuring the proper layout of controls
    // and setting of tooltips.
    // @ts-ignore exists in a browser
    globalThis.customElements.define("codemelted-ui-button",
      // @ts-ignore exists in a browser
      class extends globalThis.HTMLElement {
        // Build the component
        connectedCallback() {
          // @ts-ignore exists in a browser context
          let btn = globalThis.document.createElement("button");
          let id = this.getAttribute("id");
          if (id) {
            btn.id = id;
            this.id = "";
          }
          btn.id = this.getAttribute("id") ?? "";
          btn.title = this.getAttribute("cm_tooltip") ?? "";
          let label = this.getAttribute("cm_label");
          let img_src = this.getAttribute("cm_img_src");
          if (!label && !img_src) {
            logger_log({
              level: LOGGER.error,
              data: "codemelted-ui-button expects at least one of the " +
              "cm_label / cm_img attribute"
            });
            throw API_MISUSE;
          } else if (label && !img_src) {
            btn.innerHTML = label;
          } else if (!label && img_src) {
            btn.innerHTML = `<img src=${img_src} />`
          } else {
            btn.innerHTML = `<img src=${img_src} /> ${label}`;
          }
          btn.style.display = "block";
          btn.style.cursor = "pointer";
          this.appendChild(btn);
        }
        // Register the wrapped component
        constructor() { super(); }
      }
    );

    // Defines a combobox control setting up their values and what to do
    // upon selecting a value.
    // @ts-ignore exists in a browser
    globalThis.customElements.define("codemelted-ui-combobox",
      // @ts-ignore exists in a browser
      class extends globalThis.HTMLElement {
        // Build the component
        connectedCallback() {
          // Create our select control.
          // @ts-ignore exists in a browser context
          let select = globalThis.document.createElement("select");
          let id = this.getAttribute("id");
          if (id) {
            select.id = id;
            this.id = "";
          }
          select.style.cursor = "pointer";

          // Grab our necessary attributes
          let cm_size = parseInt(this.getAttribute("cm_size") ?? "0");
          if (cm_size === 0) {
            logger_log({
              level: LOGGER.error,
              data: "codemelted-ui-combobox requires cm_size attribute"
            });
            throw API_MISUSE;
          }
          for (let i = 0; i < cm_size; i++) {
            let cm_option = this.getAttribute(`cm_option${i+1}`) ?? "";
            let options = cm_option.split(",");
            if (!options || options.length != 2) {
              logger_log({
                level: LOGGER.error,
                data: `codemelted-ui-combobox cm_option${i+1} not `  +
                  "valid 'option,value' format"
              });
              throw API_MISUSE;
            }

            // Go build the option control for the combo box.
            // @ts-ignore exists in a browser context
            let option = globalThis.document.createElement("option");
            option.text = options[0];
            option.value = options[1];
            select.appendChild(option);
          }

          // Append it to our component
          this.appendChild(select);
        }
        // Register the wrapped component
        constructor() { super(); }
      }
    );

    // Defines a collapsible expansion tile displaying additional children
    // when expanded.
    // @ts-ignore exists in a browser
    globalThis.customElements.define("codemelted-ui-expansion-tile",
      // @ts-ignore exists in a browser
      class extends globalThis.HTMLElement {
        // Build the component
        connectedCallback() {
          let cm_label = this.getAttribute("cm_label");
          if (!cm_label) {
            logger_log({
              level: LOGGER.error,
              data: "codemelted-ui-expansion-tile requires cm_label attribute"
            });
            throw API_MISUSE;
          }

          // For any custom tags that create elements underneath, remove
          // the rendered data so they render properly when re-added.
          let child_nodes = Array.from(this.children);
          child_nodes.forEach((el) => {
            if (el.tagName.toLowerCase() === "codemelted-ui-button") {
              el.innerHTML = "";
            } else if (el.tagName.toLowerCase() === "codemelted-ui-combobox") {
              el.innerHTML = "";
            }
          });
          this.innerHTML = `
            <style>
              .cm_exp_tile_summary {
                user-select: none;
                text-align: left;
                font-weight: bold;
                cursor: pointer;
                padding: 5px;
              }
              .cm_exp_tile_summary::before {
                content: '+';
                margin-right: 10px;
                display: inline-block;
                transition: transform 0.3s;
              }
              .cm_exp_tile_details[open] summary::before {
                content: '-';
                transform: rotate(0deg);
              }
            </style>
            <details class="cm_exp_tile_details">
              <summary class="cm_exp_tile_summary">${cm_label}</summary>
            </details>
          `;
          child_nodes.forEach((el) => {
            this.children[1].appendChild(el);
          });
        }
        // Register the wrapped component
        constructor() { super(); }
      }
    );
  } else if (request === WIDGET_REQUEST.ElementById) {
    json_check_type({type: "string", data: data, should_throw: true});
    // @ts-ignore type checked above
    let widget = globalThis.document.getElementById(data);
    if (!widget) {
      logger_log({
        level: LOGGER.error,
        data: `codemelted::ui_widget() did not find ${data} element by id`
      });
      throw API_MISUSE;
    }
    return widget;
  } else {
    logger_log({
      level: LOGGER.error,
      data: `codemelted::ui_widget() unknown ${request}`
    });
    throw API_MISUSE;
  }
}