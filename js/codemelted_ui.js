// @ts-check
/**
 * <b>ABOUT:</b> Tell me something about this module.<br>
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
 * @module codemelted_ui
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements
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
 * Provides the request actions for the {@link ui_action} function call.
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
 * Provides the request actions of the {@link ui_notify} function.
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
 * @property {string} SystemNotification Provides an operating system
 * notification even when the page is not active. Requires permission to be
 * granted to the website.
 * @property {string} Wait Tell the user to wait for an action to complete.
 */
export const NOTIFY_REQUEST = Object.freeze({
  Alert: "alert",
  Choose: "choose",
  Close: "close",
  Confirm: "confirm",
  Custom: "custom",
  Prompt: "prompt",
  SnackBar: "snack_bar",
  SystemNotification: "system_notification",
  Wait: "wait",
});

/**
 * Identifies the schema to {@link ui_open} with the browser desktop
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
 * Supports the target parameter of the {@link ui_open} action which handles
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
export async function ui_action({
  request,
  data,
  target_origin="*",
  pattern=[],
  x,
  y
}) {
  try {
    let value = null;
    switch (request) {
      case ACTION_REQUEST.Copy:
        json_check_type({type: "string", data: data, should_throw: true});
        // @ts-ignore Data was checked above.
        await globalThis.navigator.clipboard.writeText(data);
        break;
      case ACTION_REQUEST.Focus:
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
        value = await globalThis.navigator.clipboard.readText();
        break;
      case ACTION_REQUEST.PostMessage:
        globalThis.postMessage(data, target_origin);
        break;
      case ACTION_REQUEST.Print:
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
        if (!runtime_query({request: QUERY_REQUEST.IsShare})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        // @ts-ignore This is in a browser context
        await globalThis.navigator.share(data);
        break;
      case ACTION_REQUEST.Vibrate:
        if (!runtime_query({request: QUERY_REQUEST.IsVibrate})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
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
 * @example
 * // TBD
 */
