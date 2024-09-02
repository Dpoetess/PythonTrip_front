import React from "react";
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
<<<<<<< HEAD
    onSelectDestination(Number(e.target.value));
=======
    onSelectDestination(Number(e.target.value));  
>>>>>>> dev
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
<<<<<<< HEAD
=======


>>>>>>> dev
