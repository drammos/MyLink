import { useState, useCallback, useEffect } from 'react';
import useService from '../useService';
import { agents } from '../../../agents';

const useGetListFromConnections = () => {
    const [userId, setUserId] = useState('');
    const [errorCode, setErrorCode] = useState(2);
    const [message, setMessage] = useState('');
    const [listLength, setlistLength] = useState('');
    const [listInfo, setlistInfo] = useState('');

    const url = agents.localhost + agents.getListFromConnections;
    const { response, loading, refetch: fetchService } = useService(
        'Getting coonected users',
        'GET',
        `${url}?UserId=${userId}`,
        null,
        undefined,
        true
    );


    const handleGetListResponse = useCallback((response) => {
        if (response?.status === 200) {
            setErrorCode(0);
            setlistLength(response.data.length);
            setlistInfo(response.data);
            setMessage('Requests list is here!');
            console.log('Requests list is here!');
        } else {
            setErrorCode(1);
            setMessage(response?.title || 'An error occurred. Please try again.');
        }
    }, []);

    const getList = useCallback((
        id
    ) => {
        setUserId(id);
    }, []);

    useEffect(() => {
        if (userId !== '') {
            fetchService();
        }
    }, [fetchService, userId]);

    useEffect(() => {
        if (response) {
            handleGetListResponse(response);
        }
    }, [response, handleGetListResponse]);

    return { listLength, connectionList: listInfo, loading, GetConnectionsrefetch: getList };
};

export default useGetListFromConnections;
