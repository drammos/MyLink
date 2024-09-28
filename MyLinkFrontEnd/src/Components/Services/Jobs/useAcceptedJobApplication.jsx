import { useState, useCallback, useEffect } from 'react';
import useService from '../useService';
import { agents } from '../../../agents';

const useAcceptedJobApplication = () => {
    const [message, setMessage] = useState('');
    const [errorCode, setErrorCode] = useState(2);
    const [postData, setPostData] = useState(null);
    const [jobId, setJobId] = useState(0);
    const [url, setUrl] = useState(null);

    const serviceurl = agents.localhost + agents.acceptedJobApplication;

    const { response, loading, refetch: fetchService } = useService(
        `Going to accept the application`,
        'PUT',
        url,
        null,
        undefined,
        true
    );

    const handleAcceptResponse = useCallback((response) => {
        if (response?.status === 200) {
            setErrorCode(0);
            setMessage('Application Accepted!');
            console.log('Application Accepted');
            setPostData(null);
        } else if (response?.status === 600) {
            setErrorCode(1);
            setMessage('An error occurred. Please try again later.');
            console.error('Application NOT Accepted');
        } else {
            setErrorCode(1);
            setMessage('Application NOT Accepted');
            console.error('Application NOT Accepted');
        }
    }, []);

    const acceptApplication = useCallback((
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
            handleAcceptResponse(response);
        }
    }, [response, handleAcceptResponse]);

    return { acceptJobMessage: message, acceptJobErrorCode: errorCode, acceptJobLoading: loading, acceptJobRefetch: acceptApplication };
};

export default useAcceptedJobApplication;