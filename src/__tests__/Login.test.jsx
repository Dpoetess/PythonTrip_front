import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../components/Login/Login';
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

describe('Login Component', () => {
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
        <Login />
      </Router>
    );

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('should handle successful login', async () => {
    // Configura el mock para `useApi`
    useApi.mockReturnValue({
      data: { token: 'fake-token', username: 'testuser' },
      loading: false,
      error: null,
    });

    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('/');
      expect(localStorage.getItem('token')).toBe('fake-token');
    });
  });

  it('should handle login error', async () => {
    // Configura el mock para `useApi`
    useApi.mockReturnValue({
      data: null,
      loading: false,
      error: 'Login failed',
    });

    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/login failed/i)).toBeInTheDocument();
    });
  });

  it('should navigate back to home on back arrow click', () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.click(screen.getByAltText(/back to home/i));
    expect(mockedNavigate).toHaveBeenCalledWith('/');
  });
});
