import React from 'react'
import './SearchItem.css'

import { Link, useNavigate } from 'react-router-dom'

const SerachItem = ({item}) => {
    const navigate=useNavigate()
  return (
    <div className='searchitem'>
        <img src={item.photos[0]} alt="" className="siimg" />
        <div className="sidesc">
            <h1 className="sititle">{item.name}</h1>
            <span className="sidistance">{item.distance} From center</span>
            <span className="sitaxiop">Free Airport Taxi</span>
            <span className="sisubtitle">
                Studio with Air contioning
            </span>
            <div className="sifeatures">Entire studio one bathroom</div>
            <span className="sicancelop">Free Cancelation</span>
            <span className="sicancelopsubtitle">You can cancel the so lock this price today</span>
        </div>
        <div className="sidetails">
            {item.rating &&
            <div className="sirating">
                <span>Excellent</span>
                <button>{item.rating}</button>
            </div>
            }
            <div className="sideatailstexts">
                <span className="siprice">Starting Price ₹<b>{item.cheapestPrice}</b></span>
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
