import React, { useContext, useEffect, useState } from "react";
import styles from "./Products.module.css";
import { ConterContext } from "../../Context/CounterContext";
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import { increase, increaseByAmount } from "../../Redux/CounterSlice.js";
import { getProducts } from "../../Redux/ProductsSlice.js";
export default function Products() {
  // let { counter, increaseCounter } = useContext(ConterContext);
  let { counter } = useSelector((state) => state.counter);
  let dispatch = useDispatch();

  const [products, setproducts] = useState([]);
  async function getProductsX() {
    let x = await dispatch(getProducts());
    setproducts(x.payload);
  }
  useEffect(() => {
    getProductsX();
  }, []);

  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>
      {products.map((product) => (
        <h2>{product.title}</h2>
      ))}
      {/*
     <button onClick={increaseCounter} className="btn btn-info">
       + 
      </button>
    Products Counter : {counter}
  */}
      <button onClick={() => dispatch(increase())}>+</button>
      <br />
      <button onClick={() => dispatch(increaseByAmount(10))}>+</button>
      Products Counter : {counter}
      Products
    </>
  );
}
