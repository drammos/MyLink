import { useState, useCallback, useEffect } from 'react';
import useService from '../useService';
import { agents } from '../../../agents';

const useCreateComment = () => {
    const [message, setMessage] = useState('');
    const [errorCode, setErrorCode] = useState(2);
    const [postData, setPostData] = useState(null);
    const [postId, setPostId] = useState(0);
    const url = agents.localhost + agents.editPost;

    const { response, loading, refetch: fetchService } = useService(
        `Creating comment on ${postId}`,
        'PUT',
        url,
        postData,
        'multipart/form-data',
        true
    );

    const handleCommentResponse = useCallback((response) => {
        if (response?.status === 200) {
            setErrorCode(0);
            setMessage('Post Comment created!');
            console.log('Post Comment created!');
            setPostData(null);
        } else if (response?.status === 600) {
            setErrorCode(1);
            setMessage('An error occurred. Please try again later.');
            console.error('Post Comment failed');
        } else {
            setErrorCode(1);
            setMessage('Post Comment failed');
            console.error('Post Comment failed');
        }
    }, []);

    const createComment = useCallback((
        CommentType, PostId, Username
    ) => {
        const formData = new FormData();
        formData.append('CommentType ', CommentType);
        formData.append('PostId ', PostId);
        formData.append('Username ', Username);

        setPostId(PostId);
        setPostData(formData);

        //console.log("Edit post using: ", CommentType, PostId, Username);
    }, []);

    useEffect(() => {
        if (postId !== 0 && postData) {
            fetchService();
        }
    }, [postId, postData, fetchService]);

    useEffect(() => {
        if (response) {
            handleCommentResponse(response);
        }
    }, [response, handleCommentResponse]);

    return { message, errorCode, loading, createCommentRefetch: createComment };
};

export default useCreateComment;