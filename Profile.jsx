import React, { useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';


const Profile = () => {
    const [user,setUser]=useState({})
    const userData =JSON.parse(localStorage.getItem('token'));
    useEffect(() => {
  
  
      const getUserProfile = async () => {
        try{
  
  
          const user = await axios.get(`https://the-techie-crud.onrender.com/user-info/${userData?.userId}`, {
            headers: {
              'authorization' : `Bearer ${userData?.token}`
            }
          })
  
          if(user.data){
           setUser(user.data.data)
           
          }
  
        }catch(e){
          console.log(e)
        }
      }
  
      getUserProfile();
  
    }, [])
    console.log(user.data)
  return (
    <div className='d-flex justify-content-center align-items-center flex-column profile'>
      <img src={user.profilePic} height={600} width={550} className='mt-3'/>
      <div className=' text-white'>
      <h1>Name: {user.fullName}</h1>
      <h1>Email: {user.email}</h1>
      <h1>Mobile Number:{user.mobile}</h1>
      </div>
    </div>
  )
}

export default Profile
