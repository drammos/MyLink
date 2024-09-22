import { useState, useCallback, useEffect } from 'react';
import useService from '../Services/useService';
import { agents } from '../../agents';

const useGetPostsFromConnectedUsers = () => {
    const [message, setMessage] = useState('');
    const [errorCode, setErrorCode] = useState(2);
    const userId = localStorage.getItem('id');
    const url = agents.localhost + agents.getPostsFromConnectedUsers + '?UserId=' + userId;

    const { response, loading, refetch: fetchService } = useService(
        'Getting posts from connected users ...',
        'GET',
        url,
        null,
        undefined,
        true
    );

    const handleSignUpResponse = useCallback((response) => {
        if (response?.status === 200) {
            setErrorCode(0);
            console.log(errorCode, " = ErrorCode");
            setMessage('Posts are here!');
        } else {
            setErrorCode(1);
            setMessage(response?.title || 'An error occurred. Please try again.');
        }
    }, [errorCode]);

    useEffect(() => {
        if (response) {
            handleSignUpResponse(response);
        }
    }, [response, handleSignUpResponse]);

    return { response, message, errorCode, loading, getPostsRefetch: fetchService };
};

export default useGetPostsFromConnectedUsers;
