import React from "react";
import Menu from "./components/Menu";
import Nav from "./components/Nav";

class Wrapper extends React.Component {
  render() {
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

export default Wrapper;
