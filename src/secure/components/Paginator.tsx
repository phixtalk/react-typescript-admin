/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

class Paginator extends React.Component<{
  last_page: number;
  handlePageChange: any;
}> {
  page = 1;

  prev = () => {
    if (this.page === 1) return;

    this.page--;

    this.props.handlePageChange(this.page);
  };

  next = () => {
    if (this.page === this.props.last_page) return;

    this.page++;

    this.props.handlePageChange(this.page);
  };

  render() {
    return (
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
    );
  }
}

export default Paginator;
