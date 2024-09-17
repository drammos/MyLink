import { useState, useCallback, useEffect } from 'react';
import useService from '../Services/useService'; 
import { useNavigate } from 'react-router-dom';
import { agents } from '../../agents';

const useSignUpUser = () => {
    const [message, setMessage] = useState('');
    const [errorCode, setErrorCode] = useState(2);
    const navigate = useNavigate();
    const inputFormData = new FormData();
    const url = agents.localhost + agents.registerUser;

    const { response, loading, refetch: fetchService } = useService(
        'Creating new user ...',
        'POST',
        url,
        inputFormData,
        'multipart/form-data'
    );

    const handleSignUpResponse = useCallback((response) => {
        console.log(response.status, " = status"); 
        if (response?.status === 200) {
            setErrorCode(0);
            console.log(errorCode, " = ErrorCode"); 
            setMessage('Account created successfully!');
        } else {
            setErrorCode(1);
            setMessage(response?.title || 'An error occurred. Please try again.');
        }
    }, [navigate]);

    const signUpUser = useCallback((
        firstname, surname, phone, email, role, username, password, birthDate, photoURL
    ) => {
        surname = surname ? surname.charAt(0).toUpperCase() + surname.slice(1).toLowerCase() : '';
        firstname = firstname ? firstname.charAt(0).toUpperCase() + firstname.slice(1).toLowerCase() : '';
        inputFormData.append('FirstName', firstname);
        inputFormData.append('LastName', surname);
        inputFormData.append('PhoneNumber', phone);
        inputFormData.append('Email', email);
        inputFormData.append('Role', 'Professional');
        inputFormData.append('Username', username);
        inputFormData.append('Password', password);
        inputFormData.append('Birthday', birthDate);
        inputFormData.append('PictureURL', photoURL);
        console.log("FormDataDone! : ", firstname, surname, phone, email, role, username, password, birthDate, photoURL);
        console.log(inputFormData);

        fetchService(); 
    }, [fetchService]);

    // Handle the response inside a useEffect
    useEffect(() => {
        if (response) {
            handleSignUpResponse(response);
        }
    }, [response, handleSignUpResponse]);

    return { signUpUser, message, errorCode, loading, refetch: signUpUser };
};

export default useSignUpUser;
