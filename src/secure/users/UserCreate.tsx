import axios from "axios";
import React, { SyntheticEvent } from "react";
import { Redirect } from "react-router-dom";
import { Role } from "../../interfaces/role";
import Wrapper from "../Wrapper";

class UserCreate extends React.Component {
  first_name = "";
  last_name = "";
  email = "";
  role_id = 0;

  state = {
    roles: [],
    redirect: false,
  };

  componentDidMount = async () => {
    const response = await axios.get("roles");

    this.setState({
      roles: response.data.data,
    });
  };

  submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.post("users", {
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      role_id: this.role_id,
    });

    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={"/users"} />;
    }

    return (
      <Wrapper>
        <form onSubmit={this.submit}>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="first_name"
              className="form-control"
              onChange={(e) => (this.first_name = e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="last_name"
              className="form-control"
              onChange={(e) => (this.last_name = e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              onChange={(e) => (this.email = e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Role</label>
            <select
              name="role_id"
              className="form-control"
              onChange={(e) => (this.role_id = parseInt(e.target.value))}
            >
              {this.state.roles.map((role: Role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>

          <button className="btn btn-outline-secondary">Save</button>
        </form>
      </Wrapper>
    );
  }
}

export default UserCreate;
