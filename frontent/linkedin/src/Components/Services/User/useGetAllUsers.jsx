    import { useState, useCallback, useEffect } from 'react';
import useService from '../useService';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../../../routes';
import { agents } from '../../../agents';

const useGetAllUsers = () => {
    const [errorCode, setErrorCode] = useState(null);
    const [message, setMessage] = useState('');
    const [inputData, setInputData] = useState(null);
    const [userList, setUserList] = useState([]);
    const navigate = useNavigate();

    const url = agents.localhost + agents.getAllUsers;

    const { response, loading, refetch: fetchService } = useService(
        'Loading users..',
        'GET',
        url,
        null,
        undefined,
        true
    );

    const handleGetUsersResponse = useCallback((response) => {
        if (response?.status === 200) {
            setErrorCode(0);
            setMessage('Users loaded!');
            console.log('Users loaded!');

            setTimeout(() => {
                navigate(response.data.role === "Admin" ? Routes.ControlPanel : Routes.MainPage);
            }, 2000);
        } else {
            setErrorCode(1);
            setMessage('An error occurred. Please try again later.');
            console.error('Login failed');
        }
    }, [navigate]);
    
    useEffect(() => {
        if (response) {
            handleGetUsersResponse(response);
        }
    }, [response, handleGetUsersResponse]);

    return { userList, errorCode, message, loading, refetch: fetchService };
};

export default useGetAllUsers;
