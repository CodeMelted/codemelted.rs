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
 * @module codemelted_hw
 */

import {
  CProtocol,
  CModuleError,
  PROTOCOL_EVENT,
  PROTOCOL_TYPE,
  json_check_type,
  runtime_query,
  QUERY_REQUEST,
} from "./codemelted_core.js";

// Module only available in a Browser runtime.
if (!runtime_query({request: QUERY_REQUEST.IsBrowser})) {
  throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
}

// ============================================================================
// [DATA DEFINITIONS] =========================================================
// ============================================================================

/**
 * @typedef {object} COrientationOptions
 * @property {number} [maximumAge] A positive long value indicating the
 * maximum age in milliseconds of a possible cached position that is
 * acceptable to return. If set to 0, it means that the device cannot use a
 * cached position and must attempt to retrieve the real current position.
 * If set to Infinity the device must return a cached position regardless of
 * its age. Default: 0.
 * @property {number} [timeout] A positive long value representing the maximum
 * length of time (in milliseconds) the device is allowed to take in order to
 * return a position. The default value is Infinity, meaning that
 * getCurrentPosition() won't return until the position is available.
 * @property {boolean} [enableHighAccuracy] boolean value that indicates the
 * application would like to receive the best possible results. If true and if
 * the device is able to provide a more accurate position, it will do so. Note
 * that this can result in slower response times or increased power
 * consumption (with a GPS chip on a mobile device for example). On the other
 * hand, if false, the device can take the liberty to save resources by
 * responding more quickly and/or using less power. Default: false.
 */

/**
 * Defined to support proper typing in the JSDocs when type checking in a
 * TypeScript environment.
 * @typedef {object} DeviceOrientationEvent
 * @property {boolean} absolute A boolean that indicates whether or not the
 * device is providing orientation data absolutely.
 * @property {number?} alpha A number representing the motion of the device
 * around the z axis, express in degrees with values ranging from 0
 * (inclusive) to 360 (exclusive).
 * @property {number?} beta A number representing the motion of the device
 * around the x axis, express in degrees with values ranging from -180
 * (inclusive) to 180 (exclusive). This represents a front to back motion of
 *  the device.
 * @property {number?} gamma A number representing the motion of the device
 * around the y axis, express in degrees with values ranging from -90
 * (inclusive) to 90 (exclusive). This represents a left to right motion of
 * the device.
 */

/**
 * The GeolocationCoordinates interface represents the position and
 * altitude of the device on Earth, as well as the accuracy with which
 * these  properties are calculated. The geographic position information is
 * provided in terms of World Geodetic System coordinates (WGS84).
 * @typedef {object} GeolocationCoordinates
 * @property {number} latitude Returns a double representing the position's
 * latitude in decimal degrees.
 * @property {number} longitude Returns a double representing the position's
 * longitude in decimal degrees.
 * @property {number | null} altitude Returns a double representing the
 * position's altitude in meters, relative to nominal sea level. This value
 * can be null if the implementation cannot provide the data.
 * @property {number} accuracy Returns a double representing the accuracy
 * of the latitude and longitude properties, expressed in meters.
 * @property {number | null} altitudeAccuracy Returns a double representing
 * the accuracy of the altitude expressed in meters. This value can be null
 * if the implementation cannot provide the data.
 * @property {number | null} heading Returns a double representing the
 * direction towards which the device is facing. This value, specified in
 * degrees, indicates how far off from heading true north the device is. 0
 * degrees represents true north, and the direction is determined clockwise
 * (which means that east is 90 degrees and west is 270 degrees). If speed
 * is 0 or the device is unable to provide heading information, heading is
 * null.
 * @property {number | null} speed Returns a double representing the
 * velocity of the device in meters per second. This value can be null.
 */

/**
 * Represents the geodetic data captured from the
 * {@link PROTOCOL_TYPE.Orientation} opened protocol.
 */
export class CGeodeticEvent {
  /** @type {Date} */
  #timestamp = new Date();
  /** @type {number} */
  #latitude = NaN;
  /** @type {number} */
  #longitude = NaN;
  /** @type {number?} */
  #altitude = null;
  /** @type {number} */
  #heading = NaN;
  /** @type {number} */
  #speed = NaN;
  /** @type {number?} */
  #alpha = null;
  /** @type {number?} */
  #beta = null;
  /** @type {number?} */
  #gamma = null;

