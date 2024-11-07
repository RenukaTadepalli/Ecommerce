import React from 'react'
import axios from 'axios'
import { useEffect,useState } from 'react';
import {useLocation,useParams} from "react-router-dom"
import { Spinner } from 'react-bootstrap';

const Makeup = () => {
    const params=useParams(); 
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const getProduct = async () => {
        try {
          setLoading(true)
          const getProductData = await axios.get(
            `https://makeup-api.herokuapp.com/api/v1/products/${params.id}`
          );
          // console.log(getProductData)
          // console.log(getProductData.data)
          
  
          const container = document.getElementById('products-container')
          
          container.innerHTML += getProductData.data  
      
          setLoading(false)
        } catch (e) {
          console.log(e);
          setLoading(false)
        }
      };
  
      getProduct()
    }, []);
    
    return (
      <div>
        {loading ? (
          <div className='d-flex justify-content-evenly align-items-center vh-100' >
          <Spinner />
          </div>
        ) : (
          <div id="products-container" >
          </div>
        )}
      </div>
    );
  };

export default Makeup
