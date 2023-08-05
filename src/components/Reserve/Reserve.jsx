import React, { useContext, useState, useEffect } from 'react';
import './Reserve.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import useFetch from '../../hooks/usefetch';
import { SearchContext } from '../../context/searchcontext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';


const Reserve = ({ setopen, hotelId }) => {
  const [selectedrooms, setselectedrooms] = useState([]);
  const { data, loading, error } = useFetch(`/rooms`);
  const { dates } = useContext(SearchContext);
  const navigate = useNavigate();
  const [load, setload] = useState(false);
  const [reserved, setReserved] = useState(false); 

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
    const isfound = roomNumber.unavailableDates.some(date =>
      alldates.includes(new Date(date).getTime())
    );

    return !isfound;
  };

  const handleclick = async () => {
    try {
      await Promise.all(
        selectedrooms.map((roomId) => {
          const res = axios.put(`/rooms/availability/${roomId}`, { dates: alldates });
          return res.data;
        })
      );      
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
  

  return (
    <div className='reserve'>      
      <div className="rcon">
        <FontAwesomeIcon icon={faCircleXmark} className='ricon' onClick={() => setopen(false)} />
        <span className='rrtitle'>Select Your Rooms:</span>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : (
          data.map((item) => (
            <div key={item._id} className="ritem">
              <div className="riteminfo">
                <div className="rtitle">{item.title}</div>
                <div className="rdesc">{item.desc}</div>
                <div className="rmax">Max People: <b>{item.maxPeople}</b></div>
                <div className="rprice">₹{item.price}</div>
              </div>
              <div className="selectrooms">
                {item.roomNumbers.map(RN => (
                  <div key={RN._id} className="room">
                    <label htmlFor="">{RN.number}</label>
                    <input type="checkbox" value={RN._id} disabled={!isavailable(RN)} onChange={handleselect} />
                  </div>
                ))}
              </div>
            </div>
          ))
        )}        
        <button className='rbtn' onClick={handleclick}>Reserve Now</button>        
      </div>
      {load && !reserved && (
        <div className='load'>
          <Loading />          
        </div>
      )}

      {reserved && (
        <div className='load '>
          <span>Successfully Reserved</span>
          <button onClick={()=>navigate('/home')}>GO to Home Page</button>
        </div>
      )}
        
    </div>
  );
};

export default Reserve;
