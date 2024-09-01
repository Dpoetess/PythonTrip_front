import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UseApi = ({ apiEndpoint, method = 'GET', body = null, headers = {} }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        console.log('useEffect triggered with:', { apiEndpoint, method });
        if (!apiEndpoint) {
            setLoading(false);
            return;
        }

        const source = axios.CancelToken.source();

        const fetchData = async () => {
            try {
                console.log('Fetching data from:', apiEndpoint);
                
                const token = localStorage.getItem('token');
                const axiosConfig = {
                    headers: {
                        ...headers,
                        Authorization: token ? `Token ${token}` : '', 
                    },
                    cancelToken: source.token,
                };
                let response;

                console.log('Making API request:', { apiEndpoint, method, body, headers: axiosConfig.headers });
                
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
                console.log('Response data:', response.data); // Log de datos recibidos
                setData(response.data);

            } catch (error) {
                if (!axios.isCancel(error)) {
                    setError(error.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        return () => {
            source.cancel();
        };
    }, [apiEndpoint, method]);


    return { data, loading, error };
};

export default UseApi;
