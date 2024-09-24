import { useState, useCallback, useEffect } from 'react';
import useService from '../useService';
import { agents } from '../../../agents';
import { useMemo } from 'react';


const useCreatePost = () => {
    const [message, setMessage] = useState('');
    const [errorCode, setErrorCode] = useState(2);
    const [postId, setPostId] = useState(0);
    const inputFormData = useMemo(() => new FormData(), []);
    const url = agents.localhost + agents.deletePost;

    const { response, loading, refetch: fetchService } = useService(
        'Deleting post ...',
        'DELETE',
        `${url}?postId=${postId}`,
        inputFormData,
        'application/json',
        true
    );

    const handleDeletePost = useCallback((response) => {
        if (response?.status === 200) {
            setErrorCode(0);
            console.log(errorCode, " = ErrorCode");
            setMessage('Post Deleted!');
        } else {
            setErrorCode(1);
            setMessage(response?.title || 'An error occurred. Please try again.');
        }
    }, [errorCode]);

    const deletePost = useCallback((
        postID
    ) => {
        setPostId(postID);

    }, [fetchService, postId]);

    useEffect(() => {
        if (postId && postId !== 0) {
            fetchService();
            setPostId(0);
        }
    }, [fetchService, postId]);

    useEffect(() => {
        if (response)
            handleDeletePost(response);
    }, [response, handleDeletePost]);

    return { message, errorCode, loading, deletePostRefetch: deletePost };
};

export default useCreatePost;
