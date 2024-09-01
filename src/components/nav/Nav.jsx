import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import useApi from '../../services/useApi'; 
import { USER_DETAIL } from '../../config/urls';
import './nav.css'; 

function Navbar({ isAuthenticated, userName, onLogout }) {
  const [username, setUsername] = useState('');

  // Utiliza el hook useApi para obtener los detalles del usuario
  const { data, loading, error } = useApi({
    apiEndpoint: isAuthenticated ? USER_DETAIL : null,
    method: 'GET',  // Explicitly specifying the method
    headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
    }
  });

  useEffect(() => {
    if (data && data.username) {
      setUsername(data.username); 
    }
  }, [data]);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src="/assets/img/logo.png" alt="PythonTrip" />
        </Link>
        {isAuthenticated && <p className="welcome-message">Hi, {username}</p>}
      </div>
      <ul className="navbar-links">
        {isAuthenticated ? (
          <>
            <li><button onClick={onLogout} className="navbar-button">Logout</button></li>
            <li><Link to="/user" className="navbar-button">Profile</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/login" className="navbar-button">Login</Link></li>
            <li><Link to="/signup" className="navbar-button">Sign Up</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
