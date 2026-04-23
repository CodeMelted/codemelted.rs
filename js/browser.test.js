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
  // MODULE COMMON DATA
  API_MISUSE,
  API_NOT_IMPLEMENTED,
  API_TYPE_VIOLATION,
  API_UNSUPPORTED_RUNTIME,
  CProtocolHandler,
  CResult,
  if_def,
  // ASYNC I/O UC FUNCTIONS
  async_sleep,
} from "./codemelted.js";

mocha.setup('bdd');

// ============================================================================
// [MODULE COMMON DATA TESTS] =================================================
// ============================================================================

describe("MODULE COMMON DATA VALIDATION", () => {
  it("API_XXX (SyntaxError) Test", () => {
    assert.isTrue(API_MISUSE instanceof SyntaxError);
    assert.isTrue(API_NOT_IMPLEMENTED instanceof SyntaxError);
    assert.isTrue(API_TYPE_VIOLATION instanceof SyntaxError);
    assert.isTrue(API_UNSUPPORTED_RUNTIME instanceof SyntaxError);
  });

  it("CProtocolHandler Object Test", async () => {
    let obj = new CProtocolHandler("test_id", (proto, data) => {});
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
      obj = new CProtocolHandler(null, null);
      assert.fail("Should Throw SyntaxError");
    } catch (err) {
      assert.isNotNull(err);
    }

    try {
      obj = new CProtocolHandler("id", null);
      assert.fail("Should Throw SyntaxError");
    } catch (err) {
      assert.isNotNull(err);
    }
  });

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

  it("if_def() Test", () => {
    assert.isTrue(if_def("navigator"));
    assert.isFalse(if_def("navigator", {}));
    assert.throws(() => if_def());
    assert.throws(() => if_def("duh", null));
  });
});

// ============================================================================
// [ASYNC I/O UC VALIDATION] ==================================================
// ============================================================================

describe("ASYNC I/O UC VALIDATION", () => {
  it("async_sleep() Test", async () => {
    const start = Date.now();
    await async_sleep(500);
    const end = Date.now();
    const exec_time = end - start;
    assert.isTrue(exec_time >= 498);
    assert.throws(() => async_sleep("duh"));
  });
});

// ============================================================================
// [RUN THE TESTS] ============================================================
// ============================================================================

mocha.checkLeaks();
mocha.run();
