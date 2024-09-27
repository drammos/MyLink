import { useState, useCallback, useEffect } from 'react';
import useService from '../useService';
import { agents } from '../../../agents';
import { useMemo } from 'react';

const useRequestToConnections = () => {
    const [message, setMessage] = useState('');
    const [errorCode, setErrorCode] = useState(2);
    const [data, setData] = useState(null);
    const inputFormData = useMemo(() => new FormData(), []);
    const [url, setUrl] = useState('');

    const serviceurl = agents.localhost + agents.requestToConnection;

    const { response, loading, refetch: fetchService } = useService(
        'Creating a connection request ...',
        'POST',
        url,
        null,
        'multipart/form-data',
        true
    );

    const handleRequestToConnect = useCallback(async (response) => {
        if (response?.status === 200) {
            setErrorCode(0);
            console.log(errorCode, " = ErrorCode");
            setMessage('Request Sent!');
        } else {
            setErrorCode(1);
            setMessage(response?.title || 'An error occurred. Please try again.');
        }
    }, [errorCode]);

    const requestToConnect = useCallback(async (
        SenderUserId, RecipientUserId
    ) => {
        const queryParams = `?SenderUserId=${SenderUserId}&RecipientUserId=${RecipientUserId}`;
        setUrl(`${serviceurl}${queryParams}`);
        console.log("Request with query params: ", queryParams);
        console.log("Request using: ", SenderUserId, RecipientUserId);
    }, [setUrl, serviceurl]);

    useEffect(() => {
        const handlePostCreation = async () => {
            if (response) {
                await handleRequestToConnect(response);
                inputFormData.delete('SenderUserId');
                inputFormData.delete('RecipientUserId');
                setData(null);
            }
        };
        handlePostCreation();
    }, [response, handleRequestToConnect, setData]);


    useEffect(() => {
        const update = async () => {
            if (url !== '') {
                await fetchService();
            }
        };
        update();
    }, [url, fetchService]);

    return { requestToConnectMessage: message, errorCode, loading, requestToConnectRefetch: requestToConnect };
};

export default useRequestToConnections;