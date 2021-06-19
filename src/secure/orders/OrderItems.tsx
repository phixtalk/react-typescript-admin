/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import React from "react";
import { Order } from "../../interfaces/order";
import { OrderItem } from "../../interfaces/order_item";
import Wrapper from "../Wrapper";

class OrderItems extends React.Component<{ match: any }> {
  id = 0;

  state = {
    order_items: [],
  };

  componentDidMount = async () => {
    this.id = this.props.match.params.id;

    const response = await axios.get(`orders/${this.id}`);

    const order: Order = response.data.data;

    this.setState({
      order_items: order.order_items,
    });
  };

  handleExport = async () => {
    if (window.confirm("Download record as CSV?")) {
      const response = await axios.get("export", { responseType: "blob" });
      new Blob([response.data], { type: "text/csv" });
      const downloadUrl = window.URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "orders.csv";
      link.click();
    }
  };

  render() {
    return (
      <Wrapper>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <div className="btn-toolbar mb-2 mb-md-0">
            <a
              onClick={this.handleExport}
              className="btn btn-sm btn-outline-secondary"
            >
              Export
            </a>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Product Title</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {this.state.order_items.map((order_item: OrderItem) => {
                return (
                  <tr key={order_item.id}>
                    <td>{order_item.id}</td>
                    <td>{order_item.product_title}</td>
                    <td>{order_item.price}</td>
                    <td>{order_item.quantity}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Wrapper>
    );
  }
}

export default OrderItems;
