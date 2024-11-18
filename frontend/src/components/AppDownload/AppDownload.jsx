import React from "react";
import "./AppDownload.css";
import { assets } from "../assets/assets";
const AppDownload = () => {
  return (
    <div className="app-download" id="app-download">
      {/* <p>
        For Better Experience Download <br />
        <span>innovEATive </span>App
      </p> */}
      {/* <div className="app-download-platforms">
        <img src={assets.play_store} alt="" />
        <img src={assets.app_store} alt="" />
      </div> */}
      <div className="app-download-go-up">
        <a href="#explore-canteen">Back to Menu</a>
      </div>
    </div>
  );
};

export default AppDownload;
