import React, { Component } from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>
        {label}
        <input
          autoFocus
          {...rest}
          name={name}
          id={name}
          className="form-control"
        />
      </label>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
