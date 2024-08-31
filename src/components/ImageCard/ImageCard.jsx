import React from 'react';
import PropTypes from 'prop-types';
import UseApi from '../../services/useApi';
import { ATTRACTIONS } from '../../config/urls';

// Componente para mostrar una imagen y descripción de una atracción
const ImageCard = ({ attractionId }) => {
    console.log('ImageCard component rendered with attractionId:', attractionId); // Log del ID de atracción

    const { data: attraction, loading, error } = UseApi({
        apiEndpoint: `${ATTRACTIONS}${attractionId}/`,
        method: 'GET'
    });

    // Mostrar mensaje de carga
    if (loading) {
        console.log('Loading data...'); // Log mientras carga
        return <p>Loading...</p>;
    }

    // Mostrar mensaje de error
    if (error) {
        console.log('No data found'); // Log si no hay datos
        return <p>Error: {error}</p>;
    }

    // Mostrar información de la atracción
    return (
        <div className="image-card">
            {attraction && (
                <>
                    <img
                        src={attraction.attr_image_url}
                        alt={attraction.attr_name}
                        style={{ width: '100%', height: 'auto' }}
                    />
                    <h2>{attraction.attr_name}</h2>
                    <p>{attraction.attr_description}</p>
                </>
            )}
        </div>
    );
};

ImageCard.propTypes = {
    attractionId: PropTypes.number.isRequired,
};

export default ImageCard;