import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faSHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRHeart } from "@fortawesome/free-regular-svg-icons";
import TableHeader from "../common/tableHeader";

class MoviesTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    { path: "like" },
    { path: "delete" },
  ];
  render() {
    const { moviesPaginated, onLike, onDelete, onSort, sortColumn } =
      this.props;

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
          <tbody>
            {moviesPaginated.map((movie) => (
              <tr key={movie.id + movie.title}>
                <td key={movie.title}>{movie.title}</td>
                <td key={movie.id + movie.genre}>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td key={movie.id}>{movie.dailyRentalRate}</td>
                <td>
                  <span onClick={() => onLike(movie)}>
                    <FontAwesomeIcon
                      style={{ cursor: "pointer" }}
                      icon={movie.movieLiked === true ? faSHeart : faRHeart}
                    />
                  </span>
                </td>
                <td key={movie.id}>
                  <button
                    key={movie._id}
                    onClick={() => onDelete(movie._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default MoviesTable;
