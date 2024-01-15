import logo from "./logo.svg";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import About from "./components/About/About";
import Categories from "./components/Categories/Categories";
import Cart from "./components/Cart/Cart";
import Login from "./components/Login//Login";
import Register from "./components/Register/Register";
import NotFound from "./components/NotFound/NotFound";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { ConterContextProvider } from "./Context/CounterContext";
import { CartContextProvider } from "./Context/CartContext";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [UserData, setUserData] = useState(null);
  function saveuserData() {
    let encodedToken = localStorage.getItem("userToken");
    let decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken);
  }

  let routers = createBrowserRouter([
    {
      path: "",
      element: <Layout UserData={UserData} />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "about",
          element: (
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },
        {
          path: "productdetails/:id",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },
        { path: "login", element: <Login saveuserData={saveuserData} /> },
        { path: "register", element: <Register /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <CartContextProvider>
      <Toaster />
      <RouterProvider router={routers}></RouterProvider>
    </CartContextProvider>
  );
}

export default App;
