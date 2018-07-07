import React from "react";
import each from "jest-each";
import { render, cleanup, fireEvent } from "react-testing-library";
import randombytes from "randombytes";
import Chat from "../Chat";

beforeEach(cleanup);

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

// prettier-ignore
each([
  [ "zvrk", [], [], {angular: 0, react: 1} ],
  [ "zvrk", [], [message('anyone here?')], {angular: 0, react: 1} ],
  [ "zook" ,[user('zvrk')], [message('yo'), message('hi')], { angular: 1, react: 1 } ],
])
.test("should render chat for %s with user list: %j and message list: %j", ( nick, users, messages, stats ) => {

  const handleSubmit = jest.fn();
  const { container, getByPlaceholderText } = render(
    <Chat current={user(nick)} users={users} messages={messages} stats={stats} onSubmit={handleSubmit} />
  );

  const input = getByPlaceholderText("Type a message here then hit ENTER");
  const form = container.querySelector('form')
  input.value = 'hello';

  fireEvent.change(input)
  fireEvent(form, new Event("submit"));

  expect(handleSubmit).toHaveBeenCalledTimes(1);
  expect(handleSubmit).toHaveBeenCalledWith('hello');
});

test("chat snapshot", () => {
  const handleSubmit = jest.fn();
  const current = user("zvrk");
  const users = [user("zoom"), user("maci")];
  const messages = [message("hello")];

  const { container } = render(
    <Chat
      current={current}
      users={users}
      messages={messages}
      stats={{ angular: 1, react: 2 }}
      onSubmit={handleSubmit}
    />
  );

  expect(container).toMatchSnapshot();
});
