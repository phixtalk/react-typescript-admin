import axios from "axios";
import React, { Component, SyntheticEvent } from "react";
import { Redirect } from "react-router-dom";
import "./Public.css";

class Register extends Component {
  first_name = "";
  last_name = "";
  email = "";
  password = "";
  password_confirm = "";
  state = {
    redirect: false,
  };

  submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      await axios.post("register", {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        password: this.password,
        password_confirm: this.password_confirm,
      });

      this.setState({ redirect: true });
    } catch (error) {
      //alert(error.message);
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={"/login"} />;
    }

    return (
      <form className="form-signin" onSubmit={this.submit}>
        <h1 className="h3 mb-3 font-weight-normal">Please register</h1>

        <label htmlFor="firstName" className="sr-only">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          className="form-control"
          placeholder="First Name"
          required
          autoFocus
          onChange={(e) => (this.first_name = e.target.value)}
        />

        <label htmlFor="lastName" className="sr-only">
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          className="form-control"
          placeholder="Last Name"
          required
          onChange={(e) => (this.last_name = e.target.value)}
        />

        <label htmlFor="inputEmail" className="sr-only">
          Email address
        </label>
        <input
          type="email"
          id="inputEmail"
          className="form-control"
          placeholder="Email address"
          required
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

        <label htmlFor="passwordConfirm" className="sr-only">
          Password Confirm
        </label>
        <input
          type="password"
          id="passwordConfirm"
          className="form-control"
          placeholder="Password"
          required
          onChange={(e) => (this.password_confirm = e.target.value)}
        />

        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Register
        </button>
      </form>
    );
  }
}

export default Register;
