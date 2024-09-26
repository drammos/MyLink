//#region import section

import { useEffect, useState } from "react"
import { GoXCircle, GoCheckCircle } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import useLoginUser from "../Services/useLoginUser";
import './WelcomePageLogIn.css'
import { Routes } from '../../routes.jsx';

//#endregion

const WelcomePageLogIn = () => {
    // State variables to hold username and password

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const role = localStorage.getItem('role');

    const { errorCode, message, loading, refetch } = useLoginUser();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await refetch(username,password);
    }

    useEffect(() => {
        console.log("role is : ", role);

        // Initialization every time user hits this page
        localStorage.setItem('authToken', '');
        localStorage.setItem('role', '');
        localStorage.setItem('username', '');
        localStorage.setItem('id', '');

    }, []);

    const handleForgotPassword = (event) => {
        event.preventDefault();
        console.error("Forgot Password?");
        navigate(Routes.ForgotPassword);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            // Trigger login when Enter key is pressed
            handleSubmit(event);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
        <div className="glass-container">
            <form className="WelcomePageLogInForm" onSubmit={handleSubmit}>
                <h1>Welcome to MyLink!</h1>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} onKeyPress={handleKeyPress} />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <div className="passwordAndVisibility">
                        <input type={showPassword ? 'text' : 'password'} id="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyPress={handleKeyPress} />
                        <button type="button" onClick={togglePasswordVisibility} className="togglePassword">
                            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                        </button>
                    </div>
                </div>
                <button className="forgot" onClick={(event) => handleForgotPassword(event)}>Forgot Password? </button>
                <div className={errorCode === 1 ? 'error-message' : (errorCode === 0 ? 'success-message' : '')}>
                    {errorCode === 1 ? <><GoXCircle /> {message}</> : (errorCode === 0 ? <><GoCheckCircle /> {message}</> : '')}
                </div>
                {loading && <p className="loading">Loading...</p>}
                <button type="submit">Login</button>
            </form>
            <img>

            </img>
        </div>
    );
};

export default WelcomePageLogIn;