  /** @type {number?} */
  #code;
  /** @type {string?} */
  #message;

  /**
   * The acquisition of the geolocation information failed because the page
   * didn't have the necessary permissions.
   * @readonly
   * @type {number}
   */
  static get PERMISSION_DENIED() { return 1; }

  /**
   * The acquisition of the geolocation failed because at least one internal
   * source of position returned an internal error.
   * @readonly
   * @type {number}
   */
  static get POSITION_UNAVAILABLE() { return 2; }

  /**
   * The time allowed to acquire the geolocation was reached before the
   * information was obtained.
   * @readonly
   * @type {number}
   */
  static get TIMEOUT() { return 3; }

  /**
   * The code of the error message.
   * @returns {number?}
   */
  code() { return this.#code; }

  /**
   * The message associated with the error.
   * @returns {string?}
   */
  message() { return this.#message; }

  /**
   * The time the orientation data was last updated.
   * @returns {Date}
   */
  timestamp() { return this.#timestamp; }

  /**
   * Returns a double representing the position's latitude in decimal
   * degrees.
   * @returns {number}
   */
  latitude() { return this.#latitude; }

  /**
   * Returns a double representing the position's longitude in decimal
   * degrees.
   * @returns {number}
   */
  longitude() { return this.#longitude; }

  /**
   * Returns a double representing the position's altitude in meters,
   * relative to sea level. This value can be null if the implementation
   * cannot provide the data.
   * @returns {number?}
   */
  altitude() { return this.#altitude; }

  /**
   * Returns a double representing the direction towards which the
   * device is facing. This value, specified in degrees, indicates how
   * far off from heading true north the device is. 0 degrees represents
   * true north, and the direction is determined clockwise (which means
   * that east is 90 degrees and west is 270 degrees). Null if heading could
   * not be determined. Utilize the {@link calculate_heading} in this
   * circumstance.
   * @returns {number?}
   */
  heading() { return this.#heading; }

  /**
   * Returns a double representing the velocity of the device in meters
   * per second or null if unable to be determined. Utilize the
   * {@link calculate_speed} if this occurs.
   * @return {number?}
   */
  speed() { return this.#speed; }

  /**
   * A number representing the motion of the device around the z axis,
   * express in degrees with values ranging from 0 (inclusive) to
   * 360 (exclusive).
   * @returns {number?}
   */
  alpha() { return this.#alpha; }

  /**
   * A number representing the motion of the device around the x axis,
   * expressed in degrees with values ranging from -180 (inclusive) to
   * 180 (exclusive). This represents the front to back motion of the
   * device.
   * @returns {number?}
   */
  beta() { return this.#beta; }

  /**
   * A number representing the motion of the device around the y axis,
   * expressed in degrees with values ranging from -90 (inclusive) to 90
   * (exclusive). This represents the left to right motion of the device.
   * @returns {number?}
   */
  gamma() { return this.#gamma; }

  /**
   * Determines the distance between two geodetic points.
   * @param {CGeodeticEvent} p The secondary point to determine the distance.
   * @returns {number} The distance in meters.
   */
  calculate_distance(p) {
    // Convert degrees to radians
    let lat1 = this.latitude() * Math.PI / 180.0;
    let lon1 = this.longitude() * Math.PI / 180.0;

    let lat2 = p.latitude() * Math.PI / 180.0;
    let lon2 = p.longitude() * Math.PI / 180.0;

    // radius of earth in metres
    let r = 6378100.0;

    // P
    let rho1 = r * Math.cos(lat1);
    let z1 = r * Math.sin(lat1);
    let x1 = rho1 * Math.cos(lon1);
    let y1 = rho1 * Math.sin(lon1);

    // Q
    let rho2 = r * Math.cos(lat2);
    let z2 = r * Math.sin(lat2);
    let x2 = rho2 * Math.cos(lon2);
    let y2 = rho2 * Math.sin(lon2);

    // Dot product
    let dot = x1 * x2 + y1 * y2 + z1 * z2;
    let cos_theta = dot / (r * r);
    let theta = Math.acos(cos_theta);

    // Distance in meters
    return r * theta;
  }

  /**
   * Calculates the geodetic heading.
   * @param {CGeodeticEvent} p The secondary point to determine heading.
   * @returns {number} Heading in degrees between 0 (N) - 359
   */
  calculate_heading(p) {
    // Get the initial data from our variables:
    let lat1 = this.latitude() * (Math.PI / 180.0);
    let lon1 = this.longitude() * (Math.PI / 180.0);
    let lat2 = p.latitude() * (Math.PI  / 180.0);
    let lon2 = p.longitude() * (Math.PI  / 180.0);

    // Set up our calculations
    let y = Math.sin(lon2 - lon1) * Math.cos(lat2);
    let x = (Math.cos(lat1) * Math.sin(lat2)) -
      (Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1));
    let rtnval = Math.atan2(y, x) * (180.0 / Math.PI);
    return (rtnval + 360.0) % 360.0;
  }

  /**
   * Calculates the geodetic speed.
   * @param {CGeodeticEvent} p The secondary point to determine speed.
   * @returns {number} The speed in meters per second.
   */
   calculate_speed(p) {
    let dist_meters = this.calculate_distance(p);
    let time_s = (p.timestamp().getMilliseconds() -
                  this.timestamp().getMilliseconds()) / 1000.0;
    return dist_meters / time_s;
  }

  /**
   * Updates the currently held data with the newest iteration of the data
   * set.
   * @param {DeviceOrientationEvent | GeolocationCoordinates} data  The data
   * to update with. Data not of a matching type is ignored.
   * @returns {void}
   */
  update(data) {
    let now = new Date();
    // @ts-ignore DeviceOrientationEvent part of browser runtime.
    if (data instanceof DeviceOrientationEvent) {
      this.#timestamp = now;
      // @ts-ignore data will have specified property
      this.#alpha = data.alpha;
      // @ts-ignore data will have specified property
      this.#beta = data.beta;
      // @ts-ignore data will have specified property
      this.#gamma = data.gamma;
    // @ts-ignore GeolocationCoordinates part of browser runtime.
    } else if (data instanceof GeolocationCoordinates) {
      this.#timestamp = now;
      // @ts-ignore data will have specified property
      this.#heading = data.heading;
      // @ts-ignore data will have specified property
      this.#speed = data.speed;
      // @ts-ignore data will have specified property
      this.#latitude = data.latitude;
      // @ts-ignore data will have specified property
      this.#longitude = data.longitude;
      // @ts-ignore data will have specified property
      this.#altitude = data.altitude;
    }
  }

  /**
   * Constructor for the class.
   * @param {object} params The named parameters
   * @param {number} [params.code] The error code detected
   * @param {string} [params.message] Message associated with the error.
   */
  constructor({code, message} = {}) {
    try {
      if (code && message) {
        json_check_type({type: "number", data: code, should_throw: true});
        json_check_type({type: "string", data: message, should_throw: true});
        this.#code = code;
        this.#message = message;
      } else {
        this.#code = null;
        this.#message = null;
      }
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError("CGeodeticError construction error.", err);
    }
  }
}

/**
 * Represents the data to send to a connected {@link PROTOCOL_TYPE}
 * SerialPort protocol. Supports raising High / Low signals, writing bytes,
 * and requesting a read of the current data available on the port and the
 * current signal status.
 */
export class CSerialPortData {
  /** @type {string} */
  #request;
  /** @type {boolean | Uint8Array | null} */
  #data;

  /**
   * Signals to set the BREAK signal on the serial port.
   * @type {string}
   */
  static get BREAK() { return "break"; }

  /**
   * Signals to write a series of bytes to the serial port.
   * @type {string}
   */
  static get DATA_BYTES() { return "data_bytes_write"; }

  /**
   * Signals to set the DATA_TERMINAL_READY signal on the serial port.
   * @type {string}
   */
  static get DATA_TERMINAL_READY() { return "dataTerminalReady"; }

  /**
   * Signals to set the REQUEST_TO_SEND signal on the serial port.
   * @type {string}
   */
  static get REQUEST_TO_SEND() { return "requestToSend"; }

  /**
   * Signals to query the serial port for the latest signals and any
   * available byte data on the line.
   * @type {string}
   */
  static get QUERY_DATA() { return "query_data"; }

  /**
   * The data associated with the given request.
   * @returns {boolean | Uint8Array | null}
   */
  data() { return this.#data; }

  /**
   * Identifies the request being made of the serial port.
   * @returns {string}
   */
  request() { return this.#request; }

  /**
   * Constructs a request for a {@link protocol_post_message} to an open
   * serial port protocol.
   * @param {object} params The named parameters
   * @param {string} params.request One of the request associated with this
   * object.
   * @param {boolean | Uint8Array} [params.data] The data associated with the
   * request. May only be not specified when just performing a QUERY_DATA
   * request.
   */
  constructor({request, data}) {
    try {
      if (request === CSerialPortData.BREAK ||
          request === CSerialPortData.DATA_TERMINAL_READY ||
          request === CSerialPortData.REQUEST_TO_SEND) {
        json_check_type({type: "boolean", data: data, should_throw: true});
        this.#request = request;
        // @ts-ignore json_check_type handle checking for valid boolean.
        this.#data = data;
      } else if (request === CSerialPortData.REQUEST_TO_SEND) {
        json_check_type({type: Uint8Array, data: data, should_throw: true});
        this.#request = request;
        // @ts-ignore json_check_type handle checking for valid boolean.
        this.#data = data;
      } else if (request === CSerialPortData.QUERY_DATA) {
        this.#request = request;
        this.#data = null;
      } else {
        throw new CModuleError(CModuleError.MISUSE);
      }
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError("CSerialPortData construction error.", err);
    }
  }
}

export class CSerialPortEvent {

}

// ============================================================================
// [PROTOCOL IMPLEMENTATION] ==================================================
// ============================================================================

/**
 * <mark>UNDER DEVELOPMENT</mark>
 * @private
 * @template T
 * @extends {CProtocol<T>}
 */
class CBluetoothProtocol extends CProtocol {

}




/**
 * <mark>UNDER DEVELOPMENT</mark>
 * @template T
 * @extends {CProtocol<T>}
 */
class CMidiProtocol extends CProtocol {

}

/**
 * Creates the ability to get a devices geodetic orientation
 * (GPS location, 3D orientation).
 * @extends {CProtocol<CGeodeticEvent>}
 */
export class COrientationProtocol extends CProtocol {
  /** @type {boolean} */
  static #is_created = false;
  /** @type {CGeodeticEvent} */
  #data = new CGeodeticEvent();
  /** @type {import("./codemelted_core").CEventHandler} */
  #on_device_orientation;
  /** @type {number} */
  #watch_id;

  /**
   * @inheritdoc
   * @override
   */
  terminate() {
    try {
      // @ts-ignore Object exists in browser runtime.
      globalThis.navigator.geolocation.clearWatch(this.#watch_id);
      this.#watch_id = -1;
      // @ts-ignore Object exists in browser runtime.
      globalThis.removeEventListener(
        "deviceorientation",
        this.#on_device_orientation
      );
      COrientationProtocol.#is_created = false;
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
   * @param {object} [params.options={}] Options specific to the protocol.
   * @param {import("./codemelted_core").
   *  CProtocolEventHandler<CGeodeticEvent>} params.rx_handler The handler
   * to receive data.
   */
  constructor({name, options={}, rx_handler}) {
    super({
      name: name,
      type: PROTOCOL_TYPE.Orientation,
      rx_handler: rx_handler,
    });
    try {
      if (COrientationProtocol.#is_created) {
        throw new CModuleError(
          `${CModuleError.MISUSE}: only one COrientationProtocol can exist`
        );
      }
      if (!runtime_query({request: QUERY_REQUEST.IsOrientation})) {
        throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
      }
      json_check_type({type: "object", data: options, should_throw: true});
      // @ts-ignore Object exists in browser runtime.
      this.#on_device_orientation =
        (/** @type {DeviceOrientationEvent} */ evt) => {
          this.#data.update(evt);
          this.report({
            event_fired: PROTOCOL_EVENT.Message,
            data: Object.assign({}, this.#data)
          });
      };
      // @ts-ignore Object exists in browser runtime.
      globalThis.addEventListener(
        "deviceorientation",
        this.#on_device_orientation
      );
      // @ts-ignore Property exists in browser runtime.
      this.#watch_id = globalThis.navigator.geolocation.watchPosition(
        // @ts-ignore This will work in Browser runtime.
        (/** @type {GeolocationPosition} */ evt) => {
          this.#data.update(evt.coords);
          this.report({
            event_fired: PROTOCOL_EVENT.Message,
            data: Object.assign({}, this.#data)
          });
        },
        // @ts-ignore This will work in Browser runtime.
        (/** @type {GeolocationPositionError} */evt) => {
          this.report({
            event_fired: PROTOCOL_EVENT.Error,
            data: new CGeodeticEvent({code: evt.code, message: evt.message})
          });
        },
        options
      );
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError("COrientationProtocol construction error.", err);
    }
  }
}

// /**
//  * Creates a protocol allowing communication with an attached serial port
//  * device. Provides the ability to interact with the device setting signals
//  * data, and querying the current line status of the port. This is all
//  * handled via the {@link SERIAL_PORT_DATA_REQUEST} via
//  * the post_message() call.
//  * @private
//  * @extends {CProtocol}
//  */
// class CSerialPortProtocol extends CProtocol {
//   /** @type {SerialPort} */
//   #port;

//   /**
//    * Carries out either a request for data from an open serial port or to send
//    * data to that open port.
//    * @override
//    * @param {object} params The named parameters.
//    * @param {SERIAL_PORT_DATA_REQUEST} params.request The request to make of the
//    * protocol.
//    * @param {any} [params.data] Any data associated with the given request.
//    * @returns {Promise<void>}
//    */
//   async post_message({request, data}) {
//     try {
//       let resp = null;
//       switch (request) {
//         case SERIAL_PORT_DATA_REQUEST.Break:
//           json_check_type({
//             type: "boolean",
//             data: data,
//             should_throw: true
//           });
//           await this.#port.setSignals("break", data);
//           break;
//         case SERIAL_PORT_DATA_REQUEST.CarrierDetect:
//           resp = await this.#port.getSignals();
//           this.on_data_rx({
//             state: PROTOCOL_EVENT.Message,
//             value: {carrier_detect: resp["carrierDetect"]}
//           });
//           break;
//         case SERIAL_PORT_DATA_REQUEST.ClearToSend:
//           resp = await this.#port.getSignals();
//           this.on_data_rx({
//             state: PROTOCOL_EVENT.Message,
//             value: {clear_to_send: resp["clearToSend"]}
//           });
//           break;
//         case SERIAL_PORT_DATA_REQUEST.DataBytesRead:
//           if (!this.#port.readable) {
//             this.on_data_rx({
//               state: PROTOCOL_EVENT.Message,
//               value: {data_bytes_read: new Uint8Array()}
//             });
//           }
//           const reader = this.#port.readable.getReader();
//           // @ts-ignore This will exist in the browser runtime.
//           const { value, done } = await reader.read();
//           reader.releaseLock();
//           this.on_data_rx({
//             state: PROTOCOL_EVENT.Message,
//             value: {data_bytes_read: value}
//           });
//           break;
//         case SERIAL_PORT_DATA_REQUEST.DataBytesWrite:
//           json_check_type({
//             type: Uint8Array,
//             data: data,
//             should_throw: true
//           });
//           const writer = this.#port.writable.getWriter();
//           await writer.write(data);
//           writer.releaseLock();
//           break;
//         case SERIAL_PORT_DATA_REQUEST.DataSetReady:
//           resp = await this.#port.getSignals();
//           this.on_data_rx({
//             state: PROTOCOL_EVENT.Message,
//             value: {data_set_ready: resp["dataSetReady"]}
//           });
//           break;
//         case SERIAL_PORT_DATA_REQUEST.DataTerminalReady:
//           json_check_type({
//             type: "boolean",
//             data: data,
//             should_throw: true
//           });
//           await this.#port.setSignals("dataTerminalReady", data);
//           break;
//         case SERIAL_PORT_DATA_REQUEST.RequestToSend:
//           json_check_type({
//             type: "boolean",
//             data: data,
//             should_throw: true
//           });
//           await this.#port.setSignals("requestToSend", data);
//           break;
//         case SERIAL_PORT_DATA_REQUEST.RingIndicator:
//           resp = await this.#port.getSignals();
//           this.on_data_rx({
//             state: PROTOCOL_EVENT.Message,
//             value: {ring_indicator: resp["ringIndicator"]}
//           });
//           break;
//         default:
//           throw new CModuleError(CModuleError.MISUSE);
//       }
//     } catch (err) {
//       CModuleError.handle_error(err);
//       this.report({
//         event_fired: PROTOCOL_EVENT.ModuleError,
//         data: err
//       });
//     }
//   }

//   /**
//    * @inheritdoc
//    * @override
//    */
//   terminate() {
//     try {
//       this.#port.close();
//     } catch (err) {
//       CModuleError.handle_error(err);
//       this.report({
//         event_fired: PROTOCOL_EVENT.ModuleError,
//         data: err
//       });
//     }
//   }

//   /**
//    * Constructor for the protocol.
//    * @param {object} params The named parameters.
//    * @param {CProtocolEventHandler} params.rx_handler  The receive handler
//    * for data from the protocol.
//    * @param {SerialPort} params.port The physical serial port opened by the
//    * protocol.
//    */
//   constructor({rx_handler, port}) {
//     super({
//       id: `CSerialPortProtocol_${port.getInfo().usbVendorId}` +
//       `_${[port.getInfo().usbProductId]}`,
//       rx_handler: rx_handler,
//       type: PROTOCOL_TYPE.SerialPort
//     });
//     try {
//       if (!is_defined({property: "serial",
//                                    obj: globalThis["navigator"]})) {
//         throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
//       }
//       // @ts-ignore SerialPort exists as a type in Browser context.
//       json_check_type({type: SerialPort, data: port, should_throw: true});
//       this.#port = port;
//     } catch (err) {
//       CModuleError.handle_error(err);
//       throw new CModuleError(
//         "CSerialPortProtocol construction error.",
//         err
//       );
//     }
//   }
// }

/**
 * <mark>UNDER DEVELOPMENT</mark>
 * @private
 * @template T
 * @extends {CProtocol<T>}
 */
class CUsbProtocol extends CProtocol {

}



// /**
//  * The SerialPort interface of the Web Serial API provides access to a
//  * serial port on the host device.
//  * @typedef {object} SerialPort
//  * @property {boolean} connected Returns a boolean value that indicates
//  * whether the port is logically connected to the device.
//  * @property {ReadableStream} readable Returns a ReadableStream for
//  * receiving data from the device connected to the port.
//  * @property {WritableStream} writable Returns a WritableStream for sending
//  * data to the device connected to the port.
//  * @property {function} forget Returns a Promise that resolves when access
//  * to the serial port is revoked. Calling this "forgets" the device,
//  * resetting any previously-set permissions so the calling site can no
//  * longer communicate with the port.
//  * @property {function} getInfo Returns an object containing identifying
//  * information for the device available via the port.
//  * @property {function} open Returns a Promise that resolves when the port
//  * is opened. By default the port is opened with 8 data bits, 1 stop bit
//  * and no parity checking.
//  * @property {function} setSignals Sets control signals on the port and
//  * returns a Promise that resolves when they are set.
//  * @property {function} getSignals Returns a Promise that resolves with an
//  * object containing the current state of the port's control signals.
//  * @property {function} close Returns a Promise that resolves when the port
//  * closes.
//  */

// /**
//  * Provides the support to the {@link CSerialPortProtocol.post_message} serial
//  * port communications.
//  * @enum {string}
//  * @property {string} Break Sends a break signal (boolean) to the port.
//  * @property {string} CarrierDetect Line control status of the port reported
//  * as { carrier_detect: boolean }
//  * @property {string} ClearToSend Line control status of the port reported
//  * as { clear_to_send: boolean }
//  * @property {string} DataBytesRead Read data from the serial port reported
//  * as { data_bytes_read: Uint8Array }
//  * @property {string} DataBytesWrite Writes data to the serial port.
//  * @property {string} DataSetReady Line control status of the port reported
//  * as { data_set_ready: boolean }
//  * @property {string} DataTerminalReady Sends a data terminal ready
//  * (boolean) signal to the port.
//  * @property {string} RequestToSend Sends a request to send signal
//  * (boolean) to the port.
//  * @property {string} RingIndicator Line control status of the port reported
//  * as { ring_indicator: boolean }
//  */
// export const SERIAL_PORT_DATA_REQUEST = Object.freeze({
//   Break: "break",
//   CarrierDetect: "carrier_detect",
//   ClearToSend: "clear_to_send",
//   DataBytesRead: "data_bytes_read",
//   DataBytesWrite: "data_bytes_write",
//   DataSetReady: "data_set_ready",
//   DataTerminalReady: "data_terminal_ready",
//   RequestToSend: "request_to_send",
//   RingIndicator: "ring_indicator",
// });
