import React, { useContext } from "react";
import styles from "./Products.module.css";
import { ConterContext } from "../../Context/CounterContext";

export default function Products() {
  // let { counter, increaseCounter } = useContext(ConterContext);
  return (
    <>
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
