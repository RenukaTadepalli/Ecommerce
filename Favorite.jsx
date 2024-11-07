import React, { useEffect, useState } from "react";
import { IoHeartSharp } from "react-icons/io5";
import { toast } from "react-toastify";

const Favorite = () => {
    const [favorites, setFavorites] = useState([]);

    const [favs, setFavs] = useState([]);

  useEffect(() => {
    const savedFavs = JSON.parse(localStorage.getItem("favs")) || [];
    setFavs(savedFavs.filter(item => item.isFav));
  }, []);

  const removeFromFavs = (id) => {
    const updatedFavorite = favs.map((item) =>
      item.id === id ? { ...item, isFav: false } : item
    );
    setFavs(updatedFavorite.filter((item) => item.isFav));
    localStorage.setItem("favs", JSON.stringify(updatedFavorite));
    toast.error("Item removed from favorites");
  };
  
    useEffect(() => {
      const favItems = JSON.parse(localStorage.getItem("favorite")) || [];
      setFavorites(favItems.filter((item) => item.isFav));
    }, []);
  
    const removeFromFav = (id) => {
      const updatedFavorites = favorites.map((item) =>
        item.id === id ? { ...item, isFav: false } : item
      );
      setFavorites(updatedFavorites.filter((item) => item.isFav));
      localStorage.setItem("favorite", JSON.stringify(updatedFavorites));
      toast.error("Item removed from favorites");
    };
  
    return (
      <div >
        <div className="grid">
        {favorites.map((item, index) => (
          <div key={index} className="shadow p-2 m-3 rounded text-center">
            <img height={100} src={item.image} alt={item.name} />
            <h6>Name: {item.name}</h6>
            <h6>Price: ₹{item.price}</h6>
            <IoHeartSharp
              size={30}
              className="text-danger"
              onClick={() => removeFromFav(item.id)}
              role="button"
            />
          </div>
        
        ))}
        {favs.map((item, index) => (
          <div key={index} className="shadow p-2 m-3 rounded text-center">
            <img height={100} src={item.image} alt={item.name} />
            <h6>Name: {item.name}</h6>
            <h6>Price: ₹{item.price}</h6>
            <IoHeartSharp
              size={30}
              className="text-danger"
              onClick={() => removeFromFavs(item.id)}
              role="button"
            />
          </div>
        
        ))}
        </div>
      </div>
    );
  };
  export default Favorite