import React, { useState, useEffect } from "react";
import "./Orders.css";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredOrders, setFilteredOrders] = useState([]);
  
  // Fetch all orders from the server
  const fetchAllOrders = async () => {
    const canteen_name = "Canteen C";
    try {
      const response = await axios.get(url + "/api/order/list", {
        params: { canteenName: canteen_name },
      });

      if (response.data.success) {
        // Sort orders by date in descending order
        const sortedOrders = response.data.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setOrders(sortedOrders);
        
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("Error fetching orders");
    }
  };

  // Handle status change of the order
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(url + "/api/order/status", {
        orderId,
        status: event.target.value,
      });
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      toast.error("Error updating order status");
    }
  };

  // Fetch orders when the component mounts
  useEffect(() => {
    fetchAllOrders();
  }, []);

  // Filter orders based on the selected date
  useEffect(() => {
    if (selectedDate) {
      const filtered = orders.filter(
        (order) =>
          new Date(order.date).toDateString() === selectedDate.toDateString()
      );
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(orders); // Show all orders if no date is selected
    }
  }, [selectedDate, orders]);

  return (
    <div className="order add">
      <h1>Orders</h1>
      <br /><br />
    

      {/* Date Picker Popup */}
      <div className="date-picker-container">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="dd-MM-yyyy"
          placeholderText="Select a date"
          className="date-picker"
        />
      </div>
      <br />

      <div className="order-list">
        {filteredOrders.map((order, index) => (
          <div key={index}>
            <h4>Date: {order.date}</h4>
            <div className="order-item">
              <img src={assets.parcel_icon} alt="" />
              <p className="order-item-food">
                {order.items.map((item, index) => (
                  <span key={index}>
                    {item.name} x {item.quantity}
                    {index !== order.items.length - 1 && <br />}
                  </span>
                ))}
              </p>
              <p className="order-item-name">{order.userName}</p>
              <p className="order-item-studentId">PES{order.studentId}</p>
              <p className="order-item-items">
                <b>Items:</b> {order.items.length}
              </p>
              <p className="order-item-amount">
                <b>₹{order.amount}</b>
              </p>
              <div className="order-update">
                <select
                  onChange={(event) => statusHandler(event, order._id)}
                  value={order.status}
                >
                  <option value="Order placed">Order placed</option>
                  <option value="Food Processing">Food Processing</option>
                  <option value="Food Ready!!">Food Ready!!</option>
                </select>

                <button onClick={() => fetchAllOrders()}>Update</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
