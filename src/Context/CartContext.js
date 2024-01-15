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
  function removeItem(productId) {
    return axios
      .delete(
        `https://route-ecommerce.onrender.com/api/v1/cart/${productId}`,

        { headers: headers }
      )
      .then((response) => response)
      .catch((error) => error);
  }
  function updateProduct(productId, count) {
    return axios
      .put(
        `https://route-ecommerce.onrender.com/api/v1/cart/${productId}`,
        { count: count },
        { headers: headers }
      )
      .then((response) => response)
      .catch((error) => error);
  }
  function onlinePayment(cartId, shippingAddress) {
    return axios
      .post(
        `https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
        { shippingAddress: shippingAddress },
        { headers: headers }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  return (
    <CartContext.Provider
      value={{
        addToCart,
        getLoggedUserCart,
        removeItem,
        updateProduct,
        onlinePayment,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
