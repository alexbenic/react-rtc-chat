import React from "react";
import each from "jest-each";
import { render, cleanup, fireEvent } from "react-testing-library";
import UsernameForm from "../UsernameForm";

afterEach(cleanup);

// prettier-ignore
each([
  "zvrk",
  "zook",
  "maci",
  "mcmc",
])
.test("should submit user: %s", nick => {
  const handleSubmit = jest.fn();
  const { container, getByPlaceholderText } = render(
    <UsernameForm onSubmit={handleSubmit} />
  );

  const input = getByPlaceholderText('nick');
  const btn = container.querySelector('button')
  input.value = nick;

  fireEvent.change(input)
  fireEvent(btn, new Event("click"));

  expect(handleSubmit).toHaveBeenCalledTimes(1);
  expect(handleSubmit).toHaveBeenCalledWith(nick);
});

test("username form snapshot", () => {
  const handleSubmit = jest.fn();
  const { container } = render(<UsernameForm onSubmit={handleSubmit} />);

  expect(container).toMatchSnapshot();
});
