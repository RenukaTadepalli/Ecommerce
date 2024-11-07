import React from 'react'

const PageNotFound = () => {
  return (
    <div className='d-flex justify-content-center align-items-center flex-column vh-100'>
        <img src='./404.png' alt="image" width={300}/>
      <h1 className='text-danger'>Oops.....!page not found</h1>
    </div>
  )
}

export default PageNotFound
