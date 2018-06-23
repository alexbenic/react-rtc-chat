import React, { Component } from "react";
import randombytes from "randombytes";
import debug from "debug";

import { EnumRoute, EnumMessageType, EnumApp } from "./constants";
import { RTC, Notify } from "./services";
import { Chat, UsernameForm } from "./components";

import "./App.css";

/**
 * @typedef User
 * @property {string} id - random id
 * @property {string} nick - username
 * @property {WebRTCStream} stream - stream handler
 * @property {EnumApp} app - react or angular
 */

/**
 * @typedef Message
 * @property {string} id randombytes generated unique hash
 * @property {User} sender a user sending message
 * @property {string} message
 */

const adder = op => (app, state) => {
  switch (app) {
    case EnumApp.REACT: {
      return {
        ...state.stats,
        react: op ? state.stats.react + 1 : state.stats.react - 1
      };
    }
    case EnumApp.ANGULAR: {
      return {
        ...state.stats,
        angular: op ? state.stats.angular + 1 : state.stats.angular - 1
      };
    }
    default:
      throw new Error("Adder::Impossible state");
  }
};

class App extends Component {
  constructor() {
    super();
    this.log = debug("RVSA:App");
    this.state = {
      user: {},
      streams: {},
      users: [],
      messages: [],
      stats: {
        angular: 0,
        react: 1
      },
      route: EnumRoute.INTRO
    };

    this.service = new RTC();
    this.messageService = new Notify();
  }

  _handlePeers = peer => {
    this.setState({
      streams: {
        [peer.id]: peer.stream,
        ...this.state.users
      }
    });
    this.service.message(peer.stream, this._handleMessage(peer));
  };

  _handleMessage = peer => message => {
    switch (message.type) {
      case EnumMessageType.INTRO: {
        this.log("INTRO: ", message);
        this._handleIntro(peer, message.value);
        break;
      }
      case EnumMessageType.MESSAGE: {
        this.log("MESSAGE: ", message);
        this._handleChat(peer, message);
        break;
      }
      default:
        this.log("DEFAULT: ", message);
    }
  };

  _handleDisconnect = id => {
    const { users } = this.state;

    const leavingApp = users.find(user => user.id === id);
    const counter = adder(false);
    const newUsers = users.filter(user => user.id !== id);
    this.setState({
      users: newUsers,
      stats: counter(leavingApp.app, this.state)
    });
  };

  _handleIntro = (peer, user) => {
    const u = {
      id: peer.id,
      nick: user.nick,
      stream: peer.stream,
      app: user.app
    };

    if (!this.state.users.some(u => u.id === user.id)) {
      this.setState({
        users: [...this.state.users, u],
        stats: adder(true)(user.app, this.state)
      });
    }
  };

  _handleChat = (peer, message) => {
    if (this.state.messages.some(m => m.id === message.id)) {
      return;
    }
    this.setState({
      messages: [...this.state.messages, message.value]
    });
  };

  _chatInput = message => {
    const id = randombytes(8).toString("hex");
    const m = {
      id,
      sender: this.state.user,
      message
    };

    this.setState({
      messages: [...this.state.messages, m]
    });
    this.messageService.notify(this.state.users, m);
  };

  onUsernameSubmitted = username => {
    const id = this.service.start(
      username,
      this._handlePeers,
      this._handleDisconnect
    );
    this.me = {
      id,
      nick: username,
      stream: null
    };

    this.setState({
      user: this.me,
      route: EnumRoute.CHAT
    });
  };

  seeduser = () => {
    const username = randombytes(8).toString("hex");
    this.onUsernameSubmitted(username);
  };

  render() {
    const { messages, user, users, stats, route } = this.state;

    return route === EnumRoute.INTRO ? (
      <UsernameForm onSubmit={this.onUsernameSubmitted} />
    ) : (
      <Chat
        current={user}
        users={users}
        stats={stats}
        messages={messages}
        onSubmit={this._chatInput}
      />
    );
  }
}

export default App;
