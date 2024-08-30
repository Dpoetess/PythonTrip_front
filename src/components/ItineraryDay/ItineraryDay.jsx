import React, { useState, useEffect } from "react";
import UseApi from "../../services/useApi";
import { ATTRACTIONS } from "../../config/urls";
//import { FaChevronDown } from "react-icons/fa";
import AddAttractionIcon from "/public/assets/icons/suma.svg";
import RemoveIcon  from "/public/assets/icons/remove.svg";
import "./itineraryDay.css";


const Day = ({ dayNumber, dayIndex, attractions, destinationId, onSelectAttraction, onAddAttraction, onRemoveAttraction }) => {
  const [filteredAttractions, setFilteredAttractions] = useState([]);
  const { data: attractionsData, loading, error } = UseApi({
      apiEndpoint: `${ATTRACTIONS}?loc_id=${destinationId}`,  // Ensure correct numeric ID
  });

  useEffect(() => {
      if (attractionsData) {
          setFilteredAttractions(attractionsData);
      }
  }, [attractionsData]);


  const handleChange = (index, event) => {
    const selectedId = event.target.value;
    const selectedAttraction = filteredAttractions.find(att => att.attr_id === parseInt(selectedId, 10));
    if (selectedAttraction) {
        onSelectAttraction(dayIndex, index, selectedAttraction);
    }
};

  return (
    <div className="day-container">
        <h2 className="day-title">Day {dayNumber}</h2>
        {attractions.map((attraction, index) => (
          <div key={index} className="attr-dropdown-container">
            <div className="dropdown-wrapper">
            <select
              className="dropdown-select"
              value={attraction.id || ""}
              onChange={(event) => handleChange(index, event)}
              disabled={!destinationId}
            >
              <option value="">Select an Attraction</option>
                {loading && <option>Loading attractions...</option>}
                {error && <option>Error loading attractions</option>}
                {filteredAttractions.map(att => (
                  <option key={att.attr_id} value={att.attr_id}>
                    {att.attr_name}
                  </option>
                ))}
            </select>
            <img
              src={RemoveIcon}
              alt="Remove Attraction"
              className="remove-icon"
              onClick={() => onRemoveAttraction(dayIndex, index)}
              title="Remove Attraction"
            />
            </div>
          </div>
        ))}
        <button
            type="button"
            className="add-attraction-btn"
            onClick={() => onAddAttraction(dayIndex)}
        >
            <img src={AddAttractionIcon} alt="Add Attraction" className="add-attraction-icon" />
        </button>
    </div>
  );
};

export default Day;