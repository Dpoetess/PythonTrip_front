import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import './DropdownStyle.css'; 

const DayDropdown = () => {
    const [selectedDay, setSelectedDay] = useState("Select a Day");
    const [isOpen, setIsOpen] = useState(false);  
    const days = ["1 day","2 days","3 days"];

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