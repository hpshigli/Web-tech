import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);
import axios from 'axios';
import { json } from "react-router-dom";


const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const frontend_url = "http://localhost:5173"
  const url = "http://localhost:4000";
  const [token,setToken] = useState("");
  // const [adToken,setAdminToken] = useState("")
  const [food_list,setFoodList] = useState([])
  const [currentCanteen, setCurrentCanteen] = useState(null);

  const addToCart = async (itemId, canteen) => {
    let replace = false;
    
    if (currentCanteen && currentCanteen !== canteen) {
      replace = window.confirm("You have items from another canteen in your cart. Do you want to replace them?");
      if (!replace) return;
      
      // Clear the cart
      setCartItems({});
    }

    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    if (token) {
      await axios.post(url + "/api/cart/add", { itemId, replace }, { headers: { token } });
    }

    setCurrentCanteen(canteen);
  };



  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if(token){
      await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
    }
  };

  const getTotalCartAmount = (event) => {
    
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };



  const fetchFoodList = async () => {
    try {
      const [response] = await Promise.all([
        axios.get(`${url}/api/food/list`),
      ]);
      const combinedFoodList = [...response.data.data];
      setFoodList(combinedFoodList);
    } catch (error) {
      console.error("Error fetching food lists:", error);
    }
  };



  const loadCartData = async(token)=>{
    const response = await axios.post(url+"/api/cart/get",{},{headers:{token}});
    setCartItems(response.data.cartData);
  }

  useEffect(()=>{

    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"))
        await loadCartData(localStorage.getItem("token"))
      }

    }

    loadData();

  },[])


  
  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
    
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
