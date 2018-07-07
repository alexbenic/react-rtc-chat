import React from "react";
import each from "jest-each";
import { render, cleanup } from "react-testing-library";
import randombytes from "randombytes";
import UserList from "../UserList";

const user = name => {
  return {
    id: randombytes(8).toString("hex"),
    nick: name,
    stream: {},
    app: 1
  };
};

afterEach(cleanup);

each([
  ["zvrk", []],
  ["zoom", [user("zoom"), user("maci")]],
  ["maci", [user("zoom"), user("zvrk"), user("zook")]]
]).test("current user %s, list of connected %j", (name, users) => {
  const { container, getByTestId } = render(
    <UserList current={user(name)} users={users} />
  );

  const userList = container.querySelectorAll("li");

  expect(userList.length).toBe(users.length);
});

test("snapshot", () => {
  const { container } = render(
    <UserList current={user("zvrk")} users={[user("maci")]} />
  );

  expect(container.firstChild).toMatchSnapshot();
});
