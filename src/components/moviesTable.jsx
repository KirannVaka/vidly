import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faSHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRHeart } from "@fortawesome/free-regular-svg-icons";
import TableHeader from "../common/tableHeader";
import TableBody from "../common/tableBody";

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
            style={{ cursor: "pointer" }}
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

    if (moviesPaginated.length === 0) return <h1>There are no movies in DB</h1>;

    return (
      <div>
        {moviesPaginated.length > 0 && (
          <h1> Showing {moviesPaginated.length} movies in database.</h1>
        )}

        <table className="table">
          <TableHeader
            columns={this.columns}
            onSort={onSort}
            sortColumn={sortColumn}
          />
          <TableBody data={moviesPaginated} columns={this.columns} />
        </table>
      </div>
    );
  }
}

export default MoviesTable;
