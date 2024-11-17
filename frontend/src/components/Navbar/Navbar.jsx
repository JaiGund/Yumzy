import React, { useContext, useState } from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import {assets} from '../../assets/assets'
import yumzy from '../../assets/Yumzy..png'
import { storeContext } from '../../context/StoreContext'

const Navbar = ({setShowLogin}) => {

  const [menu, setMenu] = useState('home');

  const {getTotalCartAmount, token, setToken, setCartItems} = useContext(storeContext);
  const navigate = useNavigate();
  
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem("tokenExpiry");
    setCartItems({});
    setToken('');
    navigate('/')
  }

  return (
    <div className='navbar'>
      <Link to={'/'}><img src={yumzy} alt="" className='logo'/></Link>
      <ul className='navbar-menu'>
        <Link to='/' className={menu==='home'?"active":""}  onClick={()=>setMenu('home')}>home</Link>
        <a href='#explore-menu' className={menu==='menu'?"active":""} onClick={()=>setMenu('menu')}>menu</a>
        <a href='#about-us' className={menu==='about us'?"active":""} onClick={()=>setMenu('about us')}>about-us</a>
        <a href='#footer' className={menu==='contact-us'?"active":""} onClick={()=>setMenu('contact-us')}>contact us</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt=""/>
        <div className="navbar-search-icon">
          <Link to={'/cart'}><img src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>
        {!token?<button onClick={()=>setShowLogin(true)}>Sign in</button>:
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="" />
            <ul className='nav-profile-dropdown'>
              <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
              <hr />
              <li onClick={logout} ><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
            </ul>
          </div>
        }
        
      </div>
    </div>
  )
}

export default Navbar