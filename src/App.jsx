
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
import axios from "axios";
import User from './pages/User';
import SavedLocations from './pages/SavedLocations';
import MyItinerary from "./pages/MyItinerary";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("/api/v1/check-auth", {
          headers: { Authorization: `Token ${token}` },
        })
        .then((response) => {
          setIsAuthenticated(true);
          setUser(response.data);
          setUsername(response.data.username || '');
        })
        .catch(error => {
        console.error('Auth Check Error:', error); 
          setIsAuthenticated(false);
          setUser(null);
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
        <Route path="/savedlocations" element={<SavedLocations />} />
        <Route path="/dropdown" element={<Dropdown />} />
        <Route path="/newItinerary" element={<NewItinerary user={user} />} />
        <Route path="/cardsInfo" element={<CardsInfo />} />
        <Route path="/user" element={<User />} />
        <Route path="/myItinerary" element={<MyItinerary />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
