import { useState, useCallback, useEffect } from 'react';
import useService from './useService';

const useGetUser = () => {
    const [currentUser, setcurrentUser] = useState('');
    const [errorCode, setErrorCode] = useState(2);
    const [message, setMessage] = useState('');
    const [userInfo, setUserInfo] = useState('');

    const { response, loading, refetch: fetchService } = useService(
        'Getting user informations',
        'GET',
        `http://localhost:5175/User/GetUser?Username=${currentUser}`,
        null,
        undefined, 
        null
    );

    const handleSignUpResponse = useCallback((response) => {
        if (response?.status === 200) {
            setErrorCode(0);
            setUserInfo(response.data);
            setMessage('User informations are here!');
            console.log('User informations are here!');
        } else {
            setErrorCode(1);
            setMessage(response?.title || 'An error occurred. Please try again.');
        }
    }, [errorCode]);

    const getUser = useCallback((
        username
    ) => {
        setcurrentUser(username);
    }, []);

    useEffect(() => {
        if (currentUser !== '') {
            fetchService();
        }
    }, [fetchService, currentUser]);

    useEffect(() => {
        if (response) {
            handleSignUpResponse(response);
        }
    }, [response, handleSignUpResponse]);

    return { userInfo, message, errorCode, loading, refetch: getUser };
};

export default useGetUser;
