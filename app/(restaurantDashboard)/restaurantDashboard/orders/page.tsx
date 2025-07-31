"use client";
import React, { useEffect, useState } from 'react'
import axios from 'axios';

interface Order {
  id: number;
  orderDate: string;
  deliveryAddress: string;
  totalPrice: number;
  orderStatus: string;
}
const page = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const restaurantId = 1; // TODO: replace with actual restaurantId from token or auth context

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`/api/orders?restaurantId=${restaurantId}`);
        const data = response.data;
        setOrders(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [restaurantId]);

  return (
    <div className='text-2xl font-bold mb-4'>
      <h1>Orders</h1>
      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <p>Order ID: {order.id}</p>
              <p>Order Date: {order.orderDate}</p>
              <p>Delivery Address: {order.deliveryAddress}</p>
              <p>Total Price: {order.totalPrice}</p>
              <p>Order Status: {order.orderStatus}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default page