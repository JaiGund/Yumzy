import React, { useContext, useEffect, useState } from "react";
import "./Cart.css";
import { storeContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = ({ setShowLogin }) => {
  const {
    token,
    cartItems,
    food_list,
    removeFromCart,
    getTotalCartAmount,
    url,
    loadCartData
  } = useContext(storeContext);

  const [loading, setLoading] = useState(true); // Add loading state

  const navigate = useNavigate();

  const handleOrder = () => {
    toast.info("Please log in to proceed.");
    setShowLogin(true); // Open login popup
  };

  // Ensure cart data is loaded on mount
  useEffect(() => {
    if (token) {
      loadCartData(token).finally(() => setLoading(false)); // Only stop loading when data is fetched
    } else {
      setLoading(false); // If there's no token, we can directly stop loading
    }
  }, [token, loadCartData]);

  if (loading) {
    return <div>Loading cart...</div>; // Show loading indicator
  }

  return (
    <div className="cart">
      <div className="cart-items">
        Cart Items
        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={`${url}/images/${item.image}`} alt={item.name} />
                  <p>{item.name}</p>
                  <p>₹{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>₹{item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className="cross">x</p>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>

      {/* Cart Totals */}
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 40}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 40}</b>
            </div>
          </div>
          {token ? (
            <button onClick={() => navigate("/order")}>PROCEED TO CHECKOUT</button>
          ) : (
            <button onClick={handleOrder}>PROCEED TO CHECKOUT</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
