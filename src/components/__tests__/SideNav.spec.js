import React from "react";
import each from "jest-each";
import { render, cleanup } from "react-testing-library";
import randombytes from "randombytes";
import SideNav from "../SideNav";

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
  ["zvrk", [], { angular: 0, react: 1 }],
  ["zoom", [user("zoom"), user("maci")], { angular: 1, react: 2 }],
  ["maci", [user("zoom"), user("zvrk"), user("zook")], { angular: 2, react: 2 }]
]).test(
  "current user %s, list of connected %j, and stats %o",
  (name, users, count) => {
    const { container, getByTestId } = render(
      <SideNav current={user(name)} users={users} stats={count} />
    );

    const currentName = getByTestId("current-nick");
    const userList = container.querySelectorAll("li");

    expect(currentName.textContent).toMatch(name);
    expect(userList.length).toBe(users.length);
  }
);

test("snapshot", () => {
  const { container, getByTestId } = render(
    <SideNav
      current={user("zvkr")}
      users={[]}
      stats={{ angular: 0, react: 1 }}
    />
  );

  expect(container.firstChild).toMatchSnapshot();
});
