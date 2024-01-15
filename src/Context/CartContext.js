import axios from "axios";

const { createContext } = require("react");

export let CartContext = createContext();

export function CartContextProvider({ children }) {
  let headers = {
    token: localStorage.getItem("userToken"),
  };
  function addToCart(productId) {
    return axios
      .post(
        `https://route-ecommerce.onrender.com/api/v1/cart`,
        {
          productId,
        },
        { headers: headers }
      )
      .then((response) => response)
      .catch((error) => error);
  }
  function getLoggedUserCart() {
    return axios
      .get(
        `https://route-ecommerce.onrender.com/api/v1/cart`,

        { headers: headers }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  return (
    <CartContext.Provider value={{ addToCart, getLoggedUserCart }}>
      {children}
    </CartContext.Provider>
  );
}
