import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; 
import { useNavigate } from 'react-router-dom';

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/login', {
        email,
        password
      });

      localStorage.setItem('token', response.data.token);
      onLoginSuccess();
    } catch (err) {
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
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
}

export default Login;
