import React, { Component } from "react";
import _ from "lodash";

const ListGroup = (props) => {
  const { items, onItemSelect, valueProperty, tetxProperty, selectedItem } =
    props;

  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          key={item[valueProperty]}
          style={{ cursor: "pointer" }}
          className={
            item == selectedItem ? "list-group-item active" : "list-group-item"
          }
          onClick={() => onItemSelect(item)}
        >
          {item[tetxProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  tetxProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
