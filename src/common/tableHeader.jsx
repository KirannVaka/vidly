import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";

const TableHeader = ({ columns, sortColumn, onSort }) => {
  const raiseSort = (path) => {
    const sortColumnClone = { ...sortColumn };
    if (sortColumnClone.path === path) {
      sortColumnClone.order = sortColumnClone.order === "asc" ? "desc" : "asc";
    } else {
      sortColumnClone.path = path;
      sortColumnClone.order = "asc";
    }
    onSort(sortColumnClone);
  };

  const renderSortIcon = (column) => {
    if (column.path !== sortColumn.path) return null;
    return (
      <FontAwesomeIcon
        icon={sortColumn.order === "asc" ? faSortUp : faSortDown}
      />
    );
  };

  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            className="clickable"
            key={column.path || column.key}
            onClick={() => raiseSort(column.path)}
            scope="col"
          >
            {column.label} {renderSortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
