import { useState, useCallback, useEffect } from 'react';
import useService from '../../Services/useService';
import { agents } from '../../../agents';

const useGetUserPostedJobs = () => {
    const [message, setMessage] = useState('');
    const [errorCode, setErrorCode] = useState(2);
    const [userId, setUserId] = useState('');
    const url = agents.localhost + agents.getUserPostedJobs + '?UserId=' + userId;

    const { response, loading, refetch: fetchService } = useService(
        'Getting my jobs ...',
        'GET',
        url,
        null,
        undefined,
        true
    );

    const handleGetUserJobsResponse = useCallback((response) => {
        if (response?.status === 200) {
            setErrorCode(0);
            console.log(errorCode, " = ErrorCode");
            setMessage('Jobs are here!');
            setUserId(0);
        } else {
            setErrorCode(1);
            setMessage(response?.title || 'An error occurred. Please try again.');
        }
    }, [errorCode]);

    const getUserJobs = useCallback((UserId = localStorage.getItem('id')) => {
        if (UserId)
            setUserId(UserId);
        else
            setUserId(localStorage.getItem('id'));
    }, [errorCode]);

    useEffect(() => {
        if (response) {
            handleGetUserJobsResponse(response);
        }
    }, [response, handleGetUserJobsResponse]);

    useEffect(() => {
        if (userId !== 0)
            fetchService();
    }, [userId]);

    return { response, message, errorCode, loading, getJobsRefetch: getUserJobs };
};

export default useGetUserPostedJobs;
