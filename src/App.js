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
      loading: true,
    };
    this.db = firebase.firestore();
  }

  componentDidMount() {
    this.db.collection("products").onSnapshot((snapshot) => {
      // console.log(snapshot.docs);
      // snapshot.docs.map((doc) => {
      //   console.log(doc.data());
      // });
      const products = snapshot.docs.map((doc) => {
        const data = doc.data();
        data["id"] = doc.id;
        return data;
      });

      // console.log(products);
      this.setState({
        products: products,
        loading: false,
      });
    });
  }

  handleIncreaseQty = (product) => {
    // console.log("Hangle qty++ for ", product);
    const { products } = this.state;
    const index = products.indexOf(product);

    // products[index].qty += 1;
    //
    // this.setState({
    //   products: products,
    // });

    const docRef = this.db.collection("products").doc(products[index].id);
    docRef
      .update({
        qty: products[index].qty + 1,
      })
      .then(() => {
        console.log("handleIncreaseQty -> DB Updated successfully");
      })
      .catch((err) => console.log("Error: ", err));
  };

  handleDecreaseQty = (product) => {
    // console.log("Hangle qty++ for ", product);
    const { products } = this.state;
    const index = products.indexOf(product);

    // Check if qty is not already 0
    if (products[index].qty === 0) {
      return;
    }

    // products[index].qty -= 1;
    //
    // this.setState({
    //   products: products,
    // });

    const docRef = this.db.collection("products").doc(products[index].id);
    docRef
      .update({
        qty: products[index].qty - 1,
      })
      .then(() =>{
        console.log("handleDecreaseQty -> DB Updated successfully");
      })
      .catch((err) => console.log("Error: ", err));
  };

  // Delete button handler
  handleDeleteProduct = (id) => {
    const { products } = this.state;
    // Get array of all items expect deleted one and replace in state
    // const items = products.filter((item) => item.id !== id);
    //
    // this.setState({
    //   products: items,
    // });

    const docRef = this.db.collection("products").doc(id);
    docRef
      .delete()
      .then(() =>{
        console.log("Product deleted successfully");
      })
      .catch((err) => console.log("Error: ", err));
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

  // addProduct
  addProduct = () => {
    this.db
      .collection("products")
      .add({
        price: 100,
        title: "Tomato",
        qty: 12,
        img:
          "https://images.unsplash.com/photo-1558818498-28c1e002b655?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
      })
      .then((docRef) => {
        console.log("Product has been added successfully", docRef);
      })
      .catch((err) => {
        console.log("Error : ", err);
      });
  };

  render() {
    const { products, loading } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
        <button onClick={this.addProduct} style={{ padding: 20, fontSize: 20 }}>
          Add a product
        </button>
        <Cart
          products={products}
          onIncreaseQty={this.handleIncreaseQty}
          onDecreaseQty={this.handleDecreaseQty}
          onDeleteProduct={this.handleDeleteProduct}
        />

        {loading && <h1>Loading products...</h1>}
        <div style={{ padding: 10, fontSize: 20 }}>
          {" "}
          TOTAL: {this.getCartTotal()}
        </div>
      </div>
    );
  }
}

export default App;
