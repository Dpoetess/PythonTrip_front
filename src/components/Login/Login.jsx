import React, { useState, useEffect } from 'react';
import useApi from '../../services/useApi';
import { useNavigate } from 'react-router-dom';
import { USER_LOGIN } from '../../config/urls';
import './Login.css';

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const { data, loading, error: apiError } = useApi({
    apiEndpoint: submitted ? USER_LOGIN : null,
    method: 'POST',
    body: { username, password },
  });

  useEffect(() => {
    if (data) {
      console.log('Login successful:', data);
      localStorage.setItem('token', data.token);
      if (onLoginSuccess) {
        onLoginSuccess({ username: data.username });
      }
      navigate('/'); // Redirige a la página principal después del inicio de sesión
    }
  }, [data, navigate, onLoginSuccess]);

  useEffect(() => {
    if (apiError) {
      setError('Login failed: ' + (apiError.message || 'Please check your credentials.'));
    }
  }, [apiError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true); // Esto activará el hook `useApi`
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="login-container">
      <div className="back-arrow" onClick={handleBackToHome}>
        <img src="/assets/icons/Arrow.svg" alt="Back to Home" className="arrow-icon" />
      </div>

      <h2 className="login-title">Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
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
