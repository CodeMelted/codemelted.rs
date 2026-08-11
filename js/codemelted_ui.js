// @ts-check
/**
 * <b>ABOUT:</b> Tell me something about this module.<br>
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
 * @module codemelted_ui
 */

import {
  CModuleError,
  CResult,
  json_check_type,
  runtime_query,
  QUERY_REQUEST,
  CProtocol,
} from "./codemelted_core.js";

// Module only available in a Browser runtime.
if (!runtime_query({request: QUERY_REQUEST.IsBrowser})) {
  throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
}

// ============================================================================
// [ENUM DEFINITION] ==========================================================
// ============================================================================

/**
 * Provides the request actions for the {@link runtime_action} function call.
 * @readonly
 * @enum {string}
 * @property {string} Copy Copies the specified text to the system clipboard.
 * @property {string} Focus Makes a request to bring the window to the
 * front. It may fail due to user settings and the window isn't guaranteed
 * to be front most before this method returns.
 * @property {string} MoveBy moves the current window by a specified
 * amount.
 * @property {string} MoveTo moves the current window to the specified
 * coordinates.
 * @property {string} Paste Retrieves the data from the system clipboard.
 * @property {string} PostMessage Posts a message to another window in
 * the browser context.
 * @property {string} Print Opens the print dialog to print the current
 * document.
 * @property {string} ResizeBy resizes the current window by a specified
 * amount.
 * @property {string} ResizeTo dynamically resizes the window.
 * @property {string} Scroll scrolls the window to a particular place in
 * the document.
 * @property {string} ScrollBy scrolls the document in the window by the
 * given amount.
 * @property {string} ScrollTo scrolls to a particular set of coordinates
 * in the document.
 * @property {string} Share invokes the native sharing mechanism of the
 * device to share data such as text, URLs, or files. The available share
 * targets depend on the device, but might include the clipboard, contacts
 * and email applications, websites, Bluetooth, etc.
 * @property {string} Vibrate Most modern mobile devices include vibration
 * hardware, which lets software code provide physical feedback to the user
 * by causing the device to shake. The Vibration API offers Web apps the
 * ability to access this hardware, if it exists, and does nothing if the
 * device doesn't support it.
 */
export const ACTION_REQUEST = Object.freeze({
  Copy: "copy",
  Focus: "focus",
  MoveBy: "move_by",
  MoveTo: "move_to",
  Paste: "paste",
  PostMessage: "post_message",
  Print: "print",
  ResizeBy: "resize_by",
  ResizeTo: "resize_to",
  Scroll: "scroll",
  ScrollBy: "scroll_by",
  ScrollTo: "scroll_to",
  Share: "share",
  Vibrate: "vibrate",
});

/**
 * Provides the request actions of the {@link runtime_notify} function.
 * @readonly
 * @enum {string}
 * @property {string} Alert Alert a user to a condition.
 * @property {string} Choose Provides a selection to the user.
 * @property {string} Close Closes any given prompt to the user.
 * @property {string} Confirm Get confirmation from a user.
 * @property {string} Custom Provides a custom notification mechanism to the
 * user.
 * @property {string} Prompt Prompt the user for input.
 * @property {string} SnackBar Tell the user something happened passively.
 * @property {string} Wait Tell the user to wait for an action to complete.
 */
export const NOTIFY_REQUEST = Object.freeze({
  Alert: "alert",
  Choose: "choose",
  Close: "close",
  Confirm: "confirm",
  Custom: "custom",
  Prompt: "prompt",
  SnackBar: "snackbar",
  Wait: "wait",
});

/**
 * Identifies the schema to {@link runtime_open} with the browser desktop
 * services.
 * @readonly
 * @enum {string}
 * @property {string} File Opens an item via the file protocol.
 * @property {string} Http Opens a web resource with the HTTP protocol.
 * @property {string} Https Same as Http but with security.
 * @property {string} Mailto Opens the default mail provider.
 * @property {string} Sms Opens the standard app for texting.
 * @property {string} Tel Opens the default calling application.
 */
export const SCHEMA_TYPE = Object.freeze({
  File: "file:",
  Http: "http://",
  Https: "https://",
  Mailto: "mailto:",
  Sms: "sms:",
  Tel: "tel:",
});

