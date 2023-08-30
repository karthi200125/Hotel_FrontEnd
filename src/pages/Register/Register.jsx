import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { MdEmail } from 'react-icons/md'; 
import logo from '../../assets/crown.png';


const Register = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 

  const { user, loading, error, dispatch } = useContext(AuthContext);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if(isLoading){
      return;
    }
    setIsLoading(true)
    dispatch({ type: "LOGIN_START" });
    try {
      const response = await axios.post('https://hotel-booking-bsz4.onrender.com/api/auth/register', credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
      navigate("/");
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
    }finally{
      setIsLoading(false)
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className='login'>
      <div className='box'>
        <div className="logo">
          <img src={logo} alt="" />
          <h1>Register</h1>
        </div>
        <form className='form'>
          <div className="inputcon">
            <input type="text" className="linput" placeholder='Username' id='username' onChange={handleChange} required/>
            <AiOutlineLock className='ic' />
          </div>
          <div className="inputcon">
            <input type="email" className="linput" placeholder='Email' id='email' onChange={handleChange} required/>
            <MdEmail className='ic' />
          </div>
          <div className="inputcon">
            <input type={showPassword ? 'text' : 'password'} className="linput" placeholder='Password' id='password' onChange={handleChange} required/>
            {showPassword ? (
              <AiOutlineEyeInvisible className='ic' onClick={togglePasswordVisibility} />
            ) : (
              <AiOutlineEye className='ic' onClick={togglePasswordVisibility} />
            )}
          </div>
          {/* {error && <span style={{color:'red'}}>{error.message}</span>} */}
          <div className='btn' onClick={handleClick}>
            <button type="submit">{isLoading ?  "Please wait ..." : "Register"}</button>
          </div>
        </form>
        <div className='bottom'>
          <span>Already have an account? <Link className='link' to="/">Login</Link></span>
        </div>
      </div>
    </div>
  );
};

export default Register;
