import axios from "axios";

const { createContext, useEffect, useState } = require("react");

export let CartContext = createContext();

export function CartContextProvider({ children }) {
  // make productId dynamic
  const [cartId, setcartId] = useState(null);
  const [numOfCartItems, setnumOfCartItems] = useState(0);
  async function getCart() {
    let response = await getLoggedUserCart();
    if (response?.data?.status === "success") {
      setnumOfCartItems(response.data.numOfCartItems);
      setcartId(response.data.data._id);
    }
    console.log(response);
  }

  useEffect(() => {
    getCart();
  }, []);

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
        cartId,
        numOfCartItems,
        setnumOfCartItems,
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
