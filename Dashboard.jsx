import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import { IoHeartOutline } from "react-icons/io5";
import { IoHeartSharp } from "react-icons/io5";
import { toast } from "react-toastify";

const Dashboard = () => {
  const getData = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(false);
  const [imageData, setImageData] = useState({});
  const [dp, setDp] = useState({});
  const [orders, setOrders] = useState(
    JSON.parse(localStorage.getItem("orders")) || []
  );
  // const [wishlist, setWishlist] = useState([]);
  

  useEffect(() => {
    setData(getData);
  }, []);
  useEffect(() => {
    document.title = "dashboard";
    
    const fetchProducts = async () => {
    
      try {
        setLoading(true);
        const getProducts = await axios.get(
          "http://makeup-api.herokuapp.com/api/v1/products.json?product_type=blush"
        );
        
        setProducts(getProducts.data);
        // console.log(getProducts.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  let message = "";
  let today = new Date();
  const hours = today.getHours();
  if (hours > 6 && hours < 12) {
    message = "Good Morning";
  } else if (hours >= 12 && hours < 16) {
    message = "Good Afternoon";
  } else {
    message = "Good Evening";
  }
  const userData = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const user = await axios.get(
          `https://the-techie-crud.onrender.com/user-info/${userData?.userId}`,
          {
            headers: {
              authorization: `Bearer ${userData?.token}`,
            },
          }
        );

        if (user.data) {
          setDp(user.data);
        }
      } catch (e) {
        console.log(e);
      }
    };

    getUserProfile();
  }, [imageData]);

  const uploadImage = async (e) => {
    try {
      const image = e.target.files[0];

      const formData = new FormData();

      formData.append("image", image);
      // console.log(formData)

      const uploadDp = await axios.post(
        `https://the-techie-crud.onrender.com/upload/${userData?.userId}`,
        formData,
        {
          headers: {
            authorization: `Bearer ${userData?.token}`,
          },
        }
      );

      if (uploadDp.data) {
        setImageData(uploadDp.data.profilePic);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const userProfile = () => {
    return (
      <div className="w-50 p-3 text-center shadow rounded bg-warning">
        <Link
          to={"/profile"}
          href="#"
          className="text-decoration-none text-dark"
        >
          view image
        </Link>
        <hr />
        <input
          onChange={uploadImage}
          type="file"
          className="form-control w-100 m-auto"
        />
      </div>
    );
  };

  const paymentData = (amount, product) => {
    return {
      key: "rzp_test_GgREDX8otrTn3w",
      amount: amount * 100,
      currency: "INR",
      description: "Acme Corp",
      handler: function (response) {
        if (response.razorpay_payment_id) {
          toast.success("Your order was successful!");
          addToOrders(product); // Call addToOrders only after successful payment
        }
      },
    };
  };

  const buyNowHandler = (product) => {
    const razorpay = new window.Razorpay(paymentData(product.price,product));
    razorpay.open();
  };
  const addToOrders = (product) => {
    const newOrder = {
      name: product.name,
      price: product.price,
      image: product.image_link,
      quantity: 1, // Set quantity, adjust if dynamic quantity is needed
      date: new Date().toLocaleString(),
    };
  
    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    navigate("/orders");
  };


  const [cart, setCart] = useState([]);

  const addToCart = (name, id, price, image) => {
    const newItem = { name, id, price, image };
    const updatedCart = [...cart, newItem]; // Create a new array with the new item
    setCart(updatedCart);
    localStorage.setItem("items", JSON.stringify(updatedCart)); // Save updated cart to localStorage
    toast.success("Your item has been added to the cart successfully");
  };
  const [favorite,setFavorite]=useState([])
  // const [cartData, setCartData] = useState(false);
  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("items")) || []; // Initialize with empty array
    setCart(cartItems);
  }, []);
  const addToFav = (product) => {
    const existingFav = favorite.find((item) => item.id === product.id);
  
    if (existingFav) {
      if (existingFav.isFav === true) {
        existingFav.isFav = false;
        toast.error("Item removed from My favs");
      } else {
        existingFav.isFav = true;
        toast.success("Item added to My favs");
      }
    } else {
      // Push complete product details
      favorite.push({ 
        id: product.id, 
        name: product.name, 
        image: product.image_link, 
        price: product.price,
        isFav: true 
      });
      toast.success("Item added to My favs");
    }
  
    setCartData(!cartData);
    localStorage.setItem("favorite", JSON.stringify(favorite));
  };
  





  return (
    <div>
      <div style={styles}>{profile && userProfile()}</div>

      <div className="shadow p-4 m-2 border rounded d-flex justify-content-around align-items-center">
        <div>
          <h4>
            Hello {data?.name}, {message}
          </h4>
        </div>
        <div role="button" onClick={() => setProfile(!profile)}>
          {dp?.data?.profilePic ? (
            <img
              src={dp?.data?.profilePic}
              height={80}
              style={{ clipPath: "circle()" }}
            />
          ) : (
            <RxAvatar size={50} />
          )}
        </div>
        
      </div>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Spinner />
        </div>
      ) : (
        <div className="grid">
          {products.map((product, index) => {
            // console.log(product)
            const { name, image_link, id,price } = product;

            const existingItems=cart.find((item)=>item.id===id);
            const favorites = favorite.find(
              (item) => item.id === id && item.isFav === true
            );
            
            

            return (
              <div
                key={index}
                role="button"
                className="shadow p-2 m-3 text-center rounded d-flex flex-column justify-content-around align-items-center"
              >
                <div>
                  <img height={100} src={image_link} alt="Image" />
                </div>
                <h6>Name : {name}</h6>
                <h6>Price: ₹{price}</h6>
                <div>
                  <div className="mb-3" onClick={() =>addToFav(product)}>
                    {favorites ? (
                      <IoHeartSharp size={30} className="text-danger" />
                    ) : (
                      <IoHeartOutline size={30} />
                    )}
                  </div>
                  <div>
                    <button
                      className="btn btn-warning"
                      onClick={() => buyNowHandler({name,price,image_link})}
                    >
                      Buy Now
                    </button>
                    <button
                      className="btn btn-info ms-2"
                      onClick={()=>addToCart(name,id,image_link,price)}
                      disabled={existingItems ? true : false}
                    >
                      {existingItems?"added to cart":"Add to cart"}
                    </button>
                  </div>
                  <div
                    onClick={() => navigate(`/makeup/${id}`)}
                    className="mt-2"
                  >
                    <button className="btn btn-success">View product</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
const styles = {
  position: "absolute",
  left: "82%",
  top: "10%",
};

export default Dashboard;
