import React, { useState } from "react";
import { getMovies } from "../services/fakeMovieService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faSHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRHeart } from "@fortawesome/free-regular-svg-icons";
import { hover } from "@testing-library/user-event/dist/hover";

function Movies() {
  const [movies, setMovies] = useState(getMovies());

  const handleDelete = (id) => {
    let movieInDb = movies.find((m) => m._id === id);
    let tempMovies = [...movies];
    tempMovies.splice(movies.indexOf(movieInDb), 1);
    setMovies(tempMovies);
  };

  const handleLike = (movie) => {
    const tempMovies = [...movies];
    const index = tempMovies.indexOf(movie);
    // tempMovies[index] = { ...tempMovies[index] };
    tempMovies[index].movieLiked = !tempMovies[index].movieLiked;
    setMovies(tempMovies);
  };

  if (movies.length === 0) {
    return <h1>There are no movies in DB</h1>;
  } else {
    return (
      <React.Fragment>
        {movies.length > 0 && (
          <h1> Showing {movies.length} movies in database.</h1>
        )}

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
                <td>
                  <span onClick={() => handleLike(movie)}>
                    <FontAwesomeIcon
                      style={{ cursor: "pointer" }}
                      icon={movie.movieLiked == true ? faSHeart : faRHeart}
                    />
                  </span>
                </td>
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
