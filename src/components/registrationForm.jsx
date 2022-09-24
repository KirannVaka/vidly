import React from "react";
import Form from "../common/form";
import Joi from "joi-browser";

class RegistartionForm extends Form {
  state = {
    data: {
      email: "",
      password: "",
      username: "",
    },
    errors: {},
  };

  schema = {
    email: Joi.string().email().required().label("Username"),
    password: Joi.string().min(5).required().label("Password"),
    username: Joi.string().required().label("Name"),
  };

  doSubmit = () => {
    console.log("submitted");

    //call the server
  };

  render() {
    return (
      <div>
        <h1>Login Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Username", "email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("username", "Name")}
          {this.renderButton("Submit")}
        </form>
      </div>
    );
  }
}

export default RegistartionForm;
