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
 * @module codemelted_network
 */

import {
  CModuleError,
  CProtocol,
  json_check_type,
  PROTOCOL_EVENT,
  PROTOCOL_TYPE,
  QUERY_REQUEST,
  runtime_query
} from "./codemelted_core.js";

// ============================================================================
// [DATA DEFINITION] ==========================================================
// ============================================================================

/**
 * Identifies event handled by the {@link PROTOCOL_TYPE.BroadcastChannel}
 * protocol.
 */
export class CBroadcastChannelEvent {
  /** @type {MessageEvent} */
  #event
  /** @type {boolean} */
  #is_error;

  /**
   * The message event received by the protocol.
   * @returns {MessageEvent}
   */
  event() { return this.#event; }

  /**
   * Indicates whether the wrapped MessageEvent is an error or not.
   * @returns {boolean}
   */
  is_error() { return this.#is_error; }

  /**
   * Constructor for the object.
   * @param {object} params The named parameters.
   * @param {MessageEvent} params.event The event received by the protocol.
   * @param {boolean} params.is_error true if the MessageEvent was
   * associated with an error, false otherwise.
   */
  constructor({event, is_error}) {
    try {
      json_check_type({type: MessageEvent, data: event, should_throw: true});
      json_check_type({type: "boolean", data: is_error, should_throw: true});
      this.#event = event;
      this.#is_error = is_error;
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError(
        "CBroadcastChannelEvent construction error.", err
      );
    }
  }
}

/**
 * Identifies event handled by the {@link PROTOCOL_TYPE.EventSource}
 * protocol.
 */
export class CEventSourceEvent {
  /** @type {Event | MessageEvent} */
  #event;
  /** @type {boolean} */
  #is_error;
  /** @type {number} */
  #ready_state;

  /**
   * Signals the ready_state() is in a connecting state.
   * @readonly
   * @type {number}
   */
  static get CONNECTING() { return 0; }

  /**
   * Signals the ready_state() is in a connecting state.
   * @readonly
   * @type {number}
   */
  static get OPEN() { return 1; }

  /**
   * Signals the ready_state() is in a connecting state.
   * @readonly
   * @type {number}
   */
  static get CLOSED() { return 2; }

  /**
   * Treats the wrapped event as a message event.
   * @returns {MessageEvent?}
   */
  as_message_event() {
    return this.#event instanceof MessageEvent
      ? this.#event
      : null;
  }

  /**
   * The event captured by the protocol.
   * @returns {Event | MessageEvent}
   */
  event() { return this.#event; }

  /**
   * Indicates if the event captured was an error.
   * @returns {boolean}
   */
  is_error() { return this.#is_error; }

  /**
   * The current state of the protocol.
   * @returns {number}
   */
  ready_state() { return this.#ready_state; }

  /**
   * Constructor for the class.
   * @param {object} params The named parameters
   * @param {Event | MessageEvent} params.event The event handled by the
   * protocol.
   * @param {boolean} params.is_error true if it was an error event,
   * false otherwise.
   * @param {number} params.ready_state The current state of the protocol.
   */
  constructor({event, is_error, ready_state}) {
    try {
      if (!json_check_type({type: MessageEvent, data: event}) &&
          !json_check_type({type: Event, data: event})) {
        throw new CModuleError(CModuleError.TYPE_VIOLATION);
      }
      json_check_type({type: "boolean", data: is_error, should_throw: true});
      json_check_type({
        type: "number",
        data: ready_state,
        should_throw: true
      });
      this.#event = event;
      this.#is_error = is_error;
      this.#ready_state = ready_state;
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError(
        "CEventSourceEvent construction error.", err
      );
    }
  }
}

/**
 * The result of a  {@link network_fetch} call containing any data from the
 * call along with the HTTP Status Code  of the transaction.
 */
export class CFetchResult {
  /** @type {number} */
  #status = -1;
  /** @type {any} */
  #data;

  /**
   * Will get the data if it is a Uint8Array or null if not that object
   * type.
   * @returns {Uint8Array?}
   */
  as_binary() {
    return json_check_type({type: Uint8Array, data: this.#data})
        ? this.#data
        : null;
  }

  /**
   * Will get the data if it is a Blob or null if not that object type.
   * @returns {Blob?}
   */
  as_blob() {
    return json_check_type({type: Blob, data: this.#data})
      ? this.#data
      : null;
  }

  /**
   * Will get the value if it is a FormData or null if not that object
   * type.
   * @returns {FormData?}
   */
  as_form_data() {
    return json_check_type({type: FormData, data: this.#data})
      ? this.#data
      : null;
  }

  /**
   * Will get the value if it is a Object or null if not that object
   * type.
   * @returns {object?}
   */
  as_object() {
    return json_check_type({type: "object", data: this.#data})
      ? this.#data
      : null;
  }

  /**
   * Will get the value if it is a string or null if not that object
   * type.
   * @returns {string?}
   */
  as_string() {
    return json_check_type({type: "string", data: this.#data})
      ? this.#data
      : null;
  }

  /**
   * The HTTP Status Code
   * @returns {number}
   */
  status() { return this.#status; }

  /**
   * Constructor for the class.
   * @param {object} params The named parameters.
   * @param {number} params.status The HTTP status code of the fetch request.
   * @param {any} [params.data] Any data associated with the request.
   * @param {any} [params.error] Any captured errors as a result of the
   * request.
   */
  constructor({status, data=null}) {
    try {
      json_check_type({type: "number", data: status, should_throw: true});
      this.#status = status;
      this.#data = data;
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError("CFetchResult construction error.", err);
    }
  }
}

/**
 * Represents the data to send to a connected web socket to a server. Supports
 * the {@link PROTOCOL_TYPE} WebSocket protocol.
 */
export class CWebSocketData {
  /** @type {"arraybuffer" | "blob"} */
  #binary_type;
  /** @type {ArrayBuffer | Blob | string} */
  #data;

  /**
   * Identifies the web sockets primary transmission type across the web
   * socket.
   * @returns {"arraybuffer" | "blob"}
   */
  binary_type() { return this.#binary_type; }

  /**
   * The data to transmit
   * @returns {ArrayBuffer | Blob | string}
   */
  data() { return this.#data; }

  /**
   * Constructor for the data to send to a web socket.
   * @param {object} params The named parameters
   * @param {ArrayBuffer | Blob | string} params.data The data to send to
   * the server.
   * @param {"arraybuffer" | "blob"} [params.binary_type="blob"] How to
   * configure the socket when sending / receiving the data.
   */
  constructor({data, binary_type="blob"}) {
    try {
      if (!json_check_type({type: ArrayBuffer, data: data}) &&
          !json_check_type({type: Blob, data: data}) &&
          !json_check_type({type: "string", data: data})) {
        throw new CModuleError(CModuleError.TYPE_VIOLATION);
      }
      json_check_type({type: "string", data: binary_type, should_throw: true});
      this.#data = data;
      this.#binary_type = binary_type;
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError("CWebSocketData construction error.", err);
    }
  }
}

/**
 * Represents a firing timer for an open {@link PROTOCOL_TYPE} WebSocket.
 */
export class CWebSocketEvent {
  /** @type {number} */
  #buffered_amount;
  /** @type {CloseEvent | Event | MessageEvent} */
  #event;
  /** @type {boolean} */
  #is_error;
  /** @type {number} */
  #ready_state;
  /** @type {string} */
  #url;

  /**
   * Signals the ready_state() is in a connecting state.
   * @readonly
   * @type {number}
   */
  static get CONNECTING() { return 0; }

  /**
   * Signals the ready_state() is in a connecting state.
   * @readonly
   * @type {number}
   */
  static get OPEN() { return 1; }

  /**
   * Signals the ready_state() is in a closing state.
   * @readonly
   * @type {number}
   */
  static get CLOSING() { return 2; }

  /**
   * Signals the ready_state() is in a closed state.
   * @readonly
   * @type {number}
   */
  static get CLOSED() { return 3; }

  /**
   * Treats the captured event as a close event.
   * @returns {CloseEvent?}
   */
  as_close_event() {
    return this.#event instanceof CloseEvent
      ? this.#event
      : null;
  }

  /**
   * Treats the captured event as a message event.
   * @returns {MessageEvent?}
   */
  as_message_event() {
    return this.#event instanceof MessageEvent
      ? this.#event
      : null;
  }

  /**
   * The buffered amount of data to send to the server protocol.
   * @returns {number}
   */
  buffered_amount() { return this.#buffered_amount; }

  /**
   * The event captured by the protocol.
   * @returns {CloseEvent | Event | MessageEvent}
   */
  event() { return this.#event; }

  /**
   * Indicates if the event captured was an error.
   * @returns {boolean}
   */
  is_error() { return this.#is_error; }

  /**
   * The current state of the protocol.
   * @returns {number}
   */
  ready_state() { return this.#ready_state; }

  /**
   * The URL of the server.
   * @returns {string}
   */
  url() { return this.#url; }

  /**
   * Constructor for the class.
   * @param {object} params The named parameters
   * @param {number} params.buffered_amount The amount of data queued to be
   * transmitted to the server.
   * @param {Event | MessageEvent} params.event The event handled by the
   * protocol.
   * @param {boolean} params.is_error true if it was an error event,
   * false otherwise.
   * @param {number} params.ready_state The current state of the protocol.
   * @param {string} params.url The url of the server the protocol is
   * connected.
   */
  constructor({buffered_amount, event, is_error, ready_state, url}) {
    try {
      if (!json_check_type({type: MessageEvent, data: event}) &&
          !json_check_type({type: CloseEvent, data: event}) &&
          !json_check_type({type: Event, data: event})) {
        throw new CModuleError(CModuleError.TYPE_VIOLATION);
      }
      json_check_type({
        type: "number",
        data: buffered_amount,
        should_throw: true
      });
      json_check_type({type: "boolean", data: is_error, should_throw: true});
      json_check_type({
        type: "number",
        data: ready_state,
        should_throw: true
      });
      json_check_type({type: "string", data: url, should_throw: true});
      this.#buffered_amount = buffered_amount;
      this.#event = event;
      this.#is_error = is_error;
      this.#ready_state = ready_state;
      this.#url = url;
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError(
        "CWebSocketEvent construction error.", err
      );
    }
  }
}

// ============================================================================
// [PROTOCOL IMPLEMENTATION] ==================================================
// ============================================================================

/**
 * This protocol represents a named channel that any browsing context of a
 * given origin can subscribe to. It allows communication between different
 * documents (in different windows, tabs, frames, iframes, or worker) of the
 * same origin.
 * @template T
 * @extends {CProtocol<CBroadcastChannelEvent>}
 */
export class CBroadcastChannelProtocol extends CProtocol {
  /** @type {BroadcastChannel} */
  #channel;

  /**
   * Sends a message, which can be of any kind of Object, to each listener
   * in any browsing context with the same origin. The message is
   * transmitted as a message event targeted at each BroadcastChannel
   * bound to the channel.
   * @override
   * @param {any} [data] The data to broadcast. The data is
   * serialized using the structured clone algorithm. This means you can
   * pass a broad variety of data objects safely to the destination window
   * without having to serialize them yourself.
   * @returns {void}
   */
  post_message(data) {
    try {
      this.#channel.postMessage(data);
    } catch (err) {
      CModuleError.handle_error(err);
      this.report({
        event_fired: PROTOCOL_EVENT.ModuleError,
        data: err
      });
    }
  }

  /**
   * @inheritdoc
   * @override
   */
  terminate() {
    try {
      this.#channel.close();
    } catch (err) {
      CModuleError.handle_error(err);
      this.report({
        event_fired: PROTOCOL_EVENT.ModuleError,
        data: err
      });
    }
  }

  /**
   * Constructor for the protocol.
   * @param {object} params The named parameters.
   * @param {string} params.name The name to give to the protocol.
   * @param {string} params.url The URL to connect this broadcast channel on.
   * @param {import("./codemelted_core.js").
   *  CProtocolEventHandler<CBroadcastChannelEvent>} params.rx_handler The
   * handler to receive data from the protocol.
   */
  constructor({name, rx_handler, url}) {
    super({
      name: name,
      rx_handler: rx_handler,
      type: PROTOCOL_TYPE.BroadcastChannel
    });
    try {
      if (!runtime_query({request: QUERY_REQUEST.IsBroadcastChannel})) {
        throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
      }
      this.#channel = new globalThis.BroadcastChannel(url);
      this.#channel.onmessage = (evt) => {
        this.report({
          event_fired: PROTOCOL_EVENT.Message,
          data: new CBroadcastChannelEvent({event: evt, is_error: false})
        });
        evt.preventDefault();
      };
      this.#channel.onmessageerror = (evt) => {
        this.report({
          event_fired: PROTOCOL_EVENT.MessageError,
          data: new CBroadcastChannelEvent({event: evt, is_error: true})
        });
        evt.preventDefault();
      };
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError("CBroadcastChannel construction error.", err);
    }
  }
}

/**
 * Opens a persistent connection to an HTTP server, which sends events in
 * text/event-stream format. The connection remains open until terminate is
 * called.
 * @extends {CProtocol<CBroadcastChannelEvent>}
 */
export class CEventSourceProtocol extends CProtocol {
  /** @type {EventSource} */
  #sse

  /**
   * @inheritdoc
   * @override
   */
  terminate() {
    try {
      this.#sse.close();
    } catch (err) {
      CModuleError.handle_error(err);
      this.report({
        event_fired: PROTOCOL_EVENT.ModuleError,
        data: err
      });
    }
  }

  /**
   * Constructor for the protocol.
   * @param {object} params The named parameters.
   * @param {string} params.name The name to give to the protocol.
   * @param {import("./codemelted_core.js")
   *  .CProtocolEventHandler<CBroadcastChannelEvent>} params.rx_handler The
   * protocol handler to receive those events.
   * @param {string} params.url URL of the server sending the events.
   * @param {boolean} [params.with_credentials=false] True to utilize CORS,
   * false otherwise.
   */
  constructor({name, rx_handler, url, with_credentials=false}) {
    super({
      name: name,
      rx_handler: rx_handler,
      type: PROTOCOL_TYPE.EventSource
    });
    try {
      if (!runtime_query({request: QUERY_REQUEST.IsEventSource})) {
        throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
      }
      json_check_type({
        type: "boolean",
        data: with_credentials,
        should_throw: true
      });
      this.#sse = new globalThis.EventSource(
        url,
        {withCredentials: with_credentials}
      );
      this.#sse.onerror = (evt) => {
        this.report({
          event_fired: PROTOCOL_EVENT.Error,
          data: new CEventSourceEvent({
            event: evt,
            is_error: true,
            ready_state: this.#sse.readyState
          })
        });
        evt.preventDefault();
      };
      this.#sse.onmessage = (evt) => {
        this.report({
          event_fired: PROTOCOL_EVENT.Message,
          data: new CEventSourceEvent({
            event: evt,
            is_error: false,
            ready_state: this.#sse.readyState
          })
        });
        evt.preventDefault();
      };
      this.#sse.onopen = (evt) => {
        this.report({
          event_fired: PROTOCOL_EVENT.Open,
          data: new CEventSourceEvent({
            event: evt,
            is_error: false,
            ready_state: this.#sse.readyState
          })
        });
        evt.preventDefault();
      };
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError("CEventSourceProtocol error.", err);
    }
  }
}

/**
 * Creates a WebSocket connection to a server allowing a dedicated
 * bi-directional exchange of data. This socket will continuously attempt
 * reconnecting to the server on connection loss until the protocol is
 * terminated. {@link network_connect} creates this protocol.
 * @extends {CProtocol<CWebSocketEvent>}
 */
class CWebSocketProtocol extends CProtocol {
  /** @type {WebSocket} */
  // @ts-ignore The #connect_socket() creates this member field.
  #socket;

  /**
   * Enqueues the specified data to be transmitted to the server over the
   * WebSocket connection, increasing the value of bufferedAmount by the
   * number of bytes needed to contain the data. If the data can't be sent
   * (for example, because it needs to be buffered but the buffer is full),
   * the socket is closed automatically.
   * @override
   * @param {CWebSocketData} data Data to send to the server
   * for further processing.
   * @returns {void}
   */
  post_message(data) {
    try {
      if (this.#socket.readyState == this.#socket.OPEN) {
        this.#socket.binaryType = data.binary_type();
        this.#socket.send(data.data());
      }
    } catch (err) {
      CModuleError.handle_error(err);
      this.report({
        event_fired: PROTOCOL_EVENT.ModuleError,
        data: err
      });
    }
  }

  /**
   * @inheritdoc
   * @override
   */
  terminate() {
    try {
      this.#socket.close();
    } catch (err) {
      CModuleError.handle_error(err);
      this.report({
        event_fired: PROTOCOL_EVENT.ModuleError,
        data: err
      });
    }
  }

  /**
   * Constructor for the protocol.
   * @param {object} params The named parameters.
   * @param {string} params.name The name to give to the protocol.
   * @param {import("./codemelted_core.js").
   *  CProtocolEventHandler<CWebSocketEvent>} params.rx_handler The handler for
   * receiving data from this protocol.
   * @param {string} params.url The URL of the server to connect.
   */
  constructor({name, rx_handler, url}) {
    super({
      name: name,
      rx_handler: rx_handler,
      type: PROTOCOL_TYPE.WebSocket
    });
    try {
      if (!runtime_query({request: QUERY_REQUEST.IsWebSocket})) {
        throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
      }
      json_check_type({type: "string", data: url, should_throw: true});
      // @ts-ignore URL will not be null.
      this.#socket = new globalThis.WebSocket(url);
      this.#socket.onclose = (evt) => {
        this.report({
          event_fired: PROTOCOL_EVENT.Close,
          data: new CWebSocketEvent({
            buffered_amount: this.#socket.bufferedAmount,
            event: evt,
            is_error: false,
            ready_state: this.#socket.readyState,
            url: this.#socket.url
          })
        });
        evt.preventDefault();
      }
      this.#socket.onerror = (evt) => {
        this.report({
          event_fired: PROTOCOL_EVENT.Error,
          data: new CWebSocketEvent({
            buffered_amount: this.#socket.bufferedAmount,
            event: evt,
            is_error: true,
            ready_state: this.#socket.readyState,
            url: this.#socket.url
          })
        });
        evt.preventDefault();
      }
      this.#socket.onmessage = (evt) => {
        this.report({
          event_fired: PROTOCOL_EVENT.Message,
          data: new CWebSocketEvent({
            buffered_amount: this.#socket.bufferedAmount,
            event: evt,
            is_error: false,
            ready_state: this.#socket.readyState,
            url: this.#socket.url
          })
        });
        evt.preventDefault();
      }
      this.#socket.onopen = (evt) => {
        this.report({
          event_fired: PROTOCOL_EVENT.Open,
          data: new CWebSocketEvent({
            buffered_amount: this.#socket.bufferedAmount,
            event: evt,
            is_error: false,
            ready_state: this.#socket.readyState,
            url: this.#socket.url
          })
        });
        evt.preventDefault();
      }
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError("CWebSocketProtocol construction error.", err);
    }
  }
}

/**
 * <mark>UNDER DEVELOPMENT - DO NOT USE</mark>
 * @private
 * @template T
 * @extends {CProtocol<T>}
 */
class CWebRtcProtocol extends CProtocol {

}

/**
 * <mark>UNDER DEVELOPMENT - DO NOT USE</mark>
 * @private
 * @template T
 * @extends {CProtocol<T>}
 */
class CWebTransportProtocol extends CProtocol {

}

// ============================================================================
// [PUBLIC API] ===============================================================
// ============================================================================

/**
 * Sends an HTTP POST request containing a small amount of data to a web
 * server.
 * @param {object} params The named parameters
 * @param {string} params.url Where to send the beacon.
 * @param {any | null} [params.data] The data to send with the beacon.
 * @returns {boolean} true if queued up by user agent, false otherwise.
 * @example
 * // TBD
 */
export function network_beacon({url, data}) {
  try {

    if (!runtime_query({request: QUERY_REQUEST.IsBeacon})) {
      throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
    }
    json_check_type({type: "string", data: url, should_throw: true});
    // @ts-ignore Will exist in a browser context.
    return globalThis.navigator.sendBeacon(url, data);
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("network_beacon() error.", err);
  }
}

/**
 * Provides the ability to make requests from a hosted server REST API.
 * @param {object} params The named parameters
 * @param {string} params.url The URL to the server REST API to
 * communicate.
 * @param {object} params.options The data to configure / go along with
 * the request. See the attached URL for detailed
 * @returns {Promise<CFetchResult>} The result of the request. A rejected
 * promise is an API violation.
 * @example
 * // TBD
 */
export async function network_fetch({url, options}) {
  try {
    json_check_type({type: "string", data: url, should_throw: true});
    json_check_type({type: "object", data: options, should_throw: true});
    const resp = await globalThis.fetch(url, options);
    const contentType = resp.headers.get("Content-Type") ?? "";
    const status = resp.status;
    const data = contentType.includes("application/json")
      ? await resp.json()
      : contentType.includes("form-data")
        ? await resp.formData()
        : contentType.includes("application/octet-stream")
          ? await resp.blob()
          : contentType.includes("text/")
            ? await resp.text()
            : "";
    return new CFetchResult({status: status, data: data});
  } catch (err) {
    if (json_check_type({type: CModuleError, data: err})) {
      CModuleError.handle_error(err);
      throw new CModuleError("network_connect() error.", err);
    }
    return new CFetchResult({status: -1, data: err});
  }
}
