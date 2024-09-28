import { useState, useCallback, useEffect } from 'react';
import useService from '../useService';
import { agents } from '../../../agents';

const useRejectJobApplication = () => {
    const [message, setMessage] = useState('');
    const [errorCode, setErrorCode] = useState(2);
    const [postData, setPostData] = useState(null);
    const [jobId, setJobId] = useState(0);
    const [url, setUrl] = useState(null);

    const serviceurl = agents.localhost + agents.rejectJobApplication;

    const { response, loading, refetch: fetchService } = useService(
        `Going to reject the application`,
        'PUT',
        url,
        null,
        undefined,
        true
    );

    const handlerejectResponse = useCallback((response) => {
        if (response?.status === 200) {
            setErrorCode(0);
            setMessage('Application rejected!');
            console.log('Application rejected');
            setPostData(null);
        } else if (response?.status === 600) {
            setErrorCode(1);
            setMessage('An error occurred. Please try again later.');
            console.error('Application NOT rejected');
        } else {
            setErrorCode(1);
            setMessage('Application NOT rejected');
            console.error('Application NOT rejected');
        }
    }, []);

    const rejectApplication = useCallback((
        jobApplicationId
    ) => {
        const queryParams = `?jobApplicationId=${jobApplicationId}`;
        setUrl(`${serviceurl}${queryParams}`);
    }, []);

    useEffect(() => {
        if (url) {
            fetchService();
        }
    }, [url]);

    useEffect(() => {
        if (response) {
            handlerejectResponse(response);
        }
    }, [response, handlerejectResponse]);

    return { rejectJobMessage: message, rejectJobErrorCode: errorCode, rejectJobLoading: loading, rejectJobRefetch: rejectApplication };
};

export default useRejectJobApplication;