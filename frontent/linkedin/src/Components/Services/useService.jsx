
const UseService = async (message, method, url, input = null, contentType = 'application/json', useToken = false) => {

    const getAuthToken = () => {
        return localStorage.getItem('authToken');
    };

    console.log(message);

    const headers = {
        'Content-Type': contentType,
    };

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

    try
    {
        const response = await fetch(url, options);
        return response
    }
    catch(error)
    {
        console.error('Request failed:', error);
        throw error; // Rethrow error to be handled by caller
    }

};

export default UseService