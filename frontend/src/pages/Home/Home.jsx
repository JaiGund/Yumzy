import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'
import CartIcon from '../../components/CartIcon/CartIcon'

const Home = () => {

  const [category, setCategory] = useState('All')
  
  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      {/* <AppDownload /> */}
      <CartIcon/>
    </div>
  )
}

export default Home