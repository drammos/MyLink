import { useState, useCallback, useEffect } from 'react';
import useService from '../useService';
import { agents } from '../../../agents';

const useAcceptRequest = () => {
    const [errorCode, setErrorCode] = useState(null);
    const [message, setMessage] = useState('');
    const [pendingUserId, setPendingUserId] = useState('');
    const [recipientUserId, setRecipientUserId] = useState('');
    const [url, setUrl] = useState('');

    const serviceurl = agents.localhost + agents.acceptRequest;

    const { response, loading, refetch: fetchService } = useService(
        'Accepting Request',
        'POST',
        url,
        null,
        undefined,
        true
    );

    const handleAcceptRequestResponse = useCallback((response) => {
        if (response?.status === 200) {
            setErrorCode(0);
            setMessage('Request accepted!');
            console.log('Request accepted!');
        } else {
            setErrorCode(1);
            setMessage('An error occurred. Please try again later.');
            console.error('Request NOT accepted!');
        }
    }, []);

    const acceptRequest = useCallback((PendingUserId, RecipientUserId) => {
        const queryParams = `?PendingUserId=${PendingUserId}&RecipientUserId=${RecipientUserId}`;
        setUrl(`${serviceurl}${queryParams}`);
    }, [setUrl, serviceurl]);

    useEffect(() => {
        if (response) {
            handleAcceptRequestResponse(response);
        }
    }, [response, handleAcceptRequestResponse]);

    useEffect(() => {
        if (url !== '') 
            fetchService();
    }, [url, fetchService]);

    return { errorCode, message, loading, acceptRequestRefetch: acceptRequest };
};

export default useAcceptRequest;
