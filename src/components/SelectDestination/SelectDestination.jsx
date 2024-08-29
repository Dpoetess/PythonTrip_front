import React, { useEffect, useState } from "react";
//import axios from "axios";
import useApi from '../../services/useApi';
import { LOCATIONS } from "../../config/urls";

  const SelectDestination = () => {
  const { data: destinations, loading, error } = useApi({apiEndpoint: LOCATIONS});
  console.log('Loading state:', loading);
  console.log('Error state:', error);
  console.log('Destinations data:', destinations);

  if (loading) {
    return <option>Loading destinations...</option>;
  }

  if (error) {
    return <option>{error}</option>;
  }

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




/* const SelectDestination = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get(LOCATIONS);
        setDestinations(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching destinations");
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  if (loading) {
    return <option>Loading destinations...</option>;
  }

  if (error) {
    return <option>{error}</option>;
  }

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

export default SelectDestination; */
