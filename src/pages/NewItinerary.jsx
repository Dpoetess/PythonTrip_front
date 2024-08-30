import React, { useState } from "react";
import UseApi from "../services/useApi";
import { ITINERARIES } from "../config/urls";
import SelectDestination from "../components/SelectDestination/SelectDestination";
import "../css/newitinerary.css";
import Day from "../components/ItineraryDay/ItineraryDay";
import AddAttractionIcon from "/public/assets/icons/suma.svg";
import AddDayIcon from "/public/assets/icons/suma.svg";

const NewItinerary = ({ user }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    destination: "",
  });

  const [days, setDays] = useState([{ day: 1, attractions: [{ id: null, name: "" }] }]);
  const [itineraryId, setItineraryId] = useState(null); // State to hold itinerary ID after creation
  const [collaboratorEmail, setCollaboratorEmail] = useState(""); // Email for inviting collaborator

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectAttraction = (dayIndex, attractionIndex, selectedAttraction) => {
    const updatedDays = [...days];
    updatedDays[dayIndex].attractions[attractionIndex] = selectedAttraction;
    setDays(updatedDays);
  };

  const handleAddAttraction = (dayIndex) => {
    const updatedDays = [...days];
    updatedDays[dayIndex].attractions.push({ id: null, name: "" });
    setDays(updatedDays);
  };

  const handleAddNewDay = () => {
    const newDayNumber = days.length + 1;
    setDays([...days, { day: newDayNumber, attractions: [{ id: null, name: "" }] }]);
  };

  const handleInviteCollaborator = async () => {
    try {
      await UseApi({
        apiEndpoint: `${ITINERARIES}${itineraryId}/add-collaborator/`,
        method: 'POST',
        body: { email_or_username: collaboratorEmail },
        headers: { 'Content-Type': 'application/json' },
      });
      console.log("Collaborator invited successfully!");
    } catch (error) {
      console.error("Failed to invite collaborator:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const itineraryData = {
      ...formData,
      days: days.map((day) => ({
        day: day.day,
        attractions: day.attractions.map((att, index) => ({ id: att.id, order: index })),
      })),
      user: user.id,
    };

    try {
      const response = await UseApi({
        apiEndpoint: ITINERARIES,
        method: 'POST',
        body: itineraryData,
        headers: { 'Content-Type': 'application/json' },
      });

      const createdItinerary = response.data; // Assuming the created itinerary is returned in the response
      setItineraryId(createdItinerary.id); // Save the itineraryId in state
      console.log("Itinerary created successfully with ID:", createdItinerary.id);
    } catch (error) {
      console.error("Failed to create itinerary:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">New Itinerary</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label-text">Destination:</label>
          <SelectDestination
            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
          />
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
            required
          />
        </div>

        {/* Rendering Days and their Attractions */}
        {days.map((day, index) => (
          <Day
            key={index}
            dayNumber={day.day}
            dayIndex={index}
            attractions={day.attractions}
            onSelectAttraction={handleSelectAttraction}
            onAddAttraction={handleAddAttraction}
          />
        ))}

        {/* Add New Day Button */}
        <button
          type="button"
          className="add-day-btn"
          onClick={handleAddNewDay}
        >
          <img src={AddDayIcon} alt="Add New Day" />
          Add New Day
        </button>

        {/* Invite Collaborator Section */}
        <div className="invite-collaborator-section">
          <input
            type="email"
            placeholder="Collaborator's Email"
            value={collaboratorEmail}
            onChange={(e) => setCollaboratorEmail(e.target.value)}
          />
          <button
            type="button"
            className="invite-collaborator-btn"
            onClick={handleInviteCollaborator}
            disabled={!itineraryId} // Disable until itinerary is created
          >
            Invite Collaborator
          </button>
        </div>

        <button type="submit">
          Create Itinerary
        </button>
      </form>
    </div>
  );
};

export default NewItinerary;
