import React,{useState,useEffect,useRef} from 'react'
import { AiFillAmazonSquare } from "react-icons/ai";
import { Link,useNavigate } from 'react-router-dom';
import { IoCartSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { toast } from 'react-toastify';

const Header = ({getSearchInput}) => {
  const navigate=useNavigate()
const searchRef=useRef();
// console.log(searchRef)

  const getData=JSON.parse(localStorage.getItem("token"));
  const[data,setData]=useState({})
  useEffect(()=>{
setData(getData)
  },[getData?.token])
  const handleLogout = () => {
    localStorage.removeItem("token");
    setData({});
    toast.success("you have successfully logged out")
    // Reload the page after logging out
    navigate("/login");
  };

const searchHandler=()=>{
   getSearchInput(searchRef.current.value)
   searchRef.current.value=""
 
}

// useEffect(() => {
//   if (serachRef.current && serachRef.current.value === "") {
//     navigate("/"); // Adjust this path based on your home page route
//   }
// }, []);

  return (
    <div className='d-flex justify-content-around align-items-center bg-dark text-white p-2'>
        <div role="button" onClick={()=>navigate("/")} className='d-flex'>
        <AiFillAmazonSquare  size={50}/>
        <h2>Amazon</h2>
        </div>
        <div className='d-flex'>
            <input ref={searchRef} className='form-control' type="text" placeholder='Search here..' />
            <button onClick={searchHandler}  className='btn btn-outline-warning ms-1'>Search</button>
        </div>
        <div className='favs'>
          {data?.token && <Link to="/cart" role='button'>
        <IoCartSharp style={style1} size={40} />
        </Link>}
        {data?.token && <Link to="/orders" className='text-decoration-none text-white ms-5 fs-5'>Orders</Link>
        }
        {data?.token && <Link to="/favorites" className='ms-5'><FaHeart className='text-danger' size={30} /></Link>
      }
        </div> 
        {data?.token?<button  className='btn btn-danger'  onClick={handleLogout}>Logout</button>: <div>
            <Link to={"/login"}  className='btn btn-outline-info'>Login</Link>
        </div>}
       
        
    </div>
  )
}
const style1={
  color:"yellow"
}

export default Header
