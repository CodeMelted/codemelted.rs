/**
 * @file Browser runtime tests for the <code>codemelted.js</code> module.
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
 * @see https://medium.com/dailyjs/running-mocha-tests-as-native-es6-modules-in-a-browser-882373f2ecb0
 */

import {assert} from "https://unpkg.com/chai@6.2.2/index.js";
import "https://unpkg.com/mocha@11.7.5/mocha.js";
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
  // LOGGER UC FUNCTIONS
  logger_level,
  // RUNTIME UC FUNCTIONS
  runtime_defined,
} from "./codemelted.js";

logger_level(LOGGER.off);
mocha.setup('bdd');

// ============================================================================
// [MODULE SYNTAX ERRORS VALIDATION] ==========================================
// ============================================================================

describe("MODULE SYNTAX ERRORS VALIDATION", () => {
  it("API_XXX (SyntaxError) Test", () => {
    assert.isTrue(API_MISUSE instanceof SyntaxError);
    assert.isTrue(API_NOT_IMPLEMENTED instanceof SyntaxError);
    assert.isTrue(API_TYPE_VIOLATION instanceof SyntaxError);
    assert.isTrue(API_UNSUPPORTED_RUNTIME instanceof SyntaxError);
  });
});

// ============================================================================
// [MODULE PROTOCOL CLASSES VALIDATION] =======================================
// ============================================================================

describe("MODULE PROTOCOL CLASSES VALIDATION", () => {
  it("CProtocol Object Test", async () => {
    let obj = new CProtocol("test_id", (proto, data) => {});
    assert.equal("test_id", obj.id());

    try {
      await obj.is_running();
      assert.fail("Should Throw SyntaxError");
    } catch (err) {
      assert.isTrue(err instanceof SyntaxError);
    }

    try {
      await obj.post_message();
      assert.fail("Should Throw SyntaxError");
    } catch (err) {
      assert.isTrue(err instanceof SyntaxError);
    }

    assert.throws(() => obj.terminate(), SyntaxError);

    try {
      obj = new CProtocol(null, null);
      assert.fail("Should Throw SyntaxError");
    } catch (err) {
      assert.isNotNull(err);
    }

    try {
      obj = new CProtocol("id", null);
      assert.fail("Should Throw SyntaxError");
    } catch (err) {
      assert.isNotNull(err);
    }
  });
});

// ============================================================================
// [MODULE CLASSES VALIDATION] ================================================
// ============================================================================

describe("MODULE CLASSES VALIDATION", () => {
  it("CResult Object Test", () => {
    let obj = new CResult();

    // Validate ok no data.
    assert.isTrue(obj.is_ok());
    assert.isFalse(obj.is_error());
    assert.isNull(obj.value());
    assert.isNull(obj.error());

    // Validate ok with data.
    obj = new CResult({value: 42});
    assert.isTrue(obj.is_ok());
    assert.isFalse(obj.is_error());
    assert.equal(42, obj.value());
    assert.isNull(obj.error());

    // Validate error no data.
    obj = new CResult({error: "Oh no"});
    assert.isFalse(obj.is_ok());
    assert.isTrue(obj.is_error());
    assert.isNull(obj.value());
    assert.equal("Oh no", obj.error());

    obj = new CResult({error: new Error("Oh no")});
    assert.isFalse(obj.is_ok());
    assert.isTrue(obj.is_error());
    assert.isNull(obj.value());
    assert.isTrue(obj.error() instanceof Error);

    // Validate invalid state
    try {
      new CResult({value: 42, error: "Oh no"});
      assert.fail("should throw SyntaxError");
    } catch (err) {
      assert.isNotNull(err);
    }
  });
});

// ============================================================================
// [ASYNC I/O UC FUNCTIONS VALIDATION] ========================================
// ============================================================================

describe("ASYNC I/O UC FUNCTIONS VALIDATION", () => {
  it("async_sleep() Test", async () => {
    const start = Date.now();
    await async_sleep(500);
    const end = Date.now();
    const exec_time = end - start;
    assert.isTrue(exec_time >= 498);
    assert.throws(() => async_sleep("duh"));
  });

  it("async_task() Test", async () => {
    let task = (data) => { return data + 20; };
    assert.throws(() => async_task());
    assert.throws(() => async_task({task: "duh"}));
    assert.throws(() => async_task({task: task, delay: "duh"}));
    let future = async_task({task: task, data: 22, delay: 500});
    assert.isFalse(future.has_completed());
    let result = (await future.result()).value();
    assert.isTrue(result === 42);
  });
});

// ============================================================================
// [LOGGER UC FUNCTIONS VALIDATION] ===========================================
// ============================================================================

// ============================================================================
// [JSON UC FUNCTIONS VALIDATION] =============================================
// ============================================================================

// ============================================================================
// [RUNTIME UC FUNCTIONS VALIDATION] ==========================================
// ============================================================================

describe ("RUNTIME UC FUNCTIONS VALIDATION", () => {
  it("runtime_defined() Test", () => {
    let is_true_or_false = (v) => {
      return typeof v === "boolean";
    };
    assert.throws(() => runtime_defined());
    assert.throws(() => runtime_defined({request: "duh"}));
    assert.throws(() => runtime_defined({property: 42}));
    assert.throws(() => runtime_defined({property: "duh", obj: 42}));

    assert.isTrue(is_true_or_false(runtime_defined({request: DEFINED_REQUEST.Audio})));
    assert.isTrue(is_true_or_false(runtime_defined({request: DEFINED_REQUEST.Bluetooth})));
    assert.isTrue(runtime_defined({request: DEFINED_REQUEST.Browser}));
    assert.isFalse(runtime_defined({request: DEFINED_REQUEST.Bun}));
    assert.isFalse(runtime_defined({request: DEFINED_REQUEST.Deno}));
    assert.isTrue(is_true_or_false(runtime_defined({request: DEFINED_REQUEST.MIDI})));
    assert.isFalse(runtime_defined({request: DEFINED_REQUEST.Node}));
    assert.isTrue(is_true_or_false(runtime_defined({request: DEFINED_REQUEST.Orientation})));
    assert.isTrue(is_true_or_false(runtime_defined({request: DEFINED_REQUEST.PWA})));
    assert.isTrue(is_true_or_false(runtime_defined({request: DEFINED_REQUEST.SecureContext})));
    assert.isTrue(is_true_or_false(runtime_defined({request: DEFINED_REQUEST.SerialPort})));
    assert.isTrue(is_true_or_false(runtime_defined({request: DEFINED_REQUEST.Share})));
    assert.isTrue(is_true_or_false(runtime_defined({request: DEFINED_REQUEST.TextToSpeech})));
    assert.isTrue(is_true_or_false(runtime_defined({request: DEFINED_REQUEST.TouchEnabled})));
    assert.isTrue(is_true_or_false(runtime_defined({request: DEFINED_REQUEST.USB})));
    assert.isTrue(is_true_or_false(runtime_defined({request: DEFINED_REQUEST.WorkerRT})));
    assert.isTrue(runtime_defined({property: "navigator"}));
    assert.isFalse(runtime_defined({property: "navigator", obj: {}}));
  });
});


// ============================================================================
// [RUN THE TESTS] ============================================================
// ============================================================================

mocha.checkLeaks();
mocha.run();
