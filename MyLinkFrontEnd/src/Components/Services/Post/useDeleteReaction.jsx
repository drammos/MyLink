import { useState, useCallback, useEffect } from 'react';
import useService from '../useService';
import { agents } from '../../../agents';

const useDeleteReaction = () => {
    const [message, setMessage] = useState('');
    const [errorCode, setErrorCode] = useState(2);
    const [reactionId, setReactionId] = useState(0);
    const url = agents.localhost + agents.deleteReaction;

    const { response, loading, refetch: fetchService } = useService(
        `Deleting Reaction ${reactionId}`,
        'DELETE',
        `${url}?reactionId=${reactionId}`,
        null,
        undefined,
        true
    );

    const handleReactionResponse = useCallback((response) => {
        if (response?.status === 200) {
            setErrorCode(0);
            setMessage('Post reaction Deleted!');
            console.log('Post reaction Deleted!');
        } else if (response?.status === 600) {
            setErrorCode(1);
            setMessage('An error occurred. Please try again later.');
            console.error('Post reaction failed');
        } else {
            setErrorCode(1);
            setMessage('Post reaction failed');
            console.error('Post reaction failed');
        }
    }, []);

    const DeleteReaction = useCallback((
        ReactionId
    ) => {
        setReactionId(ReactionId);
    }, []);

    useEffect(() => {
        if (reactionId !== 0) {
            fetchService();
        }
    }, [reactionId]);

    useEffect(() => {
        if (response) {
            handleReactionResponse(response);
        }
    }, [response, handleReactionResponse]);

    return { message, errorCode, loading, deleteReactionRefetch: DeleteReaction };
};

export default useDeleteReaction;