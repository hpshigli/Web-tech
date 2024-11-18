import React, { useContext, useState } from 'react'
import './LoginPopup.css'
// import { assets } from '../assets/assets'
// import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { StoreData } from '../../context/StoreData'
const LoginPopup = ({setAdminLogin}) => {

  const {url, setAdminToken} = useContext(StoreData)


  const[currState,setCurrState] = useState("Login")
  const[data,setData] = useState({
    name:"",
    email:"",
    password:""
  }) 

  const onChangeHandler = (event)=>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))

  }

  const onLogin = async (event)=>{
    event.preventDefault()
    let newUrl = url;
    if (currState==="Login") {
      newUrl += "/api/admin/login"
    }
    else{
      newUrl += "/api/admin/qazPLM/register/Q1D5t7y8"
    }

    const response = await axios.post(newUrl,data);

    if (response.data.success) {
      setAdminToken(response.data.adToken);
      localStorage.setItem("adToken",response.data.adToken);
      setAdminLogin(false)
    }

    else{
      alert(response.data.message)
    }

  }

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} action="" className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2> 
          {/* <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" /> */}
        </div>
        <div className="login-popup-input">
          {currState==="Login"?<></>:<input type="text" name='name' onChange={onChangeHandler} value={data.name} placeholder='Name' required />}
          {/* {currState==="Login"?<></>: <p className='predefined-text'>PES<input type="number" name='pesId' onChange={onChangeHandler} value={data.pesId} placeholder='PRN' className='pesu-id'/></p> } */}

          <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Email' required />
          <input type="password" name='password' onChange={onChangeHandler} value={data.password} placeholder='Password' required />
        </div>
        <button type='submit'>{currState==="Sign Up"? "Create account": "Login"} </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use and privacy policy.</p>
        </div>
        {/* {currState==="Login"
          ?<p>Are you new? <span onClick={()=>setCurrState("Sign Up")}>Sign up here</span></p>
          :<p>I have an account!! <span onClick={()=>setCurrState("Login")}>Login here</span></p>
        } */}
          </form>
    </div>
  )
}

export default LoginPopup
