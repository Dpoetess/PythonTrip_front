import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SavedLocations from '../pages/SavedLocations'; // Ajusta la ruta si es necesario

describe('SavedLocations Component', () => {
  it('should display the title "Saved Locations"', () => {
    render(<SavedLocations />);
    expect(screen.getByText('Saved Locations')).toBeInTheDocument();
  });

  it('should display all photos with correct titles and images', () => {
    render(<SavedLocations />);
    
    // Check that each photo is displayed with its title and image
    const photos = [
      { src: 'https://cdn.pixabay.com/photo/2015/06/29/12/52/space-825551_1280.jpg', title: 'Plaza España' },
      { src: 'https://cdn.pixabay.com/photo/2018/09/01/16/21/market-3647089_1280.jpg', title: 'Mercado de la Ribera' },
      { src: 'https://cdn.pixabay.com/photo/2017/03/27/18/43/madrid-2179954_1280.jpg', title: 'Puerta de Alcalá' }
    ];

    photos.forEach(photo => {
      expect(screen.getByAltText(photo.title)).toBeInTheDocument();
      expect(screen.getByAltText(photo.title)).toHaveAttribute('src', photo.src);
      expect(screen.getByText(photo.title)).toBeInTheDocument();
    });
  });

  it('should have "Add" button disabled for each photo', () => {
    render(<SavedLocations />);

    // Check that the "Add" button is disabled for each photo
    const buttons = screen.getAllByRole('button', { name: /add/i });
    buttons.forEach(button => {
      expect(button).toBeDisabled();
    });
  });
});
