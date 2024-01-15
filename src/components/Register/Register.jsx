import React, { useState } from "react";
import styles from "./Register.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Register() {
  let navigate = useNavigate(); //navigate to login
  const [isLoading, setIsLoading] = useState(false); // spinner
  const [messageError, setMessageError] = useState(""); //handle error

  async function handleRegister(values) {
    setIsLoading(true);
    await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      //  handle error
      .then((response) => {
        console.log(response);

        if (response.data.message === "success") {
          setIsLoading(false);
          setMessageError("");
          navigate("/login");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setMessageError(
          `${err.response.data.param}  ${err.response.data.message}`
        );
      });
  }

  // function validate(values) {
  //   let errors = {};
  //   if (!values.name) {
  //     errors.name = "Name is Required";
  //   } else if (values.name.length < 3) {
  //     errors.name = "Name minlegth is 3";
  //   } else if (values.name.length > 10) {
  //     errors.name = "Name maxlegth is 10";
  //   }
  //   if (!values.email) {
  //     errors.email = "email is Required";
  //   } else if (
  //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  //   ) {
  //     errors.email = "email is invaled";
  //   }
  //   if (!values.password) {
  //     errors.password = "password is Required";
  //   } else if (!/^[A-Z][a-z0-9]{5,10}$/.test(values.password)) {
  //     errors.password = "password must start with uppercase...";
  //   }
  //   if (!values.rePassword) {
  //     errors.confirmPassword = "confirm password is Required";
  //   } else if (values.password !== values.confirmPassword) {
  //     errors.confirmPassword = "password and respassword does't match";
  //   }
  //   if (!values.phone) {
  //     errors.phone = "Phone is required";
  //   } else if (!/^01[0125][0-9]{8}$/.test(values.password)) {
  //     errors.phone = "Phone must be valid egyption number ";
  //   }
  //   return errors;
  // }

  let validation = Yup.object({
    name: Yup.string()
      .required("name is required")
      .min(3, "name minlength is 3")
      .max(10, "name maxlength is 10"),
    email: Yup.string().required("email is required").email("email is invalid"),
    password: Yup.string()
      .required("password is required")
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "password must start with uppercase..."
      ),
    rePassword: Yup.string()
      .required("rePassword is required")
      .oneOf([Yup.ref("password")], "password and rePassword does't match"),
    phone: Yup.string()
      .required("phone is required")
      .matches(/^01[0125][0-9]{8}$/, "phone must valid"),
  }); // validation
  let formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      rePassword: "",
    },
    // validate,
    validationSchema: validation,
    onSubmit: handleRegister,
  });
  return (
    <>
      <div className="w-75 mx-auto py-4">
        <h3> Register Now:</h3>
        {/* for handle error */}
        {messageError.length > 0 ? (
          <div className="alert alert-danger">{messageError}</div>
        ) : null}
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            className="form-control mv-2"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
            type="text"
            name="name"
            id="name"
          />
          {formik.errors.name && formik.touched.name ? (
            <div className="alert alert-danger">{formik.errors.name}</div>
          ) : null}

          <label htmlFor="email">Email</label>
          <input
            className="form-control mv-2"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            type="emial"
            name="email"
            id="email"
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger">{formik.errors.email}</div>
          ) : null}

          <label htmlFor="password">password</label>
          <input
            className="form-control mv-2"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
            type="password"
            name="password"
            id="password"
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger">{formik.errors.password}</div>
          ) : null}

          <label htmlFor="rePassword">rePassword</label>
          <input
            className="form-control mv-2"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.rePassword}
            type="password"
            name="rePassword"
            id="rePassword"
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="alert alert-danger">{formik.errors.rePassword}</div>
          ) : null}

          <label htmlFor="phone">Phone</label>
          <input
            className="form-control mv-2"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.phone}
            type="tel"
            name="phone"
            id="phone"
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div className="alert alert-danger">{formik.errors.phone}</div>
          ) : null}

          {/* disable & submit btn */}
          {isLoading ? (
            <button type="button" className="btn bg-main text-white mt-3">
              <i className="fas fa-spinner fa-spin"></i>
            </button>
          ) : (
            <button
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
              className="btn bg-main text-white mt-3"
            >
              Register
            </button>
          )}
        </form>
      </div>
    </>
  );
}
