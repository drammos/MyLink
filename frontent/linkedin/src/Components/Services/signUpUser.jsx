import React, { useState } from 'react';
import { Routes } from "../../routes";
import { useNavigate } from "react-router-dom";

const signUpUser =  (firstname, surname, phone, email, role, username, password, birthDate, photoURL) => {

    const [message, setMessage] = useState("");
    const inputFormData = new FormData();
    inputFormData.append('FirstName', firstname);
    inputFormData.append('LastName', surname);
    inputFormData.append('PhoneNumber', phone);
    inputFormData.append('Email', email);
    inputFormData.append('Role', role);
    inputFormData.append('Username', username);
    inputFormData.append('Password', password);
    inputFormData.append('BirthDate', birthDate);
    inputFormData.append('PictureURL', photoURL);

    const { response, loading, refetch } = useService(
        'Creating new user...',
        'POST',
        'http://localhost:5175/User/RegisterUser',
        inputFormData,
        'multipart/form-data'
    );

    if (response.status === 200) {
        setErrorCode(0);
        setMessage('Account created successfully!');
        setTimeout(() => navigate(Routes.Home), 2000);
    } else {
        setErrorCode(1);
        setMessage(response.title || 'An error occurred. Please try again.');
    }

    return {message}
};

    export default signUpUser;