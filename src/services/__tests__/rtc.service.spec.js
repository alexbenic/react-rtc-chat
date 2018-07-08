import wswarm from "webrtc-swarm";
import randombytes from "randombytes";
import RTC from "../rtc.service";

jest.mock("webrtc-swarm");

test("rtc service starts", () => {
  const service = new RTC();
  expect(wswarm).toHaveBeenCalledTimes(1);

  const handlePeerStart = jest.fn();
  const handlePeerEnd = jest.fn();

  service.start("zvrk", handlePeerStart, handlePeerEnd);

  expect(handlePeerStart).toHaveBeenCalledTimes(1);
});

test("rtc service sends intro message on start", () => {
  const service = new RTC();
  expect(wswarm).toHaveBeenCalledTimes(2);

  const handlePeerStart = jest.fn();
  const handlePeerEnd = jest.fn();

  service.start("zvrk", handlePeerStart, handlePeerEnd);

  const write = handlePeerStart.mock.calls[0][0].stream.write;
  expect(write).toHaveBeenCalledTimes(2);
  expect(JSON.parse(write.mock.calls[0][0])).toEqual({
    type: 1,
    value: {
      nick: "zvrk",
      app: 1
    }
  });
});
