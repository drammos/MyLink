import { useState, useCallback, useEffect } from 'react';
import useService from '../Services/useService';
import { agents } from '../../agents';

const useGetUserPosts = () => {
    const [message, setMessage] = useState('');
    const [errorCode, setErrorCode] = useState(2);
    const [userId, setUserId] = useState('');
    const url = agents.localhost + agents.getUserPosts + '?UserId=' + userId;

    const { response, loading, refetch: fetchService } = useService(
        'Getting all posts ...',
        'GET',
        url,
        null,
        undefined,
        true
    );

    const handleGetUserPostsResponse = useCallback((response) => {
        if (response?.status === 200) {
            setErrorCode(0);
            console.log(errorCode, " = ErrorCode");
            setMessage('Posts are here!');
            setUserId(0);
        } else {
            setErrorCode(1);
            setMessage(response?.title || 'An error occurred. Please try again.');
        }
    }, [errorCode]);

    const getUserPosts = useCallback((UserId = localStorage.getItem('id')) => {
        if (UserId)
            setUserId(UserId); 
        else
            setUserId(localStorage.getItem('id'));
    }, [errorCode]);

    useEffect(() => {
        if (response) {
            handleGetUserPostsResponse(response);
        }
    }, [response, handleGetUserPostsResponse]);

    useEffect(() => {
        if(userId !==0)
            fetchService();
    }, [userId]);

    return { response, message, errorCode, loading, getPostsRefetch: getUserPosts };
};

export default useGetUserPosts;
