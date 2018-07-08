import randombytes from 'randombytes'
const wswarm = jest.genMockFromModule("webrtc-swarm");

const stream = {
  on: jest.fn(),
  write: jest.fn()
};

const on = (event, handler) => {
  switch (event) {
    case "peer": {
      setTimeout(handler(stream, randombytes(8).toString('hex')));
      break;
    }
    default: {
      throw new Error("wswarm::Unknown event");
    }
  }
};

wswarm.on = on;
wswarm._stream = stream

module.exports = jest.fn(() => wswarm)
