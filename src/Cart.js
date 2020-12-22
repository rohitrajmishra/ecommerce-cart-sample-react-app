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

  handleIncreaseQty = (product) => {
    // console.log("Hangle qty++ for ", product);
    const { products } = this.state;
    const index = products.indexOf(product);

    products[index].qty += 1;

    this.setState({
      products: products,
    });
  };

  render() {
    const { products } = this.state;
    return (
      <div className="cart">
        {products.map((product) => {
          return (
            <CartItem
              key={product.id}
              product={product}
              onIncreaseQty={this.handleIncreaseQty}
            />
          );
        })}
      </div>
    );
  }
}

export default Cart;
