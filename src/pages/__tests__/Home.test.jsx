import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "../Home";
import "@testing-library/jest-dom";
import { useNavigate } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("Home Component", () => {
  let mockedNavigate;

  beforeEach(() => {
    mockedNavigate = jest.fn();
    useNavigate.mockReturnValue(mockedNavigate);
  });

  it("should display main elements", () => {
    render(
      <Router>
        <Home />
      </Router>
    );
  });

  it('should navigate to "/dropdown" when "SEARCH PLANNING" button is clicked', () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    fireEvent.click(screen.getByText("SEARCH PLANNING"));
    expect(mockedNavigate).toHaveBeenCalledWith("/dropdown");
  });

  it('should navigate to "/chatbot" when "CHATBOT" button is clicked', () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    fireEvent.click(screen.getByText("CHATBOT"));
    expect(mockedNavigate).toHaveBeenCalledWith("/chatbot");
  });
});
