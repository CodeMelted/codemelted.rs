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
  // LOGGER UC FUNCTIONS
  logger_level,
  // RUNTIME UC FUNCTIONS
  runtime_defined,
} from "./codemelted.js";

logger_level(LOGGER.off);

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
// [LOGGER UC FUNCTIONS VALIDATION] ===========================================
// ============================================================================

// ============================================================================
// [JSON UC FUNCTIONS VALIDATION] =============================================
// ============================================================================

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
    expect(runtime_defined({request: DEFINED_REQUEST.WorkerRT})).toBe(false);
    expect(runtime_defined({property: "navigator"})).toBe(true);
    expect(runtime_defined({property: "navigator", obj: {}})).toBe(false);
  });
});