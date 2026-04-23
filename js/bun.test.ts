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

// ============================================================================
// [MODULE COMMON DATA TESTS] =================================================
// ============================================================================

describe("MODULE COMMON DATA VALIDATION", () => {
  test("API_XXX (SyntaxError) Test", () => {
    expect(API_MISUSE instanceof SyntaxError).toBe(true);
    expect(API_NOT_IMPLEMENTED instanceof SyntaxError).toBe(true);
    expect(API_TYPE_VIOLATION instanceof SyntaxError).toBe(true);
    expect(API_UNSUPPORTED_RUNTIME instanceof SyntaxError).toBe(true);
  });

  test("CProtocolHandler Object Test", async () => {
    let obj = new CProtocolHandler("test_id", (proto, data) => {});
    expect(obj.id()).toBe("test_id");
    expect(() => obj.is_running()).toThrow<SyntaxError>();
    await expect(() => obj.post_message("")).toThrow<SyntaxError>();
    expect(() => obj.terminate()).toThrow<SyntaxError>();

    try {
      // @ts-ignore JavaScript can fail this. TypeScript type checks :)
      obj = new CProtocolHandler(null, null);
      expect.fail("Should throw SyntaxError");
    } catch (err) {
      expect(err instanceof SyntaxError).toBe(true);
    }

    try {
      // @ts-ignore JavaScript can fail this. TypeScript type checks :)
      obj = new CProtocolHandler("id", null);
      expect.fail("Should throw SyntaxError");
    } catch (err) {
      expect(err instanceof SyntaxError).toBe(true);
    }
  });

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

  test("if_def() Test", () => {
    expect(if_def("duh")).toBe(false);
    expect(if_def("Bun")).toBe(true);
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => if_def()).toThrow();
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => if_def("duh", null)).toThrow();
  });
});

// ============================================================================
// [ASYNC I/O UC VALIDATION] ==================================================
// ============================================================================

describe("MODULE COMMON DATA VALIDATION", () => {
  test("async_sleep() Test", async () => {
    const start = Date.now();
    await async_sleep(500);
    const end = Date.now();
    const exec_time = end - start;
    expect(exec_time >= 498).toBe(true);
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => async_sleep("duh")).toThrow();
  });
});