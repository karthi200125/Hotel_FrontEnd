import React from 'react'
import './Featured.css'
import useFetch from '../../hooks/usefetch'
import chennai from '../../assets/chennai.jpg'
import bangalore from '../../assets/bangalore.jpg'
import hyderabad from '../../assets/hyderabad.jpg'

const Featured = () => {
    const { data, loading, error } = useFetch("/hotels/countBycity?cities=Chennai,Bangalore,Hyderabad");
      
  return (
    <div className='featured'>
        {loading ? ("loading Please wait!") :(
        <>
        <div className="featureditem">
            <img src={chennai} alt="" className="featuredimg" />
            <div className="featuredtitle">
                <h1>Chennai</h1>
                <h2>{data[0]} properties</h2>
            </div>
        </div>        
        <div className="featureditem">
            <img src={bangalore} alt="" className="featuredimg" />
            <div className="featuredtitle">
                <h1>Bangalore</h1>
                <h2>{data[1]} properties</h2>
            </div>
        </div>
        <div className="featureditem">
            <img src={hyderabad} alt="" className="featuredimg" />
            <div className="featuredtitle">
                <h1>Hyderabad</h1>
                <h2>{data[2]} properties</h2>
            </div>
        </div>
        </>)}
    </div>
  )
}

export default Featured