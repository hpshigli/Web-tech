import React from "react";
import "./Footer.css";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
const Footer = () => {

  const navigate = useNavigate();

  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img className="footer-logo" src={assets.logo1} alt="" />
          <p>
          Welcome to <b>innovEATive</b>, your ultimate food companion! Our app
          brings you a delightful culinary experience, whether you're a foodie,
          a home cook, or someone who simply loves to explore new flavors.
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />


          </div>
        </div>
        <div className="footer-content-center">

            <h2>COMPANY</h2>
            <ul>
                <Link to='/'>Home</Link>
                <li>About Us</li>
                {/* <li>Delivery</li> */}
                <li>Privacy policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+919535258001</li>
                <li><a href="mailto:itsmezap06@gmail.com">contact@innovEATive.com</a></li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="copyrights">
      Copyright 2024 &copy; innovEATive.com - All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
