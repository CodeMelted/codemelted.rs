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
  API_MISUSE,
  API_NOT_IMPLEMENTED,
  API_TYPE_VIOLATION,
  API_UNSUPPORTED_RUNTIME,
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
});

