// App.jsx
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom'; 
import Navbar from './components/nav/Nav'; 
import Login from './components/NavButton/Login';
import SignUp from './components/NavButton/SignUp';
import './index.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <div>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/signup" element={<SignUp onSignUpSuccess={handleLoginSuccess} />} />
      </Routes>
    </div>
  );
}

export default App;
