import React from 'react'
import './SearchItem.css'
import {faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Link, useNavigate } from 'react-router-dom'

const SerachItem = ({item}) => {
    const navigate=useNavigate()
  return (
    <div className='searchitem'>
        <img src={item.photos[0]} alt="" className="siimg" />
        <div className="sidesc">
            <h1 className="sititle">{item.name}</h1>
            <span className="sidistance"><FontAwesomeIcon icon={faLocationDot} className=""/> {item.distance} From center</span>
            <span className="sitaxiop">Free Airport Taxi</span>            
            <div className="sifeatures">
                <p>Breakfast</p>
                <p>Free Fitness Center Access</p>
                <p>1+</p>
            </div>
            <span className="sicancelop">Free Cancelation</span>
            <span className="sicancelopsubtitle">You can cancel the Booking ,so lock this price today</span>
        </div>
        <div className="sidetails">
            {item.rating &&
            <div className="sirating">
                <span>{item.rating > 4 ? "Excellent":"Very Good"}</span>
                <button>{item.rating}</button>
            </div>
            }
            <div className="sideatailstexts">
                <span className="siprice"> Price ₹<b>{item.cheapestPrice}</b></span>
                <span className="sitaxop">Include Taxes and Fees</span>
                <Link to={`/hotel?id=${item._id}`}>
                <button  className='sicheckbtn'>see availability</button>
                </Link>
            </div>
        </div>

    </div>
  )
}

export default SerachItem