/**
 * Supports the target parameter of the {@link runtime_open} action which handles
 * opening related apps based on the specified {@link SCHEMA_TYPE}.
 * @readonly
 * @enum {string}
 * @property {string} Blank Opens the linked document in a new window or tab
 * @property {string} Parent Opens the linked document in the same frame as
 * it was clicked (this is default)
 * @property {string} Self Opens the linked document in the parent frame
 * @property {string} Top Opens the linked document in the full body of the
 * window
 */
export const TARGET_TYPE = Object.freeze({
  Blank: "_blank",
  Parent: "_parent",
  Self: "_self",
  Top: "_top",
});

// ============================================================================
// [PROTOCOL IMPLEMENTATIONS] =================================================
// ============================================================================

/**
 * <mark>UNDER DEVELOPMENT</mark>
 * @private
 * @template T
 * @extends {CProtocol<T>}
 */
class CAudioProtocol extends CProtocol {

}

/**
 * <mark>UNDER DEVELOPMENT</mark>
 * @template T
 * @extends {CProtocol<T>}
 */
class CGamepadProtocol extends CProtocol {

}

/**
 * <mark>UNDER DEVELOPMENT</mark>
 * @private
 * @template T
 * @extends {CProtocol<T>}
 */
class CTextToSpeechProtocol extends CProtocol {

}


// ============================================================================
// [PUBLIC API] ===============================================================
// ============================================================================

/**
 * Provides the ability to carry out actions with the open browser window.
 * @param {object} params The named parameters.
 * @param {ACTION_REQUEST} params.request The enumerated value to carry
 * out with the open browser window.
 * @param {object | string} [params.data] The optional object data associated
 * with the {@link ACTION_REQUEST.Share} or {@link ACTION_REQUEST.PostMessage}
 * requests or string data for the  {@link ACTION_REQUEST.Copy} option.
 * @param {string} [params.target_origin="*"] Specifies the target origin
 * when posting a message to a window or frame.
 * @param {number[]} [params.pattern] Provides a pattern of vibration and
 * pause intervals. Each value indicates a number of milliseconds to
 * vibrate or pause, in alternation.
 * @param {number} [params.x] An X coordinate or delta coordinate for a
 * given action that moves / sets position of the browser window or item
 * on the browser window.
 * @param {number} [params.y] An X coordinate or delta coordinate for a
 * given action that moves / sets position of the browser window or item
 * on the browser window.
 * @returns {Promise<CResult<string | boolean | null>>} Reflecting success
 * or failure of the given request. A rejected promise is an API violation.
 * @example
 * // TBD
 */
