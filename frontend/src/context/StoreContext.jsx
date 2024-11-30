import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const storeContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  // Save cart items to local storage
  const saveCartToLocalStorage = (cart) => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
  };

  // Add item to cart
  const addToCart = async (itemId) => {
    const updatedCart = {
      ...cartItems,
      [itemId]: (cartItems[itemId] || 0) + 1,
    };
    setCartItems(updatedCart);
    saveCartToLocalStorage(updatedCart);

    if (token) {
      await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } });
    }
  };  

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    const updatedCart = {
      ...cartItems,
      [itemId]: Math.max((cartItems[itemId] || 1) - 1, 0),
    };
    setCartItems(updatedCart);
    saveCartToLocalStorage(updatedCart);

    if (token) {
      await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } });
    }
  };

  // Calculate total cart amount
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  // Fetch food list
  const fetchFoodList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    setFoodList(response.data.data);
  };

  // Load cart data from the server
  const loadCartData = async (userToken) => {
    const response = await axios.post(
      `${url}/api/cart/get`,
      {},
      { headers: { token: userToken } }
    );
    setCartItems(response.data.cartData);
    saveCartToLocalStorage(response.data.cartData);
  };

  // Logout user
  const logout = () => {
    setToken("");
    // setCartItems({});
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiry");
  };

  // Set token with expiry logic
  const setTokenWithExpiry = (tokenValue) => {
    const expiryTime = Date.now() + 60 * 60 * 1000; // 50 minutes
    localStorage.setItem("token", tokenValue);
    localStorage.setItem("tokenExpiry", expiryTime.toString());
    setToken(tokenValue);
    setCartItems({}); 
  };

  // Check if token is expired
  const isTokenExpired = () => {
    const expiryTime = localStorage.getItem("tokenExpiry");
    return !expiryTime || Date.now() > parseInt(expiryTime, 10);
  };

  useEffect(() => {
    const initialize = async () => {
      await fetchFoodList();

      const storedToken = localStorage.getItem("token");
      const storedCart = localStorage.getItem("cartItems");

      if (storedToken) {
        if (isTokenExpired()) {
          logout();
        } else {
          setToken(storedToken);
          await loadCartData(storedToken);
        }
      } else if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    };

    initialize();
  }, []);

  const contextValue = {
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    food_list,
    getTotalCartAmount,
    url,
    token,
    setToken: setTokenWithExpiry,
    logout,
    loadCartData
  };

  return (
    <storeContext.Provider value={contextValue}>
      {props.children}
    </storeContext.Provider>
  );
};

export default StoreContextProvider;