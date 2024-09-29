import { useState, useCallback, useEffect } from 'react';
import useService from '../useService';
import { agents } from '../../../agents';

const useGetProposedJobs = () => {
    const [message, setMessage] = useState('');
    const [errorCode, setErrorCode] = useState(2);
    const [postData, setPostData] = useState(null);
    const [jobId, setJobId] = useState(0);
    const [userId, setUserId] = useState(0);
    const [url, setUrl] = useState(null);

    const serviceurl = agents.localhost + agents.getProposedJobs;

    const { response, loading, refetch: fetchService } = useService(
        `Getting jobs for user ${userId} `,
        'GET',
        url,
        postData,
        undefined,
        true
    );

    const handleApplyResponse = useCallback((response) => {
        if (response?.status === 200) {
            setErrorCode(0);
            setMessage('Your application is successfully sent!');
            console.log('Your application is successfully sent');
            setPostData(null);
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
        UserId, PageNumber, PageSize,
    ) => {
        console.log("eeeee ---- ");
        const queryParams = `?UserId=${UserId}&&PageNumber=${PageNumber}&PageSize=${PageSize}`;
        console.log("eeeee ---- ", queryParams);
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

    return { getJobsMatrixResponse: response,getJobsMatrixMessage: message, getJobsMatrixErrorCode: errorCode, getJobsMatrixLoading: loading, getJobsMatrixRefetch: getJobs };
};

export default useGetProposedJobs;