import React from 'react';
import './PropertyList.css';
import useFetch from '../../hooks/usefetch';
import hotels from '../../assets/hotels.jpg';
import apartments from '../../assets/apartments.jpg';
import resorts from '../../assets/resorts.jpg';
import villas from '../../assets/villas.jpg';
import cabins from '../../assets/cabins.jpg';

const PropertyList = () => {
  const { data, loading, error } = useFetch("/hotels/countByType");
  
  const images = [hotels, apartments, resorts, villas, cabins];

  return (
    <div className='plist'>
      {loading ? "Loading please wait" : (
        <>
          {data && data.map((count, index) => (
            <div className="plistitem" key={index}>
              <img src={images[index]} alt="" className="plistimg" />
              <div className="plisttitle">
                <h1>{count.type}</h1>                
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export default PropertyList;
