import { useState, useCallback, useEffect } from 'react';
import useService from '../useService';
import { agents } from '../../../agents';

const useDeleteRequest = () => {
    const [errorCode, setErrorCode] = useState(null);
    const [message, setMessage] = useState('');
    const [pendingUserId, setPendingUserId] = useState('');
    const [recipientUserId, setRecipientUserId] = useState('');

    const url = agents.localhost + agents.deleteRequest;

    const { response, loading, refetch: fetchService } = useService(
        'Deleting Request',
        'DELETE',
        `${url}?PendingUserId=${pendingUserId}&RecipientUserId=${recipientUserId}`,
        null,
        undefined,
        true
    );

    const handleDeleteRequestResponse = useCallback((response) => {
        if (response?.status === 200) {
            setErrorCode(0);
            setMessage('Request deleted!');
            console.log('Request deleted!');
        } else {
            setErrorCode(1);
            setMessage('An error occurred. Please try again later.');
            console.error('Request NOT deleted!');
        }
    }, []);

    const deleteRequest = useCallback((PendingUserId, RecipientUserId) => {
        setPendingUserId(PendingUserId);
        setRecipientUserId(RecipientUserId);
    }, []);

    useEffect(() => {
        if (response) {
            handleDeleteRequestResponse(response);
        }
    }, [response, handleDeleteRequestResponse]);

    useEffect(() => {
        if (pendingUserId !== '' && recipientUserId !== '')
            fetchService();
    }, [pendingUserId, recipientUserId, fetchService]);

    return { errorCode, message, loading, deleteRequestRefetch: deleteRequest };
};

export default useDeleteRequest;
