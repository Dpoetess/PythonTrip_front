// Nav.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './nav.css';

function Navbar({ isAuthenticated, onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/assets/img/logo.png" alt="PythonTrip" />
      </div>
      <ul className="navbar-links">
        {isAuthenticated ? (
          <>
            <li><button onClick={onLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login" className="button">Login</Link></li>
            <li><Link to="/signup" className="button">Sign Up</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
