import React, { useState } from 'react';
import axios from 'axios';
import './SignUp.css';
import { useNavigate } from 'react-router-dom';
import { USER_REGISTER } from '../../config/urls';

function SignUp({ onSignUpSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [first_name, setName] = useState('');
  const [last_name, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
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

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(''); 
    setSuccessMessage(''); 
    try {
      const response = await axios.post(USER_REGISTER, {
        email,
        password,
        first_name,
        last_name,
        username,
        preferences: Object.keys(preferences).filter(key => preferences[key])
      });

      localStorage.setItem('token', response.data.token);
      onSignUpSuccess({ username: response.data.username });
      setSuccessMessage('Registered successfully!'); 
      navigate('/'); 
    } catch (err) {
      setError('Sign up failed: ' + (err.response?.data?.message || 'Please try again.'));
    }
  };

  const handlePreferenceChange = (event) => {
    const { name, checked } = event.target;
    setPreferences(prevPreferences => ({
      ...prevPreferences,
      [name]: checked
    }));
  };

  const handleSavePreferences = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/save-preferences', {
        preferences: Object.keys(preferences).filter(key => preferences[key])
      });

      setSuccessMessage('Preferences saved successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Failed to save preferences: ' + (err.response?.data?.message || 'Please try again.'));
    }
  };

  return (
    <div className="signup-container">
      <div className="back-arrow" onClick={handleBackToHome}>
        <img src="/assets/icons/Arrow.svg" alt="Back to Home" className="arrow-icon" />
      </div>

      <h2 className="signup-title">Sign Up</h2>
      <form className="signup-form" onSubmit={handleSignUp}>
        <div className="form-group">
          <label htmlFor="first_name">Name:</label>
          <input
            type="text"
            id="name"
            value={first_name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="last_name">Last Name:</label>
          <input
            type="text"
            id="lastname"
            value={last_name}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <button type="submit" className="signup-button">Sign Up</button>
      </form>

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
        <button className="save-preferences-button" onClick={handleSavePreferences}>
          Save Preferences
        </button>
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    </div>
  );
}

export default SignUp;
