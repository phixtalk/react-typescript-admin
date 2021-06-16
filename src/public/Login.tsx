import axios from "axios";
import React, { Component, SyntheticEvent } from "react";
import { Redirect } from "react-router-dom";
import "./Public.css";

class Login extends Component {
  email = "";
  password = "";
  state = {
    redirect: false,
  };

  submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("login", {
        email: this.email,
        password: this.password,
      });

      localStorage.setItem("token", response.data.token);
      axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem(
        "token"
      )}`;

      this.setState({ redirect: true });
    } catch (error) {
      //alert(error.message);
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={"/"} />;
    }

    return (
      <form className="form-signin" onSubmit={this.submit}>
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label htmlFor="inputEmail" className="sr-only">
          Email address
        </label>
        <input
          type="email"
          id="inputEmail"
          className="form-control"
          placeholder="Email address"
          required
          autoFocus
          onChange={(e) => (this.email = e.target.value)}
        />
        <label htmlFor="inputPassword" className="sr-only">
          Password
        </label>
        <input
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          required
          onChange={(e) => (this.password = e.target.value)}
        />
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Sign in
        </button>
      </form>
    );
  }
}

export default Login;
