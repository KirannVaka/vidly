import { getMovies } from "../services/fakeMovieService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faSHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRHeart } from "@fortawesome/free-regular-svg-icons";
import Pagination from "../common/pagination";
import { paginate } from "../utils/paginate";
import { getGenres } from "../services/fakeGenreService";
import ListGroup from "../common/listGroups";
import React, { Component } from "react";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: "all",
  };

  componentDidMount() {
    this.setState({ movies: getMovies(), genres: getGenres() });
  }

  handleDelete = (id) => {
    let movie = this.state.movies.find((m) => m._id === id);
    let movies = [...this.state.movies];
    movies.splice(movies.indexOf(movie), 1);
    this.setState({
      movies,
    });
  };

  handleGenreSelect = (genre) => {
    this.setState({
      selectedGenre: genre,
    });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].movieLiked = !movies[index].movieLiked;
    this.setState({
      movies,
    });
  };

  handlePageChange = (page) => {
    this.setState({
      currentPage: page,
    });
  };

  render() {
    const { movies, genres, pageSize, currentPage, selectedGenre } = this.state;

    const moviesPaginated = paginate(movies, currentPage, pageSize);

    if (movies.length === 0) return <h1>There are no movies in DB</h1>;

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            onItemSelect={this.handleGenreSelect}
            selectedItem={selectedGenre}
          />
        </div>
        <div className="col">
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
              {moviesPaginated.map((movie) => (
                <tr key={movie.id + movie.title}>
                  <td key={movie.title}>{movie.title}</td>
                  <td key={movie.id + movie.genre}>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td key={movie.id}>{movie.dailyRentalRate}</td>
                  <td>
                    <span onClick={() => this.handleLike(movie)}>
                      <FontAwesomeIcon
                        style={{ cursor: "pointer" }}
                        icon={movie.movieLiked === true ? faSHeart : faRHeart}
                      />
                    </span>
                  </td>
                  <td key={movie.id}>
                    <button
                      key={movie._id}
                      onClick={() => this.handleDelete(movie._id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            totalItems={movies.length}
            pageSize={pageSize}
            onPgaeChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
