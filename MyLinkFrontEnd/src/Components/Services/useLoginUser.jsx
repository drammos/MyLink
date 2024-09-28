import { useState, useCallback, useEffect } from 'react';
import useService from './useService';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../../routes';
import { agents } from '../../agents';

const useLoginUser = () => {
    const [errorCode, setErrorCode] = useState(null);
    const [message, setMessage] = useState('');
    const [inputData, setInputData] = useState(null);
    const navigate = useNavigate();

    const url = agents.localhost + agents.loginUser;

    const { response, loading, refetch: fetchService } = useService(
        'Logging in...',
        'POST',
        url,
        inputData,
        'application/json',
        true
    );

    const handleLoginResponse = useCallback((response) => {
        if (response?.status === 200) {
            setErrorCode(0);
            setMessage('Login successful!');
            console.log('Login successful');
            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('role', response.data.role);
            localStorage.setItem('username', response.data.userName);
            localStorage.setItem('id', response.data.id);
            setTimeout(() => {
                navigate(response.data.role === "Admin" ? Routes.ControlPanel : Routes.MainPage);
            }, 2000);
        } else if (response?.status === 600) {
            setErrorCode(1);
            setMessage('An error occurred. Please try again later.');
            console.error('Login failed');
        } else if (response?.status === 401) {
            setErrorCode(1);
            setMessage('Invalid username or password');
            console.error('Login failed');
        }
    }, [navigate]);

    const logInUser = useCallback((username, password) => {
        const input = JSON.stringify({ username, password });
        setInputData(input);
    }, []);

    useEffect(() => {
        if (response) {
            handleLoginResponse(response);
        }
    }, [response, handleLoginResponse]);

    useEffect(() => {
        if (inputData) 
            fetchService();
    }, [inputData, fetchService]);

    return { logInUser, errorCode, message, loading, refetch: logInUser };
};

export default useLoginUser;
