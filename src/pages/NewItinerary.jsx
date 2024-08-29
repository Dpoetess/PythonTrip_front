import React, { useState } from "react";
import Nav from "../components/nav/Nav";
import Footer from "../components/Footer/Footer";
import SelectDestination from "../components/SelectDestination/SelectDestination";

const NewItinerary = ({ apiBaseUrl, user }) => {
  const [formData, setFormData] = useState({
    destination: "",
    name: "",
    duration: "",
    createdBy: user.username, // Asumiendo que el objeto 'user' tiene el username
    isCollaborative: false,
    description: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send data to the backend
    fetch(`${apiBaseUrl}/itineraries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        userId: user.id, // Asumiendo que el objeto 'user' tiene el id
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Itinerary created:", data);
        // Aquí podrías redirigir a otra página o mostrar un mensaje de éxito
      })
      .catch((error) => console.error("Error creating itinerary:", error));
  };

  return (
    <div>
      <Nav />
      <div className="container">
        <h1>New Itinerary</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Destination:
            <SelectDestination apiBaseUrl={apiBaseUrl} />
          </label>
          <br />

          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <br />

          <label>
            Duration:
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
            />
          </label>
          <br />

          <label>
            Created By:
            <input
              type="text"
              name="createdBy"
              value={formData.createdBy}
              onChange={handleChange}
              readOnly
            />
          </label>
          <br />

          <label>
            Collaborative:
            <input
              type="checkbox"
              name="isCollaborative"
              checked={formData.isCollaborative}
              onChange={handleChange}
            />
          </label>
          <br />

          <label>
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </label>
          <br />

          <button type="submit">Send</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default NewItinerary;
