import { useState, useCallback, useEffect } from 'react';
import useService from '../useService';
import { agents } from '../../../agents';

const useDeleteJob = () => {
    const [message, setMessage] = useState('');
    const [errorCode, setErrorCode] = useState(2);
    const [JobId, setJobId] = useState(0);
    const url = agents.localhost + agents.deleteJob;

    const { response, loading, refetch: fetchService } = useService(
        `Deleting Job ${JobId}`,
        'DELETE',
        `${url}?jobId=${JobId}`,
        null,
        undefined,
        true
    );

    // Handle the delete Job response
    const handleDeleteJob = useCallback((response, id) => {
        setErrorCode(2);
        if (response) {
            setMessage(`Job ${id} Deleted!`);
            console.log(`Job ${id} Deleted!`);
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
            handleDeleteJob(response, JobId);
            setJobId(0);
        }
    }, [response, handleDeleteJob, JobId]);

    return { message, errorCode, loading, deleteJobRefetch: deleteJob };
};

export default useDeleteJob;
