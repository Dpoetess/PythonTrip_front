import React, { useState } from "react";
import UseApi from "../../services/useApi";
import { ATTRACTIONS } from "../../config/urls";
import { FaChevronDown } from "react-icons/fa";
import "./ItineraryDay.css";

const Day = ({ dayNumber, dayIndex, attractions, onSelectAttraction, onAddAttraction }) => {
  const [isOpen, setIsOpen] = useState(null);

  const { data: attractionsData, loading, error } = UseApi({ apiEndpoint: ATTRACTIONS });

  // Debugging logs
  console.log('Attractions Data:', attractionsData);
  console.log('Loading:', loading);
  console.log('Error:', error);

  const toggleDropdown = (index) => {
    setIsOpen(isOpen === index ? null : index);
  };

  return (
    <div className="day-container">
      <h2 className="day-title">Day {dayNumber}</h2>
      {attractions.map((attraction, index) => (
        <div key={index} className="dropdown-container">
          <button
            className={`dropdown-button ${isOpen === index ? "active" : ""}`}
            onClick={() => toggleDropdown(index)}
          >
            {attraction.name || "Select an Attraction"}
            <FaChevronDown className="dropdown-icon" />
          </button>
          {isOpen === index && (
            <div className="dropdown-content">
              {loading && <p>Loading attractions...</p>}
              {error && <p>Error loading attractions: {error}</p>}
              {attractionsData && attractionsData.length > 0 ? (
                attractionsData.map((att) => (
                  <div
                    key={att.id}
                    onClick={() => onSelectAttraction(dayIndex, index, att)}
                    className="dropdown-item"
                  >
                    {att.name}
                  </div>
                ))
              ) : (
                <p>No attractions available</p>
              )}
            </div>
          )}
        </div>
      ))}
      <button
        type="button"
        className="add-attraction-btn"
        onClick={() => onAddAttraction(dayIndex)}
      >
        Add Another Attraction
      </button>
    </div>
  );
};

export default Day;