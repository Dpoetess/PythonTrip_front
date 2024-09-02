import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Navbar from "../components/nav/Nav";
import useApi from "../services/useApi";
import { BrowserRouter as Router } from "react-router-dom";

// Mock de useApi para evitar realizar llamadas reales a la API
jest.mock("../services/useApi");

describe("Navbar Component", () => {
  test("renders login and signup links when not authenticated", () => {
    useApi.mockReturnValue({ data: null, loading: false, error: null });

    render(
      <Router>
        <Navbar isAuthenticated={false} />
      </Router>
    );

    // Usar expect básico en lugar de jest-dom
    expect(screen.getByText(/login/i)).toBeTruthy();
    expect(screen.getByText(/sign up/i)).toBeTruthy();
  });

  test("renders logout and profile links when authenticated", async () => {
    useApi.mockReturnValue({
      data: { username: "testuser" },
      loading: false,
      error: null,
    });

    render(
      <Router>
        <Navbar isAuthenticated={true} />
      </Router>
    );

    expect(screen.getByText(/hi, testuser/i)).toBeTruthy();
    expect(screen.getByText(/logout/i)).toBeTruthy();
    expect(screen.getByText(/profile/i)).toBeTruthy();
  });

  test("calls onLogout when logout button is clicked", () => {
    const mockLogout = jest.fn();
    useApi.mockReturnValue({
      data: { username: "testuser" },
      loading: false,
      error: null,
    });

    render(
      <Router>
        <Navbar isAuthenticated={true} onLogout={mockLogout} />
      </Router>
    );

    fireEvent.click(screen.getByText(/logout/i));
    expect(mockLogout).toHaveBeenCalled();
  });
});
