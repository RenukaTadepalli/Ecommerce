import React,{useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const Products = () => {
  const { state } = useLocation();
  // const [totalPrice, setTotalPrice] = useState(0);
  // console.log(state)
  const { title, description, image, category, rating, price, id } = state;

  const paymentData = (amount) => {
    return {
      "key": 'rzp_test_GgREDX8otrTn3w',
      "amount": amount*100,
      "currency": "INR",
      "description": "Acme Corp",
      "handler": function (response) {
        if (response.razorpay_payment_id) {
          toast.success("You ordered successfully!");
        }
      },
    }
  }


  const buyNowHandler = (amount) => {
    const razorpay = new window.Razorpay(paymentData(price));
    razorpay.open();
  }

  const [cart, setCart] = useState([]);

  const addToCart = (name, id, price, image) => {
    const newItem = { name, id, price, image };
    const updatedCart = [...cart, newItem]; // Create a new array with the new item
    setCart(updatedCart);
    localStorage.setItem("items", JSON.stringify(updatedCart)); // Save updated cart to localStorage
    toast.success("Your item has been added to the cart successfully");
  };

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("items")) || []; // Initialize with empty array
    setCart(cartItems);
  }, []);

  const existingItems=cart.find((item)=>item.id===id);

  return (
    <div className="image">
    <div className="d-flex justify-content-between align-items-center vh-100 ms-5 me-5  ">
      <div>
        <div  className="border border-dark p-3 m-3 product bg-white ">
        <img src={image} alt="image" width={400} height={400}/>
        </div>
        <button className="button1" onClick={()=>addToCart(name,id,price,image)} disabled={existingItems?true:false}> {existingItems?"Added to cart":"Add to cart"}</button>
        <button className="button2" onClick={buyNowHandler}>Buy Now</button>
      </div>
      <div className="ms-5 fs-5">
        <h2>{title}</h2>
        <p>
          <b>Category:</b> {category}
        </p>
        <p>
          <b>Rating:</b> &#9733;{rating.rate}
        </p>
        <h1 className="fs-1">
           &#8377;{price}
        </h1>
        <p>
          <b>Description:</b>
          {description}
        </p>
      </div>
    </div>
    </div>
  );
};

export default Products;