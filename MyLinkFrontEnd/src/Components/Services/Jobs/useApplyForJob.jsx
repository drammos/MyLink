import { useState, useCallback, useEffect } from 'react';
import useService from '../useService';
import { agents } from '../../../agents';

const useApplyForJob = () => {
    const [message, setMessage] = useState('');
    const [errorCode, setErrorCode] = useState(2);
    const [postData, setPostData] = useState(null);
    const [jobId, setJobId] = useState(0);
    const [username, setUsername] = useState(0);
    const url = agents.localhost + agents.applyForJob;

    const { response, loading, refetch: fetchService } = useService(
        `Appling user ${username} for job ${jobId}`,
        'POST',
        url,
        postData,
        'multipart/form-data',
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

    const applyForJob = useCallback((
        JobId, Username
    ) => {
        const formData = new FormData();
        formData.append('JobId', JobId);
        formData.append('Username', Username);

        setUsername(Username);
        setJobId(JobId);
        setPostData(formData);
    }, []);

    useEffect(() => {
        if (jobId !== 0 && postData) {
            fetchService();
        }
    }, [postData, jobId]);

    useEffect(() => {
        if (response) {
            handleApplyResponse(response);
        }
    }, [response, handleApplyResponse]);

    return { applyForJobMessage: message, applyForJobErrorCode: errorCode, applyForJobLoading: loading, applyForJobRefetch: applyForJob };
};

export default useApplyForJob;