import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'
import ExploreCanteen from '../../components/ExploreCanteen/ExploreCanteen'
const Home = () => {
  
  const [category,setCategory] = useState("All");
  const [canteen,setCanteen] = useState("All");

  return (
    <div>
      <Header/>
      <ExploreCanteen canteen={canteen} setCanteen={setCanteen}/>
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} canteen={canteen} />
      <AppDownload/>
    </div>
  )
}

export default Home
