import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Dashboard from "./components/Dashboard/Dashboard";
import Makeup from "./components/Dashboard/Makeup";
import Profile from "./components/Profile/Profile";
import Cart from "./components/Cart/Cart";
import Orders from "./components/Orders/Orders";
import Favorite from "./components/Favorite/Favorite";

const App = () => {
const[search,setSearch]=useState('');
const getSearchInput=(word)=>{
  setSearch(word)
}
console.log(search)

  return (
    <BrowserRouter>
      <Header getSearchInput={getSearchInput}/>
      <Routes>
        <Route path="/" element={<Home search={search} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/product/:id" element={<Products />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/makeup/:id" element={<Makeup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders/>} />
        <Route path="/favorites" element={<Favorite/>}/>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
