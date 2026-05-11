/**
 * @file Bun V8 runtime tests for the <code>codemelted.js</code> module.
 * @author Mark Shaffer
 * @copyright © 2024-26 Mark Shaffer. All Rights Reserved.
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

// @ts-ignore bun exists, but want to make sure codemelted recognized.
import {describe, expect, test} from "bun:test";
import {
  // MODULE SYNTAX ERRORS
  CModuleError,
  // MODULE TYPEDEFS
  DEFINED_REQUEST,
  EVENT_REQUEST,
  LOGGER,
  MATH_FORMULA,
  STORAGE_TYPE,
  PROTOCOL_STATE,
  PROTOCOL_TYPE,
  // MODULE PROTOCOL CLASSES
  CProtocol,
  CTimerProtocol,
  CWorkerProtocol,
  // MODULE CLASSES
  CLogRecord,
  CResult,
  CFuture,
  // ASYNC I/O UC FUNCTIONS
  async_sleep,
  async_task,
  async_timer,
  async_worker,
  // JSON UC FUNCTIONS
  json_atob,
  json_btoa,
  json_check_type,
  json_create_array,
  json_create_object,
  json_has_key,
  json_parse,
  json_stringify,
  // LOGGER UC FUNCTIONS
  logger_handler,
  logger_level,
  logger_log,
  // NPU UC FUNCTIONS
  npu_compute,
  npu_math,
  // RUNTIME UC FUNCTIONS
  runtime_cpu_count,
  runtime_defined,
  runtime_environment,
  runtime_event,
  runtime_hostname,
  runtime_name,
  runtime_online,
  // STORAGE UC FUNCTIONS
  storage_clear,
  storage_get,
  storage_key,
  storage_length,
  storage_remove,
  storage_set,
} from "./codemelted.js";

logger_level(LOGGER.Off);

// ============================================================================
// [MODULE SYNTAX ERROR VIOLATIONS] ===========================================
// ============================================================================

describe("MODULE COMMON DATA VALIDATION", () => {
  test("API_XXX (CModuleError) Test", () => {
    try {
      throw new CModuleError("test");
    } catch (err: any) {
      expect(err.toString().length > 0).toBe(true);
    }
  });
});

// ============================================================================
// [MODULE PROTOCOL CLASSES VALIDATION] =======================================
// ============================================================================

describe("MODULE PROTOCOL CLASSES VALIDATION", () => {
  test("CProtocol Object Test", () => {
    // Validate failed construction
    let obj = null;
    try {
      // @ts-ignore TypeScript won't let this happen, JavaScript would
      obj = new CProtocol(null, null, null);
      expect.fail("Should Throw CModuleError");
    } catch (err) {
      expect(err instanceof CModuleError).toBe(true);
    }

    try {
      // @ts-ignore TypeScript won't let this happen, JavaScript would
      obj = new CProtocol("id", null, null);
      expect.fail("Should Throw CModuleError");
    } catch (err) {
      expect(err instanceof CModuleError).toBe(true);
    }

    try {
      // @ts-ignore TypeScript won't let this happen, JavaScript would
      obj = new CProtocol("id", (proto, data) => {}, null);
      expect.fail("Should Throw CModuleError");
    } catch (err) {
      expect(err instanceof CModuleError).toBe(true);
    }

    // Ensure proper base class construct
    obj = new CProtocol("test_id", (proto, data) => {}, PROTOCOL_TYPE.Timer);
    expect(obj.id()).toBe("test_id");
    expect(obj.state(), PROTOCOL_STATE.Started);
    expect(obj.type(), PROTOCOL_TYPE.Timer);
    expect(() => obj.post_message()).toThrow<CModuleError>();
    expect(() => obj.terminate(), CModuleError).toThrow<CModuleError>();
  });
});

// ============================================================================
// [MODULE CLASSES VALIDATION] ================================================
// ============================================================================

describe("MODULE CLASSES VALIDATION", () => {
  test("CResult Object Test", () => {
    let obj = new CResult();

    // Validate ok no data.
    expect(obj.is_ok()).toBe(true);
    expect(obj.is_error()).toBe(false);
    expect(obj.value()).toBe(null);
    expect(obj.error()).toBe(null);

    // Validate ok with data.
    obj = new CResult({value: 42});
    expect(obj.is_ok()).toBe(true);
    expect(obj.is_error()).toBe(false);
    expect(obj.value()).toBe(42);
    expect(obj.error()).toBe(null);

    // Validate error no data.
    obj = new CResult({error: "Oh no"});
    expect(obj.is_ok()).toBe(false);
    expect(obj.is_error()).toBe(true);
    expect(obj.value()).toBe(null);
    expect(obj.error()).toBe("Oh no");

    obj = new CResult({error: new Error("Oh no")});
    expect(obj.is_ok()).toBe(false);
    expect(obj.is_error()).toBe(true);
    expect(obj.value()).toBe(null);
    expect(obj.error() instanceof Error).toBe(true);

    // Validate invalid state
    try {
      new CResult({value: 42, error: "Oh no"});
      expect.fail("should throw CModuleError");
    } catch (err) {
      expect(err instanceof CModuleError).toBe(true);
    }
  });
});

// ============================================================================
// [ASYNC I/O UC FUNCTIONS VALIDATION] ========================================
// ============================================================================

describe("ASYNC I/O UC FUNCTIONS VALIDATION", () => {
  test("async_sleep() Test", async () => {
    const start = Date.now();
    await async_sleep(500);
    const end = Date.now();
    const exec_time = end - start;
    expect(exec_time >= 498).toBe(true);
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => async_sleep("duh")).toThrow<CModuleError>();
  });

  test("async_task() Test", async () => {
    let task = (data: number) => { return data + 20; };
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => async_task()).toThrow<CModuleError>();
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => async_task({task: "duh"})).toThrow<CModuleError>();
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => async_task({task: task, delay: "duh"})).toThrow();
    let future: CFuture = async_task({task: task, data: 22, delay: 500});
    expect(future.has_completed()).toBe(false);
    let result = (await future.result()).value();
    expect(result === 42).toBe(true);
  });

  test("async_timer() Test", async () => {
    // API Violations
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => async_timer()).toThrow<CModuleError>();
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => async_timer({id: 42, task: 42, interval: "duh"})).toThrow<CModuleError>();
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => async_timer({id: "timer", task: 42, interval: "duh"})).toThrow<CModuleError>();
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => async_timer({id: "timer", task: () => {}, interval: "duh"})).toThrow<CModuleError>();
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => async_timer({id: "timer", task: (p, r) => {}, interval: "duh"})).toThrow<CModuleError>();

    // Now lets see this thing work
    let counter = 0;
    let task = (_protocol: CProtocol, _result: CResult) => {
      counter += 1;
    };
    let timer_protocol = async_timer({id: "timer", task: task, interval: 250});
    expect(timer_protocol.state()).toBe(PROTOCOL_STATE.Started);
    await async_sleep(1100);
    expect(timer_protocol.state()).toBe(PROTOCOL_STATE.Message);
    timer_protocol.terminate();
    expect(timer_protocol.state()).toBe(PROTOCOL_STATE.Terminated);
    expect(counter >= 4).toBe(true);
  });

  test("async_worker() Test", async () => {
    // API Failures
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => async_worker()).toThrow<CModuleError>();
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => async_worker({url: 42, rx_handler: 42, options: 42})).toThrow<CModuleError>();
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => async_worker({url: "worker.test.js", rx_handler: 42, options: 42})).toThrow<CModuleError>();
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => async_worker({url: "worker.test.js", rx_handler: (p, r) => {}, options: 42})).toThrow<CModuleError>();

    // Now lets hook this up and demo it.
    // It will also go through a series of worker tests as part of the last
    // post

    // Setup our test conditions
    let test_post_message_rx = false;
    let test_on_message_error_rx = false;
    let test_on_error_rx = false;
    let test_terminated_rx = false;
    let rx_handler = (protocol: CProtocol, result: CResult) => {
      if (protocol.state() === PROTOCOL_STATE.Message) {
        test_post_message_rx = true;
      } else if (protocol.state() === PROTOCOL_STATE.Error) {
        test_on_error_rx = true;
      } else if (protocol.state() === PROTOCOL_STATE.MessageError) {
        test_on_message_error_rx = true;
      } else if (protocol.state() === PROTOCOL_STATE.Terminated) {
        test_terminated_rx = true;
      }
    };

    // Go do some communication.
    let worker = async_worker({url: "./worker.test.js", rx_handler: rx_handler});
    worker.post_message("test_post_message");
    await async_sleep(100);
    worker.post_message("test_on_error");
    await async_sleep(100);
    worker.terminate();
    await async_sleep(100);

    // See if we got our expected messages
    expect(test_post_message_rx).toBe(true);
    expect(test_on_error_rx).toBe(true);
    expect(test_on_message_error_rx).toBe(false);
    expect(test_terminated_rx).toBe(true);
  });
});

// ============================================================================
// [DB UC FUNCTIONS VALIDATION] ===============================================
// ============================================================================

describe("DB UC FUNCTIONS VALIDATION", () => {
  test.skip("db_exist() Test", () => {
    // TBD
  });

  test.skip("db_manage() Test", () => {
    // TBD
  });

  test.skip("db_query() Test", () => {
    // TBD
  });

  test.skip("db_update() Test", () => {
    // TBD
  });

  test.skip("db_version() Test", () => {
    // TBD
  });
});

// ============================================================================
// [DISK UC FUNCTIONS VALIDATION] =============================================
// ============================================================================

describe("DISK UC FUNCTIONS VALIDATION", () => {
  test.skip("disk_read_file() Test", () => {
    // TBD
  });

  test.skip("disk_write_file() Test", () => {
    // TBD
  });
});

// ============================================================================
// [LOGGER UC FUNCTIONS VALIDATION] ===========================================
// ============================================================================

describe ("LOGGER UC FUNCTIONS VALIDATION", () => {
  test("logger_handler() Test", () => {
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => logger_handler(42)).toThrow<CModuleError>();
    expect(() => logger_handler(() => {})).toThrow<CModuleError>();
    expect(() => logger_handler((record) => {})).not.toThrow();
    expect(() => logger_handler()).not.toThrow();
  });

  test("logger_level() Test", () => {
    expect(() => logger_level({})).toThrow<CModuleError>();
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => logger_level(42)).toThrow<CModuleError>();
    expect(LOGGER.Info.label === logger_level(LOGGER.Info)).toBe(true);
    expect(LOGGER.Debug.label === logger_level()).toBe(false);
  });

  test("logger_log() Test", () => {
    // API violation tests

    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => logger_log()).toThrow<CModuleError>();
    expect(() => logger_log({level: {}, data: null})).toThrow<CModuleError>();
    expect(() => logger_log({level: LOGGER.Debug, data: null})).toThrow<CModuleError>();

    // Validate log levels only log events based on log settings.
    let counter = 0;
    let log_handler = (record: CLogRecord) => { counter += 1; };
    logger_handler(log_handler);
    logger_level(LOGGER.Debug);
    logger_log({level: LOGGER.Debug, data: "Debug Event"});
    logger_log({level: LOGGER.Info, data: "Info Event"});
    logger_log({level: LOGGER.Warning, data: "Warning Event"});
    logger_log({level: LOGGER.Error, data: "Error Event"});
    expect(counter).toBe(4);

    counter = 0;
    logger_level(LOGGER.Info);
    logger_log({level: LOGGER.Debug, data: "Debug Event"});
    logger_log({level: LOGGER.Info, data: "Info Event"});
    logger_log({level: LOGGER.Warning, data: "Warning Event"});
    logger_log({level: LOGGER.Error, data: "Error Event"});
    expect(counter).toBe(3);

    counter = 0;
    logger_level(LOGGER.Warning);
    logger_log({level: LOGGER.Debug, data: "Debug Event"});
    logger_log({level: LOGGER.Info, data: "Info Event"});
    logger_log({level: LOGGER.Warning, data: "Warning Event"});
    logger_log({level: LOGGER.Error, data: "Error Event"});
    expect(counter).toBe(2);

    counter = 0;
    logger_level(LOGGER.Error);
    logger_log({level: LOGGER.Debug, data: "Debug Event"});
    logger_log({level: LOGGER.Info, data: "Info Event"});
    logger_log({level: LOGGER.Warning, data: "Warning Event"});
    logger_log({level: LOGGER.Error, data: "Error Event"});
    expect(counter).toBe(1);

    counter = 0;
    logger_level(LOGGER.Off);
    logger_log({level: LOGGER.Debug, data: "Debug Event"});
    logger_log({level: LOGGER.Info, data: "Info Event"});
    logger_log({level: LOGGER.Warning, data: "Warning Event"});
    logger_log({level: LOGGER.Error, data: "Error Event"});
    expect(counter).toBe(0);

    // Confirm when no handler is attached, noting is sent forward.
    counter = 0;
    logger_handler();
    logger_level(LOGGER.Debug);
    logger_log({level: LOGGER.Debug, data: "Debug Event"});
    logger_log({level: LOGGER.Info, data: "Info Event"});
    logger_log({level: LOGGER.Warning, data: "Warning Event"});
    logger_log({level: LOGGER.Error, data: "Error Event"});
    expect(counter).toBe(0);

    logger_level(LOGGER.Off);
  });
});

// ============================================================================
// [JSON UC FUNCTIONS VALIDATION] =============================================
// ============================================================================

describe ("JSON UC FUNCTIONS VALIDATION", () => {
  test("json_atob() / json_btoa() Test", () => {
    // API violations
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => json_atob()).toThrow<CModuleError>();
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => json_atob(42)).toThrow<CModuleError>();
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => json_btoa()).toThrow<CModuleError>();
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => json_btoa(42)).toThrow<CModuleError>();

    // Invalid encoding / decoding, returns null
    let encoded = json_btoa("Hello 🌍");
    expect(encoded).toBe(null);
    let decoded = json_atob("Hello");
    expect(decoded).toBe(null);

    // Valid encoding / decoding.
    const hello = "Hello World!";
    encoded = json_btoa(hello) ?? "";
    expect(encoded != hello).toBe(true);
    decoded = json_atob(encoded);
    expect(decoded).toBe(hello);
  });

  test("json_check_type() Test", () => {
    // Invalid API setup
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => json_check_type()).toThrow<CModuleError>();

    // Now throws because it was not an expected type
    expect(() => json_check_type({type: "string", data: 42, should_throw: true})).toThrow<CModuleError>();
    expect(() => json_check_type({type: Uint8Array, data: 42, should_throw: true})).toThrow<CModuleError>();
    expect(() => json_check_type({type: "function", data: () => {}, count: 2, should_throw: true})).toThrow<CModuleError>();

    // Now checks with no throws
    expect(json_check_type({type: "string", data: 42})).toBe(false);
    expect(json_check_type({type: "number", data: 42})).toBe(true);
    expect(json_check_type({type: Uint8Array, data: 42})).toBe(false);
    expect(json_check_type({type: Uint8Array, data: new Uint8Array()})).toBe(true);
    expect(json_check_type({type: "function", data: () => {}, count: 2})).toBe(false);
    expect(json_check_type({type: "function", data: (a: any, b: any) => {}, count: 2})).toBe(true);
  });

  test("json_create_array() / json_create_object() Test", () => {
    // Create empty array / objects based on no parameters or invalid ones
    let array = json_create_array();
    expect(array.length).toBe(0);
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    array = json_create_array("duh");
    expect(array.length).toBe(0);

    let obj = json_create_object();
    expect(Object.keys(obj).length).toBe(0);
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    obj = json_create_object("duh");
    expect(Object.keys(obj).length).toBe(0);

    // Now create valid copies of data
    array = json_create_array([
      "dog", 1, true, null, { id: 1 }, [1, 2, 4]
    ]);
    expect(array.length).toBe(6);
    obj = json_create_object({
      id: 1,
      name: "Awesome",
      valid: false,
      stuff: [0, 1, 2, 3],
      another_obj: { id: null},
      comment: null,
    });
    expect(Object.keys(obj).length).toBe(6);
  });

  test("json_has_key() Test", () => {
    // API violations
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => json_has_key()).toThrow<CModuleError>();
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => json_has_key({data: "duh"})).toThrow<CModuleError>();
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => json_has_key({data: {}, key: 42})).toThrow<CModuleError>();

    // Now throws because we instruct it to
    expect(() => json_has_key({data: {}, key: "field_name", should_throw: true})).toThrow<CModuleError>();

    // Now valid check returns
    expect(json_has_key({data: {id: ""}, key: "field_name"})).toBe(false);
    expect(json_has_key({data: {id: ""}, key: "id"})).toBe(true);
  });

  test("json_parse() / json_stringify() Test", () => {
    // First invalid parse and stringify items
    let test_func = (a: any, b: any) => { return a + b; }
    expect(json_stringify(test_func)).toBe(null);
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(json_parse(test_func)).toBe(null);

    // Now some valid items
    let obj = {
      id: 1,
      name: "Awesome",
      valid: false,
      stuff: [0, 1, 2, 3],
      another_obj: { id: null},
      comment: null,
    };
    let array = [
      "dog",
      1,
      true,
      null,
      { id: 1 },
      [1, 2, 4]
    ];
    let stringified = json_stringify(obj) ?? "";
    let parsed = json_parse(stringified);
    expect(json_stringify(parsed)).toBe(stringified);

    stringified = json_stringify(array) ?? "";
    parsed = json_parse(stringified);
    expect(json_stringify(parsed)).toBe(stringified);
  });
});

// ============================================================================
// [NPU UC FUNCTIONS VALIDATION] ==============================================
// ============================================================================

describe("NPU UC FUNCTIONS VALIDATION", () => {
  test.skip("npu_compute() Test", () => {
    // TBD
  });

  test("npu_math() Test", () => {
    // API Violations
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => npu_math()).toThrow<CModuleError>();
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => npu_math({formula: 42})).toThrow<CModuleError>();
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => npu_math({formula: "duh", args: 42})).toThrow<CModuleError>();
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => npu_math({formula: "duh", args: []})).toThrow<CModuleError>();
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => npu_math({formula: "duh", args: ["duh"]})).toThrow<CModuleError>();
    expect(() => npu_math({formula: "duh", args: [42]})).toThrow<CModuleError>();

    // Now formula verifications
    expect(isNaN(npu_math({formula: MATH_FORMULA.TemperatureCelsiusToFahrenheit, args: []}))).toBe(true);
    expect(npu_math({formula: MATH_FORMULA.TemperatureCelsiusToFahrenheit, args: [0]})).toBe(32);
    expect(npu_math({formula: MATH_FORMULA.TemperatureCelsiusToKelvin, args: [0]})).toBe(273.15);
    expect(npu_math({formula: MATH_FORMULA.TemperatureFahrenheitToCelsius, args: [32]})).toBe(0);
    expect(npu_math({formula: MATH_FORMULA.TemperatureFahrenheitToKelvin, args: [32]})).toBe(273.15);
    expect(npu_math({formula: MATH_FORMULA.TemperatureKelvinToCelsius, args: [273.15]})).toBe(0);
    expect(npu_math({formula: MATH_FORMULA.TemperatureKelvinToFahrenheit, args: [273.15]})).toBe(32);
  });
});

// ============================================================================
// [RUNTIME UC FUNCTIONS VALIDATION] ==========================================
// ============================================================================

describe("RUNTIME UC FUNCTIONS VALIDATION", () => {
  test("runtime_cpu_count() Test", () => {
    expect(runtime_cpu_count() >= 1).toBe(true);
  });

  test("runtime_defined() Test", () => {
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => runtime_defined()).toThrow();
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => runtime_defined({request: 42})).toThrow<CModuleError>();
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => runtime_defined({property: 42})).toThrow<CModuleError>();
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => runtime_defined({property: "duh", obj: 42})).toThrow<CModuleError>();

    expect(runtime_defined({request: DEFINED_REQUEST.Audio})).toBe(false);
    expect(runtime_defined({request: DEFINED_REQUEST.Bluetooth})).toBe(false);
    expect(runtime_defined({request: DEFINED_REQUEST.Browser})).toBe(false);
    expect(runtime_defined({request: DEFINED_REQUEST.Bun})).toBe(true);
    expect(runtime_defined({request: DEFINED_REQUEST.Deno})).toBe(false);
    expect(runtime_defined({request: DEFINED_REQUEST.MIDI})).toBe(false);
    expect(runtime_defined({request: DEFINED_REQUEST.Node})).toBe(false);
    expect(runtime_defined({request: DEFINED_REQUEST.Orientation})).toBe(false);
    expect(runtime_defined({request: DEFINED_REQUEST.PWA})).toBe(false);
    expect(runtime_defined({request: DEFINED_REQUEST.SecureContext})).toBe(false);
    expect(runtime_defined({request: DEFINED_REQUEST.SerialPort})).toBe(false);
    expect(runtime_defined({request: DEFINED_REQUEST.Share})).toBe(false);
    expect(runtime_defined({request: DEFINED_REQUEST.TextToSpeech})).toBe(false);
    expect(runtime_defined({request: DEFINED_REQUEST.TouchEnabled})).toBe(false);
    expect(runtime_defined({request: DEFINED_REQUEST.USB})).toBe(false);
    expect(runtime_defined({request: DEFINED_REQUEST.WorkerAvailable})).toBe(true);
    expect(runtime_defined({request: DEFINED_REQUEST.WorkerRuntime})).toBe(false);
    expect(runtime_defined({property: "navigator"})).toBe(true);
    expect(runtime_defined({property: "navigator", obj: {}})).toBe(false);
  });

  test("runtime_environment() Test", () => {
    // Non-supported runtime
    expect(() => runtime_environment("search")).toThrow<CModuleError>();
  });

  test("runtime_event() Test", () => {
    // API violations
    let listener = (evt: Event) => { };

    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => {runtime_event()}).toThrow<CModuleError>();
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => {runtime_event({request: EVENT_REQUEST.Add, type: 42})}).toThrow<CModuleError>();
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => {runtime_event({request: EVENT_REQUEST.Add, type: "message", listener: 42})}).toThrow<CModuleError>();
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => {runtime_event({request: EVENT_REQUEST.Add, type: "message", listener: listener, target: 42})}).toThrow<CModuleError>();
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => {runtime_event({request: 42, type: "message", listener: listener})}).toThrow<CModuleError>();

    // Now to a valid listener
    runtime_event({request: EVENT_REQUEST.Add, type: "message", listener: listener});
    runtime_event({request: EVENT_REQUEST.Remove, type: "message", listener: listener});
  });

  test("runtime_hostname() Test", () => {
    expect(() => runtime_hostname()).toThrow<CModuleError>();
  });

  test("runtime_name() Test", () => {
    expect(runtime_name()).toBe("bun");
  });

  test("runtime_online() Test", () => {
    // Unsupported runtime.
    expect(() => runtime_online()).toThrow<CModuleError>();
  });
});

// ============================================================================
// [STORAGE UC FUNCTIONS VALIDATION] ==========================================
// ============================================================================

describe("STORAGE UC FUNCTIONS VALIDATION", () => {
  test("storage_clear() / storage_length() Test", () => {
    // Storage Use Cases Not Supported on this Runtime
    expect(() => storage_length(STORAGE_TYPE.Local)).toThrow<CModuleError>();
    expect(() => storage_length(STORAGE_TYPE.Session)).toThrow<CModuleError>();
    expect(() => storage_length(STORAGE_TYPE.Cookie)).toThrow<CModuleError>();
    expect(() => storage_clear(STORAGE_TYPE.Local)).toThrow<CModuleError>();
    expect(() => storage_clear(STORAGE_TYPE.Session)).toThrow<CModuleError>();
    expect(() => storage_clear(STORAGE_TYPE.Cookie)).toThrow<CModuleError>();
  });

  test("storage_get() / storage_key() / storage_remove() / storage_set() Test", () => {
    // None of these are supported on this runtime.
    expect(() => storage_set({key: "cool", value: "guy"})).toThrow<CModuleError>();
    expect(() => storage_length()).toThrow<CModuleError>();
    expect(() => storage_get({key: "cool"})).toThrow<CModuleError>();
    expect(() => storage_key({index: 0})).toThrow<CModuleError>();
    expect(() => storage_remove({key: "cool"})).toThrow<CModuleError>();
  });
});
