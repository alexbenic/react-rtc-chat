import React from "react";
import MessageList from "./MessageList";
import MessageForm from "./MessageForm";
import SideNav from "./SideNav";

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

export default Chat;
