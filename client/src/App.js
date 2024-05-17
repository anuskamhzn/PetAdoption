import { Routes, Route } from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";
import HomePage from "./pages/HomePage";
import UserInfo from "./pages//Admin/userInfo";
import Helpadvice from "./pages/HelpAdvice";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FindAPet from "./pages/findAPet";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/Auth/Register";
import SRegister from "./pages/Auth/shelterRegister";
import Login from "./pages/Auth/Login";
import { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/user/Dashboard';
import PrivateRoutes from './components/Routes/Private';
import ForgotPassword from './pages/Auth/ForgotPassword';
import ChoicePage from './pages/Auth/ChoicePage';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminRoutes from './components/Routes/AdminRoutes';
import ShelterRoutes from './components/Routes/ShelterRoutes';
import ShelterDashboard from './pages/Shelter/ShelterDashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateBreed from './pages/Shelter/CreateBreed';
import CreateProduct from './pages/Shelter/CreateProduct';
import Adoption from './pages/Shelter/Adoption';
import Users from './pages/Admin/Users'; // Corrected import
import EditUser from './pages/Admin/editUser'; 
import Shelters from './pages/user/Shelters';
import ShelterPet from './pages/ShelterPet';
import Adopt from './pages/user/Adopt';
import Profile from './pages/user/Profile';
import Profiles from './pages/Shelter/Profiles';
import Products from './pages/Products';
import UpdateProduct from './pages/Shelter/UpdateProduct';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';
import Firstpage from './pages/firstPage';
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  AOS.init({
    // Global settings:
    // disable: "mobile", // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: "DOMContentLoaded", // name of the event dispatched on the document, that AOS should initialize on
    initClassName: "aos-init", // class applied after initialization
    animatedClassName: "aos-animate", // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 100, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 100, // the delay on throttle used while scrolling the page (advanced)

    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 70, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 900, // values from 0 to 3000, with step 50ms
    easing: "ease", // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
  });
  return (
    <>
      <Toaster />
      <Routes>
        {/* <Route path="/" element={<Firstpage />} /> */}
        <Route path="/" element={<HomePage />} />
        <Route path="/helpadvice" element={<Helpadvice />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/search" element={<Search />} />
        <Route path="/dashboard" element={<PrivateRoutes />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/adopt" element={<Adopt />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/shelter-list" element={<Shelters />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoutes />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/edituser/:userId" element={<EditUser />} />
        </Route>
        <Route path="/dashboard" element={<ShelterRoutes />}>
          <Route path="shelter" element={<ShelterDashboard />} />
          {/* <Route path="shelter/create-category" element={<CreateCategory />} /> */}
          <Route path="shelter/create-breed" element={<CreateBreed />} />
          <Route path="shelter/create-product" element={<CreateProduct />} />
          <Route path="shelter/product/:slug" element={<UpdateProduct />} />
          <Route path="shelter/products" element={<Products />} />
          <Route path="shelter/profiles" element={<Profiles />} />
          <Route path="shelter/adoption" element={<Adoption />} />
        </Route>
        <Route path="/choice-page" element={<ChoicePage />} />
        <Route path="/shelter/:shelterId" element={<ShelterPet />} />
        <Route path="/user-info/:userId" element={<UserInfo />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sregister" element={<SRegister />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/pet" element={<FindAPet />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
