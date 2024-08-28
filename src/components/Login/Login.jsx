import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; 
import { useNavigate } from 'react-router-dom';
import { USER_LOGIN } from '../../config/urls';


function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Login attempt started');
    try {
      console.log('Sending request to backend with:', { username, password }); 
      const response = await axios.post(USER_LOGIN, {
        username,
        password
      });
    console.log('Response received from backend:', response.data);
      localStorage.setItem('token', response.data.token);
      onLoginSuccess({ username: response.data.username }); 
      navigate('/profile'); 
    } catch (err) 
    { console.error('Login failed:', err); 
       if (err.response) 
        { console.error('Error response data:', err.response.data); 
        console.error('Error response status:', err.response.status); 
        console.error('Error response headers:', err.response.headers); } 
        else { console.error('Error without response:', err.message); }
      setError('Login failed: ' + (err.response?.data?.message || 'Please check your credentials.'));
    }
  };

  return (
    <div className="login-container">
      {/* Flecha de regreso */}
      <div className="back-arrow" onClick={handleBackToHome}>
        <img 
          src="/assets/icons/Arrow.svg" 
          alt="Back to Home" 
          className="arrow-icon"
        />
      </div>

      <h2 className="login-title">Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
}

export default Login;
