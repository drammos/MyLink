import { useState, useCallback, useEffect } from 'react';
import useService from '../useService';
import { agents } from '../../../agents';

const useCreatePost = () => {
    const [message, setMessage] = useState('');
    const [errorCode, setErrorCode] = useState(2);
    const [inputFormUpdate, setInputFormUpdate] = useState(2);
    const [postId, setPostId] = useState(0);
    const url = agents.localhost + agents.editPost;
    const inputFormData = new FormData();

    const { response, loading, refetch: fetchService } = useService(
        `Editing post ${postId}`,
        'PUT',
        url,
        inputFormData,
        'multipart/form-data',
        true
    );

    const handleEditResponse = useCallback((response) => {
        if (response?.status === 200) {
            setErrorCode(0);
            setMessage('Post informations are updated!');
            console.log('Post informations are updated!');
            inputFormData.delete('UserId');
            inputFormData.delete('Title');
            inputFormData.delete('Content');
            inputFormData.delete('CreatedAt');
            inputFormData.delete('PictureUrls');
            inputFormData.delete('VideoUrls');
            inputFormData.delete('VoiceUrls');
            inputFormData.delete('isPublic');
            setInputFormUpdate(0);
        } else if (response?.status === 600) {
            setErrorCode(1);
            setMessage('An error occurred. Please try again later.');
            console.error('Edit information failed');
        } else {
            setErrorCode(1);
            setMessage('Edit information failed');
            console.error('Edit information failed');
        }
    }, []);

    const editPost = useCallback((
        Id, Title, Content, UpdateAt, PictureUrls, VideoUrls, VoiceUrls, IsLikedByCurrentUser, IsPublic) => {
        inputFormData.append('Id', Id);
        inputFormData.append('Title', Title);
        inputFormData.append('Content', Content);
        inputFormData.append('UpdateAt', UpdateAt);
        inputFormData.append('PictureUrls', PictureUrls);
        inputFormData.append('VideoUrls', VideoUrls);
        inputFormData.append('VoiceUrls', VoiceUrls);
        inputFormData.append('IsLikedByCurrentUser', IsLikedByCurrentUser);
        inputFormData.append('IsPublic', IsPublic);
        setInputFormUpdate(1);
        fetchService();
        console.log("Create post using: ", Id, Title, Content, UpdateAt, PictureUrls, VideoUrls, VoiceUrls, IsLikedByCurrentUser, IsPublic);
        console.log(inputFormData);
    }, []);

    useEffect(() => {
        if (response) {
            handleEditResponse(response);
        }
    }, [response, handleEditResponse]);

    return { message, errorCode, loading, editPostRefetch: editPost };
};

export default useCreatePost;
