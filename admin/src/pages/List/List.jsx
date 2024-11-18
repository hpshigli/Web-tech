import React, {useState, useEffect, useContext} from 'react'
import './List.css'
import axios from 'axios'
import {toast} from 'react-toastify'
import { assets } from '../../assets/assets'
import { StoreData } from '../../context/StoreData'
const List = ({url}) => {

  const [list,setList] = useState([]);
  const {adToken} = useContext(StoreData)
  
  const fetchList = async()=>{
    if (adToken) {
  
      const canteen_name = "Canteen A"
      const response = await axios.get(`${url}/api/food/list`, {headers:{adToken}}, {
        params: { canteen: canteen_name }
      });
      if (response.data.success) {
        setList(response.data.data);
      }
      else{
        toast.error("Error") 
      }
    }
    else{
      toast.error("Please login!!")
    }
  }

  const removeFood = async(foodId)=>{
    if (adToken) {
      
      const response = await axios.post(`${url}/api/food/remove`,{id:foodId}, {headers:{adToken}});
      await fetchList();
      if (response.data.success) {
        toast.success(response.data.message)
        
      }
      else{
        toast.error("error")
      }
    }
    else{
      toast.error("Please login!!")
    }
  }

  useEffect(()=>{
    if (adToken) {
      
      fetchList();
    }
  },[adToken])

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
            <b className='list-title-img'>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
        </div>
        {list.map((item,index)=>{
          return(
            <div key={index} className='list-table-format'>
              <img className='list-img' src={`${url}/images/`+ item.image} alt="" />
              <p className='list-name'>{item.name} </p>
              <p>{item.category} </p>
              <p className='list-price'>₹{item.price} </p>
              <img onClick={()=>removeFood(item._id)} className='cursor' src={assets.remove_icon_red} alt="" />

            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List
