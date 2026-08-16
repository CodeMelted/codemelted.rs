/**
 * @file Bun V8 runtime tests for the codemelted JavaScript modules.
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
  QUERY_REQUEST,
  runtime_query
} from "./codemelted_core.js";

// ============================================================================
// [UNSUPPORTED MODULE IMPORTS] ===============================================
// ============================================================================

describe("UNSUPPORTED MODULE IMPORTS", async () => {
  // Setup our test function.
  const testImport = async (name: string) => {
    try {
      const module = await import(name);
      expect.fail("Should Throw CModuleError");
    } catch (err) {
      expect(err instanceof CModuleError).toBe(true);
    }
  }

  test("codemelted_db.js Test", async () => {
    await testImport("./codemelted_db.js");
  });
  test("codemelted_disk.js Test", async () => {
    await testImport("./codemelted_disk.js");
  });
  test("codemelted_hw.js Test", async () => {
    await testImport("./codemelted_hw.js");
  });
  test("codemelted_network.js Test", async () => {
    await testImport("./codemelted_network.js");
  });
  test("codemelted_storage.js Test", async () => {
    await testImport("./codemelted_storage.js");
  });
  test("codemelted_ui.js Test", async () => {
    await testImport("./codemelted_ui.js");
  });
});

// ===============================================================================
// [codemelted_core.js Validation] ===============================================
// ===============================================================================

describe("codemelted_core.js Validation", () => {
  test("API_XXX (CModuleError) Test", () => {
    try {
      throw new CModuleError("test");
    } catch (err: any) {
      expect(err.toString().length > 0).toBe(true);
    }
  });

  test("CProtocol Object Test", () => {
    // Validate failed construction
    let obj = null;
    try {
      // @ts-ignore TypeScript won't let this happen, JavaScript would
      obj = new CProtocol({name: null, rx_handler: null, type: null});
      expect.fail("Should Throw CModuleError");
    } catch (err) {
      expect(err instanceof CModuleError).toBe(true);
    }

    try {
      // @ts-ignore TypeScript won't let this happen, JavaScript would
      obj = new CProtocol({name: "id", rx_handler: null, type: null});
      expect.fail("Should Throw CModuleError");
    } catch (err) {
      expect(err instanceof CModuleError).toBe(true);
    }

    try {
      obj = new CProtocol({
        name: "id",
        rx_handler: (evt: CProtocolEvent<any>) => {},
        // @ts-ignore TypeScript won't let this happen, JavaScript would
        type: null
      });
      expect.fail("Should Throw CModuleError");
    } catch (err) {
      expect(err instanceof CModuleError).toBe(true);
    }

    // Ensure proper base class construct
    obj = new CProtocol({
      name: "test_id",
      rx_handler: (evt: CProtocolEvent<any>) => {},
      type: PROTOCOL_TYPE.Timer
    });
    expect(obj.name()).toBe("test_id");
    expect(obj.type()).toBe(PROTOCOL_TYPE.Timer);
    expect(() => obj.post_message()).toThrow<CModuleError>();
    expect(() => obj.terminate()).toThrow<CModuleError>();
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
      expect.fail("should throw CModuleError");
    } catch (err) {
      expect(err instanceof CModuleError).toBe(true);
    }
  });

  test("async_sleep() Test", async () => {
    const start = Date.now();
    await async_sleep(500);
    const end = Date.now();
    const exec_time = end - start;
    expect(exec_time >= 498).toBe(true);
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => async_sleep("duh")).toThrow<CModuleError>();
  });

  test("async_task() Test", async () => {
    let task = (data: number) => { return data + 20; };
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => async_task()).toThrow<CModuleError>();
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => async_task({task: "duh"})).toThrow<CModuleError>();
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => async_task({task: task, delay: "duh"})).toThrow<CModuleError>();

    // Now lets play with our future.
    let future: CFuture<number> = async_task({task: task, data: 22, delay: 500});
    expect(future.has_completed()).toBe(false);
    let result = await future.result();
    expect(result.value()).toBe(42);
    expect(result.is_error()).toBe(false);
    expect(result.is_ok()).toBe(true);
    expect(future.has_completed()).toBe(true);

    // We are going to execute again, but cancel.
    future.execute(20);
    expect(future.has_completed()).toBe(false);
    future.cancel();
    expect(future.has_completed()).toBe(true);
    result = await future.result();
    expect(result.is_error()).toBe(true);
    expect(result.is_ok()).toBe(false);
  });

  test("async_timer() Test", async () => {
    // API Violations
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => async_timer()).toThrow<CModuleError>();
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => async_timer({name: 42, interval: "", rx_handler: null}));
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => async_timer({name: "CTimerProtocol", interval: "", rx_handler: null}));
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => async_timer({name: "CTimerProtocol", interval: 250, rx_handler: null}));

    // Now lets see this thing work
    let counter = 0;
    let rx_handler = (_evt: CProtocolEvent<CTimerEvent>) => {
      counter += 1;
    };
    let timer_protocol = async_timer({name: "CTimerProtocol", interval: 250, rx_handler: rx_handler});
    await async_sleep(1100);
    timer_protocol.terminate();
    expect(counter >= 4).toBe(true);
  });

  test("async_worker() Test", async () => {
    // API Failures
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => async_worker()).toThrow<CModuleError>();
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => async_worker({name: 42, rx_handler: 42, options: 42, url: 42})).toThrow<CModuleError>();
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => async_worker({name: "worker_protocol", rx_handler: 42, options: 42, url: 42})).toThrow<CModuleError>();
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => async_worker({name: "worker_protocol", rx_handler: (evt) => {}, options: 42, url: 42})).toThrow<CModuleError>();
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => async_worker({name: "worker_protocol", rx_handler: (evt) => {}, url: 42})).toThrow<CModuleError>();

    // Now lets hook this up and demo it.
    // It will also go through a series of worker tests as part of the last
    // post

    // Setup our test conditions
    let test_post_message_rx = false;
    let test_on_message_error_rx = false;
    let test_on_error_rx = false;
    let rx_handler = (evt: CProtocolEvent<CWorkerEvent>) => {
      if (evt.event_fired() === PROTOCOL_EVENT.Message) {
        test_post_message_rx = true;
        expect(evt.data().as_error_event() === null).toBe(true);
        expect(evt.data().as_message_event() === null).toBe(false);
      } else if (evt.event_fired() === PROTOCOL_EVENT.Error) {
        test_on_error_rx = true;
        expect(evt.data().as_error_event() === null).toBe(false);
        expect(evt.data().as_message_event() === null).toBe(true);
      } else if (evt.event_fired() === PROTOCOL_EVENT.MessageError) {
        test_on_message_error_rx = true;
        expect(evt.data().as_error_event() === null).toBe(false);
        expect(evt.data().as_message_event() === null).toBe(true);
      }
    };

    // Go do some communication.
    let worker = async_worker({
      name: "worker_protocol",
      rx_handler: rx_handler,
      url: "./worker.test.js"
    });
    worker.post_message("test_post_message");
    await async_sleep(100);
    worker.post_message("test_on_error");
    await async_sleep(100);
    worker.terminate();
    await async_sleep(100);

    // See if we got our expected messages
    expect(test_post_message_rx).toBe(true);
    expect(test_on_error_rx).toBe(true);
    expect(test_on_message_error_rx).toBe(false);
  });

  test("json_atob() / json_btoa() Test", () => {
    // API violations
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => json_atob()).toThrow<CModuleError>();
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => json_atob(42)).toThrow<CModuleError>();
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => json_btoa()).toThrow<CModuleError>();
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => json_btoa(42)).toThrow<CModuleError>();

    // Invalid encoding / decoding, returns null
    let encoded = json_btoa("Hello 🌍");
    expect(encoded).toBe(null);
    let decoded = json_atob("Hello");
    expect(decoded).toBe(null);

    // Valid encoding / decoding.
    const hello = "Hello World!";
    encoded = json_btoa(hello) ?? "";
    expect(encoded != hello).toBe(true);
    decoded = json_atob(encoded);
    expect(decoded).toBe(hello);
  });

  test("json_check_type() Test", () => {
    // Invalid API setup
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => json_check_type()).toThrow<CModuleError>();

    // Now throws because it was not an expected type
    expect(() => json_check_type({type: "string", data: 42, should_throw: true})).toThrow<CModuleError>();
    expect(() => json_check_type({type: Uint8Array, data: 42, should_throw: true})).toThrow<CModuleError>();
    expect(() => json_check_type({type: "function", data: () => {}, count: 2, should_throw: true})).toThrow<CModuleError>();

    // Now checks with no throws
    expect(json_check_type({type: "string", data: 42})).toBe(false);
    expect(json_check_type({type: "number", data: 42})).toBe(true);
    expect(json_check_type({type: Uint8Array, data: 42})).toBe(false);
    expect(json_check_type({type: Uint8Array, data: new Uint8Array()})).toBe(true);
    expect(json_check_type({type: "function", data: () => {}, count: 2})).toBe(false);
    expect(json_check_type({type: "function", data: (a: any, b: any) => {}, count: 2})).toBe(true);
  });

  test("json_create_array() / json_create_object() Test", () => {
    // Create empty array / objects based on no parameters or invalid ones
    let array = json_create_array();
    expect(array.length).toBe(0);
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    array = json_create_array("duh");
    expect(array.length).toBe(0);

    let obj = json_create_object();
    expect(Object.keys(obj).length).toBe(0);
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    obj = json_create_object("duh");
    expect(Object.keys(obj).length).toBe(0);

    // Now create valid copies of data
    array = json_create_array([
      "dog", 1, true, null, { id: 1 }, [1, 2, 4]
    ]);
    expect(array.length).toBe(6);
    obj = json_create_object({
      id: 1,
      name: "Awesome",
      valid: false,
      stuff: [0, 1, 2, 3],
      another_obj: { id: null},
      comment: null,
    });
    expect(Object.keys(obj).length).toBe(6);
  });

  test("json_has_key() Test", () => {
    // API violations
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => json_has_key()).toThrow<CModuleError>();
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => json_has_key({obj: "duh"})).toThrow<CModuleError>();
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => json_has_key({obj: {}, key: 42})).toThrow<CModuleError>();

    // Now throws because we instruct it to
    expect(() => json_has_key({obj: {}, key: "field_name", should_throw: true})).toThrow<CModuleError>();

    // Now valid check returns
    expect(json_has_key({obj: {id: ""}, key: "field_name"})).toBe(false);
    expect(json_has_key({obj: {id: ""}, key: "id"})).toBe(true);
  });

  test("json_parse() / json_stringify() Test", () => {
    // First invalid parse and stringify items
    let test_func = (a: any, b: any) => { return a + b; }
    expect(json_stringify(test_func)).toBe(null);
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(json_parse(test_func)).toBe(null);

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
    expect(json_stringify(parsed)).toBe(stringified);

    stringified = json_stringify(array) ?? "";
    parsed = json_parse(stringified);
    expect(json_stringify(parsed)).toBe(stringified);
  });

  test("logger_handler() Test", () => {
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => logger_handler(42)).toThrow<CModuleError>();
    expect(() => logger_handler(() => {})).toThrow<CModuleError>();
    expect(() => logger_handler((record) => {})).not.toThrow();
    expect(() => logger_handler()).not.toThrow();
  });

  test("logger_level() Test", () => {
    expect(() => logger_level({})).toThrow<CModuleError>();
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => logger_level(42)).toThrow<CModuleError>();
    expect(LOGGER.Info.label === logger_level(LOGGER.Info)).toBe(true);
    expect(LOGGER.Debug.label === logger_level()).toBe(false);
  });

  test("logger_log() Test", () => {
    // API violation tests

    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => logger_log()).toThrow<CModuleError>();
    expect(() => logger_log({level: {}, data: null})).toThrow<CModuleError>();
    expect(() => logger_log({level: LOGGER.Debug, data: null})).toThrow<CModuleError>();

    // Validate log levels only log events based on log settings.
    let counter = 0;
    let log_handler = (record: CLogRecord) => { counter += 1; };
    logger_handler(log_handler);
    logger_level(LOGGER.Debug);
    logger_log({level: LOGGER.Debug, data: "Debug Event"});
    logger_log({level: LOGGER.Info, data: "Info Event"});
    logger_log({level: LOGGER.Warning, data: "Warning Event"});
    logger_log({level: LOGGER.Error, data: "Error Event"});
    expect(counter).toBe(4);

    counter = 0;
    logger_level(LOGGER.Info);
    logger_log({level: LOGGER.Debug, data: "Debug Event"});
    logger_log({level: LOGGER.Info, data: "Info Event"});
    logger_log({level: LOGGER.Warning, data: "Warning Event"});
    logger_log({level: LOGGER.Error, data: "Error Event"});
    expect(counter).toBe(3);

    counter = 0;
    logger_level(LOGGER.Warning);
    logger_log({level: LOGGER.Debug, data: "Debug Event"});
    logger_log({level: LOGGER.Info, data: "Info Event"});
    logger_log({level: LOGGER.Warning, data: "Warning Event"});
    logger_log({level: LOGGER.Error, data: "Error Event"});
    expect(counter).toBe(2);

    counter = 0;
    logger_level(LOGGER.Error);
    logger_log({level: LOGGER.Debug, data: "Debug Event"});
    logger_log({level: LOGGER.Info, data: "Info Event"});
    logger_log({level: LOGGER.Warning, data: "Warning Event"});
    logger_log({level: LOGGER.Error, data: "Error Event"});
    expect(counter).toBe(1);

    counter = 0;
    logger_level(LOGGER.Off);
    logger_log({level: LOGGER.Debug, data: "Debug Event"});
    logger_log({level: LOGGER.Info, data: "Info Event"});
    logger_log({level: LOGGER.Warning, data: "Warning Event"});
    logger_log({level: LOGGER.Error, data: "Error Event"});
    expect(counter).toBe(0);

    // Confirm when no handler is attached, noting is sent forward.
    counter = 0;
    logger_handler();
    logger_level(LOGGER.Debug);
    logger_log({level: LOGGER.Debug, data: "Debug Event"});
    logger_log({level: LOGGER.Info, data: "Info Event"});
    logger_log({level: LOGGER.Warning, data: "Warning Event"});
    logger_log({level: LOGGER.Error, data: "Error Event"});
    expect(counter).toBe(0);
  });

  test.skip("npu_compute() Test", () => {
    // TBD
  });

  test.skip("npu_math() Test", () => {
    // TBD
  });

  test("runtime_event() Test", () => {
    // API violations
    let handler = (evt: Event) => { };

    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => {runtime_event()}).toThrow<CModuleError>();
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => {runtime_event({request: EVENT_REQUEST.Add, type: 42})}).toThrow<CModuleError>();
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => {runtime_event({request: EVENT_REQUEST.Add, type: "message", handler: 42})}).toThrow<CModuleError>();
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => {runtime_event({request: EVENT_REQUEST.Add, type: "message", handler: handler, target: 42})}).toThrow<CModuleError>();
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => {runtime_event({request: 42, type: "message", handler: handler})}).toThrow<CModuleError>();

    // Now to a valid handler
    runtime_event({request: EVENT_REQUEST.Add, type: "message", handler: handler});
    runtime_event({request: EVENT_REQUEST.Remove, type: "message", handler: handler});
  });

  test("runtime_query() Test", () => {
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => runtime_query()).toThrow<CModuleError>();
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => runtime_query({request: 42})).toThrow<CModuleError>();
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => runtime_query({request: QUERY_REQUEST.AskRuntime, obj: 42})).toThrow<CModuleError>();
    // @ts-ignore TypeScript won't let this happen, JavaScript would
    expect(() => runtime_query({request: QUERY_REQUEST.AskRuntime, name: 42})).toThrow<CModuleError>();

    // Now go perform all the queries.
    expect(runtime_query({request: QUERY_REQUEST.AskRuntime, name: "Bun"})).toBe(true);
    expect(runtime_query({request: QUERY_REQUEST.AskRuntime, name: "duh"})).toBe(false);
    expect(runtime_query({request: QUERY_REQUEST.AvailableHeight})).toBe(-1);
    expect(runtime_query({request: QUERY_REQUEST.AvailableWidth})).toBe(-1);
    expect(runtime_query({request: QUERY_REQUEST.ColorDepth})).toBe(-1);
    expect(runtime_query({request: QUERY_REQUEST.ColorDepth})).toBe(-1);
    expect(runtime_query({request: QUERY_REQUEST.CssVariable, name: "var"})).toBe("");
    expect(runtime_query({request: QUERY_REQUEST.DevicePixelRatio})).toBe(-1);
    expect(runtime_query({request: QUERY_REQUEST.ElementById, name: "id"})).toBe(null);
    expect(runtime_query({request: QUERY_REQUEST.ElementsByClassName, name: "class"})).toBe(null);
    expect(runtime_query({request: QUERY_REQUEST.ElementsByTagName, name: "tag"})).toBe(null);
    expect(runtime_query({request: QUERY_REQUEST.Environment, name: "q"})).toBe(null);
    expect(runtime_query({request: QUERY_REQUEST.Height})).toBe(-1);
    expect(runtime_query({request: QUERY_REQUEST.Hostname})).toBe("UNKNOWN");
    expect(runtime_query({request: QUERY_REQUEST.InnerHeight})).toBe(-1);
    expect(runtime_query({request: QUERY_REQUEST.InnerWidth})).toBe(-1);
    expect(runtime_query({request: QUERY_REQUEST.IsAudio})).toBe(false);
    expect(runtime_query({request: QUERY_REQUEST.IsBeacon})).toBe(false);
    expect(runtime_query({request: QUERY_REQUEST.IsBluetooth})).toBe(false);
    expect(runtime_query({request: QUERY_REQUEST.IsBroadcastChannel})).toBe(true);
    expect(runtime_query({request: QUERY_REQUEST.IsBrowser})).toBe(false);
    expect(runtime_query({request: QUERY_REQUEST.IsBun})).toBe(true);
    expect(runtime_query({request: QUERY_REQUEST.IsDeno})).toBe(false);
    expect(runtime_query({request: QUERY_REQUEST.IsCookieStore})).toBe(false);
    expect(runtime_query({request: QUERY_REQUEST.IsEventSource})).toBe(false);
    expect(runtime_query({request: QUERY_REQUEST.IsLocalStorage})).toBe(false);
    expect(runtime_query({request: QUERY_REQUEST.IsIFrame})).toBe(false);
    expect(runtime_query({request: QUERY_REQUEST.IsMidi})).toBe(false);
    expect(runtime_query({request: QUERY_REQUEST.IsNode})).toBe(false);
    expect(runtime_query({request: QUERY_REQUEST.IsOpen})).toBe(false);
    expect(runtime_query({request: QUERY_REQUEST.IsOrientation})).toBe(false);
    expect(runtime_query({request: QUERY_REQUEST.IsPwa})).toBe(false);
    expect(runtime_query({request: QUERY_REQUEST.IsSecureContext})).toBe(false);
    expect(runtime_query({request: QUERY_REQUEST.IsSerialPort})).toBe(false);
    expect(runtime_query({request: QUERY_REQUEST.IsShare})).toBe(false);
    expect(runtime_query({request: QUERY_REQUEST.IsTextToSpeech})).toBe(false);
    expect(runtime_query({request: QUERY_REQUEST.IsTouchEnabled})).toBe(false);
    expect(runtime_query({request: QUERY_REQUEST.IsUsb})).toBe(false);
    expect(runtime_query({request: QUERY_REQUEST.IsWorkerAvailable})).toBe(true);
    expect(runtime_query({request: QUERY_REQUEST.IsWorkerRuntime})).toBe(false);
    expect(runtime_query({request: QUERY_REQUEST.Name})).toBe("bun");
    expect(runtime_query({request: QUERY_REQUEST.Online})).toBe(false);
    expect(runtime_query({request: QUERY_REQUEST.OuterHeight})).toBe(-1);
    expect(runtime_query({request: QUERY_REQUEST.OuterWidth})).toBe(-1);
    expect(runtime_query({request: QUERY_REQUEST.PixelDepth})).toBe(-1);
    expect(runtime_query({request: QUERY_REQUEST.ScreenLeft})).toBe(-1);
    expect(runtime_query({request: QUERY_REQUEST.ScreenOrientationAngle})).toBe(-1);
    expect(runtime_query({request: QUERY_REQUEST.ScreenOrientationType})).toBe("UNKNOWN");
    expect(runtime_query({request: QUERY_REQUEST.ScreenTop})).toBe(-1);
    expect(runtime_query({request: QUERY_REQUEST.ScreenX})).toBe(-1);
    expect(runtime_query({request: QUERY_REQUEST.ScreenY})).toBe(-1);
    expect(runtime_query({request: QUERY_REQUEST.ScrollX})).toBe(-1);
    expect(runtime_query({request: QUERY_REQUEST.ScrollY})).toBe(-1);
    expect(runtime_query({request: QUERY_REQUEST.Width})).toBe(-1);
  });
});
