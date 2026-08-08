// @ts-check
/**
 * <b>ABOUT:</b> Something Something star wars.
 * ```mermaid
 * classDiagram
 * direction LR
 * note "<b>SUPPORTED RUNTIMES:</b><br>- Bun<br>- Deno<br>- Worker"
 * class codemelted {
 *   +async_sleep(delay: number) void
 *   +async_task(task: CTaskCB, data: any, delay: number) CFuture
 *   +async_timer(id: string, task: CTaskCB, interval: number) CTimerProtocol
 *   +async_worker(url: string, rx_handler: CProtocolEventHandler, options: object) CWorkerProtocol
 * }
 * codemelted --> CFuture: creates
 * codemelted --> CTimerProtocol: creates
 * codemelted --> CWorkerProtocol: creates
 * ```
 * <b>AUTHOR:</b> Mark L. Shaffer <br>
 * <b>COPYRIGHT:</b> © 2025 - 2026 Mark Shaffer. All Rights Reserved.
 * <br><br>
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
 * @module codemelted_async
 */

import {
  CModuleError,
  CResult,
  CProtocol,
  PROTOCOL_EVENT,
  PROTOCOL_TYPE,
  QUERY_REQUEST,
  json_check_type,
  runtime_query
} from "./codemelted_core.js";

// ============================================================================
// [DATA DEFINITION] ==========================================================
// ============================================================================

/**
 * The resulting object from the {@link async_task} function call with a
 * promise of the future {@link CResult}.
 * @template T The data associated with the {@link CResult.value} function
 * call.
 */
export class CFuture {
  /** @type {T | undefined} */
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
   * @param {T} [params.data] The optional data to pass to the task.
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
 * @param {T} [data] Optional data to pass to the task.
 * @returns {T} The result of the task completing.
 * @template T The data associated with the CResult object accessed via the
 * result() function call.
 */

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
 * terminated.
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
      // @ts-ignore node returns an object.
      this.#interval = interval;
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
 * thread.
 * @extends {CProtocol<CWorkerEvent>}
 */
export class CWorkerProtocol extends CProtocol {
  /** @type {Worker} */
  #worker;

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
      if (!runtime_query({request: QUERY_REQUEST.IsWorkerAvailable})) {
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
      reject(`async_sleep() error. ${err}`);
    }
  });
}

/**
 * Will execute an asynchronous task and get its result in the future.
 * @template T The data to be processed through the {@link CFuture}.
 * @param {object} params The named parameters.
 * @param {CTaskCB<T>} params.task The task to run.
 * @param {T} [params.data] The optional data to pass to the task.
 * @param {number} [params.delay=0] The delay to schedule the task in the
 * future. Defaults to 0 if not specified.
 * @param {boolean} [params.execute=true] Flag to indicate to immediately
 * execute the future or not to execute it and leave it to developer's
 * choice. Defaults to true if not specified.
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
export function async_task({task, data, delay=0, execute=true}) {
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
