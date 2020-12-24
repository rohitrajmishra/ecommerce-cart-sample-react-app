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
          img: "https://images.unsplash.com/photo-1461141346587-763ab02bced9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1248&q=80s",
        },
        {
          id: 2,
          price: 999,
          title: "Phone",
          qty: 1,
          img: "https://images.unsplash.com/photo-1585060544812-6b45742d762f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1059&q=80",
        },
        {
          id: 3,
          price: 100,
          title: "Tomato",
          qty: 12,
          img: "https://images.unsplash.com/photo-1558818498-28c1e002b655?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
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


  // getCartCount
  getCartCount = () => {
    const { products } = this.state;
    let count = 0;
    products.forEach((product) => {
      count += product.qty;
    })

    return count;
  }

  // getCartTotal
  getCartTotal = () => {
    const { products } = this.state;
    let cartTotal = 0;
    products.forEach((product) => {
      cartTotal += (product.qty * product.price);
    })

    return cartTotal;
  }

  render() {
    const { products } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()}/>
        <Cart
          products={products}
          onIncreaseQty={this.handleIncreaseQty}
          onDecreaseQty={this.handleDecreaseQty}
          onDeleteProduct={this.handleDeleteProduct}
        />
        <div style={{padding: 10, fontSize: 20}}> TOTAL: {this.getCartTotal()}</div>
      </div>
    );
  }
}

export default App;
