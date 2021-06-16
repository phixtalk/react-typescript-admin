import axios from "axios";
import React, { PropsWithRef, SyntheticEvent } from "react";
import { Redirect } from "react-router-dom";
import { Role } from "../../interfaces/role";
import { User } from "../../interfaces/user";
import Wrapper from "../Wrapper";

class UserEdit extends React.Component<{ match: PropsWithRef<any> }> {
  //the user properties as class data to hold form field values as they change
  first_name = "";
  last_name = "";
  email = "";
  role_id = 0;
  id = 0;

  //the user properties saved in state to prefill the form fields or hold default value
  state = {
    roles: [],
    redirect: false,
    first_name: "",
    last_name: "",
    email: "",
    role_id: 0,
  };

  componentDidMount = async () => {
    this.id = this.props.match.params.id;

    const rolesCall = await axios.get("roles");

    const userCall = await axios.get(`users/${this.id}`);

    const user: User = userCall.data.data;

    this.setState({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role_id: user.role.id,
      roles: rolesCall.data.data,
    });
  };

  submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.put(`users/${this.id}`, {
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
              defaultValue={(this.first_name = this.state.first_name)}
              onChange={(e) => (this.first_name = e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="last_name"
              className="form-control"
              defaultValue={(this.last_name = this.state.last_name)}
              onChange={(e) => (this.last_name = e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              defaultValue={(this.email = this.state.email)}
              onChange={(e) => (this.email = e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Role</label>
            <select
              name="role_id"
              className="form-control"
              value={(this.role_id = this.state.role_id)}
              onChange={(e) => {
                this.role_id = parseInt(e.target.value);
                this.setState({ role_id: this.role_id });
              }}
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

export default UserEdit;
