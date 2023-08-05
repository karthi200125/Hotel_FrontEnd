import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Header from '../../components/Header/Header';
import './List.css';
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import { DateRange } from 'react-date-range';
import SerachItem from '../../components/SearchItem/SerachItem';
import useFetch from '../../hooks/usefetch.js'

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.Destination);
  const [Date, setDate] = useState(location.state.state);
  const [openDate, setopenDate] = useState(false)
  const [option, setOption] = useState(location.state.Option);
  const [min, setmin] = useState(undefined);
  const [max, setmax] = useState(undefined);

  const url = destination ? `/hotels/bycity/${destination}` : '/hotels';
  const { data, loading, error, refetch } = useFetch(url);
  // '/hotels/?city={destination}&min=${min || 0}&max=${max || 999}'
const handlesearch=()=>{
  refetch()
}

const handleInputChange = (e) => {
  const inputValue = e.target.value;
  const capitalizedInput = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
  setDestination(capitalizedInput);
};


  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listcontainer">
        <div className="listwrapper">
          <div className="listsearch">
            <h1 className="listsearchtitle">Search</h1>
            <div className="lsitem">
              <label htmlFor="">destination</label>
              <input type="text" value={destination} onChange={handleInputChange} className='desiti'placeholder='Only 3 cities (Chennai,Bangalore,Hyderabad)'/>
            </div>
            <div className="lsitem serchdate">
              <label htmlFor="">Check-in date</label>
              <span onClick={()=>setopenDate(!openDate)}>{`${format(Date[0].startDate, 'MM/dd/yyyy')} to ${format(Date[0].endDate, 'MM/dd/yyyy')}`}</span>
              {openDate &&
              (<DateRange
              onChange={item =>setDate([item.selection])} 
              ranges={Date}              
              />)}
            </div>

            <div className="lsitem lsioptions">
              <label className='opt'>Options</label>
              <div className="lsoptionitem">
                <span className="lsoptiontext">Min Price </span>
                <input type="number" className="lsoptioninput" onChange={e=>setmin(e.target.value)} placeholder='₹'/>
              </div>
            </div>
            <div className="lsitem">
              <div className="lsoptionitem">
                <span className="lsoptiontext">Max Price </span>
                <input type="number" className="lsoptioninput" onChange={e=>setmax(e.target.value)}placeholder='₹'/>
              </div>
            </div>
            <div className="lsitem">              
              <div className="lsoptionitem">
                <span className="lsoptiontext">adult</span>
                <input type="number" min={1} className="lsoptioninput" placeholder={option.adult}/>
              </div>
            </div>
            <div className="lsitem">              
              <div className="lsoptionitem">
                <span className="lsoptiontext">Children </span>
                <input type="number" min={0} className="lsoptioninput" placeholder={option.children}/>
              </div>
            </div>
            <div className="lsitem">              
              <div className="lsoptionitem">
                <span className="lsoptiontext">Room</span>
                <input type="number" min={1} className="lsoptioninput" placeholder={option.room}/>
              </div>
            </div>
            <button onClick={handlesearch}>Search</button>
          </div>

          <div className="listresult">
            {loading ? "loading .." : 
            <>
            {data.map(item=>(
            <SerachItem item={item} key={item._id}/>    
            ))}        
            </>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
