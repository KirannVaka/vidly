import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./slect";

class Form extends Component {
  state = { data: {}, errors: {} };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  validate = () => {
    const options = {
      abortEarly: false,
      allowUnknown: true,
    };

    const { error } = Joi.validate(this.state.data, this.schema, options);

    if (!error) return null;
    const errors = {};

    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({
      data,
      errors,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({
      errors: errors || {},
    });
    if (errors) return;

    this.doSubmit();
  };

  renderButton = (label) => {
    return (
      <button disabled={this.validate()} className="btn btn-primary my-2">
        {label}
      </button>
    );
  };

  renderSelect = (name, label, options) => {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  };

  renderInput = (name, label, type = "text") => {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        label={label}
        type={type}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  };
}

export default Form;