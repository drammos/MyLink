import { useState, useCallback, useEffect } from 'react';
import useService from '../useService';
import { agents } from '../../../agents';


const useGetUserNotifications = () => {
    const [currentUsername, setcurrentUsername] = useState('');
    const [errorCode, setErrorCode] = useState(2);
    const [message, setMessage] = useState('');
    const [listLength, setlistLength] = useState('');
    const [listInfo, setlistInfo] = useState('');

    const url = agents.localhost + agents.getUserNotifications;

    const { response, loading, refetch: fetchService } = useService(
        'Getting List from Pending Requests...',
        'GET',
        `${url}?Username=${currentUsername}`,
        null,
        undefined,
        true
    );

    const handleSignUpResponse = useCallback((response) => {
        if (response?.status === 200) {
            setErrorCode(0);
            setlistLength(response.data.length);
            setlistInfo(response.data);
            setMessage('Requests list are here!');
            console.log('Requests list are here!');
        } else {
            setErrorCode(1);
            setMessage(response?.title || 'An error occurred. Please try again.');
        }
    }, []);

    const getList = useCallback((
        Username
    ) => {
        setcurrentUsername(Username);
    }, []);

    useEffect(() => {
        if (currentUsername !== '') {
            setTimeout(() => fetchService(), 800);
        }
    }, [fetchService, currentUsername]);

    useEffect(() => {
        if (response) {
            handleSignUpResponse(response);
        }
    }, [response, handleSignUpResponse]);

    return { reactionListLength:listLength, reactionList: listInfo, loading, reactionListRefetch: getList };
};

export default useGetUserNotifications;
