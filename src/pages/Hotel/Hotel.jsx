import React, { useContext, useState } from 'react';
import './Hotel.css';
import Navbar from '../../components/Navbar/Navbar';
import Header from '../../components/Header/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft, faCircleArrowRight, faTimesCircle, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import MailList from '../../components/MailList/MailList';
import Footer from '../../components/Footer/Footer';
import useFetch from '../../hooks/usefetch';
import { useLocation, useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/searchcontext';
import { AuthContext } from '../../context/AuthContext';
import Reserve from '../../components/Reserve/Reserve';

const Hotel = () => {
  const [slidenumber, setslidenumber] = useState(0);
  const [open, setopen] = useState(false);
  const [openmodel, setopenmodel] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');

  const { data, loading, error, refetch } = useFetch(`/hotels/find/${id}`);
  const { user } = useContext(AuthContext);
  const { dates, options } = useContext(SearchContext);

  const handleopen = (i) => {
    setslidenumber(i);
    setopen(true);
  };

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2?.getTime() - date1?.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(dates?.[0]?.endDate, dates?.[0]?.startDate);

  const handleclick = () => {
    if (user) {
      setopenmodel(true);
    } else {
      navigate('/login');
    }
  };
  

  return (
    <div>
      <Navbar />
      <Header type="list" />

      {loading ? 'loading' : (
        <div className="hotelcon">
          {open && (
            <div className="slider">
              <FontAwesomeIcon icon={faTimesCircle} onClick={() => setopen(false)} className="close" />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                onClick={() => setslidenumber((prev) => Math.max(prev - 1, 0))}
                className="arrow left-arrow"
              />
              <div className="sliderwrapper">
                {data.photos[slidenumber] && <img src={data.photos[slidenumber]} alt="" className="sliderimg" />}
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                onClick={() => setslidenumber((prev) => Math.min(prev + 1, data.photos.length - 1))}
                className="arrow right-arrow"
              />
            </div>
          )}
          <div className="hotelwrapper">
            <h1 className="hoteltitle">{data.name}</h1>
            <div className="hoteladress">
              <FontAwesomeIcon icon={faLocationDot} className="location" />
              <span className="address">{data.address}</span>
              <span className="hoteldistance"><b style={{color:"black",fontWeight:"600"}}>{data.distance}</b> from center</span>
              <span className="hotelpricehl">
                Book a stay over <span style={{color:"red",fontWeight:"600"}}>₹{data.cheapestPrice}</span> at this property and get a free airport taxi
              </span>
            </div>
            <div className="hotelimages">
              {data.photos?.map((imges, i) => (
                <div className="hotelimgwrapper" key={i}>
                  <img onClick={() => handleopen(i)} src={imges} alt="" className="hotelimg" />
                </div>
              ))}
            </div>
            <div className="hoteldetails">
              <div className="hoteldetailtext">
                <h1 className="hoteldetexth1">{data.title}</h1>
                <p className="hoteldesc">{data.desc}</p>
              </div>
              <div className="hotldetailprice">
                <h1>perfect for a {days > 0 ? days :"0" }-night stay</h1>
                <span>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis laborum praesentium consequuntur sequi, nam
                  laboriosam.
                </span>
                <h2>
                  <b>₹{days > 0 ? days * data.cheapestPrice * options.room : "0"}</b> ({days > 0 ? days :"0"} Days)
                </h2>
                <button onClick={handleclick}>Reserve Book</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {openmodel && <Reserve setopen={setopenmodel} hotelId={id} />}
      <MailList />
      <Footer />
    </div>
  );
};

export default Hotel;
