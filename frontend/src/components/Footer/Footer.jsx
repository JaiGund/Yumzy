import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import logo from '../../assets/yumzy.png'

const Footer = () => {
  return (
    <div className="footer" id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          <img className='logo' src={logo} alt="" />
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae vel dignissimos exercitationem placeat aut, ducimus, iste, qui voluptatum repellendus commodi unde temporibus iusto odio quam magnam velit sequi illum consequatur.</p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <l1>+1-212-456-7890</l1>
            <l1>contact@yumzy.com</l1>
          </ul>
        </div>
      </div>
      <hr />
      <p className='footer-copyright'>Copyright 2024 @ Yumzy.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer