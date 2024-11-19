import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { storeContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, setCartItems, url } = useContext(storeContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const [loading, setLoading] = useState(true);

  // Fetch saved user address
  useEffect(() => {
    const fetchUserAddress = async () => {
      // if (!token) {
      //   navigate('/cart');
      //   return;
      // }

      try {
        const response = await axios.get(`${url}/api/orders/get-address`, {
          headers: { token },
        });

        if (response.data.success) {
          // Populate data with the fetched address
          setData({
            ...response.data.address,
          });
        } else {
          console.warn("No saved address found.");
        }
      } catch (error) {
        console.error("Error fetching user address:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAddress();
  }, [token, url, navigate]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  // Redirect if token or cart is empty
  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) {
      navigate('/cart');
    } 
  }, [token, getTotalCartAmount, navigate]);

  if (loading) {
    return <p>Loading...</p>; // Show a loading indicator while fetching data
  }

  const proceedToPayment = (event) => {
    event.preventDefault();

    // Gather order details
    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        orderItems.push({ ...item, quantity: cartItems[item._id] });
      }
    });

    const orderDetails = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    // Navigate to the payment page with order details
    navigate('/payment', { state: { orderDetails } });
  };


  return (
    <form className="place-order" onSubmit={proceedToPayment}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input name="firstName" required onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First Name" />
          <input name="lastName" required onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Last Name" />
        </div>
        <input name="email" required onChange={onChangeHandler} value={data.email} type="email" placeholder="Email address" />
        <input name="street" required onChange={onChangeHandler} value={data.street} type="text" placeholder="Street" />
        <div className="multi-fields">
          <input name="city" required onChange={onChangeHandler} value={data.city} type="text" placeholder="City" />
          <input name="state" required onChange={onChangeHandler} value={data.state} type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
          <input name="zipcode" required onChange={onChangeHandler} value={data.zipcode} type="text" placeholder="Zip Code" />
          <input name="country" required onChange={onChangeHandler} value={data.country} type="text" placeholder="Country" />
        </div>
        <input name="phone" required onChange={onChangeHandler} value={data.phone} type="text" placeholder="Phone" />
      </div>
      <div className="place-order-right">
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
              <p>₹{getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
