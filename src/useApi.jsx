import React, { useState, useEffect } from 'react';
import axios from 'axios';


const UseApi = ({ apiEndpoint }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        if (!apiEndpoint) return;


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
    }, [apiEndpoint]);



    return { data, loading, error };
};


export default UseApi;