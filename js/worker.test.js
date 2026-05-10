/**
 * @file Web Worker runtime tests for the <code>codemelted.js</code> module.
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
  // MODULE SYNTAX ERRORS
  CModuleError,
  // MODULE TYPEDEFS
  DEFINED_REQUEST,
  EVENT_REQUEST,
  LOGGER,
  MATH_FORMULA,
  STORAGE_TYPE,
  PROTOCOL_STATE,
  PROTOCOL_TYPE,
  // MODULE PROTOCOL CLASSES
  CProtocol,
  CTimerProtocol,
  // MODULE CLASSES
  CLogRecord,
  CResult,
  CFuture,
  // ASYNC I/O UC FUNCTIONS
  async_sleep,
  async_task,
  async_timer,
  // JSON UC FUNCTIONS
  json_atob,
  json_btoa,
  json_check_type,
  json_create_array,
  json_create_object,
  json_has_key,
  json_parse,
  json_stringify,
  json_valid_url,
  // LOGGER UC FUNCTIONS
  logger_handler,
  logger_level,
  logger_log,
  // NPU UC FUNCTIONS
  npu_compute,
  npu_math,
  // RUNTIME UC FUNCTIONS
  runtime_cpu_count,
  runtime_defined,
  runtime_environment,
  runtime_event,
  runtime_hostname,
  runtime_name,
  runtime_online,
  // STORAGE UC FUNCTIONS
  storage_clear,
  storage_get,
  storage_key,
  storage_length,
  storage_remove,
  storage_set,
} from "./codemelted.js";


// ============================================================================
// [SETUP HANDLERS] ===========================================================
// ============================================================================

self.onmessage = (evt) => {
  if (evt.data === "test_post_message") {
    self.postMessage("Hello From Worker!");
  } else if (evt.data === "test_on_error") {
    throw "We got an error!";
  }
};