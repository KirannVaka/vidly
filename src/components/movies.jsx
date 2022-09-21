import React, { useState } from "react";
import { getMovies } from "../services/fakeMovieService";

function Movies() {
  const [movies, setMovies] = useState(getMovies());

  const handleDelete = (id) => {
    let movieInDb = movies.find((m) => m._id === id);
    let tempMovies = [...movies];
    tempMovies.splice(movies.indexOf(movieInDb), 1);
    setMovies(tempMovies);
  };

  return (
    <React.Fragment>
      {movies.length > 0 && (
        <h1> Showing {movies.length} movies in database.</h1>
      )}
      {movies.length === 0 && <h1>There are no movies in DB</h1>}
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
          {movies.map((movie) => (
            <tr key={movie.id + movie.title}>
              <td key={movie.title}>{movie.title}</td>
              <td key={movie.id + movie.genre}>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td key={movie.id}>{movie.dailyRentalRate}</td>
              <td key={movie.id}>
                <button
                  key={movie._id}
                  onClick={() => handleDelete(movie._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
}

// class Movies extends Component {
//   state = {
//     movies: moviesList,
//   };
//   render() {
//     return <h2>{this.state.movies.length}</h2>;
//   }
// }

export default Movies;
