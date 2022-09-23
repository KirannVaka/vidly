import React, { Component } from "react";

const Input = ({ name, value, label, onChange, errors }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>
        {label}
        <input
          autoFocus
          value={value}
          onChange={onChange}
          name={name}
          id={name}
          type="text"
          className="form-control"
        />
      </label>
      {errors && <div className="alert alert-danger">{errors}</div>}
    </div>
  );
};

export default Input;
