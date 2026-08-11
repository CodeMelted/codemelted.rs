// @ts-check
/**
 * <b>ABOUT:</b> Something Something star wars.
 * <b>AUTHOR:</b> Mark L. Shaffer <br>
 * <b>COPYRIGHT:</b> © 2025 - 2026 Mark Shaffer. All Rights Reserved.
 * <br><br>
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
 * @module codemelted_storage
 */

import {
  CModuleError,
  json_check_type,
  QUERY_REQUEST,
  runtime_query
} from "./codemelted_core.js";

// Module only available in a Browser runtime.
if (!runtime_query({request: QUERY_REQUEST.IsBrowser})) {
  throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
}

// ============================================================================
// [DATA DEFINITION] ==========================================================
// ============================================================================

/**
 * Provides the {@link storage_clear}, {@link storage_get},
 * {@link storage_key}, {@link storage_length}, {@link storage_remove}, and
 * {@link storage_set} calls.
 * @readonly
 * @enum {string}
 * @property {string} Cookie To utilize cookies as the storage method.
 * @property {string} Local To utilize local storage which lives once a
 * session is closed.
 * @property {string} Session To utilize session storage which clears once
 * a session is closed.
 */
export const STORAGE_TYPE = Object.freeze({
  Cookie: "cookie",
  Local: "local",
  Session: "session",
});

// ============================================================================
// [PUBLIC API] ===============================================================
// ============================================================================

/**
 * Clears the local storage of the module.
 * @param {STORAGE_TYPE} [type=STORAGE_TYPE.Local] The storage to act upon.
 * @returns {Promise<void>} A rejected promise represents an API violation.
 * @example
 * // To clear all elements in the specified storage type
 * // Defaults to STORAGE_TYPE.Local
 * await storage_clear();
 * // To specify type
 * await storage_clear(STORAGE_TYPE.Session);
 */
