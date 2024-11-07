import axios from "axios";
import React, { createContext,useState,useEffect } from "react";
import { toast } from "react-toastify";

export const AuthContextData = createContext();
const Context = ({ children }) => {
  const API = "https://the-techie-crud.onrender.com";

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is already logged in on component mount
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token && token.token) {
      setIsLoggedIn(true);
    }
  }, []);
  const signup = async (data) => {
    try {
      const response = await axios.post(`${API}/user-creation`, data);
      if (response.data) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log(e.response.data.message);
      toast.error(e.response.data.message);
    }
  };
  const login = async (data) => {
    try {
      const response = await axios.post(`${API}/user-login`, data);

      if (response.data) {
        localStorage.setItem(
          "token",
          JSON.stringify({
            token: response.data.loginToken,
            name: response.data.fullName,
            userId:response.data._id
          })
        );
        setIsLoggedIn(true)
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log(e.response.data.message);
      toast.error(e.response.data.message);
    }
  };

  const logout=()=>{
    localStorage.removeItem("token")
    setIsLoggedIn(false)
    toast.success("logged out successfully")
  }

  const methods = {
    signup,
    login,
    logout,
    isLoggedIn
  };

  return (
    <AuthContextData.Provider value={methods}>
      {children}
    </AuthContextData.Provider>
  );
};

export default Context;
