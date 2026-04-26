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
// [MODULE SYNTAX ERRORS VALIDATION] ==========================================
// ============================================================================

describe("MODULE SYNTAX ERRORS VALIDATION", (t) => {
  test("API_XXX (SyntaxError) Test", () => {
    assert.equal(true, API_MISUSE instanceof SyntaxError);
    assert.equal(true, API_NOT_IMPLEMENTED instanceof SyntaxError);
    assert.equal(true, API_TYPE_VIOLATION instanceof SyntaxError);
    assert.equal(true, API_UNSUPPORTED_RUNTIME instanceof SyntaxError);
  });
});

// ============================================================================
// [MODULE PROTOCOL CLASSES VALIDATION] =======================================
// ============================================================================

describe("MODULE PROTOCOL CLASSES VALIDATION", (t) => {
  test("CProtocol Object Test", async () => {
    let obj = new CProtocol("test_id", (proto, data) => {});
    assert.equal("test_id", obj.id());

    try {
      await obj.is_running();
      assert.fail("Should Throw SyntaxError");
    } catch (err) {
      assert.equal(true, err instanceof SyntaxError);
    }

    try {
      await obj.post_message();
      assert.fail("Should Throw SyntaxError");
    } catch (err) {
      assert.equal(true, err instanceof SyntaxError);
    }

    assert.throws(() => obj.terminate(), SyntaxError);

    try {
      obj = new CProtocol(null, null);
      assert.fail("Should Throw SyntaxError");
    } catch (err) {
      assert.equal(true, err instanceof SyntaxError);
    }

    try {
      obj = new CProtocol("id", null);
      assert.fail("Should Throw SyntaxError");
    } catch (err) {
      assert.equal(true, err instanceof SyntaxError);
    }
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
      assert.fail("should throw SyntaxError");
    } catch (err) {
      assert.equal(true, err instanceof SyntaxError);
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

  test("json_valid_url() Test", () => {
    // API violations
    assert.throws(() => json_valid_url());
    assert.throws(() => json_valid_url({data: 42}));

    // Thrown because told to
    assert.throws(() => json_valid_url({data: "http://<>.com", should_throw: true}));

    // Now tests
    assert.equal(false, json_valid_url({data: "http://<>.com"}));
    assert.equal(true, json_valid_url({data: "http://google.com"}));
  });
});

// ============================================================================
// [RUNTIME UC FUNCTIONS VALIDATION] ==========================================
// ============================================================================

describe("RUNTIME UC FUNCTIONS VALIDATION", () => {
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
    assert.equal(false, runtime_defined({request: DEFINED_REQUEST.WorkerRT}));
    assert.equal(true, runtime_defined({property: "navigator"}));
    assert.equal(false, runtime_defined({property: "navigator", obj: {}}));
  });
});