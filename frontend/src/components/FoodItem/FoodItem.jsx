import React, { useContext, useState } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { storeContext } from "../../context/StoreContext";
import { toast } from 'react-toastify'

const FoodItem = ({ id, name, price, description, image }) => {
  const {cartItems,addToCart,removeFromCart,url} = useContext(storeContext)

  return (  
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-image" src={url+'/images/'+image} alt="" />
        {!cartItems[id] ? (
          <img
            onClick={() =>{ addToCart(id),toast.success('Product Added, View in Cart')}}
            className="add"
            src={assets.add_icon_white}
          ></img>
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => {
                removeFromCart(id)
                toast.success('Product Removed')
              }}
              src={assets.remove_icon_red}
              alt=""
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => {
               addToCart(id)
              }}
              src={assets.add_icon_green}
              alt=""
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">₹{price}</p>
      </div>
    </div>
  );
};

export default FoodItem;