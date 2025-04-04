import React, { useState, useEffect } from 'react';
import Map, { Marker, Popup } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import StarIcon from '@mui/icons-material/Star';
import './App.css';
import axios from 'axios';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import Register from './components/Register';
import Login from './components/Login';

TimeAgo.addDefaultLocale(en);

const timeAgo = new TimeAgo('en-US');

function App() {
  const myStorage = window.localStorage;
  const [currentUser, setCurrentUser] = useState(null);
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [rating, setRating] = useState(0);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [viewState, setViewState] = useState({
    longitude: -122.4,
    latitude: 37.8,
    zoom: 6
  });

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/pins`);
        setPins(res.data);
      } catch (error) {
        console.log("Error fetching pins:", error);
      }
    };
    getPins();
  }, []);
  
  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewState((prev) => ({
      ...prev,
      longitude: long,
      latitude: lat,
    }));
  };

  const handleAddClick = (e) => {
    const { lng, lat } = e.lngLat;
    setNewPlace({
      lat,
      long: lng
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newPin = {
      username: currentUser,
      title,
      desc,
      rating,
      lat: newPlace.lat,
      long: newPlace.long
    };
  
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/pins`, newPin);
      setPins([...pins, res.data]);  // Update pins with new pin
      setNewPlace(null);             // Reset form state
      setTitle("");                  // Clear title input
      setDesc("");                   // Clear description input
      setRating(null);               // Reset rating dropdown
    } catch (error) {
      console.log("Error adding pin:", error);
    }
  };  

  // Function to toggle Login or Register modal
  const handleShowRegister = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  const handleShowLogin = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const handleLogout = () => {
    myStorage.removeItem("user");
    setCurrentUser(null);
  }

  return (
    <div className="App">
      {/* Show Register or Login when triggered */}
      {showRegister && <Register setShowRegister={setShowRegister}/>}
      {showLogin && <Login setShowLogin={setShowLogin} myStorage={myStorage} setCurrentUser={setCurrentUser}/>}
      
      {/* Conditionally show buttons */}
      {currentUser ? (
        <div className="logout-container">
          <button className="logout" onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div className="auth-buttons-container">
          <button className="login" onClick={handleShowLogin}>Login</button>
          <button className="register" onClick={handleShowRegister}>Register</button>
        </div>
      )}

      {/* Map Component */}
      <Map
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onDblClick={(e) => {
          if (currentUser) {
            handleAddClick(e);
          }
        }}        
      >
        {pins.map((p) => (
          <React.Fragment key={p._id}>
            <Marker
              longitude={p.long}
              latitude={p.lat}
              offset={[0, -21]}
            >
              <div
                onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor: p.username === currentUser ? 'tomato' : 'slateblue',
                  borderRadius: '50% 50% 50% 0',
                  transform: 'rotate(-45deg)',
                  border: '2px solid white',
                  cursor: 'pointer',
                  boxShadow: '0 0 3px rgba(0,0,0,0.5)',
                }}
                title={p.title}
              />
            </Marker>

            {p._id === currentPlaceId &&
            <Popup
              longitude={p.long}
              latitude={p.lat}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setCurrentPlaceId(null)}
            >
              <div className="card">
                <label className="label">Place</label>
                <h4 className="place">{p.title}</h4>
                <label className="label">Review</label>
                <p className="desc">{p.desc}</p>
                <label className="label">Rating</label>
                <div className="stars">
                  {Array.from({ length: p.rating }, (_, i) => (
                    <StarIcon key={i} style={{ color: "gold" }} />
                  ))}
                </div>
                <label className="label">Information</label>
                <span className="username">
                  Created by <b>{p.username}</b>
                </span>
                <span className="date">
                  {timeAgo.format(new Date(p.createdAt))}
                </span>
              </div>
            </Popup>}
          </React.Fragment>
        ))}
        {newPlace && (
          <Popup
            longitude={newPlace.long}
            latitude={newPlace.lat}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setNewPlace(null)}
          >
           <div>
            <form
              onSubmit={(e) => {
                e.preventDefault(); // Prevents form from refreshing the page
                handleSubmit(e);    // Pass event object to handleSubmit
                setRating(null);    // Reset rating after submission
              }}
            >
              <label className="label">Title</label>
              <input placeholder="Enter a title" onChange={(e) => setTitle(e.target.value)} />
              
              <label className="label">Review</label>
              <textarea placeholder="Write a review" onChange={(e) => setDesc(e.target.value)} />
              
              <label className="label">Rating</label>
              <select value={rating || ""} onChange={(e) => setRating(e.target.value)}>
                <option value="" disabled>Select a rating</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              
              <button type="submit" className="submitButton">
                Add Pin
              </button>
            </form>
          </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}

export default App;

