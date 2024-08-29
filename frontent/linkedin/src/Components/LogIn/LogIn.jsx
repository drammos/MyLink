import { useState, useEffect } from "react";
import SignInImage from '../../assets/WelcomePageImg.png';
import { GoXCircle, GoCheckCircle } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './LogIn.css';
import useService from "../Services/useService";

const LogIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
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
        if (response) {
            if (response.status === 200) {
                setMessage('Login successful!');
                console.log('Login successful');
                localStorage.setItem('authToken', response.data.token);
                // Navigate to another page if needed, e.g., navigate('/dashboard');
            } else {
                setMessage('Invalid username or password');
                console.error('Login failed');
            }
        }
    }, [response, navigate]);

    const handleForgotPassword = (event) => {
        event.preventDefault();
        console.error("Forgot Password?");
        navigate('/forgot-password');
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
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <div className="passwordAndVisibility">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <button type="button" onClick={togglePasswordVisibility} className="togglePassword">
                            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                        </button>
                    </div>
                </div>
                <button className="forgot" onClick={handleForgotPassword}>Forgot Password?</button>
                <div className={message === 'Invalid username or password' ? 'error-message' : (message === 'Login successful!' ? 'success-message' : '')}>
                    {message === 'Invalid username or password' ? <><GoXCircle /> {message}</> : (message === 'Login successful!' ? <><GoCheckCircle /> {message}</> : '')}
                </div>
                {loading && <p className="loading">Loading...</p>}
                <img src={SignInImage} alt="" />
                <button className="submit" type="submit">Login</button>
            </form>
        </div>
    );
};

export default LogIn;
