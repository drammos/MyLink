import { useState, useCallback, useEffect } from 'react';
import useService from './useService';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../../routes';
import { agents } from '../../agents';

const useEditUser = () => {
    const [errorCode, setErrorCode] = useState(null);
    const [message, setMessage] = useState('');
    const [inputData, setInputData] = useState(null);
    const navigate = useNavigate();

    const url = agents.localhost + agents.updateUser;

    const [error, setError] = useState('');

    const [email, setEmail] = useState('');
    const [CurrentPassword, setCurrentPassword] = useState('');
    const [NewPassword, setNewPassword] = useState('');

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const inputFormData = new FormData();

    const { response, loading, refetch: fetchService } = useService(
        'Updating user...',
        'PUT',
        url,
        inputFormData,
        'multipart/form-data',
        true
    );

    const handleEditResponse = useCallback((response) => {
        if (response?.status === 200) {
            setErrorCode(0);
            setMessage('User informations are updated!');
            console.log('User informations are updated!');
        } else if (response?.status === 600) {
            setErrorCode(1);
            setMessage('An error occurred. Please try again later.');
            console.error('Edit information failed');
        } else {
            setErrorCode(1);
            setMessage('Edit information failed');
            console.error('Edit information failed');
        }
    }, [navigate]);

    const editUser = useCallback((
        firstName, lastName, phoneNumber, email, userName, CurrentPassword, pictureURL, coverLetterURL, webPage) => {
        inputFormData.append('FirstName', firstName);
        inputFormData.append('LastName', lastName);
        inputFormData.append('PhoneNumber', phoneNumber);
        inputFormData.append('Email', email);
        inputFormData.append('Username', userName);
        inputFormData.append('CurrentPassword', CurrentPassword);
        inputFormData.append('PictureURL', pictureURL);
        inputFormData.append('CoverLetterURL', coverLetterURL);
        inputFormData.append('WebPage', webPage);
    }, []);

    useEffect(() => {
        if (response) {
            handleEditResponse(response);
        }
    }, [response, handleLoginResponse]);

    useEffect(() => {
        if (inputData)
            fetchService();
    }, [inputData, fetchService]);

    return { errorCode, message, loading, refetch: editUser };
};

export default useEditUser;
