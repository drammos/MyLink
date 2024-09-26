import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { GoXCircle, GoCheckCircle } from "react-icons/go";
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from "react-router-dom";

import { agents } from '../../../agents';
import { Routes } from '../../../routes';
import useService from "../../Services/useService";

import "./SettingsInfo.css";

const SettingsInfo = ({ userInfo }) => {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [errorCode, setErrorCode] = useState(2);

    const [email, setEmail] = useState('');
    const [CurrentPassword, setCurrentPassword] = useState('');
    const [NewPassword, setNewPassword] = useState('');

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);


    const inputFormData = new FormData();
    const url = agents.localhost + agents.updateUser;
    const navigate = useNavigate();




    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (NewPassword.length === 0 && (!email || email.length === 0 || email == userInfo.email)) {
            return;
        }

        if (CurrentPassword == null || CurrentPassword.length == 0) {
            setError('Please complete the Current Password');
            setMessage('Error');
            setErrorCode(1);
            return;
        }

        // Ελέγχουμε αν έχει γίνει κάποια αλλαγή
        inputFormData.append('FirstName', userInfo.firstName);
        inputFormData.append('LastName', userInfo.lastName);
        inputFormData.append('PhoneNumber', userInfo.phoneNumber);
        inputFormData.append('Email', email);
        inputFormData.append('Username', userInfo.userName);
        inputFormData.append('CurrentPassword', CurrentPassword);
        inputFormData.append('PictureURL', userInfo.pictureURL);
        inputFormData.append('CoverLetterURL', userInfo.coverLetterURL);
        inputFormData.append('WebPage', userInfo.webPage);
        if (NewPassword) inputFormData.append('NewPassword', NewPassword);

        refetch();
    };

    const { response, loading, refetch } = useService(
        'Updating user...',
        'PUT',
        url,
        inputFormData,
        'multipart/form-data'
    );

    useEffect(() => {
        if (userInfo?.email) {
            setEmail(userInfo.email); // Set email when userInfo is available
        }
    }, [userInfo]);

    useEffect(() => {
        if (response) {
            if (response.status === 200) {
                userInfo.email = email;
                setErrorCode(0);
                setMessage('Account updated successfully!');
                setTimeout(() => navigate(Routes.Home), 2000);
            } else {
                console.log(response.data.detail);
                setError(response.data.detail);
                setErrorCode(1);
            }
        }
    }, [response, navigate, message]);

    const togglePasswordVisibility = (field) => {
        if (field === 'current') {
            setShowCurrentPassword(!showCurrentPassword);
        } else {
            setShowNewPassword(!showNewPassword);
        }
    };



    return (
        <div className="settings-container">
            <h2>User Settings</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Firstname</label>
                    <input type="text" value={userInfo.firstName} disabled />
                </div>
                <div className="form-group">
                    <label>Lastname</label>
                    <input type="text" value={userInfo.lastName} disabled />
                </div>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" value={userInfo.userName} disabled />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" value={userInfo.phoneNumber} disabled />
                </div>
                <div className="form-group">
                    <label>Birthday</label>
                    <input type="date" value={userInfo.birthday} disabled />
                </div>
                <div className="form-group">
                    <label>Current Password</label>
                    <div className="password-input-wrapper">
                        <input
                            type={showCurrentPassword ? 'text' : 'password'}
                            value={CurrentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                        <span
                            className="password-toggle"
                            onClick={() => togglePasswordVisibility('current')}
                        >
                            {!showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </span>
                    </div>
                </div>
                <div className="form-group">
                    <label>New Password</label>
                    <div className="password-input-wrapper">
                        <input
                            type={showNewPassword ? 'text' : 'password'}
                            value={NewPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <span
                            className="password-toggle"
                            onClick={() => togglePasswordVisibility('new')}
                        >
                            {!showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </span>
                    </div>
                </div>
                <div className={errorCode === 1 ? 'error-message' : (errorCode === 0 ? 'success-message' : '')}>
                    {errorCode === 1 ? <><GoXCircle /> {error}</> : (errorCode === 0 ? <><GoCheckCircle /> {message}</> : '')}
                </div>
                <button type="submit" className="save-button">Save</button>
            </form>
        </div>
    );
};

SettingsInfo.propTypes = {
    userInfo: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        userName: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        phoneNumber: PropTypes.string.isRequired,
        birthday: PropTypes.string.isRequired,
        pictureURL: PropTypes.string.isRequired,
        coverLetterURL: PropTypes.string.isRequired,
        webPage: PropTypes.string.isRequired,
    }).isRequired,
    onSave: PropTypes.func.isRequired,
};

export default SettingsInfo;