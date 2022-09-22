import React, { Component } from "react";
import _ from "lodash";

const ListGroups = (props) => {
  const { items, onItemSelect } = props;
  console.log(items);
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          key={item.name}
          style={{ cursor: "pointer" }}
          className="list-group-item"
          onClick={() => onItemSelect(item.name)}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default ListGroups;
