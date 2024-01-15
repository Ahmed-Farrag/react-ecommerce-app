import axios from "axios";

const { createContext } = require("react");

export let CartContext = createContext();

export function CartContextProvider({ children }) {
  let headers = {
    token: localStorage.getItem("userToken"),
  };
  async function addToCart(productId) {
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

  return (
    <CartContext.Provider value={{ addToCart }}>
      {children}
    </CartContext.Provider>
  );
}
