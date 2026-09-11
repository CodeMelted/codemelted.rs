/**
 * @file Node V8 runtime tests for the codemelted JavaScript modules.
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
  AVAILABILITY_REQUEST,
  runtime_available
} from "./codemelted.js";

// ============================================================================
// [UNSUPPORTED MODULE IMPORTS] ===============================================
// ============================================================================

describe("CORE MODULE VALIDATION", () => {
  test("CModuleError Test", () => {
    try {
      throw new CModuleError("test");
    } catch (err) {
      assert.equal(err.toString().length > 0, true);
    }
  });

  test("CProtocol Object Test", () => {
    // Validate failed construction
    let obj = null;
    try {
      // @ts-ignore TypeScript won't let this happen, JavaScript would
      obj = new CProtocol({name: null, rx_handler: null, type: null});
      assert.fail("Should Throw CModuleError");
    } catch (err) {
      assert.equal(err instanceof CModuleError, true);
    }

    try {
      // @ts-ignore TypeScript won't let this happen, JavaScript would
      obj = new CProtocol({name: "id", rx_handler: null, type: null});
      assert.fail("Should Throw CModuleError");
    } catch (err) {
      assert.equal(err instanceof CModuleError, true);
    }

    try {
      obj = new CProtocol({
        name: "id",
        rx_handler: (evt) => {},
        type: null
      });
      assert.fail("Should Throw CModuleError");
    } catch (err) {
      assert.equal(err instanceof CModuleError, true);
    }

    // Ensure proper base class construct
    obj = new CProtocol({
      name: "test_id",
      rx_handler: (evt) => {},
      type: PROTOCOL_TYPE.Timer
    });
    assert.equal(obj.name(), "test_id");
    assert.equal(obj.type(), PROTOCOL_TYPE.Timer);
    assert.throws(() => obj.post_message(), CModuleError);
    assert.throws(() => obj.terminate(), CModuleError);
  });

  test("CResult Object Test", () => {
    let obj = new CResult();

    // Validate ok no data.
    assert.equal(obj.is_ok(), true);
    assert.equal(obj.is_error(), false);
    assert.equal(obj.value(), null);
    assert.equal(obj.error(), null);

    // Validate ok with data.
    obj = new CResult({value: 42});
    assert.equal(obj.is_ok(), true);
    assert.equal(obj.is_error(), false);
    assert.equal(obj.value(), 42);
    assert.equal(obj.error(), null);

    // Validate error no data.
    obj = new CResult({error: "Oh no"});
    assert.equal(obj.is_ok(), false);
    assert.equal(obj.is_error(), true);
    assert.equal(obj.value(), null);
    assert.equal(obj.error(), "Oh no");

    obj = new CResult({error: new Error("Oh no")});
    assert.equal(obj.is_ok(), false);
    assert.equal(obj.is_error(), true);
    assert.equal(obj.value(), null);
    assert.equal(obj.error() instanceof Error, true);

    // Validate invalid state
    try {
      new CResult({value: 42, error: "Oh no"});
      assert.fail("should throw CModuleError");
    } catch (err) {
      assert.equal(err instanceof CModuleError, true);
    }
  });
});

// ============================================================================
// [ASYNC USE CASE VALIDATION] ================================================
// ============================================================================

describe("ASYNC USE CASE VALIDATION", () => {
  test("async_sleep() Test", async () => {
    const start = Date.now();
    await async_sleep(500);
    const end = Date.now();
    const exec_time = end - start;
    assert.equal(exec_time >= 498, true);
    try {
      await async_sleep("duh");
      assert.fail("should throw");
    } catch (err) {
      assert.equal(err instanceof CModuleError, true);
    }
  });

  test("async_task() Test", async () => {
    let task = (data) => { return data + 20; };
    assert.throws(() => async_task());
    assert.throws(() => async_task({task: "duh"}), CModuleError);
    assert.throws(() => async_task({task: task, delay: "duh"}), CModuleError);

    // Now lets play with our future.
    let future = async_task({task: task, data: 22, delay: 500});
    assert.equal(future.has_completed(), false);
    let result = await future.result();
    assert.equal(result.value(), 42);
    assert.equal(result.is_error(), false);
    assert.equal(result.is_ok(), true);
    assert.equal(future.has_completed(), true);

    // We are going to execute again, but cancel.
    future.execute(20);
    assert.equal(future.has_completed(), false);
    future.cancel();
    assert.equal(future.has_completed(), true);
    result = await future.result();
    assert.equal(result.is_error(), true);
    assert.equal(result.is_ok(), false);
  });

  test("async_timer() Test", async () => {
    // API Violations
    assert.throws(() => async_timer());
    assert.throws(() => async_timer({name: 42, interval: "", rx_handler: null}), CModuleError);
    assert.throws(() => async_timer({name: "CTimerProtocol", interval: "", rx_handler: null}), CModuleError);
    assert.throws(() => async_timer({name: "CTimerProtocol", interval: 250, rx_handler: null}), CModuleError);

    // Now lets see this thing work
    let counter = 0;
    let rx_handler = (evt) => {
      counter += 1;
    };
    let timer_protocol = async_timer({name: "CTimerProtocol", interval: 250, rx_handler: rx_handler});
    await async_sleep(1100);
    timer_protocol.terminate();
    assert.equal(counter >= 4, true);
  });

  test("async_worker() Test", async () => {
    // API Failures
    assert.throws(() => async_worker());
    assert.throws(() => async_worker({name: 42, rx_handler: 42, options: 42, url: 42}), CModuleError);
    assert.throws(() => async_worker({name: "worker_protocol", rx_handler: 42, options: 42, url: 42}), CModuleError);
    assert.throws(() => async_worker({name: "worker_protocol", rx_handler: (evt) => {}, options: 42, url: 42}), CModuleError);
    assert.throws(() => async_worker({name: "worker_protocol", rx_handler: (evt) => {}, url: 42}), CModuleError);

    // Now lets hook this up and demo it.
    // It will also go through a series of worker tests as part of the last
    // post

    // Setup our test conditions
    let test_post_message_rx = false;
    let test_on_message_error_rx = false;
    let test_on_error_rx = false;
    let rx_handler = (evt) => {
      if (evt.event_fired() === PROTOCOL_EVENT.Message) {
        test_post_message_rx = true;
        assert.equal(evt.data().as_error_event() === null, true);
        assert.equal(evt.data().as_message_event() === null, false);
      } else if (evt.event_fired() === PROTOCOL_EVENT.Error) {
        test_on_error_rx = true;
        assert.equal(evt.data().as_error_event() === null, false);
        assert.equal(evt.data().as_message_event() === null, true);
      } else if (evt.event_fired() === PROTOCOL_EVENT.MessageError) {
        test_on_message_error_rx = true;
        assert.equal(evt.data().as_error_event() === null, false);
        assert.equal(evt.data().as_message_event() === null, true);
      }
    };

    // Go do some communication.
    try {
      let worker = async_worker({
        name: "worker_protocol",
        rx_handler: rx_handler,
        url: "./worker.test.js"
      });
      assert.fail("Should throw, Worker not supported on node");
    } catch (err) {
      assert.equal(err instanceof CModuleError, true);
    }
  });
});

// ============================================================================
// [JSON USE CASE VALIDATION] =================================================
// ============================================================================

describe("JSON USE CASE VALIDATION", () => {
  test("json_atob() / json_btoa() Test", () => {
    // API violations
    assert.throws(() => json_atob(), CModuleError);
    assert.throws(() => json_atob(42), CModuleError);
    assert.throws(() => json_btoa(), CModuleError);
    assert.throws(() => json_btoa(42), CModuleError);

    // Invalid encoding / decoding, returns null
    let encoded = json_btoa("Hello 🌍");
    assert.equal(encoded, null);
    let decoded = json_atob("Hello");
    assert.equal(decoded, null);

    // Valid encoding / decoding.
    const hello = "Hello World!";
    encoded = json_btoa(hello) ?? "";
    assert.equal(encoded != hello, true);
    decoded = json_atob(encoded);
    assert.equal(decoded, hello);
  });

  test("json_check_type() Test", () => {
    // Invalid API setup
    assert.throws(() => json_check_type());

    // Now throws because it was not an expected type
    assert.throws(() => json_check_type({type: "string", data: 42, should_throw: true}), CModuleError);
    assert.throws(() => json_check_type({type: Uint8Array, data: 42, should_throw: true}), CModuleError);
    assert.throws(() => json_check_type({type: "function", data: () => {}, count: 2, should_throw: true}), CModuleError);

    // Now checks with no throws
    assert.equal(json_check_type({type: "string", data: 42}), false);
    assert.equal(json_check_type({type: "number", data: 42}), true);
    assert.equal(json_check_type({type: Uint8Array, data: 42}), false);
    assert.equal(json_check_type({type: Uint8Array, data: new Uint8Array()}), true);
    assert.equal(json_check_type({type: "function", data: () => {}, count: 2}), false);
    assert.equal(json_check_type({type: "function", data: (a, b) => {}, count: 2}), true);
  });

  test("json_create_array() / json_create_object() Test", () => {
    // Create empty array / objects based on no parameters or invalid ones
    let array = json_create_array();
    assert.equal(array.length, 0);
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    array = json_create_array("duh");
    assert.equal(array.length, 0);

    let obj = json_create_object();
    assert.equal(Object.keys(obj).length, 0);
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    obj = json_create_object("duh");
    assert.equal(Object.keys(obj).length, 0);

    // Now create valid copies of data
    array = json_create_array([
      "dog", 1, true, null, { id: 1 }, [1, 2, 4]
    ]);
    assert.equal(array.length, 6);
    obj = json_create_object({
      id: 1,
      name: "Awesome",
      valid: false,
      stuff: [0, 1, 2, 3],
      another_obj: { id: null},
      comment: null,
    });
    assert.equal(Object.keys(obj).length, 6);
  });

  test("json_has_key() Test", () => {
    // API violations
    assert.throws(() => json_has_key());
    assert.throws(() => json_has_key({obj: "duh"}), CModuleError);
    assert.throws(() => json_has_key({obj: {}, key: 42}), CModuleError);

    // Now throws because we instruct it to
    assert.throws(() => json_has_key({obj: {}, key: "field_name", should_throw: true}), CModuleError);

    // Now valid check returns
    assert.equal(json_has_key({obj: {id: ""}, key: "field_name"}), false);
    assert.equal(json_has_key({obj: {id: ""}, key: "id"}), true);
  });

  test("json_parse() / json_stringify() Test", () => {
    // First invalid parse and stringify items
    let test_func = (a, b) => { return a + b; }
    assert.equal(json_stringify(test_func), null);
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    assert.equal(json_parse(test_func), null);

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
    assert.equal(json_stringify(parsed), stringified);

    stringified = json_stringify(array) ?? "";
    parsed = json_parse(stringified);
    assert.equal(json_stringify(parsed), stringified);
  });
});

// ============================================================================
// [LOGGER USE CASE VALIDATION] ===============================================
// ============================================================================

describe("LOGGER USE CASE VALIDATION", () => {
  test("logger_handler() Test", () => {
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    assert.throws(() => logger_handler(42), CModuleError);
    assert.throws(() => logger_handler(() => {}), CModuleError);

    try {
      logger_handler((record) => {});
      logger_handler();
    } catch (err) {
      assert.fail("Should not throw");
    }
  });

  test("logger_level() Test", () => {
    assert.throws(() => logger_level({}), CModuleError);
    assert.throws(() => logger_level(42), CModuleError);
    assert.equal(LOGGER.Info.label === logger_level(LOGGER.Info), true);
    assert.equal(LOGGER.Debug.label === logger_level(), false);
  });

  test("logger_log() Test", () => {
    // API violation tests
    assert.throws(() => logger_log());
    assert.throws(() => logger_log({level: {}, data: null}), CModuleError);
    assert.throws(() => logger_log({level: LOGGER.Debug, data: null}), CModuleError);

    // Validate log levels only log events based on log settings.
    let counter = 0;
    let log_handler = (record) => { counter += 1; };
    logger_handler(log_handler);
    logger_level(LOGGER.Debug);
    logger_log({level: LOGGER.Debug, data: "Debug Event"});
    logger_log({level: LOGGER.Info, data: "Info Event"});
    logger_log({level: LOGGER.Warning, data: "Warning Event"});
    logger_log({level: LOGGER.Error, data: "Error Event"});
    assert.equal(counter, 4);

    counter = 0;
    logger_level(LOGGER.Info);
    logger_log({level: LOGGER.Debug, data: "Debug Event"});
    logger_log({level: LOGGER.Info, data: "Info Event"});
    logger_log({level: LOGGER.Warning, data: "Warning Event"});
    logger_log({level: LOGGER.Error, data: "Error Event"});
    assert.equal(counter, 3);

    counter = 0;
    logger_level(LOGGER.Warning);
    logger_log({level: LOGGER.Debug, data: "Debug Event"});
    logger_log({level: LOGGER.Info, data: "Info Event"});
    logger_log({level: LOGGER.Warning, data: "Warning Event"});
    logger_log({level: LOGGER.Error, data: "Error Event"});
    assert.equal(counter, 2);

    counter = 0;
    logger_level(LOGGER.Error);
    logger_log({level: LOGGER.Debug, data: "Debug Event"});
    logger_log({level: LOGGER.Info, data: "Info Event"});
    logger_log({level: LOGGER.Warning, data: "Warning Event"});
    logger_log({level: LOGGER.Error, data: "Error Event"});
    assert.equal(counter, 1);

    counter = 0;
    logger_level(LOGGER.Off);
    logger_log({level: LOGGER.Debug, data: "Debug Event"});
    logger_log({level: LOGGER.Info, data: "Info Event"});
    logger_log({level: LOGGER.Warning, data: "Warning Event"});
    logger_log({level: LOGGER.Error, data: "Error Event"});
    assert.equal(counter, 0);

    // Confirm when no handler is attached, noting is sent forward.
    counter = 0;
    logger_handler();
    logger_level(LOGGER.Debug);
    logger_log({level: LOGGER.Debug, data: "Debug Event"});
    logger_log({level: LOGGER.Info, data: "Info Event"});
    logger_log({level: LOGGER.Warning, data: "Warning Event"});
    logger_log({level: LOGGER.Error, data: "Error Event"});
    assert.equal(counter, 0);
  });
});

// ============================================================================
// [RUNTIME USE CASE VALIDATION] ==============================================
// ============================================================================

describe("RUNTIME USE CASE VALIDATION", () => {
  test("runtime_event() Test", () => {
    // API violations
    let handler = (evt) => { };
    assert.throws(() => {runtime_event()});
    assert.throws(() => {runtime_event({request: EVENT_REQUEST.Add, type: 42})}, CModuleError);
    assert.throws(() => {runtime_event({request: EVENT_REQUEST.Add, type: "message", handler: 42})}, CModuleError);
    assert.throws(() => {runtime_event({request: EVENT_REQUEST.Add, type: "message", handler: handler, target: 42})}, CModuleError);
    assert.throws(() => {runtime_event({request: 42, type: "message", handler: handler})}, CModuleError);

    // Now to a valid handler
    try {
      runtime_event({request: EVENT_REQUEST.Add, type: "message", handler: handler});
      assert.fail("Should throw, unsupported on globalThis");
    } catch (err) {
      assert.equal(err instanceof CModuleError, true);
    }
  });

  test("runtime_available() Test", () => {
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    assert.throws(() => runtime_available());
    assert.throws(() => runtime_available({request: 42}), CModuleError);
    assert.throws(() => runtime_available({request: AVAILABILITY_REQUEST.AskRuntime, obj: 42}), CModuleError);
    assert.throws(() => runtime_available({request: AVAILABILITY_REQUEST.AskRuntime, name: 42}), CModuleError);

    // Now go perform all the queries.
    assert.equal(runtime_available({request: AVAILABILITY_REQUEST.Audio}), false);
    assert.equal(runtime_available({request: AVAILABILITY_REQUEST.Beacon}), false);
    assert.equal(runtime_available({request: AVAILABILITY_REQUEST.Bluetooth}), false);
    assert.equal(runtime_available({request: AVAILABILITY_REQUEST.BroadcastChannel}), true);
    assert.equal(runtime_available({request: AVAILABILITY_REQUEST.Browser}), false);
    assert.equal(runtime_available({request: AVAILABILITY_REQUEST.Bun}), false);
    assert.equal(runtime_available({request: AVAILABILITY_REQUEST.Deno}), false);
    assert.equal(runtime_available({request: AVAILABILITY_REQUEST.CookieStore}), false);
    assert.equal(runtime_available({request: AVAILABILITY_REQUEST.EventSource}), false);
    assert.equal(runtime_available({request: AVAILABILITY_REQUEST.LocalStorage}), true);
    assert.equal(runtime_available({request: AVAILABILITY_REQUEST.IFrame}), false);
    assert.equal(runtime_available({request: AVAILABILITY_REQUEST.Midi}), false);
    assert.equal(runtime_available({request: AVAILABILITY_REQUEST.Node}), true);
    assert.equal(runtime_available({request: AVAILABILITY_REQUEST.Open}), false);
    assert.equal(runtime_available({request: AVAILABILITY_REQUEST.Orientation}), false);
    assert.equal(runtime_available({request: AVAILABILITY_REQUEST.Pwa}), false);
    assert.equal(runtime_available({request: AVAILABILITY_REQUEST.SecureContext}), false);
    assert.equal(runtime_available({request: AVAILABILITY_REQUEST.SerialPort}), false);
    assert.equal(runtime_available({request: AVAILABILITY_REQUEST.SessionStorage}), true);
    assert.equal(runtime_available({request: AVAILABILITY_REQUEST.Share}), false);
    assert.equal(runtime_available({request: AVAILABILITY_REQUEST.TextToSpeech}), false);
    assert.equal(runtime_available({request: AVAILABILITY_REQUEST.TouchEnabled}), false);
    assert.equal(runtime_available({request: AVAILABILITY_REQUEST.Usb}), false);
    assert.equal(runtime_available({request: AVAILABILITY_REQUEST.Vibrate}), false);
    assert.equal(runtime_available({request: AVAILABILITY_REQUEST.WebRTC}), false);
    assert.equal(runtime_available({request: AVAILABILITY_REQUEST.WebSocket}), true);
    assert.equal(runtime_available({request: AVAILABILITY_REQUEST.WebTransport}), false);
    assert.equal(runtime_available({request: AVAILABILITY_REQUEST.WorkerAvailable}), false);
    assert.equal(runtime_available({request: AVAILABILITY_REQUEST.WorkerRuntime}), false);
  });
});
