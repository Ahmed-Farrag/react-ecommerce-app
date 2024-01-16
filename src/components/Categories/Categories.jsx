import React from "react";
import styles from "./Categories.module.css";
import { Helmet } from "react-helmet";
import CategorySlider from "../categorySlider/categorySlider";

export default function Categories() {
  return (
    <>
      <Helmet>
        <title>Categories</title>
      </Helmet>
      <CategorySlider />
    </>
  );
}
