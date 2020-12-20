import React, { Component } from "react";

class CartItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="cart-item">
        <div className="left-block">
          <img style={styles.image} src="" alt="" />
        </div>
        <div className="right-block">
          <div>Title</div>

          <div style={{ color: "#777" }}>Price</div>

          <div style={{ color: "#777" }}>Quantity</div>

          <div className="cart-item-actions">Buttons</div>
        </div>
      </div>
    );
  }
}

const styles = {
  image: {
    height: 110,
    width: 110,
    borderRadius: 4,
    background: "#ccc",
  },
};

export default CartItem;
