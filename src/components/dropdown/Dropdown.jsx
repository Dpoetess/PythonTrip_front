import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import './DropdownStyle.css';
import DayDropdown from './DayDropdown';
import UseApi from '../../services/useApi';
import { LOCATIONS } from "../../config/urls";



const Dropdown = () => {
    const [selectedProvince, setSelectedProvince] = useState("Destination Selection");
    const [isOpen, setIsOpen] = useState(false);


    const { data, loading, error } = UseApi({ apiEndpoint: LOCATIONS });
    console.log("API data:", data);

    const provinces = data;
    console.log("Provinces:", provinces);

    const handleSelect = (province) => {
        console.log("Selected province:", province);

        setSelectedProvince(province);

        setIsOpen(false);
    };


    const toggleDropdown = () => {
        console.log("Dropdown toggle, isOpen:", isOpen);
        setIsOpen(!isOpen);
    };

    const handleStartClick = () => {
        navigate('/');
    };

    if (loading) {
        console.log("Loading data...");
        return <div>Loading...</div>;
    }


    if (error) {
        console.error("Error fetching data:", error);
        return <div>Error: {error}</div>;
    }


    return (

        <div className="dropdown-container">
            <h2 className='H2'>PythonTrip</h2>
            {/* Dropdown de provincias */}
            <div className="dropdown">
                <button className={`dropdown-button ${isOpen ? 'active' : ''}`}
                    onClick={toggleDropdown}>

                    {selectedProvince}
                    <FaChevronDown className="dropdown-icon" />
                </button>
                {isOpen && (
                    <div className="dropdown-content">
                        {provinces?.map((province, index) => (
                            <div
                                key={province}
                                onClick={() => handleSelect(province.name)}
                                className="dropdown-item"
                            >
                                {province.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="day-dropdown-container">
                <DayDropdown />
            </div>
            <button className="main-button" onClick={handleStartClick}>START</button>
        </div>
    );
};

export default Dropdown;