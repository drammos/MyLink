import { useState, useCallback, useEffect } from 'react';
import useService from '../Services/useService';
import { agents } from '../../agents';
import { useMemo } from 'react';


const useCreatePost = () => {
    const [message, setMessage] = useState('');
    const [errorCode, setErrorCode] = useState(2);
    const inputFormData = useMemo(() => new FormData(), []);
    const url = agents.localhost + agents.createPost;

    const { response, loading, refetch: fetchService } = useService(
        'Creating new post ...',
        'POST',
        url,
        inputFormData,
        'multipart/form-data',
        true
    );

    const handleSignUpResponse = useCallback((response) => {
        if (response?.status === 200) {
            setErrorCode(0);
            console.log(errorCode, " = ErrorCode");
            setMessage('Posts are here!');
        } else {
            setErrorCode(1);
            setMessage(response?.title || 'An error occurred. Please try again.');
        }
    }, [errorCode]);

    const createPost = useCallback((
        userId, title, content, createdAt, PictureUrls, videoUrls, voiceUrls
    ) => {

        inputFormData.append('UserId', userId);
        inputFormData.append('Title', title);
        inputFormData.append('Content', content);
        inputFormData.append('CreatedAt', createdAt);
        inputFormData.append('PictureUrls', PictureUrls);
        inputFormData.append('VideoUrls', videoUrls);
        inputFormData.append('VoiceUrls', voiceUrls);

        console.log("Create post using: ", userId, title, content, createdAt, PictureUrls, videoUrls, voiceUrls);
        console.log(inputFormData);

        fetchService();
    }, [fetchService, inputFormData]);

    useEffect(() => {
        if (response) {
            handleSignUpResponse(response);
        }
    }, [response, handleSignUpResponse]);

    return { createPost, message, errorCode, loading, createPostRefetch: createPost };
};

export default useCreatePost;
