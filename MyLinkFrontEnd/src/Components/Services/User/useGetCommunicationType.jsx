import { useState, useCallback, useEffect } from 'react';
import useService from '../useService';
import { agents } from '../../../agents';


const useGetCommunicationType = () => {
    const [userId1, setUserId1] = useState('');
    const [userId2, setUserId2] = useState('');
    const [errorCode, setErrorCode] = useState(2);
    const [message, setMessage] = useState('');

    const url = agents.localhost + agents.getCommunicationType;

    const { response, loading, refetch: fetchService } = useService(
        'Is pending?',
        'GET',
        `${url}?UserId1=${userId1}&UserId2=${userId2}`,
        null,
        undefined,
        true
    );

    const handleTypeResponse = useCallback((response) => {
        if (response?.status === 200) {
            setErrorCode(0);
            setMessage('Response is here!');
            console.log('Response is here!');
        } else {
            setErrorCode(1);
            setMessage(response?.title || 'An error occurred. Please try again.');
        }
        setUserId1('');
        setUserId2('');
    }, []);

    const getResponse = useCallback((
        UserId1, UserId2
    ) => {
        setUserId1(UserId1);
        setUserId2(UserId2);
    }, []);

    useEffect(() => {
        
        const fetchData = async () => {
            if (userId2 !== '' && userId1 !== '') {
                await fetchService();
            }
        };
        fetchData();
    }, [userId1, userId2, fetchService]);

    useEffect(() => {
        if (response) {
            handleTypeResponse(response);
        }
    }, [response, handleTypeResponse]);

    return {
        CommunicationTypeResponse: response, CommunicationTypeMessage: message, CommunicationTypeErrorCode: errorCode,
        CommunicationTypeLoading: loading, CommunicationTypeRefetch: getResponse
    };
};

export default useGetCommunicationType;
