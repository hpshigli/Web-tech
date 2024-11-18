import React, {useContext} from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'

import Swal from 'sweetalert2';
import { StoreData } from '../../context/StoreData';
// import { StoreContext } from '../../../../frontend/src/context/StoreContext';

const Navbar = ({setAdminLogin}) => {

  const {adToken,setAdminToken}= useContext(StoreData);

  // const navigate = useNavigate();

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
        localStorage.removeItem("adToken");
        setAdminToken("");
        // navigate("/")
      }
      
    }


  return (
    <div className='navbar'>
      <img className='logo' src={assets.logo1} alt="" />
      {!adToken?<button onClick={()=>setAdminLogin(true)}>Login</button>
        : <div className='navbar-profile'>
          <img className='profile' src={assets.profile_image} alt="" />
            {/* <img src={assets.profile_icon} alt="" /> */}
            <ul className="nav-profile-dropdown">
              <li onClick={logout} ><img src={assets.list_icon} alt="" />Logout</li>
              </ul>
           </div> }
    </div>
  )
}

export default Navbar
