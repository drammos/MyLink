import { useState, useEffect } from "react";
import SignInImage from '../../assets/WelcomePageImg.png';
import { GoXCircle, GoCheckCircle } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './LogIn.css';
import useService from "../Services/useService";
import { Routes } from '../../routes.jsx';

import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';


const LogIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [errorCode, setErrorCode] = useState(2); // 2 is nothing , 0 is all good, 1 is problem
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const input = JSON.stringify({ "username": username, "password": password });

    // API call for user LogIn
    const { response, loading, refetch } = useService(
        'Logging in...',
        'POST',
        'http://localhost:5175/User/LoginUser',
        input
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        refetch(); // Trigger the API call on form submission
    };

    // Update message based on API response
    useEffect(() => {
        if (localStorage.getItem('role') !== '') {
            navigate(Routes.PageNotFound);
        }
        else {

            if (response) {
                if (response.status === 200) {
                    setErrorCode(0);
                    setMessage('Login successful!');
                    console.log('Login successful');
                    localStorage.setItem('authToken', response.data.token);
                    localStorage.setItem('role', response.data.role);
                    localStorage.setItem('username', response.data.username);
                    if (response.data.role === "Admin")
                        setTimeout(() => {
                            navigate(Routes.ControlPanel);
                        }, 2000);
                    else
                        setTimeout(() => {
                            navigate(Routes.MainPage);
                        }, 2000);
                }
                else if (response.status === 600) {
                    setErrorCode(1);
                    setMessage('An Error Occured. Please try again later.');
                    console.error('Login failed');
                }
                else if (response.status === 401) {
                    setErrorCode(1);
                    setMessage('Invalid username or password');
                    console.error('Login failed');
                }
            }
        }
    }, [response, navigate]);

    const handleForgotPassword = (event) => {
        event.preventDefault();
        console.error("Forgot Password?");
        navigate(Routes.ForgotPassword);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSubmit(event);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
        <div className="glass-container-Login">
            <form className="LogInForm" onSubmit={handleSubmit}>
                <h1>Welcome to MyLink!</h1>
                <p className="phrase">Empowering connections for a brighter future</p>
                <div>
                    <FloatLabel>
                        <InputText id="username" value={username} onChange={(e) => setUsername(e.target.value)} onKeyPress={handleKeyPress} />
                        <label htmlFor="username">Username</label>
                    </FloatLabel>
                </div>
                <div>
                    
                    {/*<label htmlFor="password">Password:</label>*/}
                    <div className="passwordAndVisibility">
                        <FloatLabel>
                            <InputText type={showPassword ? 'text' : 'password'} id="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyPress={handleKeyPress} />
                            <label htmlFor="password">Password</label>
                        </FloatLabel>
                        <button type="button" onClick={togglePasswordVisibility} className="togglePassword">
                            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                        </button>
                    </div>
                </div>
                <button className="forgot" onClick={handleForgotPassword}>Forgot Password?</button>
                <div className={errorCode === 1 ? 'error-message' : (errorCode === 0 ? 'success-message' : '')}>
                    {errorCode === 1 ? <><GoXCircle /> {message}</> : (errorCode === 0 ? <><GoCheckCircle /> {message}</> : '')}
                </div>
                {loading && <p className="loading">Loading...</p>}
                <img src={SignInImage} alt="" />
                <button className="submit" type="submit">Login</button>
            </form>
        </div>
    );
};

export default LogIn;
