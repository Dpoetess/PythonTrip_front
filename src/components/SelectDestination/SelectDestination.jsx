import React from "react";
//import axios from "axios";
import UseApi from "../../services/useApi";
import { LOCATIONS } from "../../config/urls";

const SelectDestination = ({ onSelectDestination }) => {
  const { data: destinations, loading, error } = UseApi({apiEndpoint: LOCATIONS});

  if (loading) {
    return <option>Loading destinations...</option>;
  }

  if (error) {
    return <option>{error}</option>;
  }

  const handleChange = (e) => {
    onSelectDestination(Number(e.target.value));
};

return (
  <select name="destination" onChange={handleChange} required>
      <option value="">Select a destination</option>
      {destinations && destinations.map(destination => (
          <option key={destination.loc_id} value={destination.loc_id}>
              {destination.name}
          </option>
      ))}
  </select>
);
};


export default SelectDestination;
