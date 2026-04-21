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
  API_MISUSE,
  API_NOT_IMPLEMENTED,
  API_TYPE_VIOLATION,
  API_UNSUPPORTED_RUNTIME,
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
});

// ============================================================================
// [RUN THE TESTS] ============================================================
// ============================================================================

mocha.checkLeaks();
mocha.run();