export async function storage_clear(type = STORAGE_TYPE.Local) {
  try {
    switch (type) {
      case STORAGE_TYPE.Cookie:
        if (!runtime_query({request: QUERY_REQUEST.IsCookieStore})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        // @ts-ignore Will exist in browser context
        const cookies = await globalThis.cookieStore.getAll();
        for (const cookie of cookies) {
          let name = cookie.name;
          if (name) {
            // @ts-ignore Will exist in browser context
            await globalThis.cookieStore.delete(name);
          }
        }
        break;
      case STORAGE_TYPE.Local:
        if (!runtime_query({request: QUERY_REQUEST.IsLocalStorage})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        // @ts-ignore Will exist in browser context
        globalThis.localStorage.clear();
        break;
      case STORAGE_TYPE.Session:
        if (!runtime_query({request: QUERY_REQUEST.IsSessionStorage})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        // @ts-ignore Will exist in browser context
        globalThis.sessionStorage.clear();
        break;
      default:
        throw new CModuleError(CModuleError.MISUSE);
    }
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("storage_clear() error.", err);
  }
}

/**
 * Gets the value associated with the key from the module's local storage.
 * @param {object} params The named parameters.
 * @param {STORAGE_TYPE} [params.type=STORAGE_TYPE.Local] The storage to act
 * upon.
 * @param {string} params.key The key to search.
 * @returns {Promise<string?>} The value associated with the key if found. A
 * rejected promise represents an API violation.
 * @example
 * // To get an element from storage. Either string or null if not found
 * // Defaults to STORAGE_TYPE.Local
 * let value = await storage_get({key: "cool"});
 * // To specify type
 * let value = await storage_get({type: STORAGE_TYPE.Session, key: "cool"});
 */
export async function storage_get({type = STORAGE_TYPE.Local, key}) {
  try {
    json_check_type({type: "string", data: key, should_throw: true});
    switch (type) {
      case STORAGE_TYPE.Cookie:
        if (!runtime_query({request: QUERY_REQUEST.IsCookieStore})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        // @ts-ignore Will exist in browser context
        let entry = await globalThis.cookieStore.get(key)
        return entry
          ? entry.value != undefined
            ? entry.value
            : null
          : null;
      case STORAGE_TYPE.Local:
        if (!runtime_query({request: QUERY_REQUEST.IsLocalStorage})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        // @ts-ignore Will exist in browser context
        return globalThis.localStorage.getItem(key);
      case STORAGE_TYPE.Session:
        if (!runtime_query({request: QUERY_REQUEST.IsSessionStorage})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        // @ts-ignore Will exist in browser context
        return globalThis.sessionStorage.getItem(key);
      default:
        throw new CModuleError(CModuleError.MISUSE);
    }
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("storage_get() error.", err);
  }
}

/**
 * Retrieves the key at the specified index.
 * @param {object} params The named parameters
 * @param {STORAGE_TYPE} [params.type=STORAGE_TYPE.Local] The storage to act
 * upon.
 * @param {number} params.index The key entry to look up.
 * @returns {Promise<string?>} The key at the specified index or null if
 * beyond the storage capacity. A rejected promise represents an API
 * violation.
 * @example
 * // To get a key at an index. Either string or null if not found
 * // Defaults to STORAGE_TYPE.Local
 * let key = await storage_key({index: 0});
 * // To specify type
 * let key = await storage_key({type: STORAGE_TYPE.Session, index: 0});
 */
export async function storage_key({type = STORAGE_TYPE.Local, index}) {
  try {
    json_check_type({type: "number", data: index, should_throw: true});
    switch (type) {
      case STORAGE_TYPE.Cookie:
        if (!runtime_query({request: QUERY_REQUEST.IsCookieStore})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        // @ts-ignore Will exist in browser context
        const cookies = await globalThis.cookieStore.getAll();
        const key = cookies.at(index)?.name;
        return key != undefined
          ? key
          : null;
      case STORAGE_TYPE.Local:
        if (!runtime_query({request: QUERY_REQUEST.IsLocalStorage})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        // @ts-ignore Will exist in browser context
        return index < globalThis.localStorage.length
          // @ts-ignore Will exist in browser context
          ? globalThis.localStorage.key(index)
          : null;
      case STORAGE_TYPE.Session:
        if (!runtime_query({request: QUERY_REQUEST.IsSessionStorage})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        // @ts-ignore Will exist in browser context
        return index < globalThis.sessionStorage.length
          // @ts-ignore Will exist in browser context
          ? globalThis.sessionStorage.key(index)
          : null;
      default:
        throw new CModuleError(CModuleError.MISUSE);
    }
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("storage_key() error.", err);
  }
}

/**
 * Retrieves the number of entries within the module's local storage.
 * @param {STORAGE_TYPE} [type=STORAGE_TYPE.Local] The storage to act
 * upon.
 * @returns {Promise<number>} The number in storage. A rejected promise
 * represents an API violation.
 * @example
 * // To get the number of elements in storage
 * // Assumes no errors with the CResult.
 * // Defaults to STORAGE_TYPE.Local
 * let length = await storage_length());
 * // To specify type
 * let length = await storage_length(type: STORAGE_TYPE.Session));
 */
export async function storage_length(type = STORAGE_TYPE.Local) {
  try {
    switch (type) {
      case STORAGE_TYPE.Cookie:
        if (!runtime_query({request: QUERY_REQUEST.IsCookieStore})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        // @ts-ignore Will exist in browser context
        return (await globalThis.cookieStore.getAll()).length;
      case STORAGE_TYPE.Local:
        if (!runtime_query({request: QUERY_REQUEST.IsLocalStorage})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        // @ts-ignore Will exist in browser context
        return globalThis.localStorage.length;
      case STORAGE_TYPE.Session:
        if (!runtime_query({request: QUERY_REQUEST.IsSessionStorage})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        // @ts-ignore Will exist in browser context
        return globalThis.sessionStorage.length;
      default:
        throw new CModuleError(CModuleError.MISUSE);
    }
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("storage_length() error.", err);
  }
}

/**
 * Removes a given entry from the module's local storage.
 * @param {object} params The named parameters.
 * @param {STORAGE_TYPE} [params.type=STORAGE_TYPE.Local] The storage to act
 * upon.
 * @param {string} params.key The key to remove.
 * @returns {Promise<void>} Rejected promise represents an API violation.
 * @example
 * // To remove an element from storage.
 * // Defaults to STORAGE_TYPE.Local
 * await storage_remove({key: "cool"});
 * // To specify type
 * await storage_remove({type: STORAGE_TYPE.Session, key: "cool"});
 */
export async function storage_remove({type = STORAGE_TYPE.Local, key}) {
  try {
    json_check_type({type: "string", data: key, should_throw: true});
    switch (type) {
      case STORAGE_TYPE.Cookie:
        if (!runtime_query({request: QUERY_REQUEST.IsCookieStore})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        // @ts-ignore Will exist in browser context
        await globalThis.cookieStore.delete(key, value);
        break;
      case STORAGE_TYPE.Local:
        if (!runtime_query({request: QUERY_REQUEST.IsLocalStorage})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        // @ts-ignore Will exist in browser context
        globalThis.localStorage.removeItem(key);
        break;
      case STORAGE_TYPE.Session:
        if (!runtime_query({request: QUERY_REQUEST.IsSessionStorage})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        // @ts-ignore Will exist in browser context
        globalThis.sessionStorage.removeItem(key);
        break;
      default:
        throw new CModuleError(CModuleError.MISUSE);
    }
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("storage_remove() error.", err);
  }
}

/**
 * Sets a key/value pair within the module's local storage.
 * @function codemelted.storage_set
 * @param {object} params The named parameters
 * @param {STORAGE_TYPE} [params.type=STORAGE_TYPE.Local] The storage to act
 * upon.
 * @param {string} params.value The storage entry.
 * @param {string} params.key The key to store.
 * @returns {Promise<void>} Rejected promise represents an API violation.
 * @example
 * // To add an element to storage.
 * // Defaults to STORAGE_TYPE.Local
 * await storage_set({key: "cool", value: "guy"});
 * // To specify type
 * await storage_set({type: STORAGE_TYPE.Session, key: "cool", value: "guy"});
 */
export async function storage_set({type = STORAGE_TYPE.Local, key, value}) {
  try {
    json_check_type({type: "string", data: key, should_throw: true});
    json_check_type({type: "string", data: value, should_throw: true});
    switch (type) {
      case STORAGE_TYPE.Cookie:
        if (!runtime_query({request: QUERY_REQUEST.IsCookieStore})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        // @ts-ignore Will exist in browser context
        await globalThis.cookieStore.set(key, value);
        break;
      case STORAGE_TYPE.Local:
        if (!runtime_query({request: QUERY_REQUEST.IsLocalStorage})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        // @ts-ignore Will exist in browser context
        globalThis.localStorage.setItem(key, value);
        break;
      case STORAGE_TYPE.Session:
        if (!runtime_query({request: QUERY_REQUEST.IsSessionStorage})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        // @ts-ignore Will exist in browser context
        globalThis.sessionStorage.setItem(key, value);
        break;
      default:
        throw new CModuleError(CModuleError.MISUSE);
    }
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("storage_set() error.", err);
  }
}
