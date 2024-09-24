import { useState, useCallback, useEffect } from 'react';
import useService from '../Services/useService';
import { agents } from '../../agents';
import { useMemo } from 'react';

const useCreatePost = () => {
    const [message, setMessage] = useState('');
    const [errorCode, setErrorCode] = useState(2);
    const [inputFormUpdate, setInputFormUpdate] = useState(2);
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

    const handleCreatePost = useCallback(async (response) => {
        if (response?.status === 200) {
            setErrorCode(0);
            console.log(errorCode, " = ErrorCode");
            setMessage('Posts are here!');
        } else {
            setErrorCode(1);
            setMessage(response?.title || 'An error occurred. Please try again.');
        }
    }, [errorCode]);

    const createPost = useCallback(async (
        userId, title, content, createdAt, PictureUrls, videoUrls, voiceUrls, isPublic
    ) => {
        inputFormData.append('UserId', userId);
        inputFormData.append('Title', title);
        inputFormData.append('Content', content);
        inputFormData.append('CreatedAt', createdAt);
        inputFormData.append('PictureUrls', PictureUrls);
        inputFormData.append('VideoUrls', videoUrls);
        inputFormData.append('VoiceUrls', voiceUrls);
        inputFormData.append('isPublic', isPublic);
        setInputFormUpdate(1);
        console.log("Create post using: ", userId, title, content, createdAt, PictureUrls, videoUrls, voiceUrls, isPublic);
        console.log(inputFormData);
        //await fetchService();
    }, [inputFormData]);

    useEffect(() => {
        const handlePostCreation = async () => {
            if (response) {
                await handleCreatePost(response);
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
        handlePostCreation();
    }, [response, handleCreatePost, setInputFormUpdate]);


    useEffect(() => {
        const update = async () => {
            if (inputFormUpdate === 1) {
                await fetchService();
            }
        };
        update();
    }, [inputFormUpdate, fetchService]);

    return { createPost, message, errorCode, loading, createPostRefetch: createPost };
};

export default useCreatePost;