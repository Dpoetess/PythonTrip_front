import React from "react";
import "../css/cardsInfo.css"
//import Banner from "../components/Banner/Banner"
import ImageCard from "../components/ImageCard/ImageCard";

const CardsInfo = () => {
    const attractionId = Number(localStorage.getItem('selectedAttractionId'));
    return (
        <div className="totalCardsContainer">
            <div className="h2Container">
                <h2>PythonTrip</h2>
                <h3>Barcelona</h3>
            </div>
            <div className="bannerContainer">
                
            </div>

            <div className="imageCardContainer">
            {attractionId ? (
                    <ImageCard attractionId={attractionId} />
                ) : (
                    <p>No attraction selected.</p>
                )}
            </div>
        </div>
    );
};

export default CardsInfo;