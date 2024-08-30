import React from "react";
import "../css/cardsInfo.css"
import Banner from "../components/Banner/Banner"
import ImageCard from "../components/ImageCard/ImageCard";

const CardsInfo = () => {

    return (
        <div className="totalCardsContainer">
            <div className="h2Container">
                <h2>PythonTrip</h2>
                <h3>Barcelona</h3>
            </div>
            <div className="bannerContainer">
                <Banner />
            </div>
            <div className="imageCardContainer">
                <ImageCard />
            </div>
        </div>
    );
};

export default CardsInfo;