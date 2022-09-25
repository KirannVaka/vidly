import React, { Component } from "react";
import Form from "../common/form";
import Joi from "joi-browser";
import { getGenres } from "../services/fakeGenreService";
import { saveMovie } from "../services/fakeMovieService";

class NewMovieForm extends Form {
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
              onChange={this.handleChnage}
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
export default NewMovieForm;
