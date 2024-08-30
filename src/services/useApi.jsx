import React, { useState, useEffect } from 'react';
import axios from 'axios';


const UseApi = ({ apiEndpoint, method = 'GET', body = null, headers = {} }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        console.log('useEffect triggered with:', { apiEndpoint, method });
        if (!apiEndpoint) return;




        const fetchData = async () => {
            try {
                let response;
                const axiosConfig = { ...headers };
                switch (method.toUpperCase()) {
                    case 'POST':
                        response = await axios.post(apiEndpoint, body, axiosConfig);
                        break;
                    case 'PUT':
                        response = await axios.put(apiEndpoint, body, axiosConfig);
                        break;
                    case 'DELETE':
                        response = await axios.delete(apiEndpoint, axiosConfig);
                        break;
                    case 'GET':
                    default:
                        response = await axios.get(apiEndpoint, axiosConfig);
                        break;
                }
                setData(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
                console.error(`Error fetching data: ${error.message}`);
            }
        };




        fetchData();
    }, [apiEndpoint, method]);




    return { data, loading, error };
};


export default UseApi;