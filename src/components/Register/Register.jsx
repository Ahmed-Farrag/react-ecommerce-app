import React from "react";
import styles from "./Register.module.css";
import { useFormik } from "formik";

export default function Register() {
  function handleRegister(values) {
    console.log(values);
  }
  let formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: handleRegister,
  });
  return (
    <>
      <div className="w-75 mx-auto py-4">
        <h3> Register Now:</h3>
        <form onSubmit={formik.handleSubmit}>
          <lable htmlFor="name">Name</lable>
          <input
            className="form-control mv-2"
            onChange={formik.handleChange}
            value={formik.values.name}
            type="text"
            name="name"
            id="name"
          />
          <lable htmlFor="email">Email</lable>
          <input
            className="form-control mv-2"
            onChange={formik.handleChange}
            value={formik.values.email}
            type="emial"
            name="email"
            id="email"
          />
          <lable htmlFor="password">password</lable>
          <input
            className="form-control mv-2"
            onChange={formik.handleChange}
            value={formik.values.password}
            type="password"
            name="password"
            id="password"
          />
          <lable htmlFor="password">rePassword</lable>
          <input
            className="form-control mv-2"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
            type="password"
            name="password"
            id="password"
          />
          <lable htmlFor="phone">Phone</lable>
          <input
            className="form-control mv-2"
            onChange={formik.handleChange}
            value={formik.values.phone}
            type="tel"
            name="phone"
            id="phone"
          />
          <button type="submit" className="btn bg-main test-white">
            Register
          </button>
        </form>
      </div>
    </>
  );
}
