
import React, { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import {Link,useNavigate} from "react-router-dom";
import  {Spinner} from "react-bootstrap"
import { IoHeartOutline } from "react-icons/io5";
import { IoHeartSharp } from "react-icons/io5";
import { toast } from "react-toastify";

const Home = ({search}) => {
  const [homeProducts, setHomeProducts] = useState([]);
  const[searchProducts,setSearchProducts]=useState([])
  const [loading,setLoading]=useState(false);
  const[favs,setFavs]=useState([])
  
const navigate=useNavigate()
useEffect(() => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (!token) {
    navigate("/login");
  }
}, [navigate]);

  useEffect(() => {
    document.title = "Home";
    const getProducts = async () => {
      setLoading(true)
      try {
        const products = await axios.get('https://fakestoreapi.com/products');
        setHomeProducts(products.data);
        // console.log(products.data);
        setLoading(false)
      } catch (err) {
        console.log(err);
        setLoading(false)
      }
    };
    !search&&getProducts();
  }, []);

  useEffect(()=>{
    const searchedProducts=homeProducts.filter((product)=>product.title.toLowerCase().includes(search.toLowerCase()))
// console.log(searchProducts)
if(search&&searchedProducts.length){
  setSearchProducts(searchedProducts )
}else{
  setSearchProducts(homeProducts )
}
  },[search]);
  useEffect(() => {
    // Load favorites from localStorage when the component mounts
    const savedFavs = JSON.parse(localStorage.getItem("favs")) || [];
    setFavs(savedFavs);
  }, []);

const [cartData,setCartData]=useState(false)

const addToFav=(product)=>{
  // console.log("clicked")
  const existingFav=favs.find((fav)=>fav.id===product.id);
  if(existingFav){
    if(existingFav.isFav===true){
      existingFav.isFav=false;
      toast.error("item removed from my favs")
    }else{
      existingFav.isFav=true;
      toast.success("item added to my favs")
    }
  }
  else{
    favs.push({
      id:product.id,
      name:product.name,
      image:product.image,
      price:product.price,
      isFav:true
    });
    toast.success("item added to my favs")
  }
setCartData(!cartData)
localStorage.setItem("favs",JSON.stringify(favs))
}


  const products=searchProducts.length?searchProducts:homeProducts;
  return (
    <div>
      <Carousel className="mb-3">
        <Carousel.Item>
          <img
            src="Screenshot 2024-08-02 070544.png"
            alt="image"
            width="100%"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src="Screenshot 2024-08-02 070619.png"
            alt="image"
            width="100%"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src="Screenshot 2024-08-02 070632.png"
            alt="image"
            width="100%"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src="Screenshot 2024-08-02 070821.png"
            alt="image"
            width="100%"
          />
        </Carousel.Item>
      </Carousel>
<Link to="/dashboard" className="text-decoration-none fs-3 ms-3">Makeup Products</Link>
      {loading?<div className="text-center mt-3"><Spinner variant="primary" size={200}/></div>:
      <div className="home m-3">
      {products.map((product, index) => {
        const { title, desrciption, image, category, rating, price,id } = product;
       const favorites=favs.find((item)=>item.id===id&&item.isFav===true)
        return (
          <div
            key={index}
            className="border m-3 p-3 d-flex justify-content-around align-items-center flex-column shadow-lg item"
          >
          
            <img src={image} alt="image" height={150} width={150} />
            <h6>{title}</h6>
            <div className="d-flex">  
              <div className="me-3" onClick={()=>addToFav(product)} >{favorites? <IoHeartSharp size={30} className="text-danger"/>:
                <IoHeartOutline size={30} />
               }
          </div>
            <Link role="button"
              to={`/product/${id}`}
              state={product}
              className="btn btn-outline-success"
            >
              View
            </Link>
            </div>
          </div>
    
        );
      })}
    </div>}
    </div>
  );
};

export default Home;
