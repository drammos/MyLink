import { useEffect, useState } from "react"
import { GoXCircle, GoCheckCircle } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import useService from "../Services/useService";
import './WelcomePageLogIn.css'
import { Routes } from '../../routes.jsx';


const WelcomePageLogIn = () => {
    // State variables to hold username and password
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [errorCode, setErrorCode] = useState(2); // 2 is nothing , 0 is all good, 1 is problem


    // API call for user LogIn
    const input = JSON.stringify({ "username": username, "password": password });
    const { response, loading, refetch } = useService(
        'Logging in...',
        'POST',
        'http://localhost:5175/User/LoginUser',
        input
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        refetch();
    }

    useEffect(() => {
        if (response) {
            if (response.status === 200) {
                setErrorCode(0);
                setMessage('Login successful!');
                console.log('Login successful');
                localStorage.setItem('authToken', response.data.token);
                localStorage.setItem('role', response.data.role);
                setTimeout(() => {
                    navigate(Routes.ControlPanel);
                }, 2000);
                // Navigate to another page if needed, e.g., navigate('/dashboard');
            } else if (response.status === 600) {
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
    }, [response, navigate]);

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