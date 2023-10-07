import './Navbar.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const handlelogout = () => {
    logout()
    alert("do you want logout")
  }

  return (
    <div className='navbar'>
      <div className="navcontainer">
        <Link to="/home" style={{ color: 'inherit', textDecoration: 'none' }}><span className="logo">TravelTrove</span></Link>
        {user ?
          (<div className="user">            
              <span>{user.username}</span>                            
              <div className='iconhovercon'><FontAwesomeIcon icon={faSignOutAlt} style={{color:'red'}} onClick={handlelogout} /><span className='iconname'>Logout</span></div>                          
          </div>)
          :
          (<div className="navItems">
            <button className="navbutton">Register</button>
            <button className="navbutton">Login</button>
          </div>
          )}
      </div>
    </div>
  )
}

export default Navbar