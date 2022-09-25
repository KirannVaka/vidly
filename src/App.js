import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import notFound from "./components/notFound";
import NavBar from "./common/navBar";
import Movies from "./components/movies";
import "./App.css";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegistartionForm from "./components/registrationForm";
import NewMovieForm from "./components/newMovieForm";

function App(props) {
  return (
    <React.Fragment>
      <NavBar />
      <main className="container">
        <Switch>
          <Route path="/movies/new" component={MovieForm} />
          <Route path="/movies/:id" component={MovieForm} />
          <Route path="/movies" component={Movies} />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/login-form" component={LoginForm} />
          <Route path="/registration-form" component={RegistartionForm} />
          <Route path="/not-found" component={notFound} />
          <Redirect from="/" exact to="/movies"></Redirect>
          <Redirect to="/not-found"></Redirect>
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
