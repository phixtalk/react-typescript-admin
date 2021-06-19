import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { User } from "../../interfaces/user";

class Menu extends Component<{ user: User }> {
  menuItems = [
    {
      link: "/users",
      name: "Users",
    },
    {
      link: "/roles",
      name: "Roles",
    },
    {
      link: "/products",
      name: "Products",
    },
    {
      link: "/orders",
      name: "Orders",
    },
  ];

  render() {
    let menu: JSX.Element[] = [];

    /**
     * note that this if statement is very important, because of how this particular
     * project is structure. Without it, if we refresh page with F5, user.permission will be null
     * This is because, we are making an async axios call in the wrapper component to get user object
     * (instead of in the login page). the implication is that, nav and menu components (also inside wrapper)
     * are making use of user properties, which are delayed due to async, hence are not yet set
     * but the time nav and menu needs them. hence the if-statement to check if it has been set before displaying
     */
    if (this.props.user) {
      this.menuItems.forEach((item) => {
        if (
          this.props.user.permissions.some(
            (p) => p === `view_${item.name.toLowerCase()}`
          )
        ) {
          menu.push(
            <li className="nav-item" key={item.name}>
              <NavLink to={item.link} className="nav-link">
                {item.name}
              </NavLink>
            </li>
          );
        }
      });
    }

    return (
      <nav
        id="sidebarMenu"
        className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
      >
        <div className="sidebar-sticky pt-3">
          <ul className="nav flex-column">
            <li className="nav-item">
              <NavLink to={"/dashboard"} className="nav-link">
                Dashboard
              </NavLink>
            </li>
            {menu}
          </ul>
        </div>
      </nav>
    );
  }
}

export default connect(({ user }: { user: User }) => ({ user }))(Menu);
