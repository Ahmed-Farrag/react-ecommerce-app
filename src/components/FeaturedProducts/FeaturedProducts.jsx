import React, { useContext, useEffect, useState } from "react";
import styles from "./FeaturedProducts.module.css";
import axios from "axios";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  // cart
  let { addToCart, setnumOfCartItems } = useContext(CartContext);

  async function addProduct(productId) {
    let response = await addToCart(productId);
    // toaster
    if (response?.data?.status === "success") {
      setnumOfCartItems(response.data.numOfCartItems);
      //
      toast.success(response.data.message, { duration: 2000 });
    } else {
      toast.error("Error", { duration: 2000 });
    }
    console.log(response);
  }
  // get products
  async function getProducts() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products`
    );
    setProducts(data.data);
  }
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className="row">
        {products.map((product) => (
          <div key={product._id} className="col-md-2">
            <div className="product cursor-pointer px-2 py-3">
              <Link to={`/productdetails/${product._id}`}>
                <img src={product.imageCover} className="w-100" alt="" />
                <span className="text-main fw-bold font-sm">
                  {product.category.name}
                </span>
                <h3 className="h6 fw-bolder">
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </h3>
                <div className="d-flex justify-content-between">
                  <span className="text-muted">{product.price} EGP</span>
                  <span>
                    <i className="fas fa-star rating-color">
                      {product.ratingsAverage}
                    </i>
                  </span>
                </div>
              </Link>
              <button
                onClick={() => addProduct(product._id)}
                className="btn bg-main text-white w-100"
              >
                + Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
