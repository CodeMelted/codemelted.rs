// @ts-check
/**
 * <b>ABOUT:</b> Provides the mechanism for a web app to open or save a file
 * to disk. It attempts to make use of the modern Web APIs but will fall back
 * to classic methods in the event those are not available.
 * <br><br>
 * <img style="width: 100%;" src="models/codemelted_disk.png" />
 * <br><br>
 * <b>COPYRIGHT:</b> © 2025 - 2026 Mark Shaffer. All Rights Reserved. <br>
 * <b>LICENSE:</b> MIT License
 * <br><br>
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 * <br><br>
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * <br><br>
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 * @module disk
 * @see https://developer.mozilla.org/en-US/docs/Web/API/File_System_API
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLAnchorElement/download
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/file
 * @see https://web.dev/articles/files/save-a-file
 */

import {
  AVAILABILITY_REQUEST,
  CModuleError,
  CResult,
  json_check_type,
  json_has_value,
  QUERY_REQUEST,
  runtime_available,
} from "./core.js";

// Module only available in a Browser runtime.
if (!runtime_available({request: AVAILABILITY_REQUEST.Browser})) {
  throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
}

// ============================================================================
// [DATA DEFINITION] ==========================================================
// ============================================================================

/**
 * Defines the data being read from or saved to disk from this module.
 * This is in support of the {@link disk_read_file} and
 * {@link disk_write_file} functions.
 * @readonly
 * @enum {string}
 * @property {string} ArrayBuffer Represents an ArrayBuffer data type.
 * @property {Text} Text Represents a string data type.
 * @property {Uint8Array} Uint8Array Represents a series of bytes data type.
 */
export const DISK_DATA_TYPE = Object.freeze({
  ArrayBuffer: "array_buffer",
  Text: "text",
  Uint8Array: "uint8_array",
});

// ============================================================================
// [PUBLIC API] ===============================================================
// ============================================================================

/**
 * Brings up a file chooser to select a file to read its data for later use.
 * @param {object} params The named parameters.
 * @param {DISK_DATA_TYPE} params.data_type The type of data being saved to
 * disk.
 * @param {string} [params.accept="*"] A comma separated list of either file
 * extensions or mime types representing files
 * @returns {Promise<CResult<ArrayBuffer | string | Uint8Array | null>>} The
 * data read from the particular file or null if an error occurred or no file
 * was selected.
 * A rejected promise represents a module API violation.
 * @example
 * // Read a text file from disk.
 * const data = await disk_read_file({
 *   data_type: DISK_DATA_TYPE.Text,
 *   accept: "*.txt"
 * });
 * if (data) {
 *   // Do something with the data.
 *   // Could be null if you don't select a file.
 * }
 */
export function disk_read_file({data_type, accept="*"}) {
  return new Promise((resolve, reject) => {
    try {
      json_has_value({
        obj: DISK_DATA_TYPE,
        value: data_type,
        should_throw: true
      });
      json_check_type({type: "string", data: accept, should_throw: true});

      // Go read the file from disk.
      // Build our in-memory control to select the file.
      // @ts-ignore document will exist in browser context.
      const w = globalThis.document.createElement('input');
      w.type = "file";
      w.accept = accept;

      // Setup to handle the data read.
      w.onchange = async (ev) => {
        try {
          let value = null;
          // @ts-ignore HTMLInputElement will exist in browser context.
          const file = ev.target instanceof HTMLInputElement
            ? ev.target.files != null
              ? ev.target.files[0]
              : null
            : null;
          if (!file) {
            resolve(new CResult());
          }
          switch (data_type) {
            case DISK_DATA_TYPE.ArrayBuffer:
              value = await file?.text();
              break;
            case DISK_DATA_TYPE.Text:
              value = await file?.bytes();
              break;
            case DISK_DATA_TYPE.Uint8Array:
              value = await file?.arrayBuffer();
              break;
          }
          resolve(new CResult({value: value}));
        } catch (err) {
          resolve(new CResult({error: err}));
        }
      };

      // Kick it off.
      w.click();
    } catch (err) {
      CModuleError.handle_error(err);
      reject(err);
    }
  });
}

/**
 * Will save the specified data to a filename in the operating system
 * download directory.
 * @param {object} params The named parameters.
 * @param {ArrayBuffer | string | Uint8Array} params.data The data to write
 * to disk.
 * @param {string} params.filename What to call the file in the download
 * directory.
 * @returns {Promise<CResult<void>>} The result of the save. A rejected
 * promise represents an API violation.
 * @example
 * // Go attempt to download the file contents from a blob
 * let result = await disk_write_file({
 *   data: image_blob,
 *   filename: "picture_of_me.png"
 * });
 * if (result.is_error()) {
 *   // handle the error
 * }
 */
export function disk_write_file({data, filename}) {
  // Async function for the modern way so we can call it within the promise
  const modern_save_file = async (
    /** @type {ArrayBuffer | string | Uint8Array} */ data,
    /** @type {any} */ filename
  ) => {
    try {
      // Show the file save dialog.
      // @ts-ignore Experimental but available
      const handle = await showSaveFilePicker({
        filename,
      });
      // Write the blob to the file.
      const writable = await handle.createWritable();
      // @ts-ignore Typescript does not know what is happening here.
      const blob = new Blob([data]);
      await writable.write(blob);
      await writable.close();
      return new CResult();
    } catch (err) {
      return new CResult({error: err});
    }
  };
  return new Promise((resolve, reject) => {
    try {
      const valid_type = json_check_type({type: ArrayBuffer, data: data}) ||
        json_check_type({type: "string", data: data}) ||
        json_check_type({type: Uint8Array, data: data});
      if (!valid_type) {
        throw new CModuleError(CModuleError.TYPE_VIOLATION);
      }
      json_check_type({type: "string", data: filename, should_throw: true});

      // Determine if we can perform the modern way of saving a file
      const is_modern_available = !runtime_available({
        request: AVAILABILITY_REQUEST.IFrame
      }) && runtime_available({
        request: AVAILABILITY_REQUEST.AskRuntime,
        name: "showSaveFilePicker"
      });

      if (is_modern_available) {
        // We have the modern way available, present the save file picker.
        modern_save_file(data, filename).then((value) => {
          resolve(value);
        });
      } else {
        // Traditional download with name specified shall be utilized.
        try {
          // @ts-ignore Typescript does not know what is happening here.
          const blob = new Blob([data]);
          const blobURL = URL.createObjectURL(blob);
          // @ts-ignore document will exist in browser context.
          const a = globalThis.document.createElement('a');
          a.href = blobURL;
          a.download = filename;
          a.style.display = "none";
          // @ts-ignore document will exist in browser context.
          a.click();
          setTimeout(() => {
            URL.revokeObjectURL(blobURL);
            resolve(new CResult());
          }, 1000);
        } catch (err) {
          resolve(new CResult({error: err}));
        }
      }
    } catch (err) {
      CModuleError.handle_error(err);
      reject(err);
    }
  });
}
