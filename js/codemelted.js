// @ts-check
// ============================================================================
/**
 * @file <br />
 * <img style="width: 100%; max-width: 375px;"
 *  src="https://codemelted.com/assets/images/logo-codemelted-developer.png"
 * />
 * <p>
 * Something Something Star Wars.
 * </p>
 * <h2> Use Cases </h2>
 * <img src="https://codemelted.com/developer/codemelted_dev/models/all/use-case-model.drawio.png" />
 * <p>
 * Something Something Star Wars.
 * </p>
 * <h2> Module Information </h2>
 * <h3> Versioning </h3>
 * The versioning of the <code>codemelted.js</code> module will utilize a
 * modified semantic versioning <code>X.Y.Z</code> with the following rules
 * for the numbering scheme. <br /> <br />
 * <ul>
 *   <li>
 *     <code>X:</code> Year of release. Each new year resets the
 *     <code>Y.Z</code> values to 1
 *   </li>
 *   <li>
 *     <code>Y:</code> Breaking change to one of the use case functions or
 *     upgrade of dependencies requiring considerations within an app. A change
 *     in this value resets <code>.Z</code> to <code>1</code>
 *   </li>
 *   <li>
 *     <code>Z:</code> Bug fix, new use case function implemented, or
 *     expansion of a use case function. Continuously updated by adding one
 *     with each new release unless reset by <code>X.Y</code> changes.
 *   </li>
 * </ul>
 * -
 * <h3> About </h3>
 * @author mark.shaffer@codemelted.com
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
// [GLOBAL DATA DEFINITION] ===================================================
// ============================================================================

/**
 * The event handler utilized within a given JavaScript runtime. This
 * represents a global event handler that should suffice any JavaScript
 * event callback.
 * @callback CEventHandler
 * @param {Event} e The event object that was triggered
 * @returns {void}
 */

// ============================================================================
// [NAMESPACE IMPLEMENTATION] =================================================
// ============================================================================

/**
 * Something Something Star Wars
 * <h2> JavaScript Runtime Support </2>
 * @example
 * | -------------------------- | --- | --- | --- | --- |
 * | Function                   |  B  |  D  |  N  |  W  |
 * | -------------------------- | --- | --- | --- | --- |
 * | async_sleep                |  X  |  X  |  X  |  X  |
 * @namespace codemelted
 */
globalThis["codemelted"] = (function() {
  /**
   * Error thrown when the module is not used as intended providing the error
   * for a developer to fix their code.
   * @constant {SyntaxError}
   * @memberof codemelted
   */
  const API_MISUSE = new SyntaxError(
    "codemelted.js module logic was not used properly!"
  );

  /**
   * Identifies a piece of logic that is not implemented within the
   * codemelted.js module. This identifies future implementation logic or
   * represents a base class element not utilized in a child.
   * @constant {SyntaxError}
   * @memberof codemelted
   */
  const API_NOT_IMPLEMENTED = new SyntaxError(
    "NOT IMPLEMENTED LOGIC. DO NOT CALL!"
  );

  /**
   * Error thrown when the parameters specified to a codemelted.js module
   * function are not of an expected type.
   * @constant {SyntaxError}
   * @memberof codemelted
   */
  const API_TYPE_VIOLATION = new SyntaxError(
    "codemelted.js module encountered a parameter of an unexpected type!"
  );

  /**
   * Error thrown when the codemelted.js module function is called on an
   * unsupported runtime.
   * @constant {SyntaxError}
   * @memberof codemelted
   */
  const API_UNSUPPORTED_RUNTIME = new SyntaxError(
    "codemelted.js module function called on an unsupported JavaScript runtime!"
  );

  /**
   * Defines the "rules" for objects that will setup a protocol that directly
   * exchanges data with an external item, will continuously run until
   * terminated, requires the ability to know it is running, and get any errors
   * that have occurred during its run.
   * @memberof codemelted
   */
  class CProtocolHandler {
    /** @type {string} */
    #id = "";

    /**
     * Gets the latest data received from the protocol.
     * @param {string} [request] Optional request string to add additional
     * queries from the protocol.
     * @returns {Promise<CResult>}
     */
    async get_message(request="") { throw API_NOT_IMPLEMENTED; }

    /**
     * The identification of the protocol.
     * @readonly
     * @type {string}
     */
    get id() { return this.#id; }

    /**
     * Determines if the protocol is running or has been terminated.
     * @readonly
     * @type {boolean}
     */
    get is_running() { throw API_NOT_IMPLEMENTED; }

    /**
     * Posts a given message to the given implementing protocol.
     * @param {any} data
     * @returns {Promise<CResult>}
     */
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
   * Support object for the [CProtocolHandler] and any other object to provide
   * a result where either the value or the error can be signaled for later
   * checking by a user.
   * @memberof codemelted
   */
  class CResult {
    /** @type {any} */
    #error = null;

    /** @type {any} */
    #value = undefined;

    /**
     * Holds any error message associated with a failed transaction request.
     * @readonly
     * @type {any}
     */
    get error() { return this.#error; }

    /**
     * Signals whether an error was captured or not.
     * @readonly
     * @type {boolean}
     */
    get is_error() {
      if (this.error instanceof Error) {
        return true;
      }
      return this.error != null && this.error.length > 0; }

    /**
     * Signals the transaction completed with no errors.
     * @readonly
     * @type {boolean}
     */
    get is_ok() { return !this.is_error; }

    /**
     * Hold the value of the given result or nothing if the [CResult] is being
     * used to signal there was no error.
     * @readonly
     * @type {any}
     */
    get value() { return this.#value; }

    /**
     * Constructor for the class.
     * @param {object} params The named parameters for the object.
     * @param {any} [params.value] The value associated with the result
     * @param {any} [params.error] The error associated with the
     * result.
     */
    constructor({value, error = null} = {}) {
      this.#value = value;
      this.#error = error;
    }
  }

  // ==========================================================================
  // [NAMESPACE PUBLIC API] ===================================================
  // ==========================================================================
  return Object.freeze({
    // Constants
    API_MISUSE: API_MISUSE,
    API_NOT_IMPLEMENTED: API_NOT_IMPLEMENTED,
    API_TYPE_VIOLATION: API_TYPE_VIOLATION,
    API_UNSUPPORTED_RUNTIME: API_UNSUPPORTED_RUNTIME,

    // Result Objects
    CProtocolHandler: CProtocolHandler,
    CResult: CResult,

    // ========================================================================
    // [UC IMPLEMENTATIONS] ===================================================
    // ========================================================================

    /**
     * Will put a currently running async task to sleep for a specified delay
     * in milliseconds.
     * @memberof codemelted
     * @param {number} delay Time is milliseconds to delay the task.
     * @returns {Promise<void>} The promise to await on for the delay.
     * @throws {SyntaxError} Reflecting either {@link API_MISUSE},
     * {@link API_NOT_IMPLEMENTED}, {@link API_TYPE_VIOLATION}, or
     * {@link API_UNSUPPORTED_RUNTIME} codemelted.js module API violations.
     * You should not try-catch these as these serve as asserts to the
     * developer.
     */
    async_sleep: function(delay) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, delay);
      });
    }
  });
})();
