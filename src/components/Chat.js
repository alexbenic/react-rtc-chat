import React from "react";
import PropTypes from "prop-types";
import MessageList from "./MessageList";
import MessageForm from "./MessageForm";
import SideNav from "./SideNav";
import * as Types from "../types";

const Chat = ({ current, users, messages, stats, onSubmit }) => {
  return (
    <div className="flex flex-column vh-100">
      <div className="flex flex-auto">
        <SideNav current={current} users={users} stats={stats} />
        <section className="pa2 w-80 flex flex-column">
          <MessageList current={current} messages={messages} />
          <MessageForm onSubmit={onSubmit} />
        </section>
      </div>
    </div>
  );
};

Chat.propTypes = {
  current: Types.User.isRequired,
  users: Types.Users.isRequired,
  messages: Types.Messages.isRequired,
  stats: Types.Stats.isRequired,
  onSubmit: PropTypes.func
};

export default Chat;
