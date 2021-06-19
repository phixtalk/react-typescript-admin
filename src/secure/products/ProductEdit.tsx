import axios from "axios";
import React, { SyntheticEvent } from "react";
import { Redirect } from "react-router-dom";
import { Product } from "../../interfaces/product";
import ImageUpload from "../components/ImageUpload";
import Wrapper from "../Wrapper";

class ProductEdit extends React.Component<{ match: any }> {
  title = "";
  description = "";
  image = "";
  price = 0;
  id = 0;

  state = { redirect: false, image: "", title: "", description: "", price: 0 };

  componentDidMount = async () => {
    this.id = this.props.match.params.id;
    const response = await axios.get(`products/${this.id}`);

    const product: Product = response.data.data;

    this.setState({
      title: product.title,
      description: product.description,
      image: product.image,
      price: product.price,
    });
  };

  submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.put(`products/${this.id}`, {
      title: this.state.title,
      description: this.state.description,
      image: this.state.image,
      price: this.state.price,
    });

    this.setState({
      redirect: true,
    });
  };

  imageChanged = (image: string) => {
    this.image = image;
    this.setState({
      image: this.image,
    });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={"/products"} />;
    }

    return (
      <Wrapper>
        <form onSubmit={this.submit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              onChange={(e) => {
                this.setState({ title: e.target.value });
              }}
              defaultValue={this.state.title}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              className="form-control"
              onChange={(e) => {
                this.setState({ description: e.target.value });
              }}
              defaultValue={this.state.description}
            ></textarea>
          </div>

          <div className="form-group">
            <label>Image</label>
            <ImageUpload
              image={(this.image = this.state.image)}
              imageChanged={this.imageChanged}
            />
          </div>

          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              name="price"
              className="form-control"
              onChange={(e) => {
                this.price = parseFloat(e.target.value);
                this.setState({ price: this.price });
              }}
              value={(this.price = this.state.price)}
            />
          </div>

          <button className="btn btn-outline-secondary">Save</button>
        </form>
      </Wrapper>
    );
  }
}

export default ProductEdit;
