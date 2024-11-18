import React from 'react'
import './ExploreCanteen.css'
import { canteen_list } from '../assets/assets'
const ExploreCanteen = ({canteen,setCanteen}) => {

  return (
    <div className='explore-canteen' id='explore-canteen'>
      <h1>Select the Canteen</h1>
      <h3 className="explore-canteen-text">Choose the canteen</h3>
      <div className="explore-canteen-list">
        {canteen_list.map((item,index)=>{
            return(
                <div onClick={()=>setCanteen(prev=>prev===item.canteen_name?"All":item.canteen_name)} key={index} className='explore-canteen-list-item'>
                    {/* <img className={canteen===item.canteen_name?"active":""} src={item.canteen_image} alt="" /> */}
                    <p className={canteen===item.canteen_name?"active":""}> {item.canteen_name}</p>
                </div>
            )
        })}
      </div>
      <hr />
    </div>
  )
}

export default ExploreCanteen
