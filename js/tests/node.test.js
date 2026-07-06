/**
 * @file NodeJS V8 runtime tests for the <code>codemelted.js</code> module.
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

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
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
// [MODULE SYNTAX ERRORS VALIDATION] ==========================================
// ============================================================================

describe("MODULE SYNTAX ERRORS VALIDATION", (t) => {
  test("API_XXX (CModuleError) Test", () => {
    try {
      throw new CModuleError("test");
    } catch (err) {
      assert.equal(err.toString().length > 0, true);
    }
  });
});

// ============================================================================
// [MODULE PROTOCOL CLASSES VALIDATION] =======================================
// ============================================================================

describe("MODULE PROTOCOL CLASSES VALIDATION", (t) => {
  test("CProtocol Object Test", async () => {
    let obj = null;
    // Validate failed construction
    try {
      obj = new CProtocol(null, null, null);
      assert.fail("Should Throw CModuleError");
    } catch (err) {
      assert.equal(err instanceof CModuleError, true);
    }

    try {
      obj = new CProtocol("id", null, null);
      assert.fail("Should Throw CModuleError");
    } catch (err) {
      assert.equal(err instanceof CModuleError, true);
    }

    try {
      obj = new CProtocol("id", (proto, data) => {}, null);
      assert.fail("Should Throw CModuleError");
    } catch (err) {
      assert.equal(err instanceof CModuleError, true);
    }

    // Ensure proper base class construct
    obj = new CProtocol("test_id", (proto, data) => {}, PROTOCOL_TYPE.Timer);
    assert.equal(obj.id(), "test_id");
    assert.equal(obj.state(), PROTOCOL_STATE.Started);
    assert.equal(obj.type(), PROTOCOL_TYPE.Timer);
    assert.throws(() => obj.post_message());
    assert.throws(() => obj.terminate(), CModuleError);
  });
});

// ============================================================================
// [MODULE CLASSES VALIDATION] ================================================
// ============================================================================

describe("MODULE CLASSES VALIDATION", (t) => {
  test("CResult Object Test", () => {
    let obj = new CResult();

    // Validate ok no data.
    assert.equal(true, obj.is_ok());
    assert.equal(false, obj.is_error());
    assert.equal(null, obj.value());
    assert.equal(null, obj.error());

    // Validate ok with data.
    obj = new CResult({value: 42});
    assert.equal(true, obj.is_ok());
    assert.equal(false, obj.is_error());
    assert.equal(42, obj.value());
    assert.equal(null, obj.error());

    // Validate error no data.
    obj = new CResult({error: "Oh no"});
    assert.equal(false, obj.is_ok());
    assert.equal(true, obj.is_error());
    assert.equal(null, obj.value());
    assert.equal("Oh no", obj.error());

    obj = new CResult({error: new Error("Oh no")});
    assert.equal(false, obj.is_ok());
    assert.equal(true, obj.is_error());
    assert.equal(null, obj.value());
    assert.equal(true, (obj.error() instanceof Error));

    // Validate invalid state
    try {
      new CResult({value: 42, error: "Oh no"});
      assert.fail("should throw CModuleError");
    } catch (err) {
      assert.equal(true, err instanceof CModuleError);
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
    assert.equal(true, exec_time >= 498);
    assert.throws(() => async_sleep("duh"));
  });

  test("async_task() Test", async () => {
    let task = (data) => { return data + 20; };
    assert.throws(() => async_task());
    assert.throws(() => async_task({task: "duh"}));
    assert.throws(() => async_task({task: task, delay: "duh"}));
    let future = async_task({task: task, data: 22, delay: 500});
    assert.equal(false, future.has_completed());
    let result = (await future.result()).value();
    assert.equal(42, result);
  });

  test("async_timer() Test", async () => {
    // API Violations
    assert.throws(() => async_timer());
    assert.throws(() => async_timer({id: 42, task: 42, interval: "duh"}));
    assert.throws(() => async_timer({id: "timer", task: 42, interval: "duh"}));
    assert.throws(() => async_timer({id: "timer", task: () => {}, interval: "duh"}));
    assert.throws(() => async_timer({id: "timer", task: (p, r) => {}, interval: "duh"}));

    // Now lets see this thing work
    let counter = 0;
    let task = (protocol, result) => {
      counter += 1;
    };
    let timer_protocol = async_timer({id: "timer", task: task, interval: 250});
    assert.equal(timer_protocol.state(), PROTOCOL_STATE.Started);
    await async_sleep(1100);
    assert.equal(timer_protocol.state(), PROTOCOL_STATE.Message);
    timer_protocol.terminate();
    assert.equal(timer_protocol.state(), PROTOCOL_STATE.Terminated);
    assert.equal(counter >= 4, true);
  });

  test("async_worker() Test", async () => {
    // Non-supported runtime.
    try {
      let worker = async_worker({url: "./worker.test.js", rx_handler: (p, r) => {}});
      assert.fail("Should throw exception, non-supported runtime.");
    } catch (err) {
      assert.equal(err instanceof CModuleError, true);
    }
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

describe("LOGGER UC FUNCTIONS VALIDATION", () => {
  test("logger_handler() Test", () => {
    assert.throws(() => logger_handler(42));
    assert.throws(() => logger_handler(() => {}));
    assert.doesNotThrow(() => logger_handler((record) => {}));
    assert.doesNotThrow(() => logger_handler());
  });

  test("logger_level() Test", () => {
    assert.throws(() => logger_level({}));
    assert.throws(() => logger_level(42));
    assert.equal(LOGGER.Info.label, logger_level(LOGGER.Info));
    assert.equal(false, LOGGER.Debug.label === logger_level());
  });

  test("logger_log() Test", () => {
    // API violation tests
    assert.throws(() => logger_log());
    assert.throws(() => logger_log({level: {}, data: null}));
    assert.throws(() => logger_log({level: LOGGER.Debug, data: null}));

    // Validate log levels only log events based on log settings.
    let counter = 0;
    let log_handler = (record) => { counter += 1; };
    logger_handler(log_handler);
    logger_level(LOGGER.Debug);
    logger_log({level: LOGGER.Debug, data: "Debug Event"});
    logger_log({level: LOGGER.Info, data: "Info Event"});
    logger_log({level: LOGGER.Warning, data: "Warning Event"});
    logger_log({level: LOGGER.Error, data: "Error Event"});
    assert.equal(4, counter);

    counter = 0;
    logger_level(LOGGER.Info);
    logger_log({level: LOGGER.Debug, data: "Debug Event"});
    logger_log({level: LOGGER.Info, data: "Info Event"});
    logger_log({level: LOGGER.Warning, data: "Warning Event"});
    logger_log({level: LOGGER.Error, data: "Error Event"});
    assert.equal(3, counter);

    counter = 0;
    logger_level(LOGGER.Warning);
    logger_log({level: LOGGER.Debug, data: "Debug Event"});
    logger_log({level: LOGGER.Info, data: "Info Event"});
    logger_log({level: LOGGER.Warning, data: "Warning Event"});
    logger_log({level: LOGGER.Error, data: "Error Event"});
    assert.equal(2, counter);

    counter = 0;
    logger_level(LOGGER.Error);
    logger_log({level: LOGGER.Debug, data: "Debug Event"});
    logger_log({level: LOGGER.Info, data: "Info Event"});
    logger_log({level: LOGGER.Warning, data: "Warning Event"});
    logger_log({level: LOGGER.Error, data: "Error Event"});
    assert.equal(1, counter);

    counter = 0;
    logger_level(LOGGER.Off);
    logger_log({level: LOGGER.Debug, data: "Debug Event"});
    logger_log({level: LOGGER.Info, data: "Info Event"});
    logger_log({level: LOGGER.Warning, data: "Warning Event"});
    logger_log({level: LOGGER.Error, data: "Error Event"});
    assert.equal(0, counter);

    // Confirm when no handler is attached, noting is sent forward.
    counter = 0;
    logger_handler();
    logger_level(LOGGER.Debug);
    logger_log({level: LOGGER.Debug, data: "Debug Event"});
    logger_log({level: LOGGER.Info, data: "Info Event"});
    logger_log({level: LOGGER.Warning, data: "Warning Event"});
    logger_log({level: LOGGER.Error, data: "Error Event"});
    assert.equal(0, counter);

    logger_level(LOGGER.Off);
  });
});

// ============================================================================
// [JSON UC FUNCTIONS VALIDATION] =============================================
// ============================================================================

describe ("JSON UC FUNCTIONS VALIDATION", () => {
  test("json_atob() / json_btoa() Test", () => {
    // API violations
    assert.throws(() => json_atob());
    assert.throws(() => json_atob(42));
    assert.throws(() => json_btoa());
    assert.throws(() => json_btoa(42));

    // Invalid encoding / decoding, returns null
    let encoded = json_btoa("Hello 🌍");
    assert.equal(null, encoded);
    let decoded = json_atob("Hello");
    assert.equal(null, decoded);

    // Valid encoding / decoding.
    const hello = "Hello World!";
    encoded = json_btoa(hello);
    assert.equal(true, encoded != hello);
    decoded = json_atob(encoded);
    assert.equal(hello, decoded);
  });

  test("json_check_type() Test", () => {
    // Invalid API setup
    assert.throws(() => json_check_type());

    // Now throws because it was not an expected type
    assert.throws(() => json_check_type({type: "string", data: 42, should_throw: true}));
    assert.throws(() => json_check_type({type: Uint8Array, data: 42, should_throw: true}));
    assert.throws(() => json_check_type({type: "function", data: () => {}, count: 2, should_throw: true}))

    // Now checks with no throws
    assert.equal(false, json_check_type({type: "string", data: 42}));
    assert.equal(true, json_check_type({type: "number", data: 42}));
    assert.equal(false, json_check_type({type: Uint8Array, data: 42}));
    assert.equal(true, json_check_type({type: Uint8Array, data: new Uint8Array()}));
    assert.equal(false, json_check_type({type: "function", data: () => {}, count: 2}));
    assert.equal(true, json_check_type({type: "function", data: (a, b) => {}, count: 2}));
  });

  test("json_create_array() / json_create_object() Test", () => {
    // Create empty array / objects based on no parameters or invalid ones
    let array = json_create_array();
    assert.equal(0, array.length);
    array = json_create_array("duh");
    assert.equal(0, array.length);

    let obj = json_create_object();
    assert.equal(0, Object.keys(obj).length);
    obj = json_create_object("duh");
    assert.equal(0, Object.keys(obj).length);

    // Now create valid copies of data
    array = json_create_array([
      "dog", 1, true, null, { id: 1 }, [1, 2, 4]
    ]);
    assert.equal(6, array.length);
    obj = json_create_object({
      id: 1,
      name: "Awesome",
      valid: false,
      stuff: [0, 1, 2, 3],
      another_obj: { id: null},
      comment: null,
    });
    assert.equal(6, Object.keys(obj).length);
  });

  test("json_has_key() Test", () => {
    // API violations
    assert.throws(() => json_has_key());
    assert.throws(() => json_has_key({data: "duh"}));
    assert.throws(() => json_has_key({data: {}, key: 42}));

    // Now throws because we instruct it to
    assert.throws(() => json_has_key({data: {}, key: "field_name", should_throw: true}));

    // Now valid check returns
    assert.equal(false, json_has_key({data: {id: ""}, key: "field_name"}));
    assert.equal(true, json_has_key({data: {id: ""}, key: "id"}));
  });

  test("json_parse() / json_stringify() Test", () => {
    // First invalid parse and stringify items
    let test_func = (a, b) => { return a + b; }
    assert.equal(null, json_stringify(test_func));
    assert.equal(null, json_parse(test_func));

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
    let stringified = json_stringify(obj);
    let parsed = json_parse(stringified);
    assert.equal(stringified, json_stringify(parsed));

    stringified = json_stringify(array);
    parsed = json_parse(stringified);
    assert.equal(stringified, json_stringify(parsed));
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
    assert.throws(() => npu_math());
    assert.throws(() => npu_math({formula: 42}));
    assert.throws(() => npu_math({formula: "duh", args: 42}));
    assert.throws(() => npu_math({formula: "duh", args: []}));
    assert.throws(() => npu_math({formula: "duh", args: ["duh"]}));
    assert.throws(() => npu_math({formula: "duh", args: [42]}));

    // Now formula verifications
    assert.equal(true, isNaN(npu_math({formula: MATH_FORMULA.TemperatureCelsiusToFahrenheit, args: []})));
    assert.equal(32, npu_math({formula: MATH_FORMULA.TemperatureCelsiusToFahrenheit, args: [0]}));
    assert.equal(273.15, npu_math({formula: MATH_FORMULA.TemperatureCelsiusToKelvin, args: [0]}));
    assert.equal(0, npu_math({formula: MATH_FORMULA.TemperatureFahrenheitToCelsius, args: [32]}));
    assert.equal(273.15, npu_math({formula: MATH_FORMULA.TemperatureFahrenheitToKelvin, args: [32]}));
    assert.equal(0, npu_math({formula: MATH_FORMULA.TemperatureKelvinToCelsius, args: [273.15]}));
    assert.equal(32, npu_math({formula: MATH_FORMULA.TemperatureKelvinToFahrenheit, args: [273.15]}));
  });
});

// ============================================================================
// [RUNTIME UC FUNCTIONS VALIDATION] ==========================================
// ============================================================================

describe("RUNTIME UC FUNCTIONS VALIDATION", () => {
  test("runtime_cpu_count() Test", () => {
    assert.equal(true, runtime_cpu_count() >= 1);
  });

  test("runtime_defined() Test", () => {
    assert.throws(() => runtime_defined());
    assert.throws(() => runtime_defined({request: "duh"}));
    assert.throws(() => runtime_defined({property: 42}));
    assert.throws(() => runtime_defined({property: "duh", obj: 42}));

    assert.equal(false, runtime_defined({request: DEFINED_REQUEST.Audio}));
    assert.equal(false, runtime_defined({request: DEFINED_REQUEST.Bluetooth}));
    assert.equal(false, runtime_defined({request: DEFINED_REQUEST.Browser}));
    assert.equal(false, runtime_defined({request: DEFINED_REQUEST.Bun}));
    assert.equal(false, runtime_defined({request: DEFINED_REQUEST.Deno}));
    assert.equal(false, runtime_defined({request: DEFINED_REQUEST.MIDI}));
    assert.equal(true, runtime_defined({request: DEFINED_REQUEST.Node}));
    assert.equal(false, runtime_defined({request: DEFINED_REQUEST.Orientation}));
    assert.equal(false, runtime_defined({request: DEFINED_REQUEST.PWA}));
    assert.equal(false, runtime_defined({request: DEFINED_REQUEST.SecureContext}));
    assert.equal(false, runtime_defined({request: DEFINED_REQUEST.SerialPort}));
    assert.equal(false, runtime_defined({request: DEFINED_REQUEST.Share}));
    assert.equal(false, runtime_defined({request: DEFINED_REQUEST.TextToSpeech}));
    assert.equal(false, runtime_defined({request: DEFINED_REQUEST.TouchEnabled}));
    assert.equal(false, runtime_defined({request: DEFINED_REQUEST.USB}));
    assert.equal(false, runtime_defined({request: DEFINED_REQUEST.WorkerAvailable}));
    assert.equal(false, runtime_defined({request: DEFINED_REQUEST.WorkerRuntime}));
    assert.equal(true, runtime_defined({property: "navigator"}));
    assert.equal(false, runtime_defined({property: "navigator", obj: {}}));
  });

  test("runtime_environment() Test", () => {
    // Non supported platform.
    assert.throws(() => runtime_environment("search"));
  });

  test("runtime_event() Test", () => {
    // API violations
    let listener = (evt) => { };
    assert.throws(() => {runtime_event()});
    assert.throws(() => {runtime_event({request: EVENT_REQUEST.Add, type: 42})});
    assert.throws(() => {runtime_event({request: EVENT_REQUEST.Add, type: "message", listener: 42})});
    assert.throws(() => {runtime_event({request: EVENT_REQUEST.Add, type: "message", listener: listener, target: 42})});
    assert.throws(() => {runtime_event({request: 42, type: "message", listener: listener})});

    // Nodes globalThis does not have EventTarget
    assert.throws(() => runtime_event({request: EVENT_REQUEST.Add, type: "message", listener: listener}));
    assert.throws(() => runtime_event({request: EVENT_REQUEST.Remove, type: "message", listener: listener}));
  });

  test("runtime_hostname() Test", () => {
    // Unsupported platform
    assert.throws(() => runtime_hostname());
  });

  test("runtime_name() Test", () => {
    assert.equal("node", runtime_name());
  });

  test("runtime_online() Test", () => {
    // Unsupported platform.
    assert.throws(() => runtime_online());
  });
});

// ============================================================================
// [STORAGE UC FUNCTIONS VALIDATION] ==========================================
// ============================================================================

// Right now this is experimental in Node. So localStorage and sessionStorage
// exist but they throw when you try to use them. This is as of v25+
describe("STORAGE UC FUNCTIONS VALIDATION", () => {
  test.skip("storage_clear() / storage_length() Test", () => {
    // API Violations
    assert.throws(() => storage_clean("duh"));
    assert.throws(() => storage_length("duh"));

    // Now do each type of storage
    storage_set({type: STORAGE_TYPE.Local, key: "key", value: "value"});
    assert.isTrue(storage_length(STORAGE_TYPE.Local) > 0);
    storage_clear(STORAGE_TYPE.Local);
    assert.equal(storage_length(STORAGE_TYPE.Local), 0);

    storage_set({type: STORAGE_TYPE.Session, key: "key", value: "value"});
    assert.equal(storage_length(STORAGE_TYPE.Session) > 0, true);
    storage_clear(STORAGE_TYPE.Session);
    assert.equal(storage_length(STORAGE_TYPE.Session), 0);

    storage_set({type: STORAGE_TYPE.Cookie, key: "key", value: "value"});
    assert.equal(storage_length(STORAGE_TYPE.Cookie) > 0, true);
    storage_clear(STORAGE_TYPE.Cookie);
    assert.equal(storage_length(STORAGE_TYPE.Cookie), 0);
  });

  test.skip("storage_get() / storage_key() / storage_remove() / storage_set() Test", () => {
    // API Violations
    assert.throws(() => storage_get());
    assert.throws(() => storage_get({type: 42, key: 42}));
    assert.throws(() => storage_get({type: 42, key: "duh"}));
    assert.throws(() => storage_key());
    assert.throws(() => storage_key({type: 42, index: "duh"}));
    assert.throws(() => storage_key({type: 42, index: 0}));
    assert.throws(() => storage_remove());
    assert.throws(() => storage_remove({type: 42, key: 42}));
    assert.throws(() => storage_remove({type: 42, key: "duh"}));
    assert.throws(() => storage_set());
    assert.throws(() => storage_set({type: 42, key: 42, value: 42}));
    assert.throws(() => storage_set({type: 42, key: "duh", value: 42}));
    assert.throws(() => storage_set({type: 42, key: "duh", value: "duh"}));

    // First let's do local storage
    storage_clear();
    assert.equal(storage_length(), 0);
    assert.equal(storage_get({key: "cool"}), null);
    assert.equal(storage_key({index: 0}), null);

    storage_set({key: "cool", value: "guy"});
    assert.equal(storage_length(), 1);
    assert.equal(storage_get({key: "cool"}), "guy");
    assert.equal(storage_key({index: 0}), "cool");

    storage_remove({key: "cool"});
    assert.equal(storage_length(), 0);
    assert.equal(storage_get({key: "cool"}), null);
    assert.equal(storage_key({index: 0}), null);

    // Now session storage
    storage_clear(STORAGE_TYPE.Session);
    assert.equal(storage_length(STORAGE_TYPE.Session), 0);
    assert.equal(storage_get({type: STORAGE_TYPE.Session, key: "cool"}), null);
    assert.equal(storage_key({type: STORAGE_TYPE.Session, index: 0}), null);

    storage_set({type: STORAGE_TYPE.Session, key: "cool", value: "guy"});
    assert.equal(storage_length(STORAGE_TYPE.Session), 1);
    assert.equal(storage_get({type: STORAGE_TYPE.Session, key: "cool"}), "guy");
    assert.equal(storage_key({type: STORAGE_TYPE.Session, index: 0}), "cool");

    storage_remove({type: STORAGE_TYPE.Session, key: "cool"});
    assert.equal(storage_length(STORAGE_TYPE.Session), 0);
    assert.equal(storage_get({type: STORAGE_TYPE.Session, key: "cool"}), null);
    assert.equal(storage_key({type: STORAGE_TYPE.Session, index: 0}), null);

    // Finally cookie storage
    storage_clear(STORAGE_TYPE.Cookie);
    assert.equal(storage_length(STORAGE_TYPE.Cookie), 0);
    assert.equal(storage_get({type: STORAGE_TYPE.Cookie, key: "cool"}), null);
    assert.equal(storage_key({type: STORAGE_TYPE.Cookie, index: 0}), null);

    storage_set({type: STORAGE_TYPE.Cookie, key: "cool", value: "guy"});
    assert.equal(storage_length(STORAGE_TYPE.Cookie), 1);
    assert.equal(storage_get({type: STORAGE_TYPE.Cookie, key: "cool"}), "guy");
    assert.equal(storage_key({type: STORAGE_TYPE.Cookie, index: 0}), "cool");

    storage_remove({type: STORAGE_TYPE.Cookie, key: "cool"});
    assert.equal(storage_length(STORAGE_TYPE.Cookie), 0);
    assert.equal(storage_get({type: STORAGE_TYPE.Cookie, key: "cool"}), null);
    assert.equal(storage_key({type: STORAGE_TYPE.Cookie, index: 0}), null);
  });
});
