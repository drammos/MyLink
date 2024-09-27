import { useState, useCallback, useEffect } from 'react';
import useService from '../useService';
import { agents } from '../../../agents';


const useIsConnectedUsers = () => {
    const [userId1, setUserId1] = useState('');
    const [userId2, setUserId2] = useState('');
    const [errorCode, setErrorCode] = useState(2);
    const [message, setMessage] = useState('');

    const url = agents.localhost + agents.isConnectedUsers;

    const { response, loading, refetch: fetchService } = useService(
        'Is pending?',
        'GET',
        `${url}?UserId1=${userId1}&UserId2=${userId2}`,
        null,
        undefined,
        true
    );

    const handleSignUpResponse = useCallback((response) => {
        if (response?.status === 200) {
            setErrorCode(0);
            setMessage('Response is here!');
            console.log('Response is here!');
        } else {
            setErrorCode(1);
            setMessage(response?.title || 'An error occurred. Please try again.');
        }
    }, []);

    const getResponse = useCallback((
        UserId1, UserId2
    ) => {
        setUserId1(UserId1);
        setUserId2(UserId2);
    }, []);

    useEffect(() => {
        if (userId2 !== '' && userId1 !== '') {
            fetchService();
        }
    }, [userId1, userId2, fetchService]);

    useEffect(() => {
        if (response) {
            handleSignUpResponse(response);
        }
    }, [response, handleSignUpResponse]);

    return {
        IsConnectedResponse: response, IsConnectedMessage: message, IsConnectedErrorCode: errorCode,
        IsConnectedLoading: loading, IsConnectedUsersRefetch: getResponse
    };
};

export default useIsConnectedUsers;
