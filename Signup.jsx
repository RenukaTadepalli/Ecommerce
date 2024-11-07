import React, { useEffect, useState, useContext } from "react";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContextData } from "../AuthContext/Context";

const Signup = () => {
  const { signup } = useContext(AuthContextData);
  const navigate=useNavigate()
  const [userCreation, setUserCreation] = useState({
    fullName: "",
    mobile: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const userDetails = (e) => {
    const { name, value } = e.target;
    setUserCreation({
      ...userCreation,
      [name]: value,
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const values = Object.values(userCreation);
    if (values.includes("")) {
      return toast.error("Please fill in all the details.");
    }
    const response=await signup(userCreation)
    if(response){
      // console.log("successful")
      toast.success("Your account was created successfully..")
return navigate("/login")
    }
  }
  useEffect(() => {
    document.title = "signup page";
  });

  

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 signup">
      <div className="border border-secondary d-flex m-5 bg-white shadow-lg rounded">
        <div className="w-50 d-flex justify-content-center align-items-center m-4 ">
          <form className="border rounded p-5 text-center shadow-lg">
            <h1 className="mt-3"> please Signup</h1>
            <input
              type="text"
              placeholder="Enter your name"
              className="form-control mt-3 "
              name="fullName"
              onChange={userDetails}
            />
            <input
              className="form-control mt-3 "
              type="tel"
              placeholder="Enter your number"
              name="mobile"
              onChange={userDetails}
            />
            <input
              className="form-control mt-3 "
              type="email"
              placeholder="Enter your email"
              name="email"
              onChange={userDetails}
            />
            <div className="d-flex align-items-center">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                onChange={userDetails}
                className="form-control mt-3 "
              />
              {showPassword ? (
                <IoEye
                  onClick={() => setShowPassword(false)}
                  size={25}
                  className=" mt-3 ms-1"
                />
              ) : (
                <IoEyeOff
                  size={25}
                  onClick={() => setShowPassword(true)}
                  className="mt-3 ms-1"
                />
              )}
            </div>
            <button
              onClick={submitHandler}
              className="mt-3 btn btn-outline-info w-50"
            >
              Signup
            </button>
            <div className="mt-2">
              <Link className="text-decoration-none mb-3" to={"/login"}>
                Already have an acoount?{" "}
                <span className="text-danger">Login</span>
              </Link>
            </div>
            <div className="mt-2">
              <Link className="text-decoration-none text-success" to={"/"}>
                <FaArrowCircleLeft size={20} />
              </Link>
            </div>
          </form>
        </div>
        <div className="w-50 d-flex justify-content-center align-items-center">
          <img src="login image.jpg" alt="login image" width="100%" />
        </div>
      </div>
    </div>
  );
};

export default Signup;
