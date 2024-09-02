import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Para matchers extendidos
import Chatbot from '../pages/Chatbot'; // Ajusta la ruta si es necesario

describe('Chatbot Component', () => {
  test('renders Chatbot component with correct content', () => {
    render(<Chatbot />);

    // Verifica que el título "PythonTrip" se muestra en el componente
    expect(screen.getByText('PythonTrip')).toBeInTheDocument();

    // Verifica que el subtítulo "Chatbot in construction" se muestra en el componente
    expect(screen.getByText('Chatbot in construction')).toBeInTheDocument();

    // Verifica que la imagen con el alt "Work in progress" se muestra en el componente
    expect(screen.getByAltText('Work in progress')).toBeInTheDocument();

    // Verifica que la ruta src de la imagen es correcta
    expect(screen.getByAltText('Work in progress')).toHaveAttribute('src', '/assets/img/work.png');
  });
});
