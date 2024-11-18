import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const navigate = useNavigate();
  const frontend_url = 'http://localhost:5173';
  
  // State to store selected time slot
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");

  // Get current date and time
  const currentDate = new Date();

  // Function to generate time slots from 8:00 AM to 6:00 PM in 15-minute intervals
  const generateTimeSlots = () => {
    const timeSlots = [];
    let startTime = new Date();
    startTime.setHours(8, 0, 0); // Set start time to 8:00 AM
    const endTime = new Date();
    endTime.setHours(20, 0, 0); // Set end time to 6:00 PM

    while (startTime < endTime) {
      const nextTime = new Date(startTime.getTime() + 15 * 60 * 1000); // Increment by 15 minutes
      const startHours = startTime.getHours();
      const startMinutes = startTime.getMinutes();
      const endHours = nextTime.getHours();
      const endMinutes = nextTime.getMinutes();

      const formattedStart = `${startHours % 12 || 12}:${startMinutes < 10 ? `0${startMinutes}` : startMinutes} ${startHours >= 12 ? "PM" : "AM"}`;
      const formattedEnd = `${endHours % 12 || 12}:${endMinutes < 10 ? `0${endMinutes}` : endMinutes} ${endHours >= 12 ? "PM" : "AM"}`;

      const timeSlot = `${formattedStart} - ${formattedEnd}`;

      // Filter out slots where the upper limit (nextTime) is less than or equal to the current time
      if (nextTime > currentDate) { 
        timeSlots.push({
          slot: timeSlot,
          isDisabled: false, // Slot is valid since it's in the future
        });
      }

      // Move to the next time slot
      startTime = nextTime;
    }

    return timeSlots;
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    let canteenInfo;
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        canteenInfo = item.canteen;
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      canteenName: canteenInfo,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
      deliveryTime: selectedTimeSlot, // Add selected time slot to the order
    };

    if (orderData.items.length > 0 && selectedTimeSlot) {
      let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
      if (response.data.success) {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/myorders");
          window.location.reload()
        }, 3000);
      } else {
        alert("Error placing order");
      }
    } else {
      alert("Please select a time slot and ensure you have items in the cart.");
      window.location.replace(frontend_url);
    }
  };

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="cart-total">
        <h2>Confirm Payment</h2>
        <div className="place-order-center">
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>₹{getTotalCartAmount()} </p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Platform Fee</p>
            <p>₹{2} </p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>
              <b>Total</b>
            </p>
            <p>₹{getTotalCartAmount() + 2} </p>
          </div>
          <hr />
        </div>

        {/* Time slot selection dropdown */}
        <div className="time-slot-selection">
          <label htmlFor="time-slot"><b>Choose Pickup Time Slot : </b></label>
          <select
            id="time-slot"
            className="time-slot"
            value={selectedTimeSlot}
            onChange={(e) => setSelectedTimeSlot(e.target.value)}
            required
          >
            <option value="" disabled>
              Select a time slot
            </option>
            {generateTimeSlots().map((slot, index) => (
              <option key={index} value={slot.slot} disabled={slot.isDisabled}>
                {slot.slot}
              </option>
            ))}
          </select><br /><br />
          <i>* Cancellations are not permitted after an order has been placed.</i><br /><br />
          <i>** Returns or reheating of food are not permitted. Kindly ensure you select your preferred time slot carefully before proceeding to checkout.</i>
        </div>

        <div>
          {getTotalCartAmount() !== 0 && <button type="submit">PROCEED TO PAYMENT</button>}
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
