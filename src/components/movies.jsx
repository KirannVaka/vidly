import { getMovies } from "../services/fakeMovieService";
import MoviesTable from "./moviesTable";
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
    selectedGenre: null,
  };

  componentDidMount() {
    const genres = [{ name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
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
      currentPage: 1,
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

    const filtered =
      selectedGenre && selectedGenre._id
        ? movies.filter((movie) => movie.genre._id === selectedGenre._id)
        : movies;

    const moviesPaginated = paginate(filtered, currentPage, pageSize);

    if (movies.length === 0) return <h1>There are no movies in DB</h1>;

    return (
      <div className="row">
        <div className="col-3 mt-5">
          <ListGroup
            items={genres}
            onItemSelect={this.handleGenreSelect}
            selectedItem={selectedGenre}
          />
        </div>
        <div className="col">
          <MoviesTable
            movies={movies}
            count={filtered.length}
            moviesPaginated={moviesPaginated}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
          />
          <Pagination
            totalItems={filtered.length}
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
