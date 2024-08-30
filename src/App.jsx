
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/nav/Nav";
import Login from "./components/Login/Login";
import SignUp from "./components/Signup/SignUp";
import "./index.css";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import Chatbot from "./pages/Chatbot";
import Dropdown from "./components/dropdown/Dropdown";
import NewItinerary from "./pages/NewItinerary";
import CardsInfo from "./pages/CardsInfo";
import { USER_LOGIN, USER_REGISTER } from "./config/urls";
import axios from "axios";
import User from './components/User/User';
import SavedLocations from './pages/SavedLocations';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.get('/api/v1/check-auth', { 
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(response => {
        setIsAuthenticated(true);
        setUsername(response.data.username || ''); // Asegúrate de que username esté definido
      })
      .catch(error => {
        console.error('Auth Check Error:', error); // Verifica errores aquí
        setIsAuthenticated(false);
      });

      axios
        .get("/api/v1/check-auth", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setIsAuthenticated(true);
          setUsername(response.data.username);
        })
        .catch(() => {
          setIsAuthenticated(false);
        });

    }
  }, []);

  const handleLoginSuccess = (user) => {
    setIsAuthenticated(true);
    setUsername(user.username);
    navigate("/");
  };

  const handleSignUpSuccess = (user) => {
    setIsAuthenticated(true);


    setUsername(user.username); 
    navigate('/'); 

  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUsername("");
    navigate("/");
  };

  return (
    <div>
      <Navbar
        isAuthenticated={isAuthenticated}
        username={username}
        onLogout={handleLogout}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<Login onLoginSuccess={handleLoginSuccess} />}
        />
        <Route
          path="/signup"
          element={<SignUp onSignUpSuccess={handleSignUpSuccess} />}
        />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/user" element={<User />} />
        <Route path="/savedlocations" element={<SavedLocations />} />
        <Route path="/dropdown" element={<Dropdown />} />
        <Route path="/dropdown" element={<Dropdown />} />
        <Route path="/newItinerary" element={<NewItinerary />} />
        <Route path="/cardsInfo" element={<CardsInfo />} />

        <Route path="/user" element={<User /> } />
        <Route path="/savedlocations" element={<SavedLocations />} />
        <Route path="/dropdown" element={<Dropdown />} />
        


      </Routes>

      <Footer />
    </div>
  );
}

export default App;
