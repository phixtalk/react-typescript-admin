/* eslint-disable jsx-a11y/anchor-is-valid */

import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { Role } from "../../interfaces/role";
import Wrapper from "../Wrapper";

class Roles extends React.Component {
  state = {
    roles: [],
  };

  componentDidMount = async () => {
    const response = await axios.get("roles");
    this.setState({
      roles: response.data.data,
    });
  };

  delete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      await axios.delete(`roles/${id}`);

      const roles = this.state.roles.filter((role: Role) => {
        return role.id !== id;
      });

      this.setState({ roles: roles });
    }
  };

  render() {
    return (
      <Wrapper>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <div className="btn-toolbar mb-2 mb-md-0">
            <Link
              to={"/roles/create"}
              className="btn btn-sm btn-outline-secondary"
            >
              Add
            </Link>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.roles.map((role: Role) => (
                <tr key={role.id}>
                  <td>{role.id}</td>
                  <td>{role.name}</td>
                  <td>
                    <div className="btn-group mr-2">
                      <Link
                        to={`/users/${role.id}/edit`}
                        className="btn btn-sm btn-outline-secondary"
                      >
                        Edit
                      </Link>
                      <a
                        style={{ cursor: "pointer" }}
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => this.delete(role.id)}
                      >
                        Delete
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Wrapper>
    );
  }
}

export default Roles;
