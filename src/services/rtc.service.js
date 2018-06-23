import wswarm from "webrtc-swarm";
import split from "split2";
import through from "through2";
import onend from "end-of-stream";
import signalhub from "signalhub";

import debug from "debug";
import { EnumMessageType, EnumApp } from "../constants";

export default class RTC {
  constructor({ chatroom = "react-vs-angular", servers } = {}) {
    this.log = debug("RVSA:RTC");
    this.chatroom = chatroom;
    this.servers = servers || ["https://signalhub-hzbibrznqa.now.sh"];
    this.swarm = wswarm(signalhub(this.chatroom, this.servers));
    this.log("swarm: ", this.swarm);
  }

  start(nick, cb, done) {
    this.swarm.on("peer", (stream, id) => {
      this.log("[PEER START]: ", id, stream);
      const msg = {
        type: EnumMessageType.INTRO,
        value: {
          nick,
          app: EnumApp.REACT
        }
      };
      this.end(stream, id, done)

      stream.write(JSON.stringify(msg) + "\n");

      cb({ id, stream });
    });
    return this.swarm.me;
  }

  message(stream, cb) {
    stream.pipe(split()).pipe(
      through((line, enc, next) => {
        const l = line.toString();
        try {
          const msg = JSON.parse(l);
          this.log("[MSG]: ", msg);
          cb(msg);
        } catch (e) {
          console.error(e);
        }
        next();
      })
    );
  }

  end(stream, id, cb) {
    onend(stream, () => {
      this.log("END %s", id);
      cb(id);
    });
  }

  close() {
    this.swarm.close();
  }
}
