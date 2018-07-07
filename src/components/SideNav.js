import React from "react";
import PropTypes from "prop-types";
import UserList from "./UserList";
import * as Types from "../types";

import angularLogo from "../assets/images/angular_logo.png";
import reactLogo from "../assets/images/react_logo.png";

const Counter = ({ angular, react }) => {
  return (
    <div className="flex flex-column flex-row-ns flex-none-ns h4 h3-ns ma2">
      <div className="flex flex-auto flex-column justify-center items-center pa1">
        <img src={angularLogo} className="db w3 h3" alt="angular logo" />
        <span className="tc"> {angular} </span>
      </div>
      <div className="flex flex-auto flex-column justify-center items-center p1">
        <img src={reactLogo} className="db w3 h3" alt="react logo" />
        <span> {react} </span>
      </div>
    </div>
  );
};

Counter.propTypes = {
  angular: PropTypes.number.isRequired,
  react: PropTypes.number.isRequired
};

const SideNav = ({ current, users, stats }) => {
  return (
    <aside className="w-20 pa3 flex flex-column bg-sidebar">
      <img
        className="db w-100 h4 center ofc"
        src={reactLogo}
        alt="react logo"
      />
      <span title={current.nick} className="pa2 bb bw-1 tc truncate">
        {current.nick}
      </span>
      <UserList current={current} users={users} />
      <Counter angular={stats.angular} react={stats.react} />
    </aside>
  );
};

SideNav.propTypes = {
  current: Types.User.isRequired,
  users: Types.Users,
  stats: Types.Stats
};

export default SideNav;
