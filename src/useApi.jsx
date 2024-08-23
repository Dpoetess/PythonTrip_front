import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UseApi = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const apiEndpoint = 'http://127.0.0.1:8000/api/v1users'; 

        axios.get(apiEndpoint)
            .then((response) => {
                setData(response.data); 
                console.log("hola")
                console.log(response.data) 
                setLoading(false);      
            })
            .catch((error) => {
                setError(error.message); 
                setLoading(false);
                console.error(`Error fetching data: ${error.message}`);
            });
    }, []); // Empty dependency array means this effect runs once on mount

    // Render the component
    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }
    return (
        <div>
            <h1>Data from API:</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre> 
        </div> // using <pre> preserves json formatting. using <div> will present all json data in a single line
    );
};

export default UseApi;