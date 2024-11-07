import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [itemCounts, setItemCounts] = useState({});
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    document.title="cart"
    const storedItems = JSON.parse(localStorage.getItem("items")) || [];
    const storedCounts = JSON.parse(localStorage.getItem("itemCounts")) || {};

    const initialCounts = {};
    storedItems.forEach((item) => {
      console.log(storedItems)
      initialCounts[item.id] = storedCounts[item.id];
    });

    setCartItems(storedItems);
    setItemCounts(initialCounts);
  }, []);

  const updateLocalStorage = (items, counts) => {
    localStorage.setItem("items", JSON.stringify(items));
    localStorage.setItem("itemCounts", JSON.stringify(counts));
  };

  const handleIncrement = (id) => {
    const newCounts = { ...itemCounts, [id]: (itemCounts[id] || 0) + 1 };
    setItemCounts(newCounts);
    updateLocalStorage(cartItems, newCounts);
  };

  const handleDecrement = (id) => {
    const newCounts = {
      ...itemCounts,
      [id]: Math.max((itemCounts[id] || 1) - 1, 1),
    };
    setItemCounts(newCounts);
    updateLocalStorage(cartItems, newCounts);
  };

  const handleRemove = (id) => {
    const newItems = cartItems.filter((item) => item.id !== id);
    const newCounts = { ...itemCounts };
    delete newCounts[id];

    setCartItems(newItems);
    setItemCounts(newCounts);
    updateLocalStorage(newItems, newCounts);
  };

  const paymentData = (amount) => {
    return {
      key: "rzp_test_GgREDX8otrTn3w",
      amount: amount * 100,
      currency: "INR",
      description: "Acme Corp",
      handler: function (response) {
        if (response.razorpay_payment_id) {
          toast.success("You ordered successfully!");

          const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];

          const newOrder = cartItems.map((item) => ({
            ...item,
            quantity: itemCounts[item.id] || 1,
          }));
          localStorage.setItem("orders", JSON.stringify([...existingOrders, ...newOrder]));

          setCartItems([]);
          setItemCounts({});
          localStorage.removeItem("items");
          localStorage.removeItem("itemCounts");
          
        }
      },
    };
  };

  const buyNowHandler = (amount) => {
    const razorpay = new window.Razorpay(paymentData(amount));
    razorpay.open();
  };

  const couponDiscount = cartItems.length >= 10 ? 10 : 5;
  let total = 0;

  cartItems.forEach(item => {
    total += Number(item.price) * (itemCounts[item.id] || 1);
  });

  return (
    <div className="d-flex ms-5 mt-3">
      <div className="border shadow w-50">
        {cartItems.length === 0 ? (
          <h5 className="text-center p-3">Your cart is empty!</h5>
        ) : (
          cartItems.map((item) => (
            <div key={item.id}>
              <div className="m-3 cart d-flex w-75">
                <img src={item.image} height={150} width={150} />
                <div className="ms-5 d-flex flex-column justify-content-around">
                  <h5>{item.name}</h5>
                  <h5>Price: &#8377;{item.price}</h5>
                  <div className="d-flex align-items-center">
                    <button className="btn btn-success" onClick={() => handleIncrement(item.id)}>+</button>
                    <h6 className="ms-3">Qty: {itemCounts[item.id] || 1}</h6>
                    <button className="btn btn-danger ms-3" onClick={() => handleDecrement(item.id)}>-</button>
                    <button className="btn btn-outline-danger ms-5" onClick={() => handleRemove(item.id)}>Remove</button>
                  </div>
                </div>
              </div>
              <hr />
            </div>
          ))
        )}
      </div>
      <div style={styles1}>
        {cartItems.length > 0 && (
          <div className="border rounded shadow ms-5 mt-2 p-3 text-center" style={styles}>
            <h3>Price Details</h3>
            <hr />
            <div className="d-flex justify-content-between align-items-center mt-3">
              <p>Price ({cartItems.length} items)</p>
              <p>&#8377;{total}</p>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-3">
              <p>Coupons for you</p>
              <p className="text-success">-&#8377;{couponDiscount}</p>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-3">
              <p>Delivery Charges</p>
              <p className="text-success"><span className="text-decoration-line-through me-1">&#8377;50</span>Free</p>
            </div>
            <hr />
            <div className="d-flex justify-content-between align-items-center mt-3">
              <h3>Total Price</h3>
              <p>&#8377; {total - couponDiscount}</p>
            </div>
            <hr />
            <button className="btn btn-outline-danger" onClick={() => buyNowHandler(total - couponDiscount)}>Buy now</button>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  height: "400px",
  width: "350px",
  position: "fixed"
};

const styles1 = {
  position: "relative"
};

export default Cart;

