import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { storeContext } from "../../context/StoreContext";
import "./PaymentPage.css";
import axios from "axios";

// Your custom function to convert number to words
const convertToWords = (num) => {
  const ones = [
    '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
    'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
  ];

  const tens = [
    '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
  ];

  const aboveThousands = [
    '', 'Thousand', 'Million', 'Billion', 'Trillion'
  ];

  if (num === 0) return 'Zero';

  let words = '';
  let i = 0; // Counter for aboveThousands array

  while (num > 0) {
    if (num % 1000 !== 0) {
      words = helper(num % 1000) + (aboveThousands[i] ? ' ' + aboveThousands[i] : '') + ' ' + words;
    }
    num = Math.floor(num / 1000);
    i++;
  }

  return words.trim();

  // Helper function for converting hundreds
  function helper(num) {
    let str = '';

    if (num > 99) {
      str += ones[Math.floor(num / 100)] + ' Hundred ';
      num %= 100;
    }

    if (num > 19) {
      str += tens[Math.floor(num / 10)] + ' ';
      num %= 10;
    }

    str += ones[num];
    return str.trim();
  }
};

const PaymentPage = () => {
  const { setCartItems, url, token } = useContext(storeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { orderDetails } = location.state || {};

  // Function to place the order
  const placeOrder = async () => {
    try {
      const response = await axios.post(`${url}/api/orders/place`, orderDetails, {
        headers: { token },
      });

      if (response.data.success) {
        alert("Payment Successful");
        setCartItems({}); // Clear cart after successful payment
        navigate("/myorders"); // Redirect to orders page
      } else {
        alert("Error placing order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error");
    }
  };

  // If orderDetails is missing, redirect to the cart page
  useEffect(() => {
    if (!orderDetails) {
      navigate("/cart"); // Redirect to cart if orderDetails are missing
    }
  }, [orderDetails, navigate]);

  // Convert the amount to words
  const amountInWords = orderDetails ? convertToWords(orderDetails.amount) : "";

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
            {/* Display the order amount in words */}
            <p><strong>Amount in words:</strong> {amountInWords} Rupees</p>
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
