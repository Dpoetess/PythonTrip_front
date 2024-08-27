import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import './DropdownStyle.css';

const Dropdown = () => {
    const [selectedProvince, setSelectedProvince] = useState("Destination Selection");
    const [isOpen, setIsOpen] = useState(false);  
    const provinces = ["Barcelona", "Bilbao", "Madrid", "Sevilla"];

    const handleSelect = (province) => {
        setSelectedProvince(province);
        setIsOpen(false);  
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);  
    };

    return (
        <div className="dropdown-container">
            <div className="dropdown">
                <button className={`dropdown-button ${isOpen ? 'active' : ''}`}
                    onClick={toggleDropdown}>

                    {selectedProvince}
                    <FaChevronDown className="dropdown-icon" />
                </button>
                {isOpen && (
                    <div className="dropdown-content">
                        {provinces.map((province) => (
                            <div
                                key={province}
                                onClick={() => handleSelect(province)}
                                className="dropdown-item"
                            >
                                {province}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dropdown;