import { useState, useEffect } from 'react';
import axios from 'axios';

const UseApi = ({ apiEndpoint, method = 'GET', body = null }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios({
                    url: apiEndpoint,
                    method,
                    data: body,
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setData(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [apiEndpoint, method, body]);

    return { data, loading, error };
};

export default UseApi;

