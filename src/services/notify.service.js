import debug from "debug";
import { EnumMessageType } from "../constants";

export default class Notify {
  constructor() {
    this.log = debug("RVSA:Notify");
  }

  /**
   * Notify all other peers of new message
   * @params {string} message
   * @returns {void}
   */
  notify(users, m) {
    // sanity check
    if (!m.message.length) {
      return;
    }

    this.log("[NOTIFY]: ", users);
    users.forEach(u => this._send(u.stream, m));
  }

  /**
   * Helper method to write to stream
   * @private
   * @params {WebRTCStream} stream
   * @params {string} message
   * @returns {void}
   */
  _send(stream, message) {
    const msg = {
      type: EnumMessageType.MESSAGE,
      value: message
    };

    stream.write(JSON.stringify(msg) + "\n");
  }
}
