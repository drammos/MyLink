import { useState, useCallback, useEffect } from 'react';
import useService from '../useService';
import { agents } from '../../../agents';

const useAcceptRequest = () => {
    const [errorCode, setErrorCode] = useState(null);
    const [message, setMessage] = useState('');
    const [pendingUserId, setPendingUserId] = useState('');
    const [recipientUserId, setRecipientUserId] = useState('');

    const url = agents.localhost + agents.acceptRequest;

    const { response, loading, refetch: fetchService } = useService(
        'Accepting Request',
        'POST',
        `${url}?PendingUserId=${pendingUserId}&RecipientUserId=${recipientUserId}`,
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
        setPendingUserId(PendingUserId);
        setRecipientUserId(RecipientUserId);
    }, []);

    useEffect(() => {
        if (response) {
            handleAcceptRequestResponse(response);
        }
    }, [response, handleAcceptRequestResponse]);

    useEffect(() => {
        if (pendingUserId !== '' && recipientUserId !== '')
            fetchService();
    }, [pendingUserId, recipientUserId, fetchService]);

    return { errorCode, message, loading, acceptRequestRefetch: acceptRequest };
};

export default useAcceptRequest;
