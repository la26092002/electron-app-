import React from "react";
import User from "./components/User";
import Blogs from "./components/Blogs";
import BlogsId from "./components/BlogsId";
import Home from "./components/Home";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Error from "./components/Error";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { AddProduct } from "./components/Products/AddProduct";
import MenuAppBar from "./components/MenuAppBar";
import Buyers from "./components/Categories/Buyers";
import FormDialogProduct from "./components/Dialog/FormDialogProduct";
import FormDialogBuyer from "./components/Dialog/FormDialogBuyer";
import { Filter } from "./components/Filter/Filter";
import Benefits from "./components/Benefits/Benefits";
import FormDialogProductDelete from "./components/Dialog/FormDialogProductDelete";
import FormDialogProductUpdate from "./components/Dialog/FormDialogProductUpdate";
import Account from "./components/Acount";



export const App = () => {

  return (
    <React.Fragment>
      <FormDialogProduct />
      <FormDialogBuyer />
      <FormDialogProductDelete />
      <FormDialogProductUpdate />
      <MenuAppBar />
      <Outlet />
    </React.Fragment>
  );
};

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
      },
      
  {
    path: "acount",
    element: (
      <PrivateRoute><Account /> </PrivateRoute>
    ),
  },
      {
        path: "product",
        element: (
          <PrivateRoute><AddProduct /> </PrivateRoute>
      ),
      },
      {
        path: "ProductsFilter",
        element: (
          <PrivateRoute><Filter /> </PrivateRoute>
      ),
      },
      {
        path: "Buyers",
        element: (
          <PrivateRoute><Buyers /> </PrivateRoute>
      ),
      },
      {
        path: "Benefits",
        element: (
          <PrivateRoute><Benefits /> </PrivateRoute>
      ),
      },
      {
        path: "user",
        element: (
          <PrivateRoute>
            <User />
          </PrivateRoute>
        ),
      },
      {
        path: "blogs",
        element: (
          <PrivateRoute>
            <Blogs />
          </PrivateRoute>
        ),
      },
      {
        path: "blogs/:id",
        element: (
          <PrivateRoute>
            <BlogsId />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  }
]);
