/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { User } from "../../interfaces/user";

class Nav extends React.Component<{ user: User }> {
  state = {
    redirect: false,
  };

  handleClick = async () => {
    //localStorage.clear();
    axios.post("logout", {}); //this will clear the cookies
    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={"/login"} />;
    }

    return (
      <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="#">
          Company name
        </a>
        <ul className="my-2 my-md-0 mr-md-3">
          <Link to={"/profile"} className="p-2 text-white">
            {this.props.user &&
              this.props.user.first_name + " " + this.props.user.last_name}
          </Link>
          <a
            className="p-2 text-white"
            style={{ cursor: "pointer" }}
            onClick={this.handleClick}
          >
            Sign out
          </a>
        </ul>
      </nav>
    );
  }
}

export default connect(({ user }: { user: User }) => ({ user }))(Nav);
