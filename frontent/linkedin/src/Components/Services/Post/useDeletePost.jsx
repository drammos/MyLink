import { useState, useCallback, useEffect } from 'react';
import useService from '../useService';
import { agents } from '../../../agents';

const useCreatePost = () => {
    const [message, setMessage] = useState('');
    const [errorCode, setErrorCode] = useState(2);
    const [postId, setPostId] = useState(0);
    const url = agents.localhost + agents.deletePost;

    const { response, loading, refetch: fetchService } = useService(
        'Deleting post ...',
        'DELETE',
        `${url}?postId=${postId}`,
        null,
        undefined,
        true
    );

    // Handle the delete post response
    const handleDeletePost = useCallback((response) => {
        if (response) {
            setMessage('Post Deleted!');
            console.log('Post Deleted!');
            setErrorCode(0);  
        } else {
            setErrorCode(1);  
        }
    }, []);

    const deletePost = useCallback((postID) => {
        setPostId(postID);
    }, []);

    useEffect(() => {
        if (postId && postId !== 0) {
            fetchService();
            setPostId(0);  
        }
    }, [fetchService, postId]);

    useEffect(() => {
        if (response) {
            handleDeletePost(response);
        }
    }, [response, handleDeletePost]);

    useEffect(() => {
        console.log(`ErrorCode updated: ${errorCode}`);
    }, [errorCode]);  

    return { message, errorCode, loading, deletePostRefetch: deletePost };
};

export default useCreatePost;
