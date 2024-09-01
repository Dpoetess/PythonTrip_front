import React, { useState, useEffect } from 'react';
import UseApi from '../../services/useApi';
import { ATTRACTIONS, } from "../../config/urls";
import './attractionList.css';
//import "./itineraryDay.css";

const AttractionsList = ({ itinerary }) => {
    const [attractions, setAttractions] = useState([]);
    const { data, loading, error } = UseApi({
        apiEndpoint: `${ATTRACTIONS}?ids=${itinerary?.attractions?.map(attr => attr.id).join(',') || ''}`,
    });

    useEffect(() => {
        if (data) {
            setAttractions(data);
        }
    }, [data]);

    if (loading) return <div>Loading attractions...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="attractions-list">
            {attractions.length > 0 ? (
                attractions.map(attraction => (
                    <div key={attraction.id} className="attraction-item">
                        <img
                            src={attraction.attr_image_url}
                            alt={attraction.attr_name}
                            className="imgSize"
                        />
                        <h2>{attraction.attr_name}</h2>
                        <p>{attraction.attr_description}</p>
                    </div>
                ))
            ) : (
                <p>No attractions available for the selected itinerary.</p>
            )}
        </div>
    );
};

export default AttractionsList;
