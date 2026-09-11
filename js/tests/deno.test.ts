// deno-coverage-ignore-file
/**
 * @file Deno V8 runtime tests for the codemelted JavaScript modules.
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
  PROTOCOL_TYPE,
  CModuleError,
  CProtocol,
  CProtocolEvent,
  CResult,
  runtime_event,
  EVENT_REQUEST,
  json_btoa,
  json_atob,
  json_check_type,
  json_create_array,
  json_create_object,
  json_has_key,
  json_parse,
  json_stringify,
  CLogRecord,
  LOGGER,
  logger_handler,
  logger_level,
  logger_log,
  async_sleep,
  async_task,
  CFuture,
  CTimerEvent,
  async_timer,
  async_worker,
  CWorkerEvent,
  PROTOCOL_EVENT,
  runtime_available,
  AVAILABILITY_REQUEST,
} from "./codemelted.js";

// ============================================================================
// [MODULE CORE VALIDATION] ===================================================
// ============================================================================

// @ts-ignore Deno object exists, but want to make sure codemelted recognized.
Deno.test("CModuleError Test", () => {
  try {
    throw new CModuleError("test");
  } catch (err: any) {
    assertEquals(err.toString().length > 0, true);
  }
});

// @ts-ignore Deno object exists, but want to make sure codemelted recognized.
Deno.test("CProtocol Object Test", () => {
  // Validate failed construction
  let obj = null;
  try {
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    obj = new CProtocol({name: null, rx_handler: null, type: null});
    fail("Should Throw CModuleError");
  } catch (err) {
    assertEquals(err instanceof CModuleError, true);
  }

  try {
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    obj = new CProtocol({name: "id", rx_handler: null, type: null});
    fail("Should Throw CModuleError");
  } catch (err) {
    assertEquals(err instanceof CModuleError, true);
  }

  try {
    obj = new CProtocol({
      name: "id",
      rx_handler: (evt: CProtocolEvent<any>) => {},
      // @ts-ignore TypeScript won't let this happen, JavaScript would
      type: null
    });
    fail("Should Throw CModuleError");
  } catch (err) {
    assertEquals(err instanceof CModuleError, true);
  }

  // Ensure proper base class construct
  obj = new CProtocol({
    name: "test_id",
    rx_handler: (evt: CProtocolEvent<any>) => {},
    type: PROTOCOL_TYPE.Timer
  });
  assertEquals(obj.name(), "test_id");
  assertEquals(obj.type(), PROTOCOL_TYPE.Timer);
  assertThrows(() => obj.post_message(), CModuleError);
  assertThrows(() => obj.terminate(), CModuleError);
});

// @ts-ignore Deno object exists, but want to make sure codemelted recognized.
Deno.test("CResult Object Test", () => {
  let obj = new CResult();

  // Validate ok no data.
  assertEquals(obj.is_ok(), true);
  assertEquals(obj.is_error(), false);
  assertEquals(obj.value(), null);
  assertEquals(obj.error(), null);

  // Validate ok with data.
  obj = new CResult({value: 42});
  assertEquals(obj.is_ok(), true);
  assertEquals(obj.is_error(), false);
  assertEquals(obj.value(), 42);
  assertEquals(obj.error(), null);

  // Validate error no data.
  obj = new CResult({error: "Oh no"});
  assertEquals(obj.is_ok(), false);
  assertEquals(obj.is_error(), true);
  assertEquals(obj.value(), null);
  assertEquals(obj.error(), "Oh no");

  obj = new CResult({error: new Error("Oh no")});
  assertEquals(obj.is_ok(), false);
  assertEquals(obj.is_error(), true);
  assertEquals(obj.value(), null);
  assertEquals(obj.error() instanceof Error, true);

  // Validate invalid state
  try {
    new CResult({value: 42, error: "Oh no"});
    fail("should throw CModuleError");
  } catch (err) {
    assertEquals(err instanceof CModuleError, true);
  }
});

// ============================================================================
// [ASYNC USE CASE VALIDATION] ================================================
// ============================================================================

// @ts-ignore Deno object exists, but want to make sure codemelted recognized.
Deno.test("async_sleep() Test", async () => {
  const start = Date.now();
  await async_sleep(500);
  const end = Date.now();
  const exec_time = end - start;
  assertEquals(exec_time >= 498, true);
  try {
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    await async_sleep("duh");
    fail("Should throw CModuleError")
  } catch (err) {
    console.log("CModuleError? = ", err);
    assertEquals(err instanceof CModuleError, true);
  }
});

// @ts-ignore Deno object exists, but want to make sure codemelted recognized.
Deno.test("async_task() Test", async () => {
  let task = (data: number) => { return data + 20; };
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => async_task());
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => async_task({task: "duh"}), CModuleError);
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => async_task({task: task, delay: "duh"}), CModuleError);

  // Now lets play with our future.
  let future: CFuture<number> = async_task({task: task, data: 22, delay: 500});
  assertEquals(future.has_completed(), false);
  let result = await future.result();
  assertEquals(result.value(), 42);
  assertEquals(result.is_error(), false);
  assertEquals(result.is_ok(), true);
  assertEquals(future.has_completed(), true);

  // We are going to execute again, but cancel.
  future.execute(20);
  assertEquals(future.has_completed(), false);
  future.cancel();
  assertEquals(future.has_completed(), true);
  result = await future.result();
  assertEquals(result.is_error(), true);
  assertEquals(result.is_ok(), false);
});

// @ts-ignore Deno object exists, but want to make sure codemelted recognized.
Deno.test("async_timer() Test", async () => {
  // API Violations
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => async_timer());
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => async_timer({name: 42, interval: "", rx_handler: null}), CModuleError);
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => async_timer({name: "CTimerProtocol", interval: "", rx_handler: null}), CModuleError);
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => async_timer({name: "CTimerProtocol", interval: 250, rx_handler: null}), CModuleError);

  // Now lets see this thing work
  let counter = 0;
  let rx_handler = (_evt: CProtocolEvent<CTimerEvent>) => {
    counter += 1;
  };
  let timer_protocol = async_timer({name: "CTimerProtocol", interval: 250, rx_handler: rx_handler});
  await async_sleep(1100);
  timer_protocol.terminate();
  assertEquals(counter >= 4, true);
});

// @ts-ignore Deno object exists, but want to make sure codemelted recognized.
Deno.test("async_worker() Test", async () => {
  // API Failures
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => async_worker());
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => async_worker({name: 42, rx_handler: 42, options: 42, url: 42}), CModuleError);
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => async_worker({name: "worker_protocol", rx_handler: 42, options: 42, url: 42}), CModuleError);
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => async_worker({name: "worker_protocol", rx_handler: (evt) => {}, options: 42, url: 42}), CModuleError);
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => async_worker({name: "worker_protocol", rx_handler: (evt) => {}, url: 42}), CModuleError);

  // Now lets hook this up and demo it.
  // It will also go through a series of worker tests as part of the last
  // post

  // Setup our test conditions
  let test_post_message_rx = false;
  let test_on_message_error_rx = false;
  let test_on_error_rx = false;
  let rx_handler = (evt: CProtocolEvent<CWorkerEvent>) => {
    console.log("rx_handler evt = ", evt);
    if (evt.event_fired() === PROTOCOL_EVENT.Message) {
      test_post_message_rx = true;
      assertEquals(evt.data().as_error_event() === null, true);
      assertEquals(evt.data().as_message_event() === null, false);
    } else if (evt.event_fired() === PROTOCOL_EVENT.Error) {
      test_on_error_rx = true;
      assertEquals(evt.data().as_error_event() === null, false);
      assertEquals(evt.data().as_message_event() === null, true);
    } else if (evt.event_fired() === PROTOCOL_EVENT.MessageError) {
      test_on_message_error_rx = true;
      assertEquals(evt.data().as_error_event() === null, false);
      assertEquals(evt.data().as_message_event() === null, true);
    }
  };

  // Go do some communication.
  let worker = async_worker({
    name: "worker_protocol",
    rx_handler: rx_handler,
    url: "./worker.test.js"
  });
  await async_sleep(500);
  worker.post_message("test_post_message");
  await async_sleep(500);
  worker.post_message("test_on_error");
  await async_sleep(500);
  worker.terminate();
  await async_sleep(500);

  // See if we got our assertEqualsed messages
  assertEquals(test_post_message_rx, true);
  assertEquals(test_on_error_rx, true);
  assertEquals(test_on_message_error_rx, false);
});

// ============================================================================
// [JSON USE CASE VALIDATION] =================================================
// ============================================================================

// @ts-ignore Deno object exists, but want to make sure codemelted recognized.
Deno.test("json_atob() / json_btoa() Test", () => {
  // API violations
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => json_atob(), CModuleError);
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => json_atob(42), CModuleError);
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => json_btoa(), CModuleError);
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => json_btoa(42), CModuleError);

  // Invalid encoding / decoding, returns null
  let encoded = json_btoa("Hello 🌍");
  assertEquals(encoded, null);
  let decoded = json_atob("Hello");
  assertEquals(decoded, null);

  // Valid encoding / decoding.
  const hello = "Hello World!";
  encoded = json_btoa(hello) ?? "";
  assertEquals(encoded != hello, true);
  decoded = json_atob(encoded);
  assertEquals(decoded, hello);
});

// @ts-ignore Deno object exists, but want to make sure codemelted recognized.
Deno.test("json_check_type() Test", () => {
  // Invalid API setup
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => json_check_type());

  // Now throws because it was not an assertEqualsed type
  assertThrows(() => json_check_type({type: "string", data: 42, should_throw: true}), CModuleError);
  assertThrows(() => json_check_type({type: Uint8Array, data: 42, should_throw: true}), CModuleError);
  assertThrows(() => json_check_type({type: "function", data: () => {}, count: 2, should_throw: true}), CModuleError);

  // Now checks with no throws
  assertEquals(json_check_type({type: "string", data: 42}), false);
  assertEquals(json_check_type({type: "number", data: 42}), true);
  assertEquals(json_check_type({type: Uint8Array, data: 42}), false);
  assertEquals(json_check_type({type: Uint8Array, data: new Uint8Array()}), true);
  assertEquals(json_check_type({type: "function", data: () => {}, count: 2}), false);
  assertEquals(json_check_type({type: "function", data: (a: any, b: any) => {}, count: 2}), true);
});

// @ts-ignore Deno object exists, but want to make sure codemelted recognized.
Deno.test("json_create_array() / json_create_object() Test", () => {
  // Create empty array / objects based on no parameters or invalid ones
  let array = json_create_array();
  assertEquals(array.length, 0);
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  array = json_create_array("duh");
  assertEquals(array.length, 0);

  let obj = json_create_object();
  assertEquals(Object.keys(obj).length, 0);
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  obj = json_create_object("duh");
  assertEquals(Object.keys(obj).length, 0);

  // Now create valid copies of data
  array = json_create_array([
    "dog", 1, true, null, { id: 1 }, [1, 2, 4]
  ]);
  assertEquals(array.length, 6);
  obj = json_create_object({
    id: 1,
    name: "Awesome",
    valid: false,
    stuff: [0, 1, 2, 3],
    another_obj: { id: null},
    comment: null,
  });
  assertEquals(Object.keys(obj).length, 6);
});

// @ts-ignore Deno object exists, but want to make sure codemelted recognized.
Deno.test("json_has_key() Test", () => {
  // API violations
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => json_has_key());
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => json_has_key({obj: "duh"}), CModuleError);
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => json_has_key({obj: {}, key: 42}), CModuleError);

  // Now throws because we instruct it to
  assertThrows(() => json_has_key({obj: {}, key: "field_name", should_throw: true}), CModuleError);

  // Now valid check returns
  assertEquals(json_has_key({obj: {id: ""}, key: "field_name"}), false);
  assertEquals(json_has_key({obj: {id: ""}, key: "id"}), true);
});

// @ts-ignore Deno object exists, but want to make sure codemelted recognized.
Deno.test("json_parse() / json_stringify() Test", () => {
  // First invalid parse and stringify items
  let test_func = (a: any, b: any) => { return a + b; }
  assertEquals(json_stringify(test_func), null);
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertEquals(json_parse(test_func), null);

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
  assertEquals(json_stringify(parsed), stringified);

  stringified = json_stringify(array) ?? "";
  parsed = json_parse(stringified);
  assertEquals(json_stringify(parsed), stringified);
});

// ============================================================================
// [LOGGER USE CASE VALIDATION] ===============================================
// ============================================================================

// @ts-ignore Deno object exists, but want to make sure codemelted recognized.
Deno.test("logger_handler() Test", () => {
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => logger_handler(42), CModuleError);
  assertThrows(() => logger_handler(() => {}), CModuleError);
  try {
    logger_handler((record) => {})
    logger_handler()
  } catch (err) {
    fail("should not throw");
  }
});

// @ts-ignore Deno object exists, but want to make sure codemelted recognized.
Deno.test("logger_level() Test", () => {
  assertThrows(() => logger_level({}), CModuleError);
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => logger_level(42), CModuleError);
  assertEquals(LOGGER.Info.label === logger_level(LOGGER.Info), true);
  assertEquals(LOGGER.Debug.label === logger_level(), false);
});

// @ts-ignore Deno object exists, but want to make sure codemelted recognized.
Deno.test("logger_log() Test", () => {
  // API violation tests

  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => logger_log());
  assertThrows(() => logger_log({level: {}, data: null}), CModuleError);
  assertThrows(() => logger_log({level: LOGGER.Debug, data: null}), CModuleError);

  // Validate log levels only log events based on log settings.
  let counter = 0;
  let log_handler = (record: CLogRecord) => { counter += 1; };
  logger_handler(log_handler);
  logger_level(LOGGER.Debug);
  logger_log({level: LOGGER.Debug, data: "Debug Event"});
  logger_log({level: LOGGER.Info, data: "Info Event"});
  logger_log({level: LOGGER.Warning, data: "Warning Event"});
  logger_log({level: LOGGER.Error, data: "Error Event"});
  assertEquals(counter, 4);

  counter = 0;
  logger_level(LOGGER.Info);
  logger_log({level: LOGGER.Debug, data: "Debug Event"});
  logger_log({level: LOGGER.Info, data: "Info Event"});
  logger_log({level: LOGGER.Warning, data: "Warning Event"});
  logger_log({level: LOGGER.Error, data: "Error Event"});
  assertEquals(counter, 3);

  counter = 0;
  logger_level(LOGGER.Warning);
  logger_log({level: LOGGER.Debug, data: "Debug Event"});
  logger_log({level: LOGGER.Info, data: "Info Event"});
  logger_log({level: LOGGER.Warning, data: "Warning Event"});
  logger_log({level: LOGGER.Error, data: "Error Event"});
  assertEquals(counter, 2);

  counter = 0;
  logger_level(LOGGER.Error);
  logger_log({level: LOGGER.Debug, data: "Debug Event"});
  logger_log({level: LOGGER.Info, data: "Info Event"});
  logger_log({level: LOGGER.Warning, data: "Warning Event"});
  logger_log({level: LOGGER.Error, data: "Error Event"});
  assertEquals(counter, 1);

  counter = 0;
  logger_level(LOGGER.Off);
  logger_log({level: LOGGER.Debug, data: "Debug Event"});
  logger_log({level: LOGGER.Info, data: "Info Event"});
  logger_log({level: LOGGER.Warning, data: "Warning Event"});
  logger_log({level: LOGGER.Error, data: "Error Event"});
  assertEquals(counter, 0);

  // Confirm when no handler is attached, noting is sent forward.
  counter = 0;
  logger_handler();
  logger_level(LOGGER.Debug);
  logger_log({level: LOGGER.Debug, data: "Debug Event"});
  logger_log({level: LOGGER.Info, data: "Info Event"});
  logger_log({level: LOGGER.Warning, data: "Warning Event"});
  logger_log({level: LOGGER.Error, data: "Error Event"});
  assertEquals(counter, 0);
});

// ============================================================================
// [RUNTIME USE CASE VALIDATION] ==============================================
// ============================================================================

// @ts-ignore Deno object exists, but want to make sure codemelted recognized.
Deno.test("runtime_event() Test", () => {
  // API violations
  let handler = (evt: Event) => { };

  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => {runtime_event()});
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => {runtime_event({request: EVENT_REQUEST.Add, type: 42})}, CModuleError);
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => {runtime_event({request: EVENT_REQUEST.Add, type: "message", handler: 42})}, CModuleError);
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => {runtime_event({request: EVENT_REQUEST.Add, type: "message", handler: handler, target: 42})}, CModuleError);
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => {runtime_event({request: 42, type: "message", handler: handler})}, CModuleError);

  // Now to a valid handler
  runtime_event({request: EVENT_REQUEST.Add, type: "message", handler: handler});
  runtime_event({request: EVENT_REQUEST.Remove, type: "message", handler: handler});
});

// @ts-ignore Deno object exists, but want to make sure codemelted recognized.
Deno.test("runtime_available() Test", () => {
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => runtime_available());
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => runtime_available({request: 42}), CModuleError);
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => runtime_available({request: AVAILABILITY_REQUEST.AskRuntime, obj: 42}), CModuleError);
  // @ts-ignore TypeScript won't let this happen, JavaScript would
  assertThrows(() => runtime_available({request: AVAILABILITY_REQUEST.AskRuntime, name: 42}), CModuleError);

  // Now go perform all the queries.
  assertEquals(runtime_available({request: AVAILABILITY_REQUEST.AskRuntime, name: "Deno"}), true);
  assertEquals(runtime_available({request: AVAILABILITY_REQUEST.AskRuntime, name: "duh"}), false);
  assertEquals(runtime_available({request: AVAILABILITY_REQUEST.Audio}), false);
  assertEquals(runtime_available({request: AVAILABILITY_REQUEST.Beacon}), false);
  assertEquals(runtime_available({request: AVAILABILITY_REQUEST.Bluetooth}), false);
  assertEquals(runtime_available({request: AVAILABILITY_REQUEST.BroadcastChannel}), true);
  assertEquals(runtime_available({request: AVAILABILITY_REQUEST.Browser}), false);
  assertEquals(runtime_available({request: AVAILABILITY_REQUEST.Bun}), false);
  assertEquals(runtime_available({request: AVAILABILITY_REQUEST.Deno}), true);
  assertEquals(runtime_available({request: AVAILABILITY_REQUEST.CookieStore}), false);
  assertEquals(runtime_available({request: AVAILABILITY_REQUEST.EventSource}), true);
  assertEquals(runtime_available({request: AVAILABILITY_REQUEST.LocalStorage}), true);
  assertEquals(runtime_available({request: AVAILABILITY_REQUEST.IFrame}), false);
  assertEquals(runtime_available({request: AVAILABILITY_REQUEST.Midi}), false);
  assertEquals(runtime_available({request: AVAILABILITY_REQUEST.Node}), false);
  assertEquals(runtime_available({request: AVAILABILITY_REQUEST.Open}), false);
  assertEquals(runtime_available({request: AVAILABILITY_REQUEST.Orientation}), false);
  assertEquals(runtime_available({request: AVAILABILITY_REQUEST.Pwa}), false);
  assertEquals(runtime_available({request: AVAILABILITY_REQUEST.SecureContext}), false);
  assertEquals(runtime_available({request: AVAILABILITY_REQUEST.SerialPort}), false);
  assertEquals(runtime_available({request: AVAILABILITY_REQUEST.Share}), false);
  assertEquals(runtime_available({request: AVAILABILITY_REQUEST.TextToSpeech}), false);
  assertEquals(runtime_available({request: AVAILABILITY_REQUEST.TouchEnabled}), false);
  assertEquals(runtime_available({request: AVAILABILITY_REQUEST.Usb}), false);
  assertEquals(runtime_available({request: AVAILABILITY_REQUEST.Vibrate}), false);
  assertEquals(runtime_available({request: AVAILABILITY_REQUEST.WebRTC}), false);
  assertEquals(runtime_available({request: AVAILABILITY_REQUEST.WebSocket}), true);
  assertEquals(runtime_available({request: AVAILABILITY_REQUEST.WebTransport}), false);
  assertEquals(runtime_available({request: AVAILABILITY_REQUEST.WorkerAvailable}), true);
  assertEquals(runtime_available({request: AVAILABILITY_REQUEST.WorkerRuntime}), false);
});
