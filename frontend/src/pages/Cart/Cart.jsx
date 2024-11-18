import React, { useContext,useEffect } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../components/assets/assets";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_list, removeFromCart,addToCart, getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();
  
  // const refreshWarning = (event) => {
  //   event.preventDefault();
  // };

  // useEffect(() => {
  //   window.addEventListener('beforeunload', refreshWarning);
  // }, []);
  
  return (
    <div className="cart" >
      <div className="cart-items">
        <div className="cart-onlytitle">

        <div className="cart-items-title">
          {/* <p>Items</p> */}
          <p>Title</p>
          <p>Price</p>
          <p className="cart-quantity-title">Quantity</p>
          <p>Canteen</p>
          <p>Total</p>
          <p>Edit</p>
        </div>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          
          if (cartItems[item._id] > 0) {
              
              return (
                <div>
                  <div className="cart-items-title cart-items-item">
                    {/* <img src={item.image} alt="" /> */}
                    <p>{item.name} </p>
                    <p>₹{item.price} </p>
                    <p className="cart-quantity-item">{cartItems[item._id]}</p>
                    <p>{item.canteen} </p>
                    <p>₹{item.price * cartItems[item._id]}</p>
                    <p className="cart-items-counter">
                        
                        <img onClick={()=>removeFromCart(item._id)} src={assets.remove_icon_red} alt="" />
                        <p>{cartItems[item._id]}</p>
                        <img onClick={()=>addToCart(item._id,item.canteen)} src={assets.add_icon_green} alt="" />
                      
                    </p>
                  </div>
                  <hr />
                </div>
              );
            
            
          }
          
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
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
              <p><b>Total</b></p>
              <p>₹{getTotalCartAmount()+2} </p>
            </div>
          <hr />
          </div>
          <div>
            {getTotalCartAmount() !== 0 && (
                <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
            )}
        </div>
        </div>
        <div className="cart-promocode">
          {/* <div>
            <p>If you have promocode, Enter the code</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="promo code" />
              <button>Submit</button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Cart;
