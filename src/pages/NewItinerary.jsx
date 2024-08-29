import React, { useState } from "react";
import axios from "axios";
import SelectDestination from "../components/SelectDestination/SelectDestination";
import { BASE_URL } from "../config/urls";
import "../css/newitinerary.css";

const NewItinerary = ({ user }) => {
  const [formData, setFormData] = useState({
    name: "",
    duration: "",
    description: "",
    is_collaborative: false,
    destination: "", // Ahora este campo será manejado por SelectDestination
  });

  // Manejar el cambio en los campos del formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Manejar la selección del destino desde SelectDestination
  const handleDestinationChange = (e) => {
    setFormData({
      ...formData,
      destination: e.target.value,
    });
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    const itineraryData = {
      ...formData,
      user: user.id, // Asocia el itinerario con el usuario autenticado
    };

    axios
      .post(`${BASE_URL}itineraries/`, itineraryData)
      .then((response) => {
        console.log("Itinerary created:", response.data);
        // Aquí podrías redirigir al usuario a otra página o mostrar un mensaje de éxito
      })
      .catch((error) => {
        console.error("Error creating itinerary:", error);
        // Manejo de errores si la creación falla
      });
  };

  return (
    <div className="container">
      <h1 className="title">New Itinerary</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label-text">Destination:</label>
          {/* Uso del componente SelectDestination */}
          <SelectDestination
            apiBaseUrl={BASE_URL}
            onChange={handleDestinationChange}
          />
        </div>
        <div className="form-group">
          <label className="label-text">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="label-text">Duration:</label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
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
        <div className="form-group">
          <label className="label-text">Collaborative:</label>
          <input
            type="checkbox"
            name="is_collaborative"
            checked={formData.is_collaborative}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Create Itinerary</button>
      </form>
    </div>
  );
};

export default NewItinerary;
