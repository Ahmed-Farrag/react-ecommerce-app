import React from "react";
import styles from "./Layout.module.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

export default function Layout({ UserData }) {
  return (
    <div className="pt-5">
      <Navbar UserData={UserData} />
      <div className="container mt-3">
        <Outlet></Outlet>
      </div>
      <Footer />
    </div>
  );
}
