import './Header.css';
import { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faCalendarDays, faCar, faPerson, faPlane, faTaxi } from '@fortawesome/free-solid-svg-icons';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/searchcontext';
import { AuthContext } from '../../context/AuthContext';

const Header = ({ type }) => {
  const [openDate, setOpenDate] = useState(false);
  const [Destination, setDestination] = useState("");
  const [openOption, setOpenOption] = useState(false);
  const navigate = useNavigate();
  const [Option, setOption] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const { user } = useContext(AuthContext);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const handleOption = (name, operation) => {
    setOption((prev) => ({
      ...prev,
      [name]: operation === "i" ? Option[name] + 1 : Option[name] - 1,
    }));
  };

  const { dispatch } = useContext(SearchContext);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const capitalizedInput = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
    setDestination(capitalizedInput);
  };

  const handleSearch = () => {
    const payload = {
      city: Destination,
      dates: state,
      options: Option,
    };

    dispatch({ type: "NEW_SEARCH", payload });
    navigate('/hotels', { state: { Option, Destination, state } });
  };

  return (
    <div className='header'>
      <div className={type === "list" ? "headercontainer listmode" : "headercontainer"}>
        <div className="headerlist">
          <div className="headerlistItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className="headerlistItem active1">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className="headerlistItem active1">
            <FontAwesomeIcon icon={faCar} />
            <span>Cars</span>
          </div>
          <div className="headerlistItem active1">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Taxis</span>
          </div>
        </div>
        {type !== "list" && (
          <>
            <h1 className="headertitle">A LifeTime of Discounts? It's Genius</h1>
            <p className="headerdesc">Get rewarded for travels and unlock instant savings of 10% or more with a free TravelTrove account</p>
            {!user && <button className="headerbtn">Sign in / Register</button>}

            <div className="headersearch">
              <div className="headersearchitem headcon">
                <FontAwesomeIcon icon={faBed} className='headericon' />
                <input type="text" placeholder='Where Are You Going? Only 3 cities (Chennai, Bangalore, Hyderabad)' className='headersearchinput' onChange={handleInputChange} />
                <span className='hide'>Chennai, Bangalore, Hyderabad</span>
              </div>
              <div className="headersearchitem" onClick={() => setOpenDate(!openDate)}>
                <FontAwesomeIcon icon={faCalendarDays} className='headericon' />
                <span className='headersearchtext'>{`${format(state[0].startDate, "MM/dd/yyyy")} to ${format(state[0].endDate, "MM/dd/yyyy")}`}</span>
                {openDate && <DateRange
                  editableDateInputs={true}
                  onChange={item => setState([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={state}
                  className="date"
                />}
              </div>
              <div className="headersearchitem" >
                <FontAwesomeIcon icon={faPerson} className='headericon' />
                <span className='headersearchtext' onClick={() => setOpenOption(!openOption)}>{`${Option.adult} adult , ${Option.children} children ${Option.room} Room`}</span>
                {openOption &&
                  <div className="options" >
                    <div className="options">
                      <div className="optionitem">
                        <span className="optiontext">Adult</span>
                        <div className="optioncounter">
                          <button className="optioncounterbutton" onClick={() => handleOption("adult", "d")} disabled={Option.adult <= 1}>-</button>
                          <span className="optioncounternumber">{Option.adult}</span>
                          <button className="optioncounterbutton" onClick={() => handleOption("adult", "i")}>+</button>
                        </div>
                      </div>
                      <div className="optionitem">
                        <span className="optiontext">Children</span>
                        <div className="optioncounter">
                          <button className="optioncounterbutton" onClick={() => handleOption("children", "d")} disabled={Option.children <= 0}>-</button>
                          <span className="optioncounternumber">{Option.children}</span>
                          <button className="optioncounterbutton" onClick={() => handleOption("children", "i")}>+</button>
                        </div>
                      </div>
                      <div className="optionitem">
                        <span className="optiontext">Room</span>
                        <div className="optioncounter">
                          <button className="optioncounterbutton" onClick={() => handleOption("room", "d")} disabled={Option.room <= 1}>-</button>
                          <span className="optioncounternumber">{Option.room}</span>
                          <button className="optioncounterbutton" onClick={() => handleOption("room", "i")}>+</button>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              </div>

              <div className="headersearchitem">
                <button className='headerbtn' onClick={handleSearch}>Search</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
