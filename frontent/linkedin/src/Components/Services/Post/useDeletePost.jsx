import { useState, useCallback, useEffect } from 'react';
import useService from '../useService';
import { agents } from '../../../agents';

const useDeletePost = () => {
    const [message, setMessage] = useState('');
    const [errorCode, setErrorCode] = useState(2);
    const [postId, setPostId] = useState(0);
    const url = agents.localhost + agents.deletePost;

    const { response, loading, refetch: fetchService } = useService(
        `Deleting post ${postId}`,
        'DELETE',
        `${url}?postId=${postId}`,
        null,
        undefined,
        true
    );

    // Handle the delete post response
    const handleDeletePost = useCallback((response, id) => {
        setErrorCode(2);
        if (response) {
            setMessage(`Deleted post ${id}!`);
            console.log(`Deleted post ${id}!`); 
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
        }
    }, [fetchService, postId]);

    useEffect(() => {
        if (response) {
            handleDeletePost(response, postId); 
            setPostId(0);
        }
    }, [response, handleDeletePost, postId]);

    useEffect(() => {
        console.log(`ErrorCode updated: ${errorCode}`);
    }, [errorCode]);

    return { message, errorCode, loading, deletePostRefetch: deletePost };
};

export default useDeletePost;
