
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom'; 
import Navbar from './components/nav/Nav'; 
import Login from './components/Login/Login';
import SignUp from './components/Signup/SignUp';
import './index.css';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Chatbot from './pages/Chatbot';

import Dropdown from './components/dropdown/Dropdown';


import Profile from './components/Profile/Profile';
import { useNavigate } from 'react-router-dom';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState(''); 
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setUsername(user.username);
  };


  const handleLogout = () => {
    localStorage.removeItem('token'); 
    setIsAuthenticated(false); 
    setUsername(''); 
    navigate('/'); 
  };

  return (
    <div>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      
    
      <Routes>
        <Route path="/" element={
          <>
            <Home />
          </>
        } />
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/signup" element={<SignUp onSignUpSuccess={handleLoginSuccess} />} />
        <Route path="/chatbot" element={<Chatbot />} />

        <Route path="/dropdown" element={<Dropdown />} />

        <Route path="/profile" element={<Profile />} />

      </Routes>

      <Footer />
    </div>
  );

}

export default App;
