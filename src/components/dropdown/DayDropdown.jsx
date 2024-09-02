import React, { useState, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import './DropdownStyle.css';
import UseApi from '../../services/useApi';
import { ITINERARIES } from "../../config/urls";


const DayDropdown = ({ selectedProvince, onSelectItinerary }) => {
    const [selectedDay, setSelectedDay] = useState("Select a Day");
    const [isOpen, setIsOpen] = useState(false);
    const { data, loading, error } = UseApi({ apiEndpoint: ITINERARIES });
    const [filteredDays, setFilteredDays] = useState([]);

    useEffect(() => {
        if (data && selectedProvince) {

            const provinceItineraries = data.filter(itinerary => itinerary.name.includes(selectedProvince));

            setFilteredDays(provinceItineraries);
        }
    }, [data, selectedProvince]);

    const handleSelect = (day) => {
        setSelectedDay(day.name);
        setIsOpen(false);
        if (typeof onSelectItinerary === 'function') {
            onSelectItinerary(day);
        } else {
            console.error('onSelectItinerary is not a function');
        }
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="dropdown">
            <button className={`dropdown-button ${isOpen ? 'active' : ''}`}
                onClick={toggleDropdown}>

                {selectedDay}
                <FaChevronDown className="dropdown-icon" />
            </button>
            {isOpen && (
                <div className="dropdown-content">
                    {filteredDays.map((day, index) => (
                        <div
                            key={index}
                            onClick={() => handleSelect(day)}
                            className="dropdown-item"
                        >
                            {day.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DayDropdown;