import React, { Component } from "react";

const Input = ({ name, value, label, onChange }) => {
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
    </div>
  );
};

export default Input;
