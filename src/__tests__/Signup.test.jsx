import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Signup from '../components/Signup/SignUp';
import '@testing-library/jest-dom';
import useApi from '../services/useApi';
import { useNavigate } from 'react-router-dom';

// Mock de useApi
jest.mock('../services/useApi', () => jest.fn());

// Mock de useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Signup Component', () => {
  let mockedNavigate;

  beforeEach(() => {
    mockedNavigate = jest.fn();
    useNavigate.mockReturnValue(mockedNavigate);
  });

  it('should display form elements', () => {
    // Configura el mock para `useApi` sin respuesta específica
    useApi.mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    render(
      <Router>
        <Signup />
      </Router>
    );

    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
  });

  it('should handle successful signup', async () => {
    // Configura el mock para `useApi`
    useApi.mockReturnValue({
      data: { token: 'fake-token', username: 'testuser' },
      loading: false,
      error: null,
    });

    render(
      <Router>
        <Signup />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'johndoe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('/');
      // No se guarda el token en el localStorage para signup, se puede adaptar según el flujo real
    });
  });

  it('should handle signup error', async () => {
    // Configura el mock para `useApi`
    useApi.mockReturnValue({
      data: null,
      loading: false,
      error: 'Signup failed',
    });

    render(
      <Router>
        <Signup />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'johndoe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(screen.getByText(/signup failed/i)).toBeInTheDocument();
    });
  });

  it('should navigate back to home on back arrow click', () => {
    render(
      <Router>
        <Signup />
      </Router>
    );

    fireEvent.click(screen.getByAltText(/back to home/i));
    expect(mockedNavigate).toHaveBeenCalledWith('/');
  });
});
