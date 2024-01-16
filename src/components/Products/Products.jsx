import React, { useContext } from "react";
import styles from "./Products.module.css";
import { ConterContext } from "../../Context/CounterContext";
import { Helmet } from "react-helmet";

export default function Products() {
  // let { counter, increaseCounter } = useContext(ConterContext);
  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>
      {/*
     <button onClick={increaseCounter} className="btn btn-info">
       + 
      </button>
    Products Counter : {counter}
    */}
      Products
    </>
  );
}
