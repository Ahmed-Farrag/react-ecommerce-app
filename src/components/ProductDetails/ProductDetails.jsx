import React, { useEffect, useState } from "react";
import styles from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import axios from "axios";
import { Helmet } from "react-helmet";

export default function ProductDetails() {
  const [productDetails, setproductDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  let params = useParams();

  const settings = {
    dots: true,
    Infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  async function getProductDetain(id) {
    setIsLoading(true);
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
    getProductDetain(data.data);
    setIsLoading(false);
  }

  useEffect(() => {
    getProductDetain(params.id);
  }, []);
  return (
    <>
      <Helmet>
        <title>Products Details</title>
      </Helmet>
      <div className="row justify-content-center align-items-center py-3">
        {isLoading ? (
          <div className="text-center">
            <i className="fas fa-spin fa-2x fa-spinner text-main"></i>
          </div>
        ) : (
          <>
            <div className="col-md-4">
              <Slider {...settings}>
                {productDetails.image.map((img) => (
                  <img src={img} alt="" />
                ))}
              </Slider>
            </div>
            <div className="col-md-8">
              <h3>{productDetails?.title}</h3>
              <p className="text-muted p-2">{productDetails?.description}</p>

              <div className="d-flex justify-content-between">
                <span className="text-muted">{productDetails?.price} EGP</span>
                <span>
                  <i className="fas fa-star rating-color">
                    {productDetails?.ratingsAverage}
                  </i>
                </span>
              </div>
              <button className="btn bg-main text-white w-100">+ Add</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
