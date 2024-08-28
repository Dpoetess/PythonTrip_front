import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './profile.css'; 

function Profile() {
  const [user, setUser] = useState({
    username: '',
    name: '',
    lastname: '',
    email: ''
  });
  const [preferences, setPreferences] = useState({
    Beach: false,
    Mountain: false,
    Urban: false,
    Rural: false,
    Culture: false,
    Sport: false,
    Gastronomy: false
  });

  const navigate = useNavigate();

  useEffect(() => {
  
    axios.get('http://127.0.0.1:8000/api/v1/user')
      .then(response => {
        setUser({
          username: response.data.username,
          name: response.data.name,
          lastname: response.data.lastname,
          email: response.data.email
        });
        setPreferences(prevPreferences => {
          const userPreferences = response.data.preferences;
          return Object.keys(prevPreferences).reduce((acc, key) => ({
            ...acc,
            [key]: userPreferences.includes(key)
          }), {});
        });
      })
      .catch(err => console.error('Error fetching user data:', err));
  }, []);

  const handlePreferenceChange = (event) => {
    const { name, checked } = event.target;
    setPreferences(prevPreferences => ({
      ...prevPreferences,
      [name]: checked
    }));
  };

  const handleSavePreferences = () => {
    axios.put('http://127.0.0.1:8000/api/v1/user/preferences', {
      preferences: Object.keys(preferences).filter(key => preferences[key])
    })
      .then(response => alert('Preferences saved!'))
      .catch(err => console.error('Error saving preferences:', err));
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">Profile</h2>
      <div className="settings-section">
        <h3>Settings</h3>
        <div className="settings-info">
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Last Name:</strong> {user.lastname}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      </div>
      <div className="preferences-section">
        <h3>Preferences</h3>
        <div className="preferences-list">
          {Object.keys(preferences).map(pref => (
            <div className="preference-item" key={pref}>
              <label>
                <input
                  type="checkbox"
                  name={pref}
                  checked={preferences[pref]}
                  onChange={handlePreferenceChange}
                />
                {pref.charAt(0).toUpperCase() + pref.slice(1)}
              </label>
            </div>
          ))}
        </div>
        <button onClick={handleSavePreferences} className="save-preferences-button">Save Preferences</button>
      </div>
      <div className="buttons-section">
        <button className="saved-locations-button">
          Saved Locations
        </button>
        <button className="my-collection-button">
          My Collection & Itineraries
        </button>
      </div>
    </div>
  );
}

export default Profile;
