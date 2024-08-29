import React from 'react';
import { Link } from 'react-router-dom'; 
import './nav.css'; 

function Navbar({ isAuthenticated, username, onLogout }) {
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
            <li><button onClick={onLogout} className="button">Logout</button></li>
            <li><Link to="/profile" className="button">Profile</Link></li>
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
