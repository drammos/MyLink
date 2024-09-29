import { useState, useCallback, useEffect } from 'react';
import useService from '../useService';
import { agents } from '../../../agents';

const useGetFilteredJobs = () => {
    const [message, setMessage] = useState('');
    const [errorCode, setErrorCode] = useState(2);
    const [jobId, setJobId] = useState(0);
    const [userId, setUserId] = useState(0);
    const [url, setUrl] = useState(null);

    const serviceurl = agents.localhost + agents.getFilteredJobs;

    const { response, loading, refetch: fetchService } = useService(
        `Getting jobs for user ${userId} `,
        'GET',
        url,
        null,
        undefined,
        true
    );

    const handleApplyResponse = useCallback((response) => {
        if (response?.status === 200) {
            setErrorCode(0);
            setMessage('Your application is successfully sent!');
            console.log('Your application is successfully sent');
        } else if (response?.status === 600) {
            setErrorCode(1);
            setMessage('An error occurred. Please try again later.');
            console.error('Application failed');
        } else {
            setErrorCode(1);
            setMessage('Application failed');
            console.error('Application failed');
        }
    }, []);

    const getJobs = useCallback((
        UserId, LastPostedDays = null, LocationType = null,
        WorkType = null, Category = null, PageNumber, PageSize,
    ) => {
        
        const queryParams = `?UserId=${UserId}&LastPostedDays=${LastPostedDays}&LocationType=${LocationType}
        &WorkType=${WorkType}&Category=${Category}&PageNumber=${PageNumber}&PageSize=${PageSize}`;

        setUrl(`${serviceurl}${queryParams}`);
        setUserId(UserId);
    }, []);

    useEffect(() => {
        if (userId !== 0 && url) {
            fetchService();
        }
    }, [url, userId]);

    useEffect(() => {
        if (response) {
            handleApplyResponse(response);
        }
    }, [response, handleApplyResponse]);

    return { getJobsResponse: response,getJobsMessage: message, getJobsErrorCode: errorCode, getJobsLoading: loading, getJobsRefetch: getJobs };
};

export default useGetFilteredJobs;