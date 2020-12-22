import React, { Component } from "react";
import CartItem from "./CartItem";

class Cart extends Component {
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
  render() {
    const { products } = this.state;
    return (
      <div className="cart">
        {products.map((product) => {
          return <CartItem key={product.id} product={product}  />;
        })}
      </div>
    );
  }
}

export default Cart;
