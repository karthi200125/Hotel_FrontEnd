import React from 'react';
import './featuredproperties.css';
import useFetch from '../../hooks/usefetch';
import { Link, useNavigate } from 'react-router-dom';

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch("/hotels?featured=true&limit=4");
  const navigate = useNavigate();

  const gotohotel = (id) => {
    navigate(`/hotel?id=${id}`);
  };

  return (
    <div className='fp'>      
      {loading ? (
        'Loading'
      ) : (
        <>
          {data &&
            data.map((item) => (
              <div className='fpitem' key={item._id} onClick={() => gotohotel(item._id)}>
                <img src={item.photos[0]} alt='' className='fpimg' />
                <span className='fpname'>{item.name}</span>
                <span className='fpcity'>{item.city}</span>
                <span className='fpprice'>Starting from ₹ <b>{item.cheapestPrice}</b></span>
                {item.rating && (
                  <div className='fprating'>
                    <button>{item.rating}</button>
                    <span>excellent</span>
                  </div>
                )}
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
