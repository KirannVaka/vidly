import React, { Component } from "react";
import Input from "../common/input";
class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
  };

  handleChnage = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({
      account,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted");
  };
  render() {
    const { account } = this.state;
    return (
      <div>
        <h1>Login Form</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            value={account.username}
            label="Username"
            onChange={this.handleChnage}
          />
          <Input
            name="password"
            value={account.password}
            label="Password"
            onChange={this.handleChnage}
          />
          <button className="btn btn-primary my-2">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
