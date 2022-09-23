import React, { Component } from "react";
class LoginForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted");
  };
  render() {
    return (
      <div>
        <h1>Login Form</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">
              Username
              <input
                autoFocus
                id="username"
                type="text"
                className="form-control"
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="password">
              Password
              <input
                autoFocus
                id="password"
                type="text"
                className="form-control"
              />
            </label>
          </div>
          <button className="btn btn-primary my-2">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
