import { useState, useCallback, useEffect } from 'react';
import useService from '../Services/useService';
import { agents } from '../../agents';

const useGetUserPosts = () => {
    const [message, setMessage] = useState('');
    const [errorCode, setErrorCode] = useState(2);
    const [userId, setUserId] = useState(null);
    const url = agents.localhost + agents.getUserPosts + '?UserId=' + userId;

    const { response, loading, refetch: fetchService1 } = useService(
        'Getting my posts ...',
        'GET',
        url,
        null,
        undefined,
        true
    );

    useEffect(() => {
        if (response?.status === 200) {
            setUserId(null);
            setErrorCode(0);
            console.log(errorCode, " = ErrorCode");
            setMessage('Posts are here!');
        } else {
            
            setUserId(null);
            setErrorCode(1);
            console.log(errorCode, " = ErrorCode");
            setMessage(response?.title || 'An error occurred. Please try again.');
        }
    }, [response]);


    const getUserPosts1 = useCallback((m = localStorage.getItem('id')) => {
        if (m !== null)
            setUserId(m); 
        else
            setUserId(localStorage.getItem('id'));
    }, []);

    useEffect(() => {
        if(userId!==null){
            fetchService1();
        }
    }, [userId]);

    return { response, message, errorCode, loading, getPostsRefetch: getUserPosts1 };
};

export default useGetUserPosts;
