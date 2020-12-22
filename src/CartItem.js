import React, { Component } from "react";

class CartItem extends Component {
  render() {
    // console.log('props', this.props);
    // const { title, price, qty, img } = this.state;
    const { title, price, qty, img } = this.props.product;
    const { product, onIncreaseQty, onDecreaseQty, onDeleteProduct } = this.props;
    return (
      <div className="cart-item">
        <div className="left-block">
          <img style={styles.image} src={img} alt="" />
        </div>
        <div className="right-block">
          <div style={{ fontSize: 25 }}>{title}</div>
          <div style={{ color: "#777" }}>Rs. {price}</div>
          <div style={{ color: "#777" }}>Qty: {qty}</div>

          <div className="cart-item-actions">
            <img
              onClick={() => onIncreaseQty(product)}
              src="https://www.flaticon.com/svg/static/icons/svg/149/149145.svg"
              className="action-icons"
              alt="increase"
            />
            <img
              onClick={() => onDecreaseQty(product)}
              src="https://www.flaticon.com/svg/static/icons/svg/992/992683.svg"
              className="action-icons"
              alt="decrease"
            />
            <img
              onClick={() => onDeleteProduct(product.id)}
              src="https://www.flaticon.com/svg/static/icons/svg/1214/1214428.svg"
              className="action-icons"
              alt="delete"
            />
          </div>
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
