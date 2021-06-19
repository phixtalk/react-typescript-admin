import axios from "axios";
import React, {
  Component,
  Dispatch,
  PropsWithChildren,
  SyntheticEvent,
} from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { User } from "../interfaces/user";
import setUser from "../redux/actions/setUserAction";
import "./Public.css";

class Login extends Component<PropsWithChildren<any>> {
  email = "";
  password = "";
  state = {
    redirect: false,
  };

  submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await axios.post("login", {
        email: this.email,
        password: this.password,
      });

      //next, attempt to get user information
      const response = await axios.get("user");

      this.props.setUser(response.data.data);

      // localStorage.setItem("token", response.data.token);
      // axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem(
      //   "token"
      // )}`;

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

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    setUser: (user: User) => dispatch(setUser(user)),
  };
};

export default connect(null, mapDispatchToProps)(Login);
