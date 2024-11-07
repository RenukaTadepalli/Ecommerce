import React, { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  // Load orders from localStorage when component mounts
  useEffect(() => {
    document.title="orders"
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);
  return (
    <div className="w-50">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div>
          {orders.map((order, index) => (
            <div key={index} className="border m-3 shadow-lg p-3">
              <img src={order.image} alt={order.name} width="100" />
              <h4>{order.name}</h4>
              <p>Quantity: {order.quantity}</p>
              <p>Price: ₹{order.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
