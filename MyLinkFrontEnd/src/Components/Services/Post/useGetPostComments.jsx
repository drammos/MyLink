import { useState, useCallback, useEffect } from 'react';
import useService from '../../Services/useService';
import { agents } from '../../../agents';

const useGetPostComments = () => {
    const [message, setMessage] = useState('');
    const [errorCode, setErrorCode] = useState(2);
    const [postId, setPostId] = useState('');
    const [commentsData, setCommentsData] = useState(null);

    const url = agents.localhost + agents.getPostComments + '?postId=' + postId;

    const { response, loading, refetch: fetchService } = useService(
        `Getting comments for post ${postId}`,
        'GET',
        url,
        null,
        undefined,
        true
    );

    const handleGetPostCommentsResponse = useCallback((response) => {
        console.log("Get commments response is ", response);
        if (response?.status === 200) {
            setPostId(null);
            setErrorCode(0);
            setMessage('Comments are here!');
            console.log("Get commments response is ", response.data);

            setCommentsData(response.data);
        } else {
            setErrorCode(1);
            setMessage(response?.title || 'An error occurred. Please try again.');
            setCommentsData(null);
        }
    }, []);

    const getPostComments = useCallback((PostId) => {
        console.log('Post Id iiiiiiiiiiiiiiiiiiiis', PostId);
        if (PostId) {
            setPostId(PostId);
            setCommentsData(null);
        }
    }, []);

    useEffect(() => {
        if (response) {
            handleGetPostCommentsResponse(response);
        }
    }, [response, handleGetPostCommentsResponse]);

    useEffect(() => {
        console.log('iiiiiiiiiiiiiiiiiiiis', postId);
        if (postId) {
            fetchService();
        }
    }, [postId, fetchService]);

    return { commentsData, message, errorCode, loading, getPostCommentsRefetch: getPostComments };
};

export default useGetPostComments;