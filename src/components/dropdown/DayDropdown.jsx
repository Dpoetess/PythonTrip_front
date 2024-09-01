import React, { useState, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import './DropdownStyle.css'; 
import UseApi from '../../services/useApi';
import { ITINERARIES } from "../../config/urls";

const DayDropdown = ({ selectedProvince }) => {
    const [selectedDay, setSelectedDay] = useState("Select a Day");
    const [isOpen, setIsOpen] = useState(false);  
    
    const { data, loading, error } = UseApi({ apiEndpoint: ITINERARIES });
    console.log("API data:", data);

    const [filteredDays, setFilteredDays] = useState([]);

    useEffect(() => {
        if (data && selectedProvince) {
            // Filtra los itinerarios según la provincia seleccionada
            const provinceItineraries = data.filter(itinerary => itinerary.name.includes(selectedProvince));
            
            // Extrae los días disponibles para esos itinerarios
            const days = provinceItineraries.map(itinerary => itinerary.name);
            
            setFilteredDays(days);
        }
    }, [data, selectedProvince]);

    const handleSelect = (day) => {
        setSelectedDay(day);
        setIsOpen(false);  
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
                            {day}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DayDropdown;