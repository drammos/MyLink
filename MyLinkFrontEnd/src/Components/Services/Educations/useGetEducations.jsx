import { useState, useCallback, useEffect } from 'react';
import useService from '../useService';
import { agents } from '../../../agents';

const useGetEducations = () => {
    const [userId, setUserId] = useState('');
    const [errorCode, setErrorCode] = useState(2);
    const [message, setMessage] = useState('');
    const [userInfo, setUserInfo] = useState('');

    const url = agents.localhost + agents.getEducations;
    const { response, loading, refetch: fetchService } = useService(
        'Getting user educations',
        'GET',
        `${url}?userId=${userId}`,
        null,
        undefined,
        true
    );

    const handleSignUpResponse = useCallback((response) => {
        if (response?.status === 200) {
            setErrorCode(0);
            setUserInfo(response.data);
            console.log("user educations:  ", response.data);
            setMessage('User educations are here!');
        } else {
            setErrorCode(1);
            setMessage(response?.title || 'An error occurred. Please try again.');
        }
    }, [errorCode]);

    const getEduc = useCallback((
        UserId
    ) => {
        setUserId(UserId);
    }, []);

    useEffect(() => {
        if (userId !== '') {
            fetchService();
        }
    }, [userId]);

    useEffect(() => {
        if (response) {
            handleSignUpResponse(response);
        }
    }, [response, handleSignUpResponse]);

    return { getEducationInfo: userInfo, message, errorCode, loading, getEducationrefetch: getEduc };
};

export default useGetEducations;
