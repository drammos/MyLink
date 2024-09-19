import { useState, useEffect } from "react";
import { GoXCircle, GoCheckCircle } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Routes } from '../../routes.jsx';

import SignInImage from '../../assets/WelcomePageImg.png';
import useLoginUser from "../Services/useLoginUser";
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import './LogIn.css';


const LogIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const { errorCode, message, loading, refetch } = useLoginUser();

    const handleSubmit = (e) => {
        e.preventDefault();
        refetch(username,password);
    };

    useEffect(() => {
        if (localStorage.getItem('role') !== '') 
            navigate(Routes.PageNotFound);
    }, [navigate]);

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
                <div className="username">
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
