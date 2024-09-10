import { useState, useCallback } from 'react';

const useService = (message, method, url, input = null, contentType = 'application/json', useToken = false) => {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);

    const getAuthToken = () => {
        return localStorage.getItem('authToken');
    };

    const fetchData = useCallback(async () => {
        console.log(message);
        setLoading(true);
        setResponse(null); 

        const headers = {};
        if (contentType !== 'multipart/form-data') {
            headers['Content-Type'] = contentType;
        }

        if (useToken) {
            const authToken = getAuthToken();
            if (authToken) {
                headers['Authorization'] = `Bearer ${authToken}`;
            }
        }

        const options = {
            method: method,
            headers: headers,
        };

        // Add body for methods that require it
        if (method === 'POST' || method === 'PUT') {
            options.body = input;
        }

        try {
            const res = await fetch(url, options);
            const data = await res.json();
            setResponse({
                status: res.status,
                data,
            });
        } catch (error) {
            console.error('Request failed:', error);
            setResponse({
                status: 600,
                error,
            });
        } finally {
            setLoading(false);
        }
    }, [message, method, url, input, contentType, useToken]);

    return { response, loading, refetch: fetchData };
};

export default useService;
