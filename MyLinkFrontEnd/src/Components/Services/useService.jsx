import { useState, useCallback } from 'react';

const useService = (message, method, url, input = null, contentType = 'application/json', useToken = false) => {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);

    const getAuthToken = () => {
        return localStorage.getItem('authToken');
    };

    const fetchData = useCallback(async () => {
        setLoading(true);
        setResponse(null); 

        const headers = {};
        if (contentType !== 'multipart/form-data' && contentType !== undefined) {
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

            // Get the headers
            const headersDict = {};
            res.headers.forEach((value, key) => {
                headersDict[key] = value;
            });
            
            // Get Data
            const contentType = res.headers.get('content-type');
            let data = null;
            if (contentType!==null)
              data = await res.json();

            setResponse({
                status: res.status,
                data,
                headersDict, 
            });

        } catch (error) {
            console.error('Request failed:', error);

            // Get the headers
            const headersDict = {};
            
            setResponse({
                status: 600,
                error,
                headersDict, 
            });
        } finally {
            setLoading(false);
        }
    }, [message, method, url, input, contentType, useToken]);

    return { response, loading, refetch: fetchData }; // Return the updated response object
};

export default useService;
