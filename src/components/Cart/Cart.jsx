import React, { useContext, useEffect, useState } from "react";
import styles from "./Cart.module.css";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Cart() {
  let { getLoggedUserCart, removeItem, updateProduct } =
    useContext(CartContext);

  const [cartDetails, setcartDetails] = useState(null);

  async function getCart() {
    let response = await getLoggedUserCart();
    if (response?.data?.status === "success") {
      setcartDetails(response.data.data);
    }
  }
  // delete btn
  async function deleteItem(productId) {
    let response = await removeItem(productId);
    setcartDetails(response.data.data);
    toast("product successed removed");
    // console.log(response);
  }

  // update Product Count
  async function updateProductCount(productId, count) {
    let response = await updateProduct(productId, count);
    setcartDetails(response.data.data);
    toast("product count updated");
    // console.log(response);
  }
  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      <Helmet>
        <title>Cart Details</title>
      </Helmet>
      {cartDetails !== null ? (
        <div className="bg-main-light p-4 my-4">
          <h3>Shop Cart: </h3>
          <h6 className="text-main">
            Total Cart Price: {cartDetails.totalCartPrice} EGP
          </h6>
          {cartDetails.products.map((product) => (
            <div
              key={product.product._id}
              className="row align-items-center border-bottom py-2 my-2"
            >
              <div className="col-md-1">
                <img
                  src={product.product.imageCover}
                  className="w-100"
                  alt=""
                />
              </div>
              <div className="col-md-11 d-flex justify-content-between">
                <div>
                  <h6>{product.product.title}</h6>
                  <h6 className="text-main">Price: {product.price}</h6>
                  <button
                    onClick={() => deleteItem(product.product._id)}
                    className="btn m-0 p-0"
                  >
                    <i className="fa-regular text-main fa-trash-can"></i> Remove
                  </button>
                </div>
                <div>
                  <button
                    onClick={() =>
                      updateProductCount(product.product._id, product.count + 1)
                    }
                    className="btn border-main btn-sm"
                  >
                    +
                  </button>
                  <span className="mx-2">{product.count}</span>
                  <button
                    onClick={() =>
                      updateProductCount(product.product._id, product.count - 1)
                    }
                    className="btn border-main btn-sm"
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button className="btn bg-main">
            <Link className="text-white" to={"/checkout"}>
              checkout
            </Link>
          </button>
        </div>
      ) : null}

      <p>Cart</p>
    </>
  );
}
