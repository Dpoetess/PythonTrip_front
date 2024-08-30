import React from "react";
import "./imageCard.css";

const ImageCard = () => {

    return (
        <div>
            <div className="totalContainer">
                <div className="rowContainer">
                    <div className="imgContainer" >
                        <img className="imgSize" src="../../../public/assets/img/Esp_Barc_Sagrada_Familia.jpg" alt="Descripción de la imagen" />
                    </div>
                    <div>
                        <p>The Sagrada Familia, Gaudí’s unfinished basilica in Barcelona,
                            features intricate facades and towering spires, blending Gothic and modernist styles.</p>
                    </div>
                </div>
                <div className="rowContainer">
                    <div className="imgContainer" >
                        <img className="imgSize" src="../../../public/assets/img/Esp_Barc_la pedrera.jpg" alt="Descripción de la imagen" />
                    </div>
                    <div>
                        <p>La Pedrera, or Casa Milà, is a modernist building by Gaudí,
                            known for its wavy stone facade and unique rooftop.</p>
                    </div>
                </div>
                <div className="rowContainer">
                    <div className="imgContainer" >
                        <img className="imgSize" src="../../../public/assets/img/Esp_Barc_Poble_Espanyol.jpg" alt="Descripción de la imagen" />
                    </div>
                    <div className="pContainer">
                        <p>Poble Español is an open-air museum in Barcelona,
                            showcasing traditional Spanish architecture, crafts, and culture from various regions.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageCard;