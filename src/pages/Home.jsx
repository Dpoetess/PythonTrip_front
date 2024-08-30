import React from 'react';
import './home.css'; 
import Banner from '../components/Banner/Banner';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();  
  const handleChatbotClick = () => {
    navigate('/chatbot');  
  };

  const handleSearchPlanningClick = () => {
    navigate('/dropdown');  
  };

  return (
    <main className="main">
      <div className="description-box">
        <h2>PythonTrip</h2>
        <p>
          Discover your next adventure with our smart travel app. Plan
          personalized trips, create routes, and explore attractions tailored to
          you. Start exploring today!
        </p>
      </div>
      
      <Banner />

      <div className="main-buttons">
        <button className="main-button" onClick={handleSearchPlanningClick}>SEARCH PLANNING</button>
        
        <button className="main-button" onClick={handleChatbotClick}>CHATBOT</button>
      </div>
    </main>
  );
}

export default Home;