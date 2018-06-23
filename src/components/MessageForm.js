import React, { Component } from "react";

class MessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
    this.props = props;
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.text);
    this.setState({ text: "" });
  };

  onChange = e => {
    this.setState({ text: e.target.value });
    if (this.props.onChange) {
      this.props.onChange();
    }
  };

  render() {
    return (
      <div className="pt4 pb4 pl2 ma2 bt bw1 b--black-40">
        <form onSubmit={this.onSubmit} className="flex">
          <input
            type="text"
            className="flex-auto f5 fw5 bg-none b--none outline-0"
            placeholder="Type a message here then hit ENTER"
            onChange={this.onChange}
            value={this.state.text}
          />
        </form>
      </div>
    );
  }
}

export default MessageForm;
