import axios from "axios";
import React, { Dispatch, Component, PropsWithChildren } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { User } from "../interfaces/user";
import setUser from "../redux/actions/setUserAction";
import Menu from "./components/Menu";
import Nav from "./components/Nav";

class Wrapper extends Component<PropsWithChildren<any>> {
  state = {
    redirect: false,
  };

  componentDidMount = async () => {
    console.log("Redux", this.props.user);
  };

  // componentDidMount = async () => {
  //   try {
  //     const response = await axios.get("user");

  //     this.props.setUser(response.data.data);
  //   } catch (e) {
  //     this.setState({
  //       redirect: true,
  //     });
  //   }
  // };

  render() {
    if (this.state.redirect) {
      return <Redirect to={"/login"} />;
    }

    return (
      <>
        <Nav />

        <div className="container-fluid">
          <div className="row">
            <Menu />

            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
              {this.props.children}
            </main>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ user }: { user: User }) => {
  return { user };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    setUser: (user: User) => dispatch(setUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);
