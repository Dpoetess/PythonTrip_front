import React, { useState } from 'react';
import axios from 'axios';
import './SignUp.css'; // Asegúrate de que el archivo CSS esté correctamente importado
import { useNavigate } from 'react-router-dom';

function SignUp({ onSignUpSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
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
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/register', {
        email,
        password,
        name,
        lastname,
        username,
        preferences: Object.keys(preferences).filter(key => preferences[key])
      });

      localStorage.setItem('token', response.data.token);
      onSignUpSuccess();
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

  return (
    <div className="signup-container">
      {/* Flecha de regreso */}
      <div className="back-arrow" onClick={handleBackToHome}>
        <img
          src="/assets/icons/Arrow.svg"
          alt="Back to Home"
          className="arrow-icon"
        />
      </div>

      <h2 className="signup-title">Sign Up</h2>
      <form className="signup-form" onSubmit={handleSignUp}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastname">Last Name:</label>
          <input
            type="text"
            id="lastname"
            value={lastname}
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
      </div>
    </div>
  );
}

export default SignUp;
