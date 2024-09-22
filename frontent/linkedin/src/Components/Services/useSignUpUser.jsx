import { useState, useCallback, useEffect } from 'react';
import useService from '../Services/useService'; 
import { useNavigate } from 'react-router-dom';
import { agents } from '../../agents';
import { Routes } from '../../routes';


const useSignUpUser = () => {
    const [message, setMessage] = useState('');
    const [errorCode, setErrorCode] = useState(2);
    const [error, setError] = useState('');
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
        if (response?.status === 200) {
            setErrorCode(0);
            console.log(errorCode, " = ErrorCode");
            setMessage('Account created successfully!');
            setTimeout(() => {
                navigate(Routes.Home);
            }, 2000);
        } else {
            setErrorCode(1);
            setError(response?.errors || 'An error occurred. Please try again.');
            setMessage('Error');
        }
    }, [navigate]);

    const isValidName = (name) => /^[A-Za-z]/.test(name);

    const signUpUser = useCallback((
        firstname, surname, phone, email, role, username, password, repeatPassword, birthDate, photoURL, terms, cvURL
    ) => {

        if (!terms) {
            setError('You must first agree with terms.');
            setMessage('Error');
            setErrorCode(1);
            return;
        }

        if (!isValidName(firstname)) {
            setError('Firstname is not correct');
            setMessage('Error');
            setErrorCode(1);
            return;
        }

        if (!isValidName(surname)) {
            setError('Lastname is not correct');
            setMessage('Error');
            setErrorCode(1);
            return;
        }

        surname = surname ? surname.charAt(0).toUpperCase() + surname.slice(1).toLowerCase() : '';
        firstname = firstname ? firstname.charAt(0).toUpperCase() + firstname.slice(1).toLowerCase() : '';

        if (password !== repeatPassword) {
            setError('Passwords do not match');
            setMessage('Error');
            setErrorCode(1);
            return;
        }

        if (photoURL === null) {
            setError('You must add a photo');
            setMessage('Error');
            setErrorCode(1);
            return;
        }

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
        inputFormData.append('CoverLetterURL', cvURL);
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

    return { signUpUser, message, errorCode, error, loading, refetch: signUpUser };
};

export default useSignUpUser;
