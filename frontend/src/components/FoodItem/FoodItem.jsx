import React, { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { storeContext } from "../../context/StoreContext";
import { toast } from "react-toastify";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(storeContext);

  const handleQuantityChange = (e) => {
    const newQuantity = Math.max(parseInt(e.target.value, 10), 0) || 0; // Ensure it's at least 0
    const difference = newQuantity - (cartItems[id] || 0);

    if (difference > 0) {
      for (let i = 0; i < difference; i++) addToCart(id); // Add items
    } else {
      for (let i = 0; i < Math.abs(difference); i++) removeFromCart(id); // Remove items
    }
  };

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-image" src={`${url}/images/${image}`} alt={name} />
        {!cartItems[id] || cartItems[id] === 0 ? (
          <img
            onClick={() => {
              addToCart(id);
              toast.success("Product Added, View in Cart");
            }}
            className="add"
            src={assets.add_icon_white}
            alt="Add"
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => {
                removeFromCart(id);
                toast.success("Product Removed");
              }}
              src={assets.remove_icon_red}
              alt="Remove"
            />
            <input
              type="number"
              className="food-item-quantity"
              value={cartItems[id]}
              onChange={handleQuantityChange}
            />
            <img
              onClick={() => {
                addToCart(id);
              }}
              src={assets.add_icon_green}
              alt="Add More"
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">₹{price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
