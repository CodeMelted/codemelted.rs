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
  API_MISUSE,
  API_NOT_IMPLEMENTED,
  API_TYPE_VIOLATION,
  API_UNSUPPORTED_RUNTIME,
  // MODULE TYPEDEFS
  DEFINED_REQUEST,
  EVENT_REQUEST,
  LOGGER,
  // MODULE PROTOCOL CLASSES
  CProtocol,
  // MODULE CLASSES
  CLogRecord,
  CResult,
  CFuture,
  // ASYNC I/O UC FUNCTIONS
  async_sleep,
  async_task,
  // JSON UC FUNCTIONS
  json_atob,
  json_btoa,
  json_check_type,
  json_create_array,
  json_create_object,
  json_has_key,
  json_parse,
  json_stringify,
  json_valid_url,
  // LOGGER UC FUNCTIONS
  logger_handler,
  logger_level,
  logger_log,
  // RUNTIME UC FUNCTIONS
  runtime_cpu_count,
  runtime_defined,
  runtime_environment,
  runtime_event,
  runtime_hostname,
  runtime_name,
  runtime_online,
} from "./codemelted.js";

logger_level(LOGGER.Off);

// ===============================================================================
// [HELPER TEST FUNCTIONS] =======================================================
// ===============================================================================

/**
 * Assists in testing the codemelted.js async throws.
 */
async function asyncAssertThrows(fn: Function, ex: any) {
  try {
    await fn();
    fail("Expected Throw")
  } catch (err) {
    assert(err instanceof ex);
  }
}

// ============================================================================
// [MODULE SYNTAX ERRORS VALIDATION] ==========================================
// ============================================================================

// @ts-ignore Deno object exists, but want to make sure codemelted recognized.
Deno.test("API_XXX (SyntaxError) Test", () => {
  assertEquals(true, API_MISUSE instanceof SyntaxError);
  assertEquals(true, API_NOT_IMPLEMENTED instanceof SyntaxError);
  assertEquals(true, API_TYPE_VIOLATION instanceof SyntaxError);
  assertEquals(true, API_UNSUPPORTED_RUNTIME instanceof SyntaxError);
});

// ============================================================================
// [MODULE PROTOCOL CLASSES VALIDATION] =======================================
// ============================================================================

// @ts-ignore Deno object exists, but want to make sure codemelted recognized.
Deno.test("CProtocol Object Test", async () => {
  let obj = new CProtocol("test_id", (proto, data) => {});
  assertEquals("test_id", obj.id());
  await asyncAssertThrows(() => obj.is_running(), SyntaxError);
  await asyncAssertThrows(() => obj.post_message(""), SyntaxError);
  await asyncAssertThrows(() => obj.terminate(), SyntaxError);

  try {
    // @ts-ignore JavaScript can fail this. TypeScript type checks :)
    obj = new CProtocol(null, null);
  } catch (err) {
    assert(err != null);
  }

  try {
    // @ts-ignore JavaScript can fail this. TypeScript type checks :)
    obj = new CProtocol("id", null);
  } catch (err) {
    assert(err != null);
  }
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
    fail("should throw SyntaxError");
  } catch (err) {
    assert(err != null);
  }
});

// ============================================================================
// [ASYNC I/O UC FUNCTIONS VALIDATION] ========================================
// ============================================================================

// @ts-ignore Deno object exists, but want to make sure codemelted recognized.
Deno.test("async_sleep() Test", async () => {
  const start = Date.now();
  await async_sleep(500);
  const end = Date.now();
  const exec_time = end - start;
  assertEquals(true, exec_time >= 498);

  await asyncAssertThrows(
    // @ts-ignore "Checking JavaScript API type checking"
    async () => { async_sleep("duh"); },
    SyntaxError
  );
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

// @ts-ignore Deno object exists, but want to make sure codemelted recognized.
Deno.test("json_valid_url() Test", () => {
  // API violations
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => json_valid_url());
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => json_valid_url({data: 42}));

  // Thrown because told to
  assertThrows(() => json_valid_url({data: "http://<>.com", should_throw: true}));

  // Now tests
  assertEquals(false, json_valid_url({data: "http://<>.com"}));
  assertEquals(true, json_valid_url({data: "http://google.com"}));
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
  assertEquals(false, runtime_defined({request: DEFINED_REQUEST.WorkerRT}));
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