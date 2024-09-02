import React, { useState, useEffect } from 'react';
import UseApi from '../services/useApi';
import { ATTRACTIONS } from '../config/urls';
import AttractionsList from '../components/ItineraryDay/AttractionList';
import "../css/cardsInfo.css";


const CardsInfo = () => {
    const [filteredAttractions, setFilteredAttractions] = useState([]);
    const destinationId = localStorage.getItem('selectedLocationId');

    const { data: attractionsData, loading, error } = UseApi({
        apiEndpoint: destinationId ? `${ATTRACTIONS}?loc_id=${destinationId}` : null,
    });

    useEffect(() => {
        if (attractionsData) {
            setFilteredAttractions(attractionsData);
        }
    }, [attractionsData]);

    return (
        <div className="totalCardsContainer">
            <div className="h2Container">
                <h2>PythonTrip</h2>
                <h3>{localStorage.getItem('selectedProvince')}</h3>
            </div>
            <div className="imageCardContainer">
                {loading ? (
                    <div>Loading attractions...</div>
                ) : error ? (
                    <div>Error loading attractions</div>
                ) : (
                    <AttractionsList attractions={filteredAttractions} />
                )}
            </div>
        </div>
    );
};

export default CardsInfo;










/* const CardsInfo = () => {
    const [attractions, setAttractions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const selectedLocationId = localStorage.getItem('selectedLocationId');

    useEffect(() => {
        if (selectedLocationId) {
            const fetchAttractions = async () => {
                try {
                    setLoading(true);
                    const { data } = await UseApi({ apiEndpoint: `${ATTRACTIONS}?loc_id=${selectedLocationId}` });
                    setAttractions(data);
                    setLoading(false);
                } catch (error) {
                    setError(error.message || 'Failed to fetch attractions');
                    setLoading(false);
                }
            };
            fetchAttractions();
        }
    }, [selectedLocationId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="totalCardsContainer">
            <div className="h2Container">
                <h2>PythonTrip</h2>
                <h3>{localStorage.getItem('selectedProvince')}</h3>
            </div>
            <div className="imageCardContainer">
                <AttractionsList attractions={attractions} />
            </div>
        </div>
    );
};

export default CardsInfo; */




/* const CardsInfo = () => {
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
                {console.log("Selected Itinerary:", selectedItinerary)}
                {selectedItinerary && <AttractionsList itinerary={selectedItinerary} />}
            </div>
        </div>
    );
};

export default CardsInfo;
 */