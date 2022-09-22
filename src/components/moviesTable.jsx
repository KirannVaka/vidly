import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faSHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRHeart } from "@fortawesome/free-regular-svg-icons";

import Table from "../common/table";

class MoviesTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <span onClick={() => this.props.onLike(movie)}>
          <FontAwesomeIcon
            className="clickable"
            icon={movie.movieLiked === true ? faSHeart : faRHeart}
          />
        </span>
      ),
    },
    {
      key: "delete",
      content: (movie) => (
        <button
          key={movie._id}
          onClick={() => this.props.onDelete(movie._id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { moviesPaginated, onSort, sortColumn } = this.props;

    return (
      <Table
        data={moviesPaginated}
        onSort={onSort}
        sortColumn={sortColumn}
        columns={this.columns}
      />
    );
  }
}

export default MoviesTable;
