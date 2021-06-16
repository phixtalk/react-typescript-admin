import axios from "axios";
import React, { PropsWithRef, SyntheticEvent } from "react";
import { Redirect } from "react-router-dom";
import { Permission } from "../../interfaces/permission";
import { Role } from "../../interfaces/role";
import Wrapper from "../Wrapper";

class RoleEdit extends React.Component<{ match: PropsWithRef<any> }> {
  state = {
    name: "",
    selected: [],
    permissions: [],
    redirect: false,
  };
  name = "";
  id = 0;
  selected: number[] = [];

  componentDidMount = async () => {
    this.id = this.props.match.params.id;

    const permissionCall = await axios.get("permissions");

    const roleCall = await axios.get(`roles/${this.id}`);

    const role: Role = roleCall.data.data;

    this.selected = role.permissions.map((p: Permission) => {
      return p.id;
    });

    this.setState({
      name: role.name,
      selected: this.selected,
      permissions: permissionCall.data.data,
    });
  };

  submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.put(`roles/${this.id}`, {
      name: this.name,
      permissions: this.selected,
    });

    this.setState({
      redirect: true,
    });
  };

  check = (id: number) => {
    if (this.selected.includes(id)) {
      //if item is in array, remove it
      this.selected = this.selected.filter((item) => item !== id);
      return;
    }

    this.selected.push(id);
  };

  isChecked = (id: number) => {
    return this.selected.includes(id);
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={"/roles"} />;
    }

    return (
      <Wrapper>
        <form onSubmit={this.submit}>
          <div className="form-group row">
            <label htmlFor="name" className="col-sm-2 col-form-label">
              Name
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
                defaultValue={(this.name = this.state.name)}
                onChange={(e) => (this.name = e.target.value)}
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="permissions" className="col-sm-2 col-form-label">
              Permissions
            </label>
            <div className="col-sm-10">
              {this.state.permissions.map((p: Permission) => {
                return (
                  <div
                    className="form-check form-check-inline col-3"
                    key={p.id}
                  >
                    <input
                      type="checkbox"
                      name="permissions[]"
                      id="permissions"
                      className="form-check-input"
                      value={p.id}
                      defaultChecked={this.isChecked(p.id)}
                      onChange={(e) => this.check(p.id)}
                    />
                    <label className="form-check-lable">{p.name}</label>
                  </div>
                );
              })}
            </div>
          </div>

          <button className="btn btn-outline-secondary">Save</button>
        </form>
      </Wrapper>
    );
  }
}

export default RoleEdit;