export async function runtime_action({
  request,
  data,
  target_origin="*",
  pattern=[],
  x,
  y
}) {
  try {
    if (!runtime_query({request: QUERY_REQUEST.IsBrowser})) {
      throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
    }

    let value = null;
    switch (request) {
      case ACTION_REQUEST.Copy:
        json_check_type({type: "string", data: data, should_throw: true});
        // @ts-ignore This is in a browser context
        await globalThis.navigator.clipboard.writeText(data);
        break;
      case ACTION_REQUEST.Focus:
        // @ts-ignore This is in a browser context
        globalThis.focus();
        break;
      case ACTION_REQUEST.MoveBy:
        json_check_type({type: "number", data: x, should_throw: true});
        json_check_type({type: "number", data: y, should_throw: true});
        // @ts-ignore check types above will validate number is not null.
        globalThis.moveBy(x, y);
        break;
      case ACTION_REQUEST.MoveTo:
        json_check_type({type: "number", data: x, should_throw: true});
        json_check_type({type: "number", data: y, should_throw: true});
        // @ts-ignore check types above will validate number is not null.
        globalThis.moveTo(x, y);
        break;
      case ACTION_REQUEST.Paste:
        // @ts-ignore This is in a browser context
        value = await globalThis.navigator.clipboard.readText();
        break;
      case ACTION_REQUEST.PostMessage:
        // @ts-ignore This is in a browser context
        globalThis.postMessage(data, target_origin);
        break;
      case ACTION_REQUEST.Print:
        // @ts-ignore This is in a browser context
        globalThis.print();
        break;
      case ACTION_REQUEST.ResizeBy:
        json_check_type({type: "number", data: x, should_throw: true});
        json_check_type({type: "number", data: y, should_throw: true});
        // @ts-ignore check types above will validate number is not null.
        globalThis.resizeBy(x, y);
        break;
      case ACTION_REQUEST.ResizeTo:
        json_check_type({type: "number", data: x, should_throw: true});
        json_check_type({type: "number", data: y, should_throw: true});
        // @ts-ignore check types above will validate number is not null.
        globalThis.resizeTo(x, y);
        break;
      case ACTION_REQUEST.Scroll:
        json_check_type({type: "number", data: x, should_throw: true});
        json_check_type({type: "number", data: y, should_throw: true});
        // @ts-ignore check types above will validate number is not null.
        globalThis.scroll(x, y);
        break;
      case ACTION_REQUEST.ScrollBy:
        json_check_type({type: "number", data: x, should_throw: true});
        json_check_type({type: "number", data: y, should_throw: true});
        // @ts-ignore check types above will validate number is not null.
        globalThis.scrollBy(x, y);
        break;
      case ACTION_REQUEST.ScrollTo:
        json_check_type({type: "number", data: x, should_throw: true});
        json_check_type({type: "number", data: y, should_throw: true});
        // @ts-ignore check types above will validate number is not null.
        globalThis.scrollTo(x, y);
        break;
      case ACTION_REQUEST.Share:
        // @ts-ignore This is in a browser context
        await globalThis.navigator.share(data);
        break;
      case ACTION_REQUEST.Vibrate:
        json_check_type({type: Array, data: pattern, should_throw: true});
        // @ts-ignore Will exist in the browser context
        value = globalThis.navigator.vibrate(pattern);
        break;
      default:
        throw new CModuleError(CModuleError.MISUSE);
    }
    return new CResult({value: value});
  } catch (err) {
    if (json_check_type({type: CModuleError, data: err})) {
      CModuleError.handle_error(err);
      throw new CModuleError("runtime_action() error.", err);
    }
    return new CResult({error: err});
  }
}

/**
 * Provides a mechanism for interacting with a user by gather data or
 * useful information.
 * @param {object} params The named parameters
 * @param {NOTIFY_REQUEST} params.request The request to carry out.
 * @param {string} params.message The message to associate with the request.
 * @returns {Promise<boolean | string | void>} The data associated with the
 * notification request. Any rejected promise is an API violation.
 */
export async function ui_notify({request, message}) {
  try {
    if (!runtime_query({request: QUERY_REQUEST.IsBrowser})) {
      throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
    }

    let value;
    switch (request) {
      case NOTIFY_REQUEST.Alert:
        json_check_type({type: "string", data: message, should_throw: true});
        // @ts-ignore This is in a browser context
        globalThis.alert(data);
        break;
      case NOTIFY_REQUEST.Confirm:
        json_check_type({type: "string", data: message, should_throw: true});
        // @ts-ignore This is in a browser context
        value = globalThis.confirm(data);
        break;

      case NOTIFY_REQUEST.Prompt:
        json_check_type({type: "string", data: message, should_throw: true});
        // @ts-ignore This is in a browser context
        value = globalThis.prompt(data) ?? "";
        break;
      default:
        throw new CModuleError(CModuleError.MISUSE);
    }
    return value;
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("runtime_message() error.", err);
  }
}

/**
 * Opens the specified protocol to a browser window or native app
 * configured to handle the given specified schema.
 * @param {object} params The named parameters
 * @param {SCHEMA_TYPE} params.schema The schema to open.
 * @param {boolean} [params.popup_window=false] Whether to open the protocol in
 * a separate browser window.
 * @param {string} [params.url] The url of the protocol unless utilizing
 * "mailto:" schema with [params.mailtoParams] which will already be
 * formatted.
 * @param {string[]} [params.mailto=[]] The primary addresses to send the
 * email.
 * @param {string[]} [params.cc=[]] The carbon copy email addresses to send
 * the email.
 * @param {string[]} [params.bcc=[]] The people you don't want others to know
 * about on the email.
 * @param {string} [params.subject=""] The subject of the email.
 * @param {string} [params.body=""] The actual email message.
 * @param {TARGET_TYPE} [params.target=TARGET_TYPE.Self] The type of a tab
 * behavior.
 * @param {number} [params.width=900] The width of a popup window. Defaulted
 * to 900.0 when not set.
 * @param {number} [params.height=600] The height of a popup window.
 * Defaulted  to 600.0 when not set.
 * @returns {Window | null} Reference to the newly opened browser window.
 * @example
 * // TBD
 */
