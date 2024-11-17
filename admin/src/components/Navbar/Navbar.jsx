import React from 'react'
import './Navbar.css'
import yumzy from '../../assets/yumzy.png'
import {assets} from '../../assets/assets'
 
const Navbar = () => {
  return (
    <div className='navbar'> 
      <img className='logo' src={yumzy} alt="" />
      <img className='profile' src={assets.profile_image} alt="" />
    </div>
  )
}

export default Navbar