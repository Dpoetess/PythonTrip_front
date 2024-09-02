import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';
import './DropdownStyle.css';
import UseApi from '../../services/useApi';
import { LOCATIONS, ATTRACTIONS } from "../../config/urls";


const Dropdown = () => {
    const [selectedLocation, setSelectedLocation] = useState("Destination Selection");
    const [isOpen, setIsOpen] = useState(false);
    const [destinationId, setDestinationId] = useState(null);
    const navigate = useNavigate();

    const { data: locations, loading, error } = UseApi({ apiEndpoint: LOCATIONS });
    const { data: attractionsData } = UseApi({
        apiEndpoint: destinationId ? `${ATTRACTIONS}?loc_id=${destinationId}` : null,
    });

    const handleSelect = (location) => {
        setSelectedLocation(location.name);
        setIsOpen(false);
        setDestinationId(location.loc_id);
        localStorage.setItem('selectedLocationId', location.loc_id);
        localStorage.setItem('selectedProvince', location.name);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleStartClick = () => {
<<<<<<< HEAD
=======
       
>>>>>>> dev
        navigate('/cardsInfo');
    };

    useEffect(() => {
    }, [attractionsData]);

    return (
        <div className="dropdown-container">
            <h2 className='H2'>PythonTrip</h2>
            <div className="dropdown">
                <button className={`dropdown-button ${isOpen ? 'active' : ''}`} onClick={toggleDropdown}>
                    {selectedLocation}
                    <FaChevronDown className="dropdown-icon" />
                </button>
                {isOpen && (
                    <div className="dropdown-content">
                        {loading ? (
                            <div>Loading...</div>
                        ) : error ? (
                            <div>Error loading locations</div>
                        ) : (
                            locations.map((location) => (
                                <div
                                    key={location.loc_id}
                                    onClick={() => handleSelect(location)}
                                    className="dropdown-item"
                                >
                                    {location.name}
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
            <button className="main-button" onClick={handleStartClick}>START</button>
        </div>
    );
};

export default Dropdown;

