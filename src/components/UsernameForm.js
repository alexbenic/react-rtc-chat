import React, { Component } from "react";

class UsernameForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.username);
  }

  onChange(e) {
    this.setState({ username: e.target.value });
  }

  render() {
    return (
      <div className="vh-100 vw-100 flex flex-column items-center">
        <form className="flex flex-column f-form" onSubmit={this.onSubmit}>
          <span className="f2 b tc c-react"> Choose nick </span>
          <input
            tabIndex="0"
            className="mt3 mb3 outline-0 f-input br3 tc f3 pa2"
            type="text"
            onChange={this.onChange}
          />
          <button
            className="f3 w-30 center outline-0 bg-react white bn br3 pa2"
            type="submit"
          >
            Enter
          </button>
        </form>
      </div>
    );
  }
}

export default UsernameForm;
