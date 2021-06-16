import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { Role } from "../../interfaces/role";
import Deleter from "../components/Deleter";
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

  handleDelete = async (id: number) => {
    const roles = this.state.roles.filter((role: Role) => {
      return role.id !== id;
    });

    this.setState({ roles: roles });
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
                        to={`/roles/${role.id}/edit`}
                        className="btn btn-sm btn-outline-secondary"
                      >
                        Edit
                      </Link>
                      <Deleter
                        id={role.id}
                        endpoint={"roles"}
                        handleDelete={this.handleDelete}
                      />
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
