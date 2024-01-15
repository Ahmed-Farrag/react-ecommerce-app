import React, { useContext } from "react";
// import styles from "./Checkout.module.css";
import { useFormik } from "formik";
import { CartContext } from "../../Context/CartContext";

export default function Checkout() {
  let { onlinePayment } = useContext(CartContext);

  async function handleSubmit(values) {
    let response = await onlinePayment("65a50e20fcbff3003494dd63", values);
    if (response?.data?.status === "success") {
      window.location.href = response.data.session.url;
    }
    console.log(response);
  }

  let formik = useFormik({
    initialValues: {
      details: "",
      city: "",
      phone: "",
    },
    onSubmit: handleSubmit,
  });

  return (
    <>
      <div className="w-50 py-5 mx-auto">
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="details">details:</label>
          <input
            type="text"
            className="form-control mb-3"
            value={formik.values.details}
            onChange={formik.handleChange}
            name="details"
            id="details"
          />
          <label htmlFor="phone">phone:</label>
          <input
            type="tel"
            className="form-control"
            value={formik.values.phone}
            onChange={formik.handleChange}
            name="phone"
            id="phone"
          />
          <label htmlFor="city">City:</label>
          <input
            type="text"
            className="form-control"
            value={formik.values.city}
            onChange={formik.handleChange}
            name="city"
            id="city"
          />
          <button type="submit" className="btn border-main w-100">
            Pay
          </button>
        </form>
      </div>
    </>
  );
}