export function ui_open({
  schema,
  popup_window = false,
  url,
  mailto = [],
  cc = [],
  bcc = [],
  subject = "",
  body = "",
  target = TARGET_TYPE.Self,
  width=900,
  height=600
}) {
  try {
    // Ensure the runtime function is available
    if (!runtime_query({request: QUERY_REQUEST.IsOpen})) {
      throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
    }

    // Basic validation of runtime and required parameters.
    json_check_type({type: "boolean", data: popup_window, should_throw: true});
    json_check_type({type: "string", data: target, should_throw: true});
    json_check_type({type: "number", data: width, should_throw: true});
    json_check_type({type: "number", data: height, should_throw: true});
    json_check_type({type: Array, data: mailto, should_throw: true});
    json_check_type({type: Array, data: cc, should_throw: true});
    json_check_type({type: Array, data: bcc, should_throw: true});
    json_check_type({type: "string", data: subject, should_throw: true});
    json_check_type({type: "string", data: body, should_throw: true});

    // Now go build the URL to open.
    let urlToLaunch = schema;
    if (schema === "file:" ||
        schema === "http://" ||
        schema === "https://" ||
        schema === "sms:" ||
        schema === "tel:") {
      json_check_type({type: "string", data: url, should_throw: true});
      urlToLaunch += url;
    } else if (schema === "mailto:") {
      if (url) {
        json_check_type({type: "string", data: url, should_throw: true});
        urlToLaunch += url;
      } else {
        // Form the mailto parameters to better control the URL formatting.
        if (mailto.length > 0) {
          mailto.forEach((addr) => {
            urlToLaunch += `${addr};`;
          });
          urlToLaunch.substring(0, urlToLaunch.length - 1);
        }

        let delimiter = "?";
        if (cc.length > 0) {
          urlToLaunch += `${delimiter}cc=`;
          delimiter = "&";
          cc.forEach((addr) => {
            urlToLaunch += `${addr};`;
          });
          urlToLaunch.substring(0, urlToLaunch.length - 1);
        }

        if (bcc.length > 0) {
          urlToLaunch += `${delimiter}bcc=`;
          delimiter = "&";
          bcc.forEach((addr) => {
            urlToLaunch += `${addr};`;
          });
          urlToLaunch.substring(0, urlToLaunch.length - 1);
        }

        if (subject.trim().length > 0) {
          urlToLaunch += `${delimiter}subject=${subject.trim()}`;
          delimiter = "&";
        }

        if (body.trim().length > 0) {
          urlToLaunch += `${delimiter}body=${body.trim()}`;
          delimiter = "&";
        }
      }
    } else {
      throw new CModuleError(CModuleError.MISUSE);
    }

    // Determine how we are opening the item.
    if (popup_window) {
      // @ts-ignore Will return a number.
      let top = (runtime_query(QUERY_REQUEST.Height) - height) / 2;
      // @ts-ignore Will return a number.
      let left = (runtime_query(QUERY_REQUEST.Width) - width) / 2;
      let settings = `toolbar=no, location=no, ` +
        `directories=no, status=no, menubar=no, ` +
        `scrollbars=no, resizable=yes, copyhistory=no, ` +
        `width=${width}, height=${height}, top=${top}, left=${left}`;
      // @ts-ignore Property exists in a browser runtime.
      return globalThis.open(urlToLaunch, "_blank", settings);
    }
    // @ts-ignore Property exists in a browser runtime.
    return globalThis.open(urlToLaunch, target);
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("runtime_online() error.", err);
  }
}
