import React, { useEffect, useState } from "react";

const SelectDestination = ({ apiBaseUrl }) => {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    // Fetch the destinations from the backend
    fetch(`${apiBaseUrl}/destinations`)
      .then((response) => response.json())
      .then((data) => setDestinations(data))
      .catch((error) => console.error("Error fetching destinations:", error));
  }, [apiBaseUrl]);

  return (
    <select name="destination" required>
      <option value="">Select a destination</option>
      {destinations.map((destination) => (
        <option key={destination.id} value={destination.id}>
          {destination.name}
        </option>
      ))}
    </select>
  );
};

export default SelectDestination;
