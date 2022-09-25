import React, { Component } from "react";
import Form from "../common/form";
import Joi from "joi-browser";
import { getGenres } from "../services/fakeGenreService";
import { saveMovie, getMovie } from "../services/fakeMovieService";
import { Redirect } from "react-router-dom";

class MovieForm extends Form {
  state = {
    data: {
      _id: "",
      title: "",
      genre: "",
      numberInStock: "",
      dailyRentalRate: "",
      genreId: "",
    },
    genres: {},
    errors: {},
  };

  componentDidMount = () => {
    const genres = getGenres();
    this.setState({ genres });

    const _id = this.props.match.params.id;

    if (!_id || _id == "new") return console.log("returned");

    if (!getMovie(_id)) return this.props.history.replace("/not-found");

    const movie = getMovie(_id);

    this.setState((state) => {
      state.data._id = movie._id;
      state.data.title = movie.title;
      state.data.genre = movie.genre.name;
      state.data.numberInStock = movie.numberInStock;
      state.data.dailyRentalRate = movie.dailyRentalRate;
      state.data.genreId = movie.genre._id;
    });
  };

  handleSelect = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = this.state.genres.find((g) => g.name === input.value);
    this.setState({
      data,
      errors,
    });
  };

  schema = {
    title: Joi.string().required().label("Username"),
    genre: Joi.string().required().label("Password"),
    numberInStock: Joi.string().required().label("Name"),
    dailyRentalRate: Joi.string().required().label("Name"),
  };

  doSubmit = () => {
    let movie = { ...this.state.data };
    movie = this.destructureMovie(movie);
    movie = saveMovie(movie);
    console.log(movie);
    return this.props.history.push("/");
  };

  destructureMovie = (movie) => {
    const genre = this.state.genres.find((g) => g.name === movie.genre);
    movie.genreId = genre["_id"];
    return movie;
  };

  render() {
    return (
      <div>
        <h1>New Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}

          <div className="form-group">
            <label htmlFor="genre">Genre</label>
            <select
              autoFocus
              name="genre"
              id="genre"
              type="text"
              value={this.state.data["genre"]}
              onChange={this.handleChange}
              error={this.state.errors["genre"]}
              className="form-control"
            >
              <option></option>
              <option>Action</option>
              <option>Comedy</option>
              <option>Thriller</option>
            </select>
            {this.state.errors.genre && (
              <div className="alert alert-danger">
                {this.state.errors.genre}
              </div>
            )}
          </div>

          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate", "number")}
          {this.renderButton("Submit")}
        </form>
      </div>
    );
  }
}

// const MovieForm = ({ match, history }) => {
//   return (
//     <div>
//       <h1>Movie Form {match.params.id}</h1>
//       <button
//         className="btn btn-primary"
//         onClick={() => history.push("/movies")}
//       >
//         Save
//       </button>
//     </div>
//   );
// };

export default MovieForm;
