import React, { useState,useEffect,useContext } from "react";
import { Link,useNavigate } from "react-router-dom";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { AuthContextData } from "../AuthContext/Context";
import { toast } from "react-toastify";


const Login = () => {
  const [showPassword,setShowPassword]=useState(false)
    useEffect(()=>{
        document.title="login page"
    })
  const {login:userLogin}=useContext(AuthContextData)
  const navigate=useNavigate()
  const [login,setLogin]=useState({
    email:"",
    password:""
  })
   
    const userDetails=(e)=>{
const {name,value}=e.target;
setLogin({
  ...login,
  [name]:value
})
    }

    const submitHandler=async (e)=>{
      e.preventDefault();
      const data = await userLogin(login);
      if (data) {
        // console.log("Login successful")
        toast.success("Login successful");
        return navigate("/")
      }
    };
   
    
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 login">
        <div className="border d-flex m-5 bg-white shadow">
      <div className="w-50 d-flex justify-content-center align-items-center ">
        <form className="border rounded p-5 text-center  shadow">
          <h1 className="mt-3"> please Login</h1>
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="form-control mt-4"
            name="email"
            onChange={userDetails}
          />
          <div className="d-flex align-items-center">
          <input 
            type={showPassword?"text":"password"} 
            placeholder="Password" 
            name="password"
            className="form-control mt-3"
            onChange={userDetails}
          />
          {showPassword?<IoEye onClick={()=>setShowPassword(false)} size={25} className="mt-3 ms-1"/>:
          <IoEyeOff size={25} onClick={()=>setShowPassword(true)} className="mt-3 ms-1"/>}
          </div>
          <button onClick={submitHandler} className="mt-3 btn btn-outline-primary w-50">Login</button>
          <p className="mt-3">Forgot Password?</p>
          <Link to={"/signup"} >Don't have an account? Create one</Link>
        </form>
      </div>
      <div className="w-50 d-flex justify-content-center align-items-center">
        <img 
          src="login-bg.png" 
          alt="login image" 
          width="100%"
        />
      </div>
    </div>
    </div>
  );
};

export default Login;