import React from "react";
import each from "jest-each";
import { render, cleanup, fireEvent } from "react-testing-library";
import MessageForm from "../MessageForm";

afterEach(cleanup);

// prettier-ignore
each([
  "hey",
  "hello",
  "zdravo",
  "",
])
.test("form should submit message: %s", message => {
  const handleSubmit = jest.fn();
  const { container, getByPlaceholderText } = render(
    <MessageForm onSubmit={handleSubmit} />
  );

  const input = getByPlaceholderText("Type a message here then hit ENTER");
  input.value = message;

  fireEvent.change(input)
  fireEvent(container.querySelector("form"), new Event("submit"));

  expect(handleSubmit).toHaveBeenCalledTimes(1);
  expect(handleSubmit).toHaveBeenCalledWith(message);
});

test("message form snapshot", () => {
  const handleSubmit = jest.fn();
  const { container } = render(<MessageForm onSubmit={handleSubmit} />);

  expect(container).toMatchSnapshot();
});
