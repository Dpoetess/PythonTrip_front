import React, { useState, useEffect } from 'react';
import UseApi from '../../services/useApi';
import { ATTRACTIONS, } from "../../config/urls";
import './attractionList.css';


const AttractionsList = ({ attractions }) => {
    if (!attractions) {
        return <div>No attractions data available.</div>;
    }

    return (
        <div className="attractions-list">
      {attractions.map((attraction) => (
        <div key={attraction.attr_id} className="attraction-card">
          {attraction.attr_image_url ? (
            <img 
              src={attraction.attr_image_url} 
              alt={attraction.attr_name} 
              className="attraction-image"
              onError={(e) => e.target.style.display = 'none'}
            />
          ) : (
            <div className="no-image">No Image Available</div>
          )}
          <div className="attr-cards-texts-wrapper">
            <h4>{attraction.attr_name}</h4>
            <p>{attraction.attr_description}</p>
          </div>
        </div>
      ))}
    </div>
    );
};

export default AttractionsList;
