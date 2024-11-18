import React, { useState, useEffect, useContext } from "react";
import "./Orders.css";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { StoreData } from "../../context/StoreData";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [viewOngoing, setViewOngoing] = useState(true); // State to toggle between Ongoing and Completed
  const { adToken } = useContext(StoreData);

  // Fetch all orders from the server
  const fetchAllOrders = async () => {
    if (adToken) {
      const canteen_name = "Canteen A"; // Replace with actual canteen name
      try {
        const response = await axios.get(url + "/api/order/list", {
          params: { canteenName: canteen_name },
          headers: { adToken }, // Headers should be in the third argument
        });

        if (response.data.success) {
          // Sort orders by date in descending order
          const sortedOrders = response.data.data.sort(
            (a, b) => new Date(a.date) - new Date(b.date)
          );
          setOrders(sortedOrders);
        } else {
          toast.error("Error fetching orders");
        }
      } catch (error) {
        toast.error("Error fetching orders");
      }
    } else {
      toast.error("Please login!");
    }
  };

  // Handle status change of the order
  const statusHandler = async (event, orderId) => {
    const updatedStatus = event.target.value;
    try {
      const response = await axios.post(
        url + "/api/order/status",
        {
          orderId,
          status: updatedStatus,
        },
        {
          headers: { adToken },
        }
      );
      if (response.data.success) {
        // Refetch all orders after status update
        await fetchAllOrders();
        toast.success("Order status updated");
        // setTimeout(() => {
        //   window.location.reload()
        // }, 2000);
        // fetchAllOrders()
      }
    } catch (error) {
      toast.error("Error updating order status");
    }
  };

  // Fetch orders when the component mounts
  useEffect(() => {
    if (adToken) {
      fetchAllOrders();
    }
  }, [adToken]);

  // Filter orders based on the selected date and the selected view (Ongoing or Completed)
  useEffect(() => {
    let filtered = orders;

    // Filter by date if a date is selected
    if (selectedDate) {
      filtered = filtered.filter(
        (order) =>
          new Date(order.date).toDateString() === selectedDate.toDateString()
      );
    }

    // Filter based on Ongoing or Completed orders
    if (viewOngoing) {
      filtered = filtered.filter(
        (order) => order.status !== "Food Ready!!"
      );
    } else {
      filtered = filtered.filter(
        (order) => order.status === "Food Ready!!"
      );
    }

    setFilteredOrders(filtered);
  }, [selectedDate, orders, viewOngoing]);

  return (
    <div className="order add">
      <h1>Orders</h1>
      <br /><br />

      {/* Toggle Buttons for Ongoing and Completed Orders */}
      <div className="order-view-toggle">
        <button onClick={() => setViewOngoing(true)} className={viewOngoing ? "active" : ""}>
          Ongoing Orders
        </button>
        <button onClick={() => setViewOngoing(false)} className={!viewOngoing ? "active" : ""}>
          Completed Orders
        </button>
      </div>

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

                {/* <button onClick={() => fetchAllOrders()}>Update</button> */}
              </div>
              <p></p>
              <p>
                <b>Time Slot: </b><br /> {order.deliveryTime}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
