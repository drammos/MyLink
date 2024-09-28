import { useState, useCallback, useEffect } from 'react';
import useService from '../useService';
import { agents } from '../../../agents';

const useCloseJob = () => {
    const [message, setMessage] = useState('');
    const [errorCode, setErrorCode] = useState(2);
    const [JobId, setJobId] = useState(0);
    const url = agents.localhost + agents.closeJob;

    const { response, loading, refetch: fetchService } = useService(
        `Closing Job ${JobId}`,
        'PUT',
        `${url}?jobId=${JobId}`,
        null,
        undefined,
        true
    );

    // Handle the delete Job response
    const handleCloseJob = useCallback((response, id) => {
        setErrorCode(2);
        if (response) {
            setMessage(`Job ${id} Closed!`);
            console.log(`Job ${id} Closed!`);
            setErrorCode(0);
        } else {
            setErrorCode(1);
        }
    }, []);

    const deleteJob = useCallback((JobID) => {
        setJobId(JobID);
    }, []);

    useEffect(() => {
        if (JobId && JobId !== 0) {
            fetchService();
        }
    }, [fetchService, JobId]);

    useEffect(() => {
        if (response) {
            handleCloseJob(response, JobId);
            setJobId(0);
        }
    }, [response, handleCloseJob, JobId]);

    useEffect(() => {
        console.log(`ErrorCode updated: ${errorCode}`);
    }, [errorCode]);

    return { message, errorCode, loading, closeJobRefetch: deleteJob };
};

export default useCloseJob;
