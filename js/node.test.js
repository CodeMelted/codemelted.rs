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
  API_MISUSE,
  API_NOT_IMPLEMENTED,
  API_TYPE_VIOLATION,
  API_UNSUPPORTED_RUNTIME,
  CProtocolHandler,
  CResult,
  if_def,
} from "./codemelted.js";

// ============================================================================
// [MODULE COMMON DATA TESTS] =================================================
// ============================================================================

describe("MODULE COMMON DATA VALIDATION", (t) => {
  test("API_XXX (SyntaxError) Test", () => {
    assert.equal(true, API_MISUSE instanceof SyntaxError);
    assert.equal(true, API_NOT_IMPLEMENTED instanceof SyntaxError);
    assert.equal(true, API_TYPE_VIOLATION instanceof SyntaxError);
    assert.equal(true, API_UNSUPPORTED_RUNTIME instanceof SyntaxError);
  });

  test("CProtocolHandler Object Test", async () => {
    let obj = new CProtocolHandler("test_id", (proto, data) => {});
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
      obj = new CProtocolHandler(null, null);
      assert.fail("Should Throw SyntaxError");
    } catch (err) {
      assert.equal(true, err instanceof SyntaxError);
    }

    try {
      obj = new CProtocolHandler("id", null);
      assert.fail("Should Throw SyntaxError");
    } catch (err) {
      assert.equal(true, err instanceof SyntaxError);
    }
  });

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

  test("if_def() Test", () => {
    assert.equal(true, if_def("process"));
    assert.equal(false, if_def("process", {}));
    assert.throws(() => if_def());
    assert.throws(() => if_def("duh", null));
  });
});
