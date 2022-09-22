import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faSHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRHeart } from "@fortawesome/free-regular-svg-icons";

const MoviesTable = (props) => {
  const { movies, count, moviesPaginated, onLike, onDelete } = props;

  if (movies.length === 0) return <h1>There are no movies in DB</h1>;

  return (
    <div>
      {movies.length > 0 && <h1> Showing {count} movies in database.</h1>}

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Genre</th>
            <th scope="col">Stock</th>
            <th scope="col">Rate</th>
          </tr>
        </thead>
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
};

export default MoviesTable;
