import React, { useContext, useState } from 'react';
import axios from 'axios';
import './Login.css';
import { AuthContext } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/crown.png';
import { AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const [showPassword, setShowPassword] = useState(false); 

  const { user, loading, error, dispatch } = useContext(AuthContext);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    
    if (isLoading) {
      return; 
    }
  
    dispatch({ type: "LOGIN_START" });
    setIsLoading(true);
  
    try {
      const response = await axios.post('https://hotel-booking-bsz4.onrender.com/api/auth/login', credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
      navigate("/home");
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
    } finally {
      setIsLoading(false); 
    }
  };
  

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="login">
      <div className='box'>
        <div className="logo">
          <img src={logo} alt="" />
          <h1>Login</h1>
        </div>
        <form className='form'>
          <div className="inputcon">
            <input type="text" className="linput" placeholder='Username' id='username' onChange={handleChange} required/>
            <AiOutlineLock className='ic' />
          </div>
          <div className="inputcon">
            <input type={showPassword ? 'text' : 'password'} className="linput" placeholder='password' id='password' onChange={handleChange} required/>
            {showPassword ? (
              <AiOutlineEyeInvisible className='ic' onClick={togglePasswordVisibility} />
            ) : (
              <AiOutlineEye className='ic' onClick={togglePasswordVisibility} />
            )}
          </div>
          {error && <p style={{ color: 'red' }}>{error.message}</p>}
          <div className='btn' onClick={handleClick}>
          <button type="submit" disabled={isLoading}>{isLoading ? "Please wait ..." : " Login"}</button>
          </div>
        </form>
        <div className='bottom'>
          <span>Don't have an account?</span>
          <Link className='link' to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
