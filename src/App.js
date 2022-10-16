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
import React from "react";

function App(props) {
  return (
    <React.Fragment>
      <NavBar />
      <main className="container">
        <Switch>
          <Route path="/vidly/movies/:id" component={MovieForm} />
          <Route path="/vidly/movies" component={Movies} />
          <Route path="/vidly/customers" component={Customers} />
          <Route path="/vidly/rentals" component={Rentals} />
          <Route path="/vidly/login-form" component={LoginForm} />
          <Route path="/vidly/registration-form" component={RegistartionForm} />
          <Route path="/vidly/not-found" component={notFound} />
          <Redirect from="/vidly" exact to="/movies"></Redirect>
          <Redirect to="/vidly/not-found"></Redirect>
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
