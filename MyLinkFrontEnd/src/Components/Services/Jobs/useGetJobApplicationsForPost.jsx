import { useState, useCallback, useEffect } from 'react';
import useService from '../useService';
import { agents } from '../../../agents';


const useGetJobApplicationsForPost = () => {
    const [currentJobId, setCurrentJobId] = useState('');
    const [errorCode, setErrorCode] = useState(2);
    const [message, setMessage] = useState('');
    const [listLength, setlistLength] = useState('');
    const [listInfo, setlistInfo] = useState('');
    const [responseList, setResponseList] = useState('');

    const url = agents.localhost + agents.getJobApplicationForPost;

    const { response, loading, refetch: fetchService } = useService(
        'Getting Reactions Notifications...',
        'GET',
        `${url}?jobId=${currentJobId}`,
        null,
        undefined,
        true
    );

    const handleSignUpResponse = useCallback((response) => {
        if (response?.status === 200) {
            setErrorCode(0);
            setlistLength(response.data.length);
            setResponseList(response);
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
        setCurrentJobId(id);
    }, []);

    useEffect(() => {
        if (currentJobId !== '') {
            fetchService();
        }
    }, [fetchService, currentJobId]);

    useEffect(() => {
        if (response) {
            handleSignUpResponse(response);
        }
    }, [response, handleSignUpResponse]);

    return { getApplicationsResponse: responseList, notificationList: listInfo, loading, getApplicationsRefetch: getList };
};

export default useGetJobApplicationsForPost;
