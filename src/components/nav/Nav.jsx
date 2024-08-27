import React from 'react';
import { Link } from 'react-router-dom'; // Asegúrate de importar Link
import './nav.css'; // Asegúrate de que el CSS esté importado

function Navbar({ isAuthenticated, onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src="/assets/img/logo.png" alt="PythonTrip" />
        </Link>
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
