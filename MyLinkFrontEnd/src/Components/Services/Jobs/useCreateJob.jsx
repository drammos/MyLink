import { useState, useCallback, useEffect } from 'react';
import useService from '../../Services/useService';
import { agents } from '../../../agents';
import { useMemo } from 'react';

const useCreateJob = () => {
    const [message, setMessage] = useState('');
    const [errorCode, setErrorCode] = useState(2);
    const [inputFormUpdate, setInputFormUpdate] = useState(2);
    const [data, setData] = useState(null);
    const inputFormData = useMemo(() => new FormData(), []);
    const url = agents.localhost + agents.createJob;

    const { response, loading, refetch: fetchService } = useService(
        'Creating new job ...',
        'POST',
        url,
        data,
        'multipart/form-data',
        true
    );

    const handleCreateJob = useCallback(async (response) => {
        if (response?.status === 200) {
            setErrorCode(0);
            console.log(errorCode, " = ErrorCode");
            setMessage('Job Created!');
        } else {
            setErrorCode(1);
            setMessage(response?.title || 'An error occurred. Please try again.');
        }
    }, [errorCode]);

    const createJob = useCallback(async (
        userId, title, companyName, description, location, workType, locationType, category
    ) => {
        inputFormData.append('UserId', userId);
        inputFormData.append('Title', title);
        inputFormData.append('CompanyName', companyName);
        inputFormData.append('Description', description);
        inputFormData.append('Location', location);
        inputFormData.append('WorkType', workType);
        inputFormData.append('LocationType', locationType);
        inputFormData.append('Category', category);
        setInputFormUpdate(1);
        setData(inputFormData);
        console.log("Create post using: ", userId, title, companyName, description, location, workType, locationType, category);
    }, [inputFormData]);

    useEffect(() => {
        const handleJobCreation = async () => {
            if (response) {
                await handleCreateJob(response);
                inputFormData.delete('UserId');
                inputFormData.delete('Title');
                inputFormData.delete('Content');
                inputFormData.delete('CreatedAt');
                inputFormData.delete('PictureUrls');
                inputFormData.delete('VideoUrls');
                inputFormData.delete('VoiceUrls');
                inputFormData.delete('isPublic');
                setInputFormUpdate(0);
            }
        };
        handleJobCreation();
    }, [response, handleCreateJob, setInputFormUpdate]);


    useEffect(() => {
        const update = async () => {
            if (inputFormUpdate === 1 && data) {
                await fetchService();
            }
        };
        update();
    }, [inputFormUpdate, data,fetchService]);

    return { response, message, errorCode, loading, createJobRefetch: createJob };
};

export default useCreateJob;