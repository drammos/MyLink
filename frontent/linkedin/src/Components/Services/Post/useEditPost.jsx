import { useState, useCallback, useEffect } from 'react';
import useService from '../useService';
import { agents } from '../../../agents';

const useCreatePost = () => {
    const [message, setMessage] = useState('');
    const [errorCode, setErrorCode] = useState(2);
    const [postData, setPostData] = useState(null);
    const [postId, setPostId] = useState(0);
    const url = agents.localhost + agents.editPost;

    const { response, loading, refetch: fetchService } = useService(
        `Editing post ${postId}`,
        'PUT',
        url,
        postData,
        'multipart/form-data',
        true
    );

    const handleEditResponse = useCallback((response) => {
        if (response?.status === 200) {
            setErrorCode(0);
            setMessage('Post information is updated!');
            console.log('Post information is updated!');
            setPostData(null);
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
        Id, Title, Content, UpdateAt, PictureUrls, VideoUrls, VoiceUrls, IsLikedByCurrentUser, IsPublic
    ) => {
        console.log("useEdit", Id);
        const formData = new FormData();
        formData.append('Id', Id);
        formData.append('Title', Title);
        formData.append('Content', Content);
        formData.append('UpdateAt', UpdateAt);
        formData.append('PictureUrls', PictureUrls);
        formData.append('VideoUrls', VideoUrls);
        formData.append('VoiceUrls', VoiceUrls);
        formData.append('IsLikedByCurrentUser', IsLikedByCurrentUser);
        formData.append('IsPublic', IsPublic);

        setPostId(Id);
        setPostData(formData);

        console.log("Edit post using: ", Id, Title, Content, UpdateAt, PictureUrls, VideoUrls, VoiceUrls, IsLikedByCurrentUser, IsPublic);
    }, []);

    useEffect(() => {
        if (postId !== 0 && postData) {
            fetchService();
        }
    }, [postId, postData, fetchService]);

    useEffect(() => {
        if (response) {
            handleEditResponse(response);
        }
    }, [response, handleEditResponse]);

    return { message, errorCode, loading, editPostRefetch: editPost };
};

export default useCreatePost;