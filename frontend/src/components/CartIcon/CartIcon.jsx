import React, { useContext } from "react";
import { storeContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets"; // Assuming you have a cart icon asset
import './CartIcon.css'
import { Link } from "react-router-dom";

const CartIcon = () => {
  const { cartItems } = useContext(storeContext);

  // Calculate the total number of items in the cart
  const totalItems = Object.values(cartItems).reduce((acc, qty) => acc + qty, 0);

  if (totalItems === 0) return null; // If no items in cart, don't render the icon

  return (
    <div className="cart-icon">
      <Link to='/cart'><img src={assets.basket_icon} alt="Cart" /></Link>
      {totalItems > 0 && (
        <div className="cart-item-count">
          {totalItems}
        </div>
      )}
      <Link to='/cart'><span className="cart-text">Proceed to Buy</span></Link>
    </div>
  );
};

export default CartIcon;