export async function ui_notify({request, message}) {
  try {
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

// ============================================================================
// [UI Components] ============================================================
// ============================================================================

/**
 * @callback CAttributeChangeCB Callback to handle any changes in
 * observedAttributes within the base {@link CHtmlComponent} class.
 * @param {string} name The name of the observable attribute fired.
 * @param {string} old_value The old value associated with the attribute.
 * @param {string} new_value The nw value to apply to the attribute.
 * @returns {void}
 */

/**
 * @callback CHtmlComponentCB A generalized callback for the void no parameter
 * {@link CHtmlComponent} class. Allows for the constructor to define these
 * callbacks and the base class to invoke them allowing for a cleaner
 * definition of the implementing HTML custom component.
 */

/**
 * Sets up the base class for defining custom HTMLElements to build a user
 * interface for a Single Page App (SPA) / Progressive Web App (PWA) or
 * Rust desktop / mobile TAURI app.
 * @abstract
 * @extends {HTMLElement}
 */
export class CHtmlComponent extends HTMLElement {
  /**
   * Holds the list of observable attributes that implementing custom
   * components can respond to so outside changes can be made in the
   * shadow dom.
   * @readonly
   * @type {string[]}
   */
  static observedAttributes = [ ];

  /** @type {CHtmlComponentCB | undefined} */
  #adopted_cb;
  /** @type {CAttributeChangeCB | undefined} */
  #attribute_changed_cb;
  /** @type {CHtmlComponentCB | undefined} */
  #connected_cb;
  /** @type {CHtmlComponentCB | undefined} */
  #connected_move_cb;
  /** @type {CHtmlComponentCB | undefined} */
  #disconnected_cb;
  /** @type {ShadowRoot} */
  #shadow_root;

  /**
   * Creates the HTMLElement and attaches a closed shadow DOM to only allow
   * styling via this component.
   * @param {object} params The named parameters
   * @param {CHtmlComponentCB} [params.adopted_cb] The callback that handles
   * the {@link adoptedCallback} method.
   * @param {CAttributeChangeCB} [params.attribute_changed_cb] The callback
   * that handles the {@link attributeChangedCallback} method.
   * @param {CHtmlComponentCB} [params.connected_cb] The callback that handles
   * the {@link connectedCallback} method.
   * @param {CHtmlComponentCB} [params.connected_move_cb] The callback that handles
   * the {@link connectedMoveCallback} method.
   * @param {CHtmlComponentCB} [params.disconnected_cb] The callback that handles
   * the {@link disconnectedCallback} method.
   */
  constructor({
    adopted_cb,
    attribute_changed_cb,
    connected_cb,
    connected_move_cb,
    disconnected_cb
  }) {
    super();
    try {
      if (adopted_cb) {
        json_check_type({
          type: "function",
          data: adopted_cb,
          count: 0,
          should_throw: true
        });
      }
      if (attribute_changed_cb) {
        json_check_type({
          type: "function",
          data: attribute_changed_cb,
          count: 3,
          should_throw: true
        });
      }
      if (connected_cb) {
        json_check_type({
          type: "function",
          data: connected_cb,
          count: 0,
          should_throw: true
        });
      }
      if (connected_move_cb) {
        json_check_type({
          type: "function",
          data: connected_move_cb,
          count: 0,
          should_throw: true
        });
      }
      if (disconnected_cb) {
        json_check_type({
          type: "function",
          data: disconnected_cb,
          count: 0,
          should_throw: true
        });
      }
      this.#adopted_cb = adopted_cb;
      this.#attribute_changed_cb = attribute_changed_cb;
      this.#connected_cb = connected_cb;
      this.#connected_move_cb = connected_move_cb;
      this.#disconnected_cb = disconnected_cb;
      this.#shadow_root = this.attachShadow({mode: "closed"});
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError(CModuleError.MISUSE);
    }
  }

  /**
   * Provides access to the shadow DOM for constructing the custom component.
   * @protected
   * @readonly
   * @type {ShadowRoot}
   */
  get shadow_root() { return this.#shadow_root; }

  // /**
  //  * Provides the ability to query the DOM for a given css_value by
  //  * variable name. The design of this function is if a variable name is not
  //  * what is specified, it is assumed to be the actual property so it is
  //  * returned instead.
  //  * @param {string} attr The variable name to search
  //  * @returns {string} The value of the CssVariable or the attr returned
  //  * as it is assumed to be the actual style.
  //  */
  // get_css_value(attr) {
  //   let css_value = runtime_query({
  //     request: QUERY_REQUEST.CssVariable,
  //     name: attr
  //   });
  //   // @ts-ignore It will return a string value
  //   return css_value.length > 0
  //     // @ts-ignore It will return a string value
  //     ? css_value
  //     : attr;
  // }

  /**
   * Called each time the element is moved to a new document.
   * @returns {void}
   */
  adoptedCallback() { this.#adopted_cb?.(); }

  /**
   * Called when attributes are changed, added, removed, or replaced.
   * @param {string} name The name of a observedAttributes allowing access
   * into the internals of the custom component.
   * @param {string} old_value The original value held by the attribute.
   * @param {string} new_value The new value to apply.
   * @returns {void}
   */
  attributeChangedCallback(name, old_value, new_value) {
    this.#attribute_changed_cb?.(name, old_value, new_value);
  }

  /**
   * Called each time the element is added to the document. The specification
   * recommends that, as far as possible, developers should implement custom
   * element setup in this callback rather than the constructor.
   * @returns {void}
   */
  connectedCallback() { this.#connected_cb?.(); }

  /**
   * When defined, this is called instead of connectedCallback() and
   * disconnectedCallback() each time the element is moved to a different
   * place in the DOM via Element.moveBefore(). Use this to avoid running
   * initialization/cleanup code in the connectedCallback() and
   * disconnectedCallback() callbacks when the element is not actually
   * being added to or removed from the DOM. See Lifecycle callbacks and
   * state-preserving moves for more details.
   * @returns {void}
   */
  connectedMoveCallback() { this.#connected_move_cb?.(); }

  /**
   * Called each time the element is removed from the document.
   * @returns {void}
   */
  disconnectedCallback() { this.#disconnected_cb?.(); }

  /**
   * Forces a refresh of the component.
   * @returns {void}
   */
  refresh() {
    const display = this.style.display;
    this.style.display = "";
    this.style.display = display;
  }

  /**
   * Utility function to register a custom component if it has not already
   * been defined.
   * @param {string} name The name of the component.
   * @param {any} element_def The constructor definition.
   */
  static register_component(name, element_def) {
    const is_defined =  !!customElements.get(name);
    if (!is_defined) {
      customElements.define(name, element_def);
    }
  }
}

/**
 * Provides a Material3 icon based button where the icon is to the left of
 * the label (if specified) or it is just the icon.
 * <br><br>
 * <b>DECLARE:</b><br>
 * ```html
 * <cm-icon-button
 *   cm_icon="emoji or URL"
 *   cm_label="Label (optional)"
 *   cm_tooltip="Tooltip (optional)"
 * ></cm-icon-button>
 * ```
 * <br><br>
 * <b>STYLE:</b><br>
 * ```css
 *
 * ```
 * @extends {CHtmlComponent}
 */
class CIconButton extends CHtmlComponent {
  constructor() {
    super({
      connected_cb: () => {
        try {
          // Get the attributes and validate them.
          this.title = this.getAttribute("cm_tooltip") ?? "";
          let label = this.getAttribute("cm_label") ?? "";
          let icon = this.getAttribute("cm_icon") ?? "";

          // Setup our style
          // TODO: Setup :host
          // TODO: Have :host fill container
          let style = `
            <style>

            </style>
          `;

          // Now go build the component
          if (label.length === 1) {

          } else if (label.length > 1) {

          } else {
            throw new CModuleError(
              `${CModuleError.MISUSE}: cm_icon must be emoji or url`
            );
          }

        } catch (err) {
          CModuleError.handle_error(err);
          throw new CModuleError(CModuleError.MISUSE, err);
        }
      }
    });
  }
}
CHtmlComponent.register_component("cm-icon-button", CIconButton);
