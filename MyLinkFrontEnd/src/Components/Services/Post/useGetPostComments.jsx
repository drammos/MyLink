import { useState, useCallback, useEffect } from 'react';
import useService from '../../Services/useService';
import { agents } from '../../../agents';

const useGetPostComments = () => {
    const [message, setMessage] = useState('');
    const [errorCode, setErrorCode] = useState(2);
    const [postId, setPostId] = useState('');
    const url = agents.localhost + agents.useGetPostComments + '?postId=' + postId;

    const { response, loading, refetch: fetchService } = useService(
        `Getting comments for post ${postId}`,
        'GET',
        url,
        null,
        undefined,
        true
    );

    const handleGetPostCommentsResponse = useCallback((response) => {
        if (response?.status === 200) {
            setErrorCode(0);
            console.log(errorCode, " = ErrorCode");
            setMessage('Comments are here!');
        } else {
            setErrorCode(1);
            setMessage(response?.title || 'An error occurred. Please try again.');
        }
    }, [errorCode]);

    const getPostComments = useCallback((PostId) => {
        if (PostId)
            setPostId(PostId);
    }, [errorCode]);

    useEffect(() => {
        if (response) {
            handleGetPostCommentsResponse(response);
        }
    }, [response, handleGetPostCommentsResponse]);

    useEffect(() => {
        fetchService();
    }, [postId]);

    return { response, message, errorCode, loading, getPostCommentsRefetch: getPostComments };
};

export default useGetPostComments;
