import React from 'react';
import './savedLocations.css'; 

function SavedLocations() {
  
  const photos = [
    { id: 1, src: 'https://cdn.pixabay.com/photo/2015/06/29/12/52/space-825551_1280.jpg', title: 'Plaza España' },
    { id: 2, src: 'https://cdn.pixabay.com/photo/2018/09/01/16/21/market-3647089_1280.jpg', title: 'Mercado de la Ribera' },
    { id: 3, src: 'https://cdn.pixabay.com/photo/2017/03/27/18/43/madrid-2179954_1280.jpg', title: 'Puerta de Alcalá' }
  ];

  return (
    <div className="saved-locations-container">
      <h2 className="saved-locations-title">Saved Locations</h2>
      <div className="saved-locations-grid">
        {photos.map(photo => (
          <div key={photo.id} className="saved-location-item">
            <img src={photo.src} alt={photo.title} className="saved-location-image" />
            <div className="saved-location-title">{photo.title}</div>
            <button className="add-to-collection-button" disabled>
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SavedLocations;
