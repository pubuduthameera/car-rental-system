import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import CarListing from "../pages/CarListing";
import CarDetails from "../pages/CarDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import Contact from "../pages/Contact";
import Rentcarlist from "../loginhome/Rentcarlist";
import Rentcar from "../loginhome/Rentcar";
import { Provider } from 'react-redux';
import store from '../assets/data/reduxStore';
import Mybooking from "../user/Mybooking";
import MyTestomonial from "../user/MyTestomonial";
import PostTestomonial from "../user/PostTestomonial";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Routers = () => {
  return (
 
<Provider store={store}>
<ToastContainer/>
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/cars" element={<CarListing />} />
      <Route path="/cars/:slug" element={<CarDetails />} />
      <Route path="/rent/:slug" element={<Rentcar />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/rentcar" element={<Rentcarlist />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/book" element={<Mybooking />} />
      <Route path="/mytestermonial" element={<MyTestomonial />} />
      <Route path="/posttestermonial" element={<PostTestomonial />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </Provider>
  );
};

export default Routers;
