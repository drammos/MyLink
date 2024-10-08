import { useState, useCallback, useEffect } from 'react';
import useService from '../useService';
import { agents } from '../../../agents';


const useGetListFromPendingRequests = () => {
    const [currentUserId, setcurrentUserId] = useState('');
    const [errorCode, setErrorCode] = useState(2);
    const [message, setMessage] = useState('');
    const [listLength, setlistLength] = useState('');
    const [listInfo, setlistInfo] = useState('');

    const url = agents.localhost + agents.useGetListFromPendingRequests;

    const { response, loading, refetch: fetchService } = useService(
        'Getting List from Pending Requests...',
        'GET',
        `${url}?UserId=${currentUserId}`,
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
        id
    ) => {
        setcurrentUserId(id);
    }, []);

    useEffect(() => {
        if (currentUserId !== '') {
            setTimeout(() => fetchService(), 1000);
        }
    }, [fetchService, currentUserId]);

    useEffect(() => {
        if (response) {
            handleSignUpResponse(response);
        }
    }, [response, handleSignUpResponse]);

    return { listLength, pendingList: listInfo, loading, pendingListRefetch: getList };
};

export default useGetListFromPendingRequests;
