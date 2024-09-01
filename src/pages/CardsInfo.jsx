import React, { useState } from 'react';
import DayDropdown from '../components/dropdown/DayDropdown';
import AttractionsList from '../components/ItineraryDay/attractionList';"../components/ItineraryDay/AttractionList";
import "../css/cardsInfo.css";



const CardsInfo = () => {
    const [selectedItinerary, setSelectedItinerary] = useState(null);

    const handleSelectItinerary = (itinerary) => {
        setSelectedItinerary(itinerary);
    };

    return (
        <div className="totalCardsContainer">
            <div className="h2Container">
                <h2>PythonTrip</h2>
                <h3>{localStorage.getItem('selectedProvince')}</h3>
            </div>
            <div className="day-dropdown-container">
                <DayDropdown selectedProvince={localStorage.getItem('selectedProvince')} onSelectItinerary={handleSelectItinerary} />
            </div>
            <div className="imageCardContainer">
                {selectedItinerary && <AttractionsList itinerary={selectedItinerary} />}
            </div>
        </div>
    );
};

export default CardsInfo;
