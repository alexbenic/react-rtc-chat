import React from "react";

const UserList = ({ current, users }) => {
  const list = users.filter(user => user.id !== current.id);

  return (
    <div className="flex-auto mt2">
      {list.map(user => <ListItem key={user.id}>{user.nick}</ListItem>)}
    </div>
  );
};

const ListItem = ({ children }) => {
  return (
    <li className="flex items-center mt2 mb2 pb1 pt1">
      <div className="br-100 w1 h1 mr3 bg-green" />
      {children}
    </li>
  );
};

export default UserList;
