import React from "react";
import classnames from "classnames";
import * as Types from '../types'

const MessageList = ({ current, messages }) => {
  const nickCls = classnames(
    "b",
    "mv2",
    "b2",
    "ba",
    "bw1",
    "b--light-gray",
    "pv1",
    "ph2",
    "br3"
  );

  const itemCls = message =>
    classnames("mv1", "l-list", "pt3", "bb", "bw1", "b--light-gray", {
      tr: message.sender.id === current.id
    });

  return (
    <div className="flex-auto">
      <ul className="list pl2">
        {messages.map(message => (
          <li key={message.id} className={itemCls(message)}>
            <span className={nickCls}>{message.sender.nick}</span>
            <p className="l-list f5 ph2">{message.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

MessageList.propTypes = {
  current: Types.User.isRequired,
  messages: Types.Messages.isRequired,
}

export default MessageList;
