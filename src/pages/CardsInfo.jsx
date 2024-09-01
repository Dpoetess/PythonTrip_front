import React, { useEffect, useState } from 'react';
import UseApi from ".././services/useApi";
import { ATTRACTIONS, ITINERARIES } from "../config/urls";
import ImageCard from '../components/ImageCard/ImageCard';

import "../css/cardsInfo.css";



const CardsInfo = () => {
    const [attractions, setAttractions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const selectedProvince = localStorage.getItem('selectedProvince');

    useEffect(() => {
        const fetchItineraries = async () => {
            try {
                const { data: itineraries } = await UseApi({
                    apiEndpoint: ITINERARIES
                });

                if (itineraries) {
                    // Encuentra el itinerario seleccionado por su nombre
                    const selectedItinerary = itineraries.find(itinerary => itinerary.name === selectedProvince);

                    if (selectedItinerary) {
                        // Extrae los IDs de las atracciones del itinerario seleccionado
                        const attractionIds = selectedItinerary.attractions.map(attr => attr.id);
                        
                        // Obtiene las atracciones basadas en los IDs
                        const { data: allAttractions } = await UseApi({
                            apiEndpoint: `${ATTRACTIONS}?ids=${attractionIds.join(',')}`
                        });

                        setAttractions(allAttractions);
                    }
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchItineraries();
    }, [selectedProvince]);

    return (
        <div className="totalCardsContainer">
            <div className="h2Container">
                <h2>PythonTrip</h2>
                <h3>{selectedProvince}</h3>
            </div>
            
            <div className="imageCardContainer">
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}
                {attractions.length > 0 ? (
                    attractions.map(attraction => (
                        <ImageCard key={attraction.id} attractionId={attraction.id} />
                    ))
                ) : (
                    <p>No attractions available for the selected province.</p>
                )}
            </div>
        </div>
    );
};

export default CardsInfo;