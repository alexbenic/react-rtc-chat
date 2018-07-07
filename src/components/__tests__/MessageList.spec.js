import React from "react";
import each from "jest-each";
import { render, cleanup } from "react-testing-library";
import randombytes from "randombytes";
import MessageList from "../MessageList";

const user = name => {
  return {
    id: randombytes(8).toString("hex"),
    nick: name,
    stream: {},
    app: 1
  };
};

const message = text => {
  return {
    id: randombytes(8).toString("hex"),
    sender: user("zvrk"),
    message: text
  };
};

afterEach(cleanup);

each([
  ["zvrk", [], 0],
  ["zoom", [message("hey"), message("you pretty boi")], 2],
  ["zoom", [message("smoooth"), message("transition"), message("babe")], 3]
]).test("user %s with messages %j", (name, messages, expected) => {
  const { container } = render(
    <MessageList current={user(name)} messages={messages} />
  );

  const list = container.querySelectorAll("li");

  expect(list.length).toBe(expected);
});

test("message list snapshot", () => {
  const { container } = render(
    <MessageList current={user("zvrk")} messages={[message("yo!")]} />
  );

  expect(container).toMatchSnapshot();
});
