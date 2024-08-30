import React, { useState } from "react";
import UseApi from "../../services/useApi";
import { ATTRACTIONS } from "../../config/urls";
import { FaChevronDown } from "react-icons/fa";
import "./ItineraryDay.css";

const Day = ({ dayNumber, dayIndex, attractions, onSelectAttraction, onAddAttraction }) => {
  const { data: attractionsData, loading, error } = UseApi({ apiEndpoint: ATTRACTIONS });
  console.log('Attractions data:', attractionsData);

  const handleChange = (index, event) => {
    const selectedId = event.target.value;
    const selectedAttraction = attractionsData.find(att => att.attr_id === parseInt(selectedId, 10));
    if (selectedAttraction) {
      onSelectAttraction(dayIndex, index, selectedAttraction);
    }
  };

  return (
    <div className="day-container">
      <h2 className="day-title">Day {dayNumber}</h2>
      {attractions.map((attraction, index) => (
        <div key={index} className="dropdown-container">
          <select
            className="dropdown-select"
            value={attraction.id || ""}
            onChange={(event) => handleChange(index, event)}
          >
            <option value="">Select an Attraction</option>
            {loading && <option>Loading attractions...</option>}
            {error && <option>Error loading attractions</option>}
            {attractionsData && attractionsData.map((att) => (
              <option key={att.attr_id} value={att.attr_id}>
                {att.attr_name}
              </option>
            ))}
          </select>
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