import { useState, useCallback, useEffect } from 'react';
import useService from '../Services/useService';
import { agents } from '../../../agents';

const useGetPostsFromOtherUsers = () => {
    const [message, setMessage] = useState('');
    const [errorCode, setErrorCode] = useState(2);
    const [userId, setUserId] = useState('');
    const url = agents.localhost + agents.getPostsFromOtherUsers + '?UserId=' + userId;

    const { response, loading, refetch: fetchService } = useService(
        'Getting posts from other users ...',
        'GET',
        url,
        null,
        undefined,
        true
    );

    const handleGetPostsResponse = useCallback((response) => {
        if (response?.status === 200) {
            setErrorCode(0);
            console.log(errorCode, " = ErrorCode");
            setMessage('Posts are here!');
        } else {
            setErrorCode(1);
            setMessage(response?.title || 'An error occurred. Please try again.');
        }
    }, [errorCode]);

    const getUserPosts = useCallback((userId = localStorage.getItem('id')) => {
        if (userId)
            setUserId(userId);
        else
            setUserId(localStorage.getItem('id'));
    }, [errorCode]);

    useEffect(() => {
        if (response) {
            handleGetPostsResponse(response);
        }
    }, [response, handleGetPostsResponse]);

    useEffect(() => {
        fetchService();
    }, [userId]);

    return { response, message, errorCode, loading, getPostsRefetch: getUserPosts };
};

export default useGetPostsFromOtherUsers;
