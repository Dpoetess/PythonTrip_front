import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import './DropdownStyle.css'; 
import UseApi from '../../services/useApi';
import {ITINERARIES} from "../../config/urls";

const DayDropdown = () => {
    const [selectedDay, setSelectedDay] = useState("Select a Day");
    const [isOpen, setIsOpen] = useState(false);  
    
    const { data, loading, error } = UseApi({ apiEndpoint: ITINERARIES });
    console.log("API data:", data);

    const itineraries = data;
    console.log("Itineraries:", itineraries);

    const handleSelect = (day) => {
        setSelectedDay(day);
        setIsOpen(false);  
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);  
    };

    return (
        <div className="dropdown">
            <button className={`dropdown-button ${isOpen ? 'active' : ''}`}
                onClick={toggleDropdown}>

                {selectedDay}
                <FaChevronDown className="dropdown-icon" />
            </button>
            {isOpen && (
                <div className="dropdown-content">
                    {days.map((day) => (
                        <div
                            key={day}
                            onClick={() => handleSelect(day)}
                            className="dropdown-item"
                        >
                            {day}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DayDropdown;