import { getMovies } from "../services/fakeMovieService";
import MoviesTable from "./moviesTable";
import Pagination from "../common/pagination";
import { paginate } from "../utils/paginate";
import { getGenres } from "../services/fakeGenreService";
import ListGroup from "../common/listGroups";
import React, { Component } from "react";
import _ from "lodash";
import { Link, NavLink } from "react-router-dom";
import Input from "../common/input";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
    searchText: "",
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
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
      searchText: "",
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

  handleSort = (sortColumn) => {
    this.setState({
      sortColumn,
    });
  };

  getPagedData = () => {
    const {
      movies: allMovies,
      genres,
      sortColumn,
      pageSize,
      currentPage,
      selectedGenre,
    } = this.state;

    let filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((movie) => movie.genre._id === selectedGenre._id)
        : allMovies;

    filtered = this.state.searchText
      ? allMovies.filter((movie) =>
          new RegExp(this.state.searchText, "ig").test(movie.title)
        )
      : allMovies;

    console.log(filtered);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const moviesPaginated = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: moviesPaginated };
  };

  handlePageChange = (page) => {
    this.setState({
      currentPage: page,
    });
  };

  handleSearch = ({ currentTarget: input }) => {
    let selectedGenre = this.state.selectedGenre;
    if (input) selectedGenre = "";
    this.setState({
      searchText: input.value,
      selectedGenre,
    });
  };

  render() {
    const { genres, sortColumn, pageSize, currentPage, selectedGenre } =
      this.state;

    const { totalCount, data: movies } = this.getPagedData();

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
          <Link
            to="/movies/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Movie
          </Link>
          <Input
            name="search"
            label="search"
            type="text"
            placeHolder="Serach..."
            value={this.state.searchText}
            onChange={this.handleSearch}
            error={null}
          />
          <h4> Showing {totalCount} movies in database.</h4>
          <MoviesTable
            moviesPaginated={movies}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />
          <Pagination
            totalItems={totalCount}
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
