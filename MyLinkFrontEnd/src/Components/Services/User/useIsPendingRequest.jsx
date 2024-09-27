import { useState, useCallback, useEffect } from 'react';
import useService from '../useService';
import { agents } from '../../../agents';

const useIsPendingRequest = () => {
    const [pendingUserId, setPendingUserId] = useState(null); // Change empty strings to null
    const [recipientUserId, setRecipientUserId] = useState(null); // Change empty strings to null
    const [errorCode, setErrorCode] = useState(null);
    const [message, setMessage] = useState('');

    const url = agents.localhost + agents.isPendingRequest;

    const { response, loading, refetch: fetchService } = useService(
        'Is pending?',
        'GET',
        `${url}?PendingUserId=${pendingUserId}&RecipientUserId=${recipientUserId}`,
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

    const getResponse = useCallback((PendingUserId, RecipientUserId) => {
        // Avoid triggering state change if values are the same
        if (PendingUserId !== pendingUserId || RecipientUserId !== recipientUserId) {
            setPendingUserId(PendingUserId);
            setRecipientUserId(RecipientUserId);
        }
    }, [pendingUserId, recipientUserId]);

    useEffect(() => {
        if (pendingUserId && recipientUserId) {
            fetchService(); // Only fetch if both userIds are set
        }
    }, [pendingUserId, recipientUserId, fetchService]);

    useEffect(() => {
        if (response) {
            handleSignUpResponse(response);
        }
    }, [response, handleSignUpResponse]);

    return {
        IsPendingResponse: response,
        IsPendingMessage: message,
        IsPendingErrorCode: errorCode,
        IsPendingLoading: loading,
        IsPendingRefetch: getResponse
    };
};

export default useIsPendingRequest;
