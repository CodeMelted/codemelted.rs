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
// [MODULE COMMON DATA TESTS] =================================================
// ============================================================================

// @ts-ignore Deno object exists, but want to make sure codemelted recognized.
Deno.test("API_XXX (SyntaxError) Test", () => {
  assertEquals(true, API_MISUSE instanceof SyntaxError);
  assertEquals(true, API_NOT_IMPLEMENTED instanceof SyntaxError);
  assertEquals(true, API_TYPE_VIOLATION instanceof SyntaxError);
  assertEquals(true, API_UNSUPPORTED_RUNTIME instanceof SyntaxError);
});

// @ts-ignore Deno object exists, but want to make sure codemelted recognized.
Deno.test("codemelted.if_def() Test", () => {
  const obj = {};
  assertEquals(true, if_def("Deno"));
  assertEquals(false, if_def("Deno", obj));
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => if_def());
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => if_def("duh", null));
});

// @ts-ignore Deno object exists, but want to make sure codemelted recognized.
Deno.test("CProtocolHandler Object Test", async () => {
  let obj = new CProtocolHandler("test_id", (proto, data) => {});
  assertEquals("test_id", obj.id());
  await asyncAssertThrows(() => obj.is_running(), SyntaxError);
  await asyncAssertThrows(() => obj.post_message(""), SyntaxError);
  await asyncAssertThrows(() => obj.terminate(), SyntaxError);

  try {
    // @ts-ignore JavaScript can fail this. TypeScript type checks :)
    obj = new CProtocolHandler(null, null);
  } catch (err) {
    assert(err != null);
  }

  try {
    // @ts-ignore JavaScript can fail this. TypeScript type checks :)
    obj = new CProtocolHandler("id", null);
  } catch (err) {
    assert(err != null);
  }
});

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

// ===============================================================================
// [ASYNC IO UC VALIDATION] ======================================================
// ===============================================================================

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

// // ----------------------------------------------------------------------------
// // [json use case] ------------------------------------------------------------
// // ----------------------------------------------------------------------------

// Deno.test("codemelted.json API Violations", () => {
//   // Functions that throw if you completely ignore thigns.
//   assertThrows(() => codemelted.json.checkHasProperty(), SyntaxError);
//   assertThrows(() => codemelted.json.checkType(), SyntaxError);
// });

// Deno.test("codemelted.json Conversion Tests", () => {
//   // Test data
//   const testObj = {
//     field1: "field1",
//     field2: 2,
//     field3: true,
//     field4: [ "1", 2, null, false ],
//     field5: null,
//   };
//   const testArray = ["1", 2, null, false ];
//   const testFunc = (a, b) => {};

//   // asXXX Validation
//   assert(codemelted.json.asBool({data: "yes"}) === true);
//   assert(codemelted.json.asBool({data: "no"}) === false);
//   assert(codemelted.json.asDouble({data: "6.85"}) === 6.85);
//   assert(codemelted.json.asDouble({data: "-6.85"}) === -6.85);
//   assert(codemelted.json.asDouble({data: "no"}) === null);
//   assert(codemelted.json.asInt({data: "6"}) === 6);
//   assert(codemelted.json.asInt({data: "-6"}) === -6);
//   assert(codemelted.json.asInt({data: "no"}) === null);

//   // checkHasProperty Validation
//   let success = codemelted.json.checkHasProperty({
//     obj: testObj,
//     key: "field6",
//   });
//   assert(success === false);
//   assertThrows(() => codemelted.json.tryHasProperty({
//     obj: testObj,
//     key: "field6",
//   }));

//   success = codemelted.json.checkHasProperty({
//     obj: testObj,
//     key: "field5",
//   });
//   assert(success === true);

//   // checkXXXX / tryXXX Validation
//   success = codemelted.json.checkType({type: "object", data: testObj});
//   assert(success === true);
//   success = codemelted.json.checkType({type: "string", data: testObj});
//   assert(success === false);
//   assertThrows(() => codemelted.json.tryType({type: "string", data: testObj}));

//   success = codemelted.json.checkType({type: Array, data: testArray});
//   assert(success === true);
//   success = codemelted.json.checkType({type: "string", data: testArray});
//   assert(success === false);
//   assertThrows(() => codemelted.json.tryType({type: "string", data: testArray}));

//   success = codemelted.json.checkType({type: "function", data: testFunc, count: 2});
//   assert(success === true);
//   success = codemelted.json.checkType({type: "function", data: testFunc, count: 1});
//   assert(success === false);
//   assertThrows(() => codemelted.json.tryType({type: "function", data: testFunc, count: 1}));

//   success = codemelted.json.checkValidUrl({data: "https://codemelted.com"});
//   assert(success === true);
//   success = codemelted.json.checkValidUrl({data: ":::: garbage::::"});
//   assert(success === false);
//   assertThrows(() => codemelted.json.tryValidUrl({data: ":::: garbage::::"}));

//   // createXXXX validation
//   let newObj = codemelted.json.createObject({data: testObj});
//   assert(Object.keys(newObj).length > 0);
//   newObj = codemelted.json.createObject({data: 42});
//   assert(Object.keys(newObj).length === 0);

//   let newArray = codemelted.json.createArray({data: testArray});
//   assert(newArray.length > 0);
//   newArray = codemelted.json.createArray({data: "hello"});
//   assert(newArray.length === 0);

//   // stringify / parse validation
//   let url = new URL("https://codemelted.com");
//   let data = codemelted.json.parse({data: url});
//   assert(data === null);
//   data = codemelted.json.stringify({data: 9007199254740991n});
//   assert(data === null);

//   data = codemelted.json.stringify({data: testObj});
//   assert(data != null);
//   data = codemelted.json.parse({data: data});
//   assert(data != null);

//   data = null;
//   data = codemelted.json.stringify({data: testArray});
//   assert(data != null);
//   data = codemelted.json.parse({data: data});
//   assert(data != null);
// });
