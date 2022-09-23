import Joi from "joi-browser";
import React, { Component } from "react";
import Input from "../common/input";
class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
    // if (name == "username") {
    //   if (value.trim() === "") return "Username is required";
    // }
    // if (name == "password") {
    //   if (value.trim() === "") return "Password is required";
    // }
  };

  handleChnage = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({
      account,
      errors,
    });
  };

  validate = () => {
    const options = {
      abortEarly: false,
    };
    const { error } = Joi.validate(this.state.account, this.schema, {
      abortEarly: false,
    });

    if (!error) return null;
    const errors = {};

    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;

    // console.log(result);

    // const { username, password } = this.state.account;

    // const errors = {};

    // if (username.trim() === "") errors.username = "Username is required";
    // if (password.trim() === "") errors.password = "Password is required";

    // return Object.keys(errors).length === 0 ? null : errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({
      errors: errors || {},
    });
    if (errors) return;

    console.log("submitted");

    //call the server
  };
  render() {
    const { account, errors } = this.state;
    return (
      <div>
        <h1>Login Form</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            value={account.username}
            label="Username"
            onChange={this.handleChnage}
            errors={errors.username}
          />
          <Input
            name="password"
            value={account.password}
            label="Password"
            onChange={this.handleChnage}
            errors={errors.password}
          />
          <button className="btn btn-primary my-2">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
