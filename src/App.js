import React, { Component } from "react";
import Cart from "./Cart";
import Navbar from "./Navbar";

class App extends Component {
  constructor() {
    super();
    this.state = {
      products: [
        {
          id: 1,
          price: 120,
          title: "Watch",
          qty: 2,
          img: "",
        },
        {
          id: 2,
          price: 999,
          title: "Phone",
          qty: 1,
          img: "",
        },
        {
          id: 3,
          price: 100,
          title: "Tomato",
          qty: 12,
          img: "",
        },
      ],
    };
  }
  handleIncreaseQty = (product) => {
    // console.log("Hangle qty++ for ", product);
    const { products } = this.state;
    const index = products.indexOf(product);

    products[index].qty += 1;

    this.setState({
      products: products,
    });
  };

  handleDecreaseQty = (product) => {
    // console.log("Hangle qty++ for ", product);
    const { products } = this.state;
    const index = products.indexOf(product);

    // Check if qty is not already 0
    if (products[index].qty === 0) {
      return;
    }

    products[index].qty -= 1;

    this.setState({
      products: products,
    });
  };

  // Delete button handler
  handleDeleteProduct = (id) => {
    const { products } = this.state;
    // Get array of all items expect deleted one and replace in state
    const items = products.filter((item) => item.id !== id);

    this.setState({
      products: items,
    });
  };

  render() {
    const { products } = this.state;
    return (
      <div className="App">
        <Navbar />
        <Cart
          products={products}
          onIncreaseQty={this.handleIncreaseQty}
          onDecreaseQty={this.handleDecreaseQty}
          onDeleteProduct={this.handleDeleteProduct}
        />
      </div>
    );
  }
}

export default App;
