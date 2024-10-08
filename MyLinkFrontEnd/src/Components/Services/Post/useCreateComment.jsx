import { useState, useCallback, useEffect } from 'react';
import useService from '../useService';
import { agents } from '../../../agents';

const useCreateComment = () => {
    const [message, setMessage] = useState('');
    const [errorCode, setErrorCode] = useState(2);
    const [postData, setPostData] = useState(null);
    const [postId, setPostId] = useState(0);
    const url = agents.localhost + agents.createComment;

    const { response, loading, refetch: fetchService } = useService(
        `Creating comment on ${postId}`,
        'POST',
        url,
        postData,
        'multipart/form-data',
        true
    );

    const handleCommentResponse = useCallback((response) => {
        if (response?.status === 200) {
            setErrorCode(0);
            setMessage('Comment created!');
            console.log('Comment created!');
            setPostData(null);
        } else if (response?.status === 600) {
            setErrorCode(1);
            setMessage('An error occurred. Please try again later.');
            console.error('Post Comment failed');
        } else {
            setErrorCode(1);
            setMessage('Comment failed');
            console.error('Comment failed');
        }
    }, []);

    const createComment = useCallback((
        Content, PostId, Username, CreatedAt 
    ) => {
        const formData = new FormData();
        formData.append('Content', Content);
        formData.append('CreatedAt', CreatedAt);
        formData.append('PostId', PostId);
        formData.append('Username', Username);

        setPostId(PostId);
        setPostData(formData);

        //console.log("Edit post using: ", CommentType, PostId, Username);
    }, []);

    useEffect(() => {
        if (postId !== 0 && postData) {
            fetchService();
        }
    }, [postData]);

    useEffect(() => {
        if (response) {
            handleCommentResponse(response);
        }
    }, [response, handleCommentResponse]);

    return { message, errorCode, loading, createCommentRefetch: createComment };
};

export default useCreateComment;