import React, {useState, useEffect} from 'react'
import './List.css'
import axios from 'axios'
import {toast} from 'react-toastify'
import { assets } from '../../assets/assets'

const List = ({url}) => {

  const [list,setList] = useState([]);
  
  const fetchList = async()=>{
    const canteen_name = "Canteen B"
    const response = await axios.get(`${url}/api/food/list`,{
      params: { canteen: canteen_name }
    });
    // console.log(response.data);
    if (response.data.success) {
      setList(response.data.data);
      
    }
    else{
      toast.error("Error")
    }
  }

  const removeFood = async(foodId)=>{
    const response = await axios.post(`${url}/api/food/remove`,{id:foodId});
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message)
      
    }
    else{
      toast.error("error")
    }
  }

  useEffect(()=>{
    fetchList();
  },[])

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
