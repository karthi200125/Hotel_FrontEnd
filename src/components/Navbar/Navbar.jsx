import './Navbar.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleDown, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [openuser, setopenuser] = useState(false)
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
            <div className="one">
              <span>{user.username}</span>
              {openuser ?
                <FontAwesomeIcon icon={faChevronDown} className='usericon' onClick={() => setopenuser(!openuser)} />
                :
                <FontAwesomeIcon icon={faChevronUp} className='usericon' onClick={() => setopenuser(!openuser)} />
              }
            </div>
            {!openuser &&
              <button onClick={handlelogout}>Logout</button>
            }
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