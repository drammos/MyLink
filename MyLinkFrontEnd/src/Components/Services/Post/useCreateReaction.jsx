import { useState, useCallback, useEffect } from 'react';
import useService from '../useService';
import { agents } from '../../../agents';

const useCreateReaction = () => {
    const [message, setMessage] = useState('');
    const [errorCode, setErrorCode] = useState(2);
    const [postData, setPostData] = useState(null);
    const [reactId, setReactId] = useState(0);
    const [postId, setPostId] = useState(0);
    const url = agents.localhost + agents.createReaction;

    const { response, loading, refetch: fetchService } = useService(
        `Reacting on ${postId}`,
        'POST',
        url, 
        postData,
        'multipart/form-data',
        true
    );

    const handleReactionResponse = useCallback((response) => {
        if (response?.status === 200) {
            setErrorCode(0);
            setReactId(response.data.id);
            setMessage('Post reaction created!');
            console.log('Post reaction created!');
            setPostData(null);
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

    const createReaction = useCallback((
        ReactionType, PostId, Username
    ) => {
        const formData = new FormData();
        console.log(ReactionType, PostId, Username);
        formData.append('ReactionType', ReactionType);
        formData.append('PostId', PostId);
        formData.append('Username', Username);

        setPostId(PostId);
        setPostData(formData);

        //console.log("Edit post using: ", ReactionType, PostId, Username);
    }, []);

    useEffect(() => {
        if (postId !== 0 && postData) {
            fetchService();
        }
    }, [postData, fetchService]);

    useEffect(() => {
        if (response) {
            handleReactionResponse(response);
        }
    }, [response, handleReactionResponse]);

    return { reactId, message, errorCode, loading, createReactionRefetch: createReaction };
};

export default useCreateReaction;