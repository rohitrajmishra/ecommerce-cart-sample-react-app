import React, { Component } from "react";
import CartItem from "./CartItem";

class Cart extends Component {
  render(){
    return (
      <div className="cart">
        <h1>Cart</h1>
        <CartItem />
        <CartItem />
        <CartItem />
      </div>
    )

  }
}

export default Cart;
