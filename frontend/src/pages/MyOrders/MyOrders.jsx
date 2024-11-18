import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../components/assets/assets";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2';

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredOrders, setFilteredOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        url + "/api/order/userorders",
        {},
        { headers: { token } }
      );

      // Sort orders by date (ascending)
      const sortedOrders = response.data.data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      setData(sortedOrders);
    } catch (error) {
      toast.error("Error fetching orders.");
    }
  };

  // const cancelOrders = async (orderId) => {
  //   // Using SweetAlert2 for the confirmation dialog
  //   const { value: cancel } = await Swal.fire({
  //     title: 'Are you sure?',
  //     text: 'Do you want to cancel the order?',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, cancel it!'
  //   });
  
  //   if (cancel) {
  //     try {
  //       const response = await axios.post(url + "/api/order/cancel", { orderId });
  //       if (response.data.success) {
  //         Swal.fire(
  //           'Cancelled!',
  //           response.data.message,
  //           'success'
  //         );
  //         fetchOrders();
  //       } else {
  //         Swal.fire(
  //           'Error!',
  //           response.data.message,
  //           'error'
  //         );
  //       }
  //     } catch (error) {
  //       Swal.fire(
  //         'Error!',
  //         'Error cancelling order.',
  //         'error'
  //       );
  //     }
  //   }
  // };
  

  // Filter orders based on the selected date
  useEffect(() => {
    if (selectedDate) {
      const filtered = data.filter(
        (order) =>
          new Date(order.date).toDateString() === selectedDate.toDateString()
      );
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(data);
    }
  }, [selectedDate, data]);

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h1>My Orders</h1>
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

      <div className="container">
        {filteredOrders.map((order, index) => (
          <div key={index}>
            <h4>
              <b>Date: </b> {order.date}
            </h4>
            <div className="my-orders-order">
              <img src={assets.parcel_icon} alt="" />
              <p>
                {order.items.map((item, index) => (
                  <span key={index}>
                    {item.name} x {item.quantity}
                    {index !== order.items.length - 1 && <br />}
                  </span>
                ))}
              </p>
              <p>
                <b>Canteen: </b>
                {order.canteenName}
              </p>
              <p>
                <b>Items: </b> {order.items.length}
              </p>
              <p>
                <b>Total: </b> ₹{order.amount}
              </p>
              <p className="my-orders-dot">
                <span>&#x25cf;</span> <b>{order.status}</b>
              </p>
              <div className="my-button">
                <button onClick={fetchOrders}>Track Order</button>
                {/* <button onClick={() => cancelOrders(order._id)}>Cancel</button> */}
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

export default MyOrders;
