import { useState, useCallback, useEffect } from 'react';
import useService from '../../Services/useService';
import { agents } from '../../../agents';

const useGetUserStatusJobs = () => {
    const [message, setMessage] = useState('');
    const [errorCode, setErrorCode] = useState(2);
    const [url, setUrl] = useState(null);
    const serviceurl = agents.localhost + agents.getUserStatusJobs;

    const { response, loading, refetch: fetchService } = useService(
        'Getting already applied jobs ...',
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
            setMessage('Selected Jobs are here!');
        } else {
            setErrorCode(1);
            setMessage(response?.title || 'An error occurred. Please try again.');
        }
    }, [errorCode]);

    const getStatusUserJobs = useCallback((Username = localStorage.getItem('username'), status) => {
        const queryParams = `?Username=${Username}&statusJobApplication=${status}`;

        setUrl(`${serviceurl}${queryParams}`);

    }, [errorCode]);

    useEffect(() => {
        if (response) {
            handleGetUserJobsResponse(response);
        }
    }, [response, handleGetUserJobsResponse]);

    useEffect(() => {
        if (url)
            fetchService();
    }, [url]);

    return { getStatusResponse:response, message, errorCode, loading, getStatusJobsRefetch: getStatusUserJobs };
};

export default useGetUserStatusJobs;
