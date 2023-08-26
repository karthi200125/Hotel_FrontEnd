import React, { useContext, useState, useEffect } from 'react';
import './Reserve.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'; // Corrected icon name
import useFetch from '../../hooks/usefetch';
import { SearchContext } from '../../context/searchcontext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';
import StripeCheckout from 'react-stripe-checkout';
import air from '../../assets/Aircraft.ico';

const Reserve = ({ setopen, hotelId }) => {
  const [selectedrooms, setselectedrooms] = useState([]);
  const { data, loading, error } = useFetch(`/rooms`);
  const { dates } = useContext(SearchContext);
  const navigate = useNavigate();
  const [load, setload] = useState(false);
  const [reserved, setReserved] = useState(false);
  const [selectedRoomDetails, setSelectedRoomDetails] = useState([]);

  const KEY = 'sk_test_51NFWIoSHZMAO9Ziq3qCBd6EJDSOHClI6hVkThNGNriKjfgXGdqc0x3WKQh6u4td0QFwNgnpALSNJig7eaJipYUyR00gN3fbx2Z';

  const handleselect = (e) => {
    const selected = e.target.checked;
    const value = e.target.value;
    setselectedrooms(selected ? [...selectedrooms, value] : selectedrooms.filter((item) => item !== value));
  };

  const getdates = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const date = new Date(startDate.getTime());
    let list = [];

    while (date <= endDate) {
      list.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return list;
  };

  const alldates = getdates(dates?.[0]?.startDate, dates?.[0]?.endDate);

  const isavailable = (roomNumber) => {
    const isfound = roomNumber.unavailableDates.some((date) => alldates.includes(new Date(date).getTime()));

    return !isfound;
  };

  const handleclick = async () => {
    try {
      const selectedDetails = selectedrooms.map((roomId) => {
        const room = data.find((item) => item.roomNumbers.some((RN) => RN._id === roomId));
        return {
          hotelName: room.hotelName,
          roomName: room.title,
          roomNumber: room.roomNumbers.find((RN) => RN._id === roomId).number,
          price: room.price,
        };
      });
      setSelectedRoomDetails(selectedDetails);
      setload(true);
    } catch (error) {}
  };


  useEffect(() => {
    let timer;
    if (load) {
      timer = setTimeout(() => {
        setload(false);
        setReserved(true);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [load]);

  const totalPrice = selectedrooms.reduce((total, roomId) => {
    const room = data.find((item) => item.roomNumbers.some((RN) => RN._id === roomId));
    return total + room.price;
  }, 0);

  return (
    <div className='reserve'>
      <div className='rcon'>
        <FontAwesomeIcon icon={faTimesCircle} className='ricon' onClick={() => setopen(false)} />
        <span className='rrtitle'>Select Your Rooms:</span>

        {alldates.length !== 0 ? (
          <>
            {loading ? (
              <Loading />
            ) : error ? (
              <div>Error: {error.message}</div>
            ) : (
              data.map((item) => (
                <div key={item._id} className='ritem'>
                  <div className='riteminfo'>
                    <div className='rtitle'>{item.title}</div>
                    <div className='rdesc'>{item.desc}</div>
                    <div className='rmax'>
                      Max People: <b>{item.maxPeople}</b>
                    </div>
                    <div className='rprice'>₹{item.price}</div>
                  </div>
                  <div className='selectrooms'>
                    {item.roomNumbers.map((RN) => (
                      <div key={RN._id} className='room'>
                        <label htmlFor=''>{RN.number}</label>
                        <input
                          type='checkbox'
                          value={RN._id}
                          disabled={!isavailable(RN)}
                          onChange={handleselect}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </>
        ) : (
          <h1 className='sd'>You need to select dates first</h1>
        )}        
        <button className="rbtn" onClick={handleclick}>Reserve Now</button>
        

        {selectedRoomDetails.length > 0 && (
          <div className="selected-rooms" >
            <h2>Selected Rooms</h2>
            {selectedRoomDetails.map((room, index) => (
              <div key={index} className="selected-room">                
                <p>Room: {room.roomName}</p>
                <p>Room Number: {room.roomNumber}</p>
                <p>Price: ₹{room.price}</p>                
              </div>
            ))}     
            TOTAL : RS {totalPrice}
            <StripeCheckout
              name="TRAVEL TROVE"
              image={air}
              billingAddress
              shippingAddress
              description={`Total: ₹${totalPrice}`}
              amount={totalPrice * 100}
              stripeKey={KEY}             
            >
              <button className="checkout-now-btn rbtn">Checkout Now</button>
            </StripeCheckout>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reserve;
