import React, { useContext, useEffect } from "react"; 
import { useLocation, useNavigate } from "react-router";
import { storeContext } from "../../context/StoreContext";
import "./PaymentPage.css";
import axios from "axios";

const PaymentPage = () => {
  const { setCartItems, url, token } = useContext(storeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { orderDetails } = location.state || {};

  const placeOrder = async () => {
    try {
      const response = await axios.post(`${url}/api/orders/place`, orderDetails, {
        headers: { token },
      });

      if (response.data.success) {
        alert("Payment Successful");
        setCartItems({});
        navigate("/myorders");
      } else {
        alert("Error placing order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error");
    }
  };

  useEffect(() => {
    if (!orderDetails) {
      navigate("/cart"); // Redirect to cart if orderDetails are missing
    }
  }, [orderDetails, navigate]);

  return (
    <div className="payment-page">
      <header className="payment-header">
        <img
          src="https://i.pinimg.com/564x/8d/ec/e1/8dece15cc40aaf66ed47f6591b639d06.jpg"
          alt="Google Pay Logo"
          className="gpay-logo"
        />
      </header>

      <div className="payment-container">
        <div className="payment-card">
          <div className="payment-card-header">
            <h2>₹{orderDetails?.amount}</h2>
            <p>Paying to: <strong>Example Merchant</strong></p>
          </div>
          <div className="payment-card-body">
            <p>Transaction ID: <strong>#12345ABC</strong></p>
            <p>Payment Method: <strong>UPI</strong></p>
          </div>
          <button className="gpay-button" onClick={placeOrder}>
            Pay ₹{orderDetails?.amount}
          </button>
        </div>
      </div>

      <footer className="payment-footer">
        <p>Secured by Google Pay</p>
      </footer>
    </div>
  );
};

export default PaymentPage;
