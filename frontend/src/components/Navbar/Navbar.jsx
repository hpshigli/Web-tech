import React, { useContext, useState, useEffect } from 'react'
import './Navbar.css'
import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import Swal from 'sweetalert2';

const Navbar = ({setShowLogin}) => {
    const [menu,setMenu]=useState("Home");
    const [isScrolled, setIsScrolled] = useState(false);
    const {getTotalCartAmount,token,setToken,cartItems}=useContext(StoreContext);

    const navigate = useNavigate();

    const logout = async()=>{
      // let caution=false;      
        // caution = window.confirm("Logging out will not store your cart data. Do you wish to proceed?");
        const { value: caution } = await Swal.fire({
          title: 'Are you sure?',
          text: 'Logging out will not store your cart data. Do you wish to proceed?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Logout'
        });
        if (caution) {
          localStorage.removeItem("token");
          setToken("");
          navigate("/")
        }
        
      }

      const myOrders = ()=>{
        navigate("/myorders")
      }

      useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        }

        window.addEventListener('scroll', handleScroll);

        // Cleanup event listener
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
    <Link to='/'><img src={assets.logo1} alt="" className="logo1" /></Link>
    <ul className="navbar_menu">
        <Link to='/' onClick={()=>setMenu("Home")} className={menu==="Home"?"active":""}>Home</Link> 
        <a href='#explore-canteen' onClick={()=>setMenu("Menu")} className={menu==="Menu"?"active":""}>Menu</a>
        {/* <a href='#app-download' onClick={()=>setMenu("Mobile App")} className={menu==="Mobile App"?"active":""}>Mobile App</a> */}
        <a href='#footer' onClick={()=>setMenu("Contact Us")} className={menu==="Contact Us"?"active":""}>About Us</a>
    </ul>
    <div className="navbar_right">
        {/* <img src={assets.search_icon} alt="" /> */}
        <div className="navbar_search_icon">  
          <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
          {/* <Link to='/myorders' className='navbar_orders'><img src={assets.parcel_icon} alt="" /></Link> */}
            <div className={getTotalCartAmount()===0? "":"dot"}></div>

        </div>
        {!token?<button onClick={()=>setShowLogin(true)}>Sign in</button>
        : <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li  onClick={myOrders}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
              <hr />
              <li onClick={logout} ><img src={assets.logout_icon} alt="" />Logout</li>
              </ul>
           </div> }
        
    </div>
    </div>
  )
}

export default Navbar
