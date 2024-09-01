import React, { useState, useEffect } from "react";
import axios from "axios";
import UseApi from "../services/useApi";
import { ITINERARIES, ATTRACTIONS, LOGIN_PAGE } from "../config/urls";
import SelectDestination from "../components/SelectDestination/SelectDestination";
import Day from "../components/ItineraryDay/ItineraryDay";
import AddDayIcon from "/public/assets/icons/suma.svg";
import RemoveIcon  from "/public/assets/icons/remove.svg";
import InviteIcon  from "/public/assets/icons/addperson.svg";
import "./newItinerary.css";
import { isAuthenticated } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const NewItinerary = ({ user }) => {
  const [formData, setFormData] = useState({
      name: "",
      description: "",
      destination: "",
  });
  const [days, setDays] = useState([{ day: 1, attractions: [{ id: null, name: "" }] }]);
  const [itineraryId, setItineraryId] = useState(null);
  const [collaboratorInput, setCollaboratorInput] = useState("");  // Either email or username
  const [collaboratorError, setCollaboratorError] = useState("");  // Error message
  const navigate = useNavigate();

  useEffect(() => {
    console.log("User Data:", user);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectDestination = (selectedId) => {
    setFormData({ ...formData, destination: selectedId });
  };

  const handleSelectAttraction = (dayIndex, attractionIndex, selectedAttraction) => {
    const updatedDays = [...days];
    updatedDays[dayIndex].attractions[attractionIndex] = {
      id: selectedAttraction.attr_id,
      name: selectedAttraction.attr_name
    };
    setDays(updatedDays);
  };

  const handleAddAttraction = (dayIndex) => {
    const updatedDays = [...days];
    updatedDays[dayIndex].attractions.push({ id: null, name: "" });
    setDays(updatedDays);
  };

  const handleRemoveAttraction = (dayIndex, attractionIndex) => {
    const updatedDays = [...days];
    updatedDays[dayIndex].attractions.splice(attractionIndex, 1);
    setDays(updatedDays);
  };

  const handleAddNewDay = () => {
    const newDayNumber = days.length + 1;
    setDays([...days, { day: newDayNumber, attractions: [{ id: null, name: "" }] }]);
  };

  const handleRemoveDay = (dayIndex) => {
    const updatedDays = days.filter((_, index) => index !== dayIndex);
    // Update the day numbers to remain in order
    const reindexedDays = updatedDays.map((day, index) => ({ ...day, day: index + 1 }));
    setDays(reindexedDays);
  };

  const handleInviteCollaborator = async () => {
    if (!isAuthenticated()) {
      alert("Please log in to invite collaborators.");
      navigate(LOGIN_PAGE);  // Redirect to login page
      return;
    }
    
    if (!collaboratorInput) {
      setCollaboratorError("Please enter an email or username.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: token ? `Token ${token}` : "",
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${ITINERARIES}${itineraryId}/add-collaborator/`,
        { email_or_username: collaboratorInput },
        { headers }
      );
  
      console.log("Collaborator invited successfully!", response.data);
      setCollaboratorError("");  // Clear error on success
  
    } catch (error) {
      if (error.response?.status === 404) {
        setCollaboratorError("User not found. Please invite by email.");
      } else {
        console.error("Failed to invite collaborator:", error.message);
        setCollaboratorError("An error occurred. Please try again.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated()) {
      alert("Please log in to save the itinerary.");
      navigate(LOGIN_PAGE);
      return;
    }

    const itineraryData = {
      ...formData,
      days: days.map((day) => ({
        day: day.day,
        attractions: day.attractions.map((att, index) => ({ id: att.id, order: index })),
      })),
    };

    console.log("Submitting Itinerary Data:", itineraryData);

    // when API call is a one-off or short-lived operation like a trigger event, it's better to use fetch rather than hooks.
    // Hooks often introduce state and reactivity.  
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: token ? `Token ${token}` : "",
        "Content-Type": "application/json",
      };

      console.log("Request Headers:", headers);
      
      const response = await axios.post(ITINERARIES, itineraryData, { headers });
      console.log("Full Response Data:", response.data);
      console.log("Full Response:", response);
      console.log("Itinerary created successfully with ID:", response.data.itin_id);
      setItineraryId(response.data.itin_id);
    } catch (error) {
      console.error("Failed to create itinerary:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="container">
      <h1 className="title">My New Itinerary</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label-text">Destination:</label>
          <SelectDestination onSelectDestination={(selectedId) => setFormData({ ...formData, destination: selectedId })} />
          {/* <SelectDestination onSelectDestination={handleSelectDestination} /> */}
        </div>
        <div className="form-group">
          <label className="label-text">Itinerary Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="label-text">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        {/* Rendering Days and their Attractions */}
        <div className="days-container"></div>
        {days.map((day, index) => (
          <div key={index} className="day-section">
            <Day
              dayNumber={day.day}
              dayIndex={index}
              attractions={day.attractions}
              destinationId={formData.destination}
              onSelectAttraction={handleSelectAttraction}
              onAddAttraction={handleAddAttraction}
              onRemoveAttraction={handleRemoveAttraction}
              removeDayButton={
                <button
                  type="button"
                  className="remove-day-btn"
                  onClick={() => handleRemoveDay(index)}
                >
                  <img src={RemoveIcon} alt="Remove Day" className="remove-day-icon"/>
                  Remove Day  
                </button>   
              }
            />
          </div>
          ))}

        {/* Add New Day Button */}
        <button
          type="button"
          className="add-day-btn"
          onClick={handleAddNewDay}
        >
          <img src={AddDayIcon} alt="Add New Day" className="add-day-icon" />
          Add New Day
        </button>

        {/* Invite Collaborator Section */}
        <div className="invite-collaborator-section">
          <input
            type="text"
            placeholder="Enter collaborator's email or username"
            value={collaboratorInput}
            onChange={(e) => setCollaboratorInput(e.target.value)}
          />
          <button
            type="button"
            className="invite-collaborator-btn"
            onClick={handleInviteCollaborator}
            disabled={!itineraryId}
          >
            <img src={InviteIcon} alt="Invite Collaborator" className="invite-icon" />
          </button>
          {collaboratorError && <p className="error-text">{collaboratorError}</p>}
        </div>

        <button type="submit">
          Create Itinerary
        </button>
      </form>
    </div>
  );
};

export default NewItinerary;
