import React from "react";
import styles from "./Home.module.css";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import CategorySlider from "../categorySlider/categorySlider";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <CategorySlider />
      <FeaturedProducts />
    </>
  );
}
