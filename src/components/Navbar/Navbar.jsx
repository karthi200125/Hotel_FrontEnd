import './Navbar.css'
import {Link} from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const { user,logout } = useContext(AuthContext);

const handlelogout=()=>{
  logout()
  alert("do you want logout")
}

  return (
    <div className='navbar'>
        <div className="navcontainer">
            <Link to="/home" style={{color:'inherit',textDecoration:'none'}}><span className="logo">TravelTrove</span></Link>
           {user ?
           (<div className="user">                  
                  <span>{user.username}</span>
                  <FontAwesomeIcon icon={faCircleUser} className='usericon'/>
                  <button onClick={handlelogout}>Logout</button>
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