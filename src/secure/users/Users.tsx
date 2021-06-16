/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { User } from "../../interfaces/user";
import Wrapper from "../Wrapper";

class Users extends React.Component {
  state = {
    users: [],
  };

  page = 1;
  last_page = 0;

  componentDidMount = async () => {
    const response = await axios.get(`users?page=${this.page}`);

    this.setState({
      users: response.data.data,
    });

    this.last_page = response.data.meta.last_page;
  };

  prev = async () => {
    if (this.page === 1) return;

    this.page--;

    await this.componentDidMount();
  };

  next = async () => {
    if (this.page === this.last_page) return;

    this.page++;

    await this.componentDidMount();
  };

  delete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      await axios.delete(`users/${id}`);

      const users = this.state.users.filter((user: User) => {
        return user.id !== id;
      });

      this.setState({ users: users });
    }
  };

  render() {
    return (
      <Wrapper>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <div className="btn-toolbar mb-2 mb-md-0">
            <Link
              to={"/users/create"}
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
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.users.map((user: User) => {
                return (
                  <tr>
                    <td>{user.id}</td>
                    <td>{`${user.first_name} ${user.last_name}`}</td>
                    <td>{user.email}</td>
                    <td>{user.role.name}</td>
                    <td>
                      <div className="btn-group mr-2">
                        <Link
                          to={`/users/${user.id}/edit`}
                          className="btn btn-sm btn-outline-secondary"
                        >
                          Edit
                        </Link>
                        <a
                          style={{ cursor: "pointer" }}
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => this.delete(user.id)}
                        >
                          Delete
                        </a>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <nav>
          <ul className="pagination">
            <li className="page-item">
              <a
                style={{ cursor: "pointer" }}
                className="page-link"
                onClick={this.prev}
              >
                Previous
              </a>
            </li>
            <li className="page-item">
              <a
                style={{ cursor: "pointer" }}
                onClick={this.next}
                className="page-link"
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </Wrapper>
    );
  }
}

export default Users;
