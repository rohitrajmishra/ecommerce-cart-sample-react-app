import React, { Component } from "react";
import Cart from "./Cart";
import Navbar from "./Navbar";
import firebase from "firebase/app";
import "firebase/firestore";

class App extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    firebase
      .firestore()
      .collection("products")
      .get()
      .then((snapshot) => {
        // console.log(snapshot.docs);
        // snapshot.docs.map((doc) => {
        //   console.log(doc.data());
        // });
        const products = snapshot.docs.map((doc) => {
          const data = doc.data();
          data["id"] = doc.id;
          return data;
        });

        console.log(products);
        this.setState({
          products: products,
        });
      });
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
    });

    return count;
  };

  // getCartTotal
  getCartTotal = () => {
    const { products } = this.state;
    let cartTotal = 0;
    products.forEach((product) => {
      cartTotal += product.qty * product.price;
    });

    return cartTotal;
  };

  render() {
    const { products } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
        <Cart
          products={products}
          onIncreaseQty={this.handleIncreaseQty}
          onDecreaseQty={this.handleDecreaseQty}
          onDeleteProduct={this.handleDeleteProduct}
        />
        <div style={{ padding: 10, fontSize: 20 }}>
          {" "}
          TOTAL: {this.getCartTotal()}
        </div>
      </div>
    );
  }
}

export default App;
