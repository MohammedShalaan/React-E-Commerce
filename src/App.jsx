// import { Children, useState } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import React from 'react';

import "./../node_modules/@fortawesome/fontawesome-free/css/all.min.css"
import './../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
import "./context/ContextCounter";

import Layout from './pages/Layout/Layout';
import ContactUs from './pages/ContactUs/ContactUs';
import About from './pages/about/About';
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Cart from "./pages/Cart/Cart";
import Categores from "./pages/Categores/Categores";
import Brands from "./pages/Brands/Brands";
import Product from "./pages/Product/Product";
import ProductDetils from "./pages/ProductDetils/ProductDetils";
import ProtectetRouting from "./protection/Protectionroute";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import ResetCode from "./pages/ResetCode/ResetCode";
import VerifyResetCode from "./pages/VerifyResetCode/VerifyResetCode";
import Checkout from "./pages/Checkout/Checkout";
import allorders from "./pages/allorders/allorders";
import PageNotFound from "./pages/PageNotFound/PageNotFound";



import CounterContextProvider from "./context/ContextCounter";
import UserContextProvider from "./context/UserContext";
import CardContextProvider from "./context/CardContext";

function App() {


  let router = createBrowserRouter([{
    path: '', element: <Layout />,
    children: [

      { path: 'contact', element: <ContactUs /> },
      { path: "about", element: <About /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "ForgetPassword", element: <ForgetPassword /> },
      { path: "ResetCode", element: <ResetCode /> },
      { path: "VerifyResetCode", element: <VerifyResetCode /> },
      { path: "Checkout", element: <ProtectetRouting><Checkout /> </ProtectetRouting> },
      { path: "allorders", element: <ProtectetRouting><allorders /> </ProtectetRouting> },
      { path: "/", element: <ProtectetRouting><Home /> </ProtectetRouting> },
      { path: "React-E-Commerce", element: <ProtectetRouting><Home /> </ProtectetRouting> },
      { path: "cart", element: <ProtectetRouting><Cart /></ProtectetRouting> },
      { path: "Categores", element: <ProtectetRouting><Categores /></ProtectetRouting> },
      { path: "Brands", element: <ProtectetRouting><Brands /></ProtectetRouting> },
      { path: "Product", element: <ProtectetRouting><Product /></ProtectetRouting> },
      { path: "ProductDetils/:id", element: <ProtectetRouting><ProductDetils /></ProtectetRouting> },

      { path: "*", element: <PageNotFound /> },
    ],
  },
  ]);


  return (
    <UserContextProvider>
      <CardContextProvider>
        <CounterContextProvider>
          <RouterProvider router={router}></RouterProvider>
        </CounterContextProvider>
      </CardContextProvider>
    </UserContextProvider>



  );
}

export default App
