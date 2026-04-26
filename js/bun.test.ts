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
  API_MISUSE,
  API_NOT_IMPLEMENTED,
  API_TYPE_VIOLATION,
  API_UNSUPPORTED_RUNTIME,
  // MODULE TYPEDEFS
  DEFINED_REQUEST,
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
  runtime_defined,
} from "./codemelted.js";

logger_level(LOGGER.Off);

// ============================================================================
// [MODULE SYNTAX ERROR VIOLATIONS] ===========================================
// ============================================================================

describe("MODULE COMMON DATA VALIDATION", () => {
  test("API_XXX (SyntaxError) Test", () => {
    expect(API_MISUSE instanceof SyntaxError).toBe(true);
    expect(API_NOT_IMPLEMENTED instanceof SyntaxError).toBe(true);
    expect(API_TYPE_VIOLATION instanceof SyntaxError).toBe(true);
    expect(API_UNSUPPORTED_RUNTIME instanceof SyntaxError).toBe(true);
  });
});

// ============================================================================
// [MODULE PROTOCOL CLASSES VALIDATION] =======================================
// ============================================================================

describe("MODULE PROTOCOL CLASSES VALIDATION", () => {
  test("CProtocol Object Test", async () => {
    let obj = new CProtocol("test_id", (proto, data) => {});
    expect(obj.id()).toBe("test_id");
    expect(() => obj.is_running()).toThrow<SyntaxError>();
    await expect(() => obj.post_message("")).toThrow<SyntaxError>();
    expect(() => obj.terminate()).toThrow<SyntaxError>();

    try {
      // @ts-ignore JavaScript can fail this. TypeScript type checks :)
      obj = new CProtocol(null, null);
      expect.fail("Should throw SyntaxError");
    } catch (err) {
      expect(err instanceof SyntaxError).toBe(true);
    }

    try {
      // @ts-ignore JavaScript can fail this. TypeScript type checks :)
      obj = new CProtocol("id", null);
      expect.fail("Should throw SyntaxError");
    } catch (err) {
      expect(err instanceof SyntaxError).toBe(true);
    }
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
      expect.fail("should throw SyntaxError");
    } catch (err) {
      expect(err instanceof SyntaxError).toBe(true);
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
    expect(() => async_sleep("duh")).toThrow<SyntaxError>();
  });

  test("async_task() Test", async () => {
    let task = (data: number) => { return data + 20; };
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => async_task()).toThrow<SyntaxError>();
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => async_task({task: "duh"})).toThrow<SyntaxError>();
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => async_task({task: task, delay: "duh"})).toThrow();
    let future: CFuture = async_task({task: task, data: 22, delay: 500});
    expect(future.has_completed()).toBe(false);
    let result = (await future.result()).value();
    expect(result === 42).toBe(true);
  });
});

// ============================================================================
// [DB UC FUNCTIONS VALIDATION] ===============================================
// ============================================================================

describe("DB UC FUNCTIONS VALIDATION", () => {

});

// ============================================================================
// [DISK UC FUNCTIONS VALIDATION] =============================================
// ============================================================================

describe("DISK UC FUNCTIONS VALIDATION", () => {

});

// ============================================================================
// [LOGGER UC FUNCTIONS VALIDATION] ===========================================
// ============================================================================

describe ("LOGGER UC FUNCTIONS VALIDATION", () => {
  test("logger_handler() Test", () => {
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => logger_handler(42)).toThrow<SyntaxError>();
    expect(() => logger_handler(() => {})).toThrow<SyntaxError>();
    expect(() => logger_handler((record) => {})).not.toThrow();
    expect(() => logger_handler()).not.toThrow();
  });

  test("logger_level() Test", () => {
    expect(() => logger_level({})).toThrow<SyntaxError>();
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => logger_level(42)).toThrow<SyntaxError>();
    expect(LOGGER.Info.label === logger_level(LOGGER.Info)).toBe(true);
    expect(LOGGER.Debug.label === logger_level()).toBe(false);
  });

  test("logger_log() Test", () => {
    // API violation tests

    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => logger_log()).toThrow<SyntaxError>();
    expect(() => logger_log({level: {}, data: null})).toThrow<SyntaxError>();
    expect(() => logger_log({level: LOGGER.Debug, data: null})).toThrow<SyntaxError>();

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
    expect(() => json_atob()).toThrow<SyntaxError>();
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => json_atob(42)).toThrow<SyntaxError>();
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => json_btoa()).toThrow<SyntaxError>();
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => json_btoa(42)).toThrow<SyntaxError>();

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
    expect(() => json_check_type()).toThrow<SyntaxError>();

    // Now throws because it was not an expected type
    expect(() => json_check_type({type: "string", data: 42, should_throw: true})).toThrow<SyntaxError>();
    expect(() => json_check_type({type: Uint8Array, data: 42, should_throw: true})).toThrow<SyntaxError>();
    expect(() => json_check_type({type: "function", data: () => {}, count: 2, should_throw: true})).toThrow<SyntaxError>();

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
    expect(() => json_has_key()).toThrow<SyntaxError>();
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => json_has_key({data: "duh"})).toThrow<SyntaxError>();
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => json_has_key({data: {}, key: 42})).toThrow<SyntaxError>();

    // Now throws because we instruct it to
    expect(() => json_has_key({data: {}, key: "field_name", should_throw: true})).toThrow<SyntaxError>();

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

  test("json_valid_url() Test", () => {
    // API violations
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => json_valid_url()).toThrow<SyntaxError>();
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => json_valid_url({data: 42})).toThrow<SyntaxError>();

    // Thrown because told to
    expect(() => json_valid_url({data: "http://<>.com", should_throw: true})).toThrow<SyntaxError>();

    // Now tests
    expect(json_valid_url({data: "http://<>.com"})).toBe(false);
    expect(json_valid_url({data: "http://google.com"})).toBe(true);
  });
});

// ============================================================================
// [RUNTIME UC FUNCTIONS VALIDATION] ==========================================
// ============================================================================

describe("RUNTIME UC FUNCTIONS VALIDATION", () => {
  test("runtime_defined() Test", () => {
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => runtime_defined()).toThrow();
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => runtime_defined({request: 42})).toThrow<SyntaxError>();
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => runtime_defined({property: 42})).toThrow<SyntaxError>();
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => runtime_defined({property: "duh", obj: 42})).toThrow<SyntaxError>();

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
    expect(runtime_defined({request: DEFINED_REQUEST.WorkerRT})).toBe(false);
    expect(runtime_defined({property: "navigator"})).toBe(true);
    expect(runtime_defined({property: "navigator", obj: {}})).toBe(false);
  });
});