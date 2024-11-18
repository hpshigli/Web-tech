import React, { createContext, useEffect, useState } from "react";
export const StoreData = createContext(null);
const StoreDataProvider = (props) => {
  const [adToken, setAdminToken] = useState("");
  const url = "http://localhost:4000";

  useEffect(() => {
    async function loadAdData() {
      if (localStorage.getItem("adToken")) {
        setAdminToken(localStorage.getItem("adToken"));
      }
    }
    loadAdData();
  }, []);
  const contentValue = {
    adToken,
    setAdminToken,
    url
  };
  return (
    <div>
      <StoreData.Provider value={contentValue}>
        {props.children}
      </StoreData.Provider>
    </div>
  );
};

export default StoreDataProvider;
