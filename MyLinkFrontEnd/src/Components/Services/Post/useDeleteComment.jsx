import { useState, useCallback, useEffect } from 'react';
import useService from '../ ';
import { agents } from '../../../agents';

const useDeleteComment = () => {
    const [message, setMessage] = useState('');
    const [errorCode, setErrorCode] = useState(2);
    const [commentId, setCommentId] = useState(0);
    const url = agents.localhost + agents.editPost;

    const { response, loading, refetch: fetchService } = useService(
        `Deleting comment ${commentId}`,
        'DELETE',
        `${url}?commentId=${commentId}`,
        null,
        undefined,
        true
    );

    const deleteComment = useCallback(( commId ) => {
        setCommentId(commId);
    }, []);

    useEffect(() => {
        if (commentId !== 0) {
            fetchService();
        }
    }, [commentId]);

    useEffect(() => {
        if (response) {
            handleCommentResponse(response);
        }
    }, [response, handleCommentResponse]);

    const handleCommentResponse = useCallback((response) => {
        if (response?.status === 200) {
            setErrorCode(0);
            setMessage('Post Comment deleted!');
            console.log('Post Comment deleted!');
        } else if (response?.status === 600) {
            setErrorCode(1);
            setMessage('An error occurred. Please try again later.');
            console.error('Delete Comment failed');
        } else {
            setErrorCode(1);
            setMessage('Delete Comment failed');
            console.error('Delete Comment failed');
        }
    }, []);

    return { message, errorCode, loading, deleteCommentRefetch: deleteComment };
};

export default useDeleteComment;