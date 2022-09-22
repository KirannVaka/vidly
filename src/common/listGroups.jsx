import React, { Component } from "react";
import _ from "lodash";

const ListGroups = (props) => {
  return (
    <ul className="list-group">
      <li style={{ cursor: "pointer" }} className="list-group-item">
        Genre
      </li>
      <li className="list-group-item">Genre</li>
    </ul>
  );
};

export default ListGroups;
