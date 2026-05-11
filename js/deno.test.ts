// deno-coverage-ignore-file
/**
 * @file Deno V8 runtime tests for the <code>codemelted.js</code> module.
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

import {
  assert,
  assertEquals,
  assertThrows,
  fail,
// @ts-ignore Deno object exists, but want to make sure codemelted recognized.
} from "jsr:@std/assert";
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

// @ts-ignore Deno object exists, but want to make sure codemelted recognized.
Deno.test("API_XXX (CModuleError) Test", () => {
  try {
    throw new CModuleError("test");
  } catch (err: any) {
    assertEquals(err.toString().length > 0, true);
  }
});

// ============================================================================
// [MODULE PROTOCOL CLASSES VALIDATION] =======================================
// ============================================================================

// @ts-ignore Deno object exists, but want to make sure codemelted recognized.
Deno.test("CProtocol Object Test", () => {
  // Validate failed construction
  let obj = null;
  try {
    // @ts-ignore JavaScript can fail this. TypeScript type checks :)
    obj = new CProtocol(null, null, null);
    fail("Should Throw CModuleError");
  } catch (err) {
    assertEquals(err instanceof CModuleError, true);
  }

  try {
    // @ts-ignore JavaScript can fail this. TypeScript type checks :)
    obj = new CProtocol("id", null, null);
    fail("Should Throw CModuleError");
  } catch (err) {
    assertEquals(err instanceof CModuleError, true);
  }

  try {
    // @ts-ignore JavaScript can fail this. TypeScript type checks :)
    obj = new CProtocol("id", (proto, data) => {}, null);
    fail("Should Throw CModuleError");
  } catch (err) {
    assertEquals(err instanceof CModuleError, true);
  }

  // Ensure proper base class construct
  obj = new CProtocol("test_id", (proto, data) => {}, PROTOCOL_TYPE.Timer);
  assertEquals(obj.id(), "test_id");
  assertEquals(obj.state(), PROTOCOL_STATE.Started);
  assertEquals(obj.type(), PROTOCOL_TYPE.Timer);
  assertThrows(() => obj.post_message());
  assertThrows(() => obj.terminate(), CModuleError);
});

// ============================================================================
// [MODULE CLASSES VALIDATION] ================================================
// ============================================================================

// @ts-ignore Deno object exists, but want to make sure codemelted recognized.
Deno.test("CResult Object Test", () => {
  let obj = new CResult();

  // Validate ok no data.
  assertEquals(true, obj.is_ok());
  assertEquals(false, obj.is_error());
  assertEquals(null, obj.value());
  assertEquals(null, obj.error());

  // Validate ok with data.
  obj = new CResult({value: 42});
  assertEquals(true, obj.is_ok());
  assertEquals(false, obj.is_error());
  assertEquals(42, obj.value());
  assertEquals(null, obj.error());

  // Validate error no data.
  obj = new CResult({error: "Oh no"});
  assertEquals(false, obj.is_ok());
  assertEquals(true, obj.is_error());
  assertEquals(null, obj.value());
  assertEquals("Oh no", obj.error());

  obj = new CResult({error: new Error("Oh no")});
  assertEquals(false, obj.is_ok());
  assertEquals(true, obj.is_error());
  assertEquals(null, obj.value());
  assertEquals(true, obj.error() instanceof Error);

  // Validate invalid state
  try {
    new CResult({value: 42, error: "Oh no"});
    fail("should throw CModuleError");
  } catch (err) {
    assert(err != null);
  }
});

// ============================================================================
// [ASYNC I/O UC FUNCTIONS VALIDATION] ========================================
// ============================================================================

// @ts-ignore Deno object exists, but want to make sure codemelted recognized.
Deno.test("async_sleep() Test", async () => {
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => async_sleep("duh"));

  // Now prove it works.
  const start = Date.now();
  await async_sleep(500);
  const end = Date.now();
  const exec_time = end - start;
  assertEquals(true, exec_time >= 498);
});

// @ts-ignore Deno object exists, but want to make sure codemelted recognized.
Deno.test("async_task() Test", async () => {
  let task = (data: number) => { return data + 20; };
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => async_task())
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => async_task({task: "duh"}));
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => async_task({task: task, delay: "duh"}));
  let future: CFuture = async_task({task: task, data: 22, delay: 500});
  assertEquals(false, future.has_completed());
  let result = (await future.result()).value();
  assertEquals(42, result);
});

// @ts-ignore Deno object exists, but want to make sure codemelted recognized.
Deno.test("async_timer() Test", async () => {
  // API Violations
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => async_timer());
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => async_timer({id: 42, task: 42, interval: "duh"}));
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => async_timer({id: "timer", task: 42, interval: "duh"}));
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => async_timer({id: "timer", task: () => {}, interval: "duh"}));
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => async_timer({id: "timer", task: (p, r) => {}, interval: "duh"}));

  // Now lets see this thing work
  let counter = 0;
  let task = (protocol: CProtocol, result: CResult) => {
    counter += 1;
  };
  let timer_protocol = async_timer({id: "timer", task: task, interval: 250});
  assertEquals(timer_protocol.state(), PROTOCOL_STATE.Started);
  await async_sleep(1100);
  assertEquals(timer_protocol.state(), PROTOCOL_STATE.Message);
  timer_protocol.terminate();
  assertEquals(timer_protocol.state(), PROTOCOL_STATE.Terminated);
  assertEquals(counter >= 4, true);
});

// @ts-ignore Deno object exists, but want to make sure codemelted recognized.
Deno.test("async_worker() Test", async () => {
  // API Failures
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => async_worker());
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => async_worker({url: 42, rx_handler: 42, options: 42}));
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => async_worker({url: "worker.test.js", rx_handler: 42, options: 42}));
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => async_worker({url: "worker.test.js", rx_handler: (p, r) => {}, options: 42}));

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
  let worker = async_worker({url: "worker.test.js", rx_handler: rx_handler});
  worker.post_message("test_post_message");
  await async_sleep(250);
  worker.post_message("test_on_error");
  await async_sleep(250);
  worker.terminate();
  await async_sleep(250);

  // See if we got our expected messages
  assertEquals(test_post_message_rx, true);
  assertEquals(test_on_error_rx, true);
  assertEquals(test_on_message_error_rx, false);
  assertEquals(test_terminated_rx, true);
});

// ============================================================================
// [DB UC FUNCTIONS VALIDATION] ===============================================
// ============================================================================

// @ts-ignore Deno object exists, but want to make sure codemelted recognized.
Deno.test("TBD DB Test", () => {

});

// ============================================================================
// [DISK UC FUNCTIONS VALIDATION] =============================================
// ============================================================================

// @ts-ignore Deno object exists, but want to make sure codemelted recognized.
Deno.test("TBD disk Test", () => {

});

// ============================================================================
// [LOGGER UC FUNCTIONS VALIDATION] ===========================================
// ============================================================================

// @ts-ignore Deno object exists, but want to make sure codemelted recognized.
Deno.test("logger_handler() Test", () => {
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => logger_handler(42));
  assertThrows(() => logger_handler(() => {}));
  logger_handler((record) => {});
  logger_handler();
});

// @ts-ignore Deno object exists, but want to make sure codemelted recognized.
Deno.test("logger_level() Test", () => {
  assertThrows(() => logger_level({}));
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => logger_level(42));
  assertEquals(true, LOGGER.Info.label === logger_level(LOGGER.Info));
  assertEquals(false, LOGGER.Debug.label === logger_level());
});

// @ts-ignore Deno object exists, but want to make sure codemelted recognized.
Deno.test("logger_log() Test", () => {
  // API violation tests

  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => logger_log());
  assertThrows(() => logger_log({level: {}, data: null}));
  assertThrows(() => logger_log({level: LOGGER.Debug, data: null}));

  // Validate log levels only log events based on log settings.
  let counter = 0;
  let log_handler = (record: CLogRecord) => { counter += 1; };
  logger_handler(log_handler);
  logger_level(LOGGER.Debug);
  logger_log({level: LOGGER.Debug, data: "Debug Event"});
  logger_log({level: LOGGER.Info, data: "Info Event"});
  logger_log({level: LOGGER.Warning, data: "Warning Event"});
  logger_log({level: LOGGER.Error, data: "Error Event"});
  assertEquals(4, counter);

  counter = 0;
  logger_level(LOGGER.Info);
  logger_log({level: LOGGER.Debug, data: "Debug Event"});
  logger_log({level: LOGGER.Info, data: "Info Event"});
  logger_log({level: LOGGER.Warning, data: "Warning Event"});
  logger_log({level: LOGGER.Error, data: "Error Event"});
  assertEquals(3, counter);

  counter = 0;
  logger_level(LOGGER.Warning);
  logger_log({level: LOGGER.Debug, data: "Debug Event"});
  logger_log({level: LOGGER.Info, data: "Info Event"});
  logger_log({level: LOGGER.Warning, data: "Warning Event"});
  logger_log({level: LOGGER.Error, data: "Error Event"});
  assertEquals(2, counter);

  counter = 0;
  logger_level(LOGGER.Error);
  logger_log({level: LOGGER.Debug, data: "Debug Event"});
  logger_log({level: LOGGER.Info, data: "Info Event"});
  logger_log({level: LOGGER.Warning, data: "Warning Event"});
  logger_log({level: LOGGER.Error, data: "Error Event"});
  assertEquals(1, counter);

  counter = 0;
  logger_level(LOGGER.Off);
  logger_log({level: LOGGER.Debug, data: "Debug Event"});
  logger_log({level: LOGGER.Info, data: "Info Event"});
  logger_log({level: LOGGER.Warning, data: "Warning Event"});
  logger_log({level: LOGGER.Error, data: "Error Event"});
  assertEquals(0, counter);

  // Confirm when no handler is attached, noting is sent forward.
  counter = 0;
  logger_handler();
  logger_level(LOGGER.Debug);
  logger_log({level: LOGGER.Debug, data: "Debug Event"});
  logger_log({level: LOGGER.Info, data: "Info Event"});
  logger_log({level: LOGGER.Warning, data: "Warning Event"});
  logger_log({level: LOGGER.Error, data: "Error Event"});
  assertEquals(0, counter);

  logger_level(LOGGER.Off);
});

// ============================================================================
// [JSON UC FUNCTIONS VALIDATION] =============================================
// ============================================================================

// @ts-ignore Deno object exists, but want to make sure codemelted recognized.
Deno.test("json_atob() / json_btoa() Test", () => {
  // API violations
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => json_atob());
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => json_atob(42));
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => json_btoa());
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => json_btoa(42));

  // Invalid encoding / decoding, returns null
  let encoded = json_btoa("Hello 🌍");
  assertEquals(null, encoded);
  let decoded = json_atob("Hello");
  assertEquals(null, decoded);

  // Valid encoding / decoding.
  const hello = "Hello World!";
  encoded = json_btoa(hello) ?? "";
  assertEquals(true, encoded != hello);
  decoded = json_atob(encoded);
  assertEquals(hello, decoded);
});

// @ts-ignore Deno object exists, but want to make sure codemelted recognized.
Deno.test("json_check_type() Test", () => {
  // Invalid API setup
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => json_check_type());

  // Now throws because it was not an expected type
  assertThrows(() => json_check_type({type: "string", data: 42, should_throw: true}));
  assertThrows(() => json_check_type({type: Uint8Array, data: 42, should_throw: true}));
  assertThrows(() => json_check_type({type: "function", data: () => {}, count: 2, should_throw: true}))

  // Now checks with no throws
  assertEquals(false, json_check_type({type: "string", data: 42}));
  assertEquals(true, json_check_type({type: "number", data: 42}));
  assertEquals(false, json_check_type({type: Uint8Array, data: 42}));
  assertEquals(true, json_check_type({type: Uint8Array, data: new Uint8Array()}));
  assertEquals(false, json_check_type({type: "function", data: () => {}, count: 2}));
  assertEquals(true, json_check_type({type: "function", data: (a: any, b: any) => {}, count: 2}));
});

// @ts-ignore Deno object exists, but want to make sure codemelted recognized.
Deno.test("json_create_array() / json_create_object() Test", () => {
  // Create empty array / objects based on no parameters or invalid ones
  let array = json_create_array();
  assertEquals(0, array.length);
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  array = json_create_array("duh");
  assertEquals(0, array.length);

  let obj = json_create_object();
  assertEquals(0, Object.keys(obj).length);
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  obj = json_create_object("duh");
  assertEquals(0, Object.keys(obj).length);

  // Now create valid copies of data
  array = json_create_array([
    "dog", 1, true, null, { id: 1 }, [1, 2, 4]
  ]);
  assertEquals(6, array.length);
  obj = json_create_object({
    id: 1,
    name: "Awesome",
    valid: false,
    stuff: [0, 1, 2, 3],
    another_obj: { id: null},
    comment: null,
  });
  assertEquals(6, Object.keys(obj).length);
});

// @ts-ignore Deno object exists, but want to make sure codemelted recognized.
Deno.test("json_has_key() Test", () => {
  // API violations
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => json_has_key());
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => json_has_key({data: "duh"}));
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => json_has_key({data: {}, key: 42}));

  // Now throws because we instruct it to
  assertThrows(() => json_has_key({data: {}, key: "field_name", should_throw: true}));

  // Now valid check returns
  assertEquals(false, json_has_key({data: {id: ""}, key: "field_name"}));
  assertEquals(true, json_has_key({data: {id: ""}, key: "id"}));
});

// @ts-ignore Deno object exists, but want to make sure codemelted recognized.
Deno.test("json_parse() / json_stringify() Test", () => {
  // First invalid parse and stringify items
  let test_func = (a: any, b: any) => { return a + b; }
  assertEquals(null, json_stringify(test_func));
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertEquals(null, json_parse(test_func));

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
  assertEquals(stringified, json_stringify(parsed));

  stringified = json_stringify(array) ?? "";
  parsed = json_parse(stringified);
  assertEquals(stringified, json_stringify(parsed));
});

// ============================================================================
// [NPU UC FUNCTIONS VALIDATION] ==============================================
// ============================================================================

// @ts-ignore Deno object exists, but want to make sure codemelted recognized.
Deno.test("npu_compute() Test", () => {

});

// @ts-ignore Deno object exists, but want to make sure codemelted recognized.
Deno.test("npu_math() Test", () => {
  // API Violations
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => npu_math());
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => npu_math({formula: 42}));
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => npu_math({formula: "duh", args: 42}));
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => npu_math({formula: "duh", args: []}));
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => npu_math({formula: "duh", args: ["duh"]}));
  assertThrows(() => npu_math({formula: "duh", args: [42]}));

  // Now formula verifications
  assertEquals(true, isNaN(npu_math({formula: MATH_FORMULA.TemperatureCelsiusToFahrenheit, args: []})));
  assertEquals(32, npu_math({formula: MATH_FORMULA.TemperatureCelsiusToFahrenheit, args: [0]}));
  assertEquals(273.15, npu_math({formula: MATH_FORMULA.TemperatureCelsiusToKelvin, args: [0]}));
  assertEquals(0, npu_math({formula: MATH_FORMULA.TemperatureFahrenheitToCelsius, args: [32]}));
  assertEquals(273.15, npu_math({formula: MATH_FORMULA.TemperatureFahrenheitToKelvin, args: [32]}));
  assertEquals(0, npu_math({formula: MATH_FORMULA.TemperatureKelvinToCelsius, args: [273.15]}));
  assertEquals(32, npu_math({formula: MATH_FORMULA.TemperatureKelvinToFahrenheit, args: [273.15]}));
});

// ============================================================================
// [RUNTIME UC FUNCTIONS VALIDATION] ==========================================
// ============================================================================

// @ts-ignore Deno object exists, but want to make sure codemelted recognized.
Deno.test("runtime_cpu_count() Test", () => {
  assertEquals(true, runtime_cpu_count() >= 1);
});

// @ts-ignore Deno object exists, but want to make sure codemelted recognized.
Deno.test("runtime_defined() Test", () => {
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => runtime_defined());
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => runtime_defined({request: "duh"}));
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => runtime_defined({property: 42}));
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => runtime_defined({property: "duh", obj: 42}));

  assertEquals(false, runtime_defined({request: DEFINED_REQUEST.Audio}));
  assertEquals(false, runtime_defined({request: DEFINED_REQUEST.Bluetooth}));
  assertEquals(false, runtime_defined({request: DEFINED_REQUEST.Browser}));
  assertEquals(false, runtime_defined({request: DEFINED_REQUEST.Bun}));
  assertEquals(true, runtime_defined({request: DEFINED_REQUEST.Deno}));
  assertEquals(false, runtime_defined({request: DEFINED_REQUEST.MIDI}));
  assertEquals(false, runtime_defined({request: DEFINED_REQUEST.Node}));
  assertEquals(false, runtime_defined({request: DEFINED_REQUEST.Orientation}));
  assertEquals(false, runtime_defined({request: DEFINED_REQUEST.PWA}));
  assertEquals(false, runtime_defined({request: DEFINED_REQUEST.SecureContext}));
  assertEquals(false, runtime_defined({request: DEFINED_REQUEST.SerialPort}));
  assertEquals(false, runtime_defined({request: DEFINED_REQUEST.Share}));
  assertEquals(false, runtime_defined({request: DEFINED_REQUEST.TextToSpeech}));
  assertEquals(false, runtime_defined({request: DEFINED_REQUEST.TouchEnabled}));
  assertEquals(false, runtime_defined({request: DEFINED_REQUEST.USB}));
  assertEquals(true, runtime_defined({request: DEFINED_REQUEST.WorkerAvailable}));
  assertEquals(false, runtime_defined({request: DEFINED_REQUEST.WorkerRuntime}));
  assertEquals(true, runtime_defined({property: "navigator"}));
  assertEquals(false, runtime_defined({property: "navigator", obj: {}}));
});

// @ts-ignore Deno object exists, but want to make sure codemelted recognized.
Deno.test("runtime_environment() Test", () => {
  // Unsupported Platform
  assertThrows(() => runtime_environment("search"));
});

// @ts-ignore Deno object exists, but want to make sure codemelted recognized.
Deno.test("runtime_event() Test", () => {
  // API violations
  let listener = (evt: Event) => { };

  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => {runtime_event()});
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => {runtime_event({request: EVENT_REQUEST.Add, type: 42})});
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => {runtime_event({request: EVENT_REQUEST.Add, type: "message", listener: 42})});
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => {runtime_event({request: EVENT_REQUEST.Add, type: "message", listener: listener, target: 42})});
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => {runtime_event({request: 42, type: "message", listener: listener})});

  // Now to a valid listener
  runtime_event({request: EVENT_REQUEST.Add, type: "message", listener: listener});
  runtime_event({request: EVENT_REQUEST.Remove, type: "message", listener: listener});
});

// @ts-ignore Deno object exists, but want to make sure codemelted recognized.
Deno.test("runtime_hostname() Test", () => {
  // Unsupported Platform
  assertThrows(() => runtime_hostname());
});

// @ts-ignore Deno object exists, but want to make sure codemelted recognized.
Deno.test("runtime_name() Test", () => {
  assertEquals("deno", runtime_name());
});

// @ts-ignore Deno object exists, but want to make sure codemelted recognized.
Deno.test("runtime_online() Test", () => {
  // Unsupported Platform
  assertThrows(() => runtime_online());
});

// ============================================================================
// [STORAGE UC FUNCTIONS VALIDATION] ==========================================
// ============================================================================

// @ts-ignore Deno object exists, but want to make sure codemelted recognized.
Deno.test("storage_clear() / storage_length() Test", () => {
  // API Violations
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => storage_clean("duh"));
  assertThrows(() => storage_length("duh"));

  // Now do each type of storage
  storage_set({type: STORAGE_TYPE.Local, key: "key", value: "value"});
  assertEquals(storage_length(STORAGE_TYPE.Local) > 0, true);
  storage_clear(STORAGE_TYPE.Local);
  assertEquals(storage_length(STORAGE_TYPE.Local), 0);

  storage_set({type: STORAGE_TYPE.Session, key: "key", value: "value"});
  assertEquals(storage_length(STORAGE_TYPE.Session) > 0, true);
  storage_clear(STORAGE_TYPE.Session);
  assertEquals(storage_length(STORAGE_TYPE.Session), 0);

  assertThrows(() => storage_set({type: STORAGE_TYPE.Cookie, key: "key", value: "value"}));
  assertThrows(() => storage_clear(STORAGE_TYPE.Cookie));
});

// @ts-ignore Deno object exists, but want to make sure codemelted recognized.
Deno.test("storage_get() / storage_key() / storage_remove() / storage_set() Test", () => {
  // API Violations
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => storage_get());
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => storage_get({type: 42, key: 42}));
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => storage_get({type: 42, key: "duh"}));
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => storage_key());
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => storage_key({type: 42, index: "duh"}));
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => storage_key({type: 42, index: 0}));
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => storage_remove());
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => storage_remove({type: 42, key: 42}));
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => storage_remove({type: 42, key: "duh"}));
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => storage_set());
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => storage_set({type: 42, key: 42, value: 42}));
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => storage_set({type: 42, key: "duh", value: 42}));
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => storage_set({type: 42, key: "duh", value: "duh"}));

  // First let's do local storage
  storage_clear();
  assertEquals(storage_length(), 0);
  assertEquals(storage_get({key: "cool"}), null);
  assertEquals(storage_key({index: 0}), null);

  storage_set({key: "cool", value: "guy"});
  assertEquals(storage_length(), 1);
  assertEquals(storage_get({key: "cool"}), "guy");
  assertEquals(storage_key({index: 0}), "cool");

  storage_remove({key: "cool"});
  assertEquals(storage_length(), 0);
  assertEquals(storage_get({key: "cool"}), null);
  assertEquals(storage_key({index: 0}), null);

  // Now session storage
  storage_clear(STORAGE_TYPE.Session);
  assertEquals(storage_length(STORAGE_TYPE.Session), 0);
  assertEquals(storage_get({type: STORAGE_TYPE.Session, key: "cool"}), null);
  assertEquals(storage_key({type: STORAGE_TYPE.Session, index: 0}), null);

  storage_set({type: STORAGE_TYPE.Session, key: "cool", value: "guy"});
  assertEquals(storage_length(STORAGE_TYPE.Session), 1);
  assertEquals(storage_get({type: STORAGE_TYPE.Session, key: "cool"}), "guy");
  assertEquals(storage_key({type: STORAGE_TYPE.Session, index: 0}), "cool");

  storage_remove({type: STORAGE_TYPE.Session, key: "cool"});
  assertEquals(storage_length(STORAGE_TYPE.Session), 0);
  assertEquals(storage_get({type: STORAGE_TYPE.Session, key: "cool"}), null);
  assertEquals(storage_key({type: STORAGE_TYPE.Session, index: 0}), null);

  // Finally cookie storage
  assertThrows(() => storage_clear(STORAGE_TYPE.Cookie));
  assertThrows(() => storage_set({type: STORAGE_TYPE.Cookie, key: "cool", value: "guy"}));
  assertThrows(() => storage_get({type: STORAGE_TYPE.Cookie, key: "cool"}));
  assertThrows(() => storage_remove({type: STORAGE_TYPE.Cookie, key: "cool"}));
});