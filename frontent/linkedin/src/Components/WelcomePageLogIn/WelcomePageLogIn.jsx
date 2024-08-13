import { useState } from "react"
import { GoXCircle, GoCheckCircle } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './WelcomePageLogIn.css'


const WelcomePageLogIn = () => {
    // State variables to hold username and password
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Loggin in..");
        try {
            // Send form data to backend API
            const response = await fetch('http://localhost:5175/Users/LoginUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            /*const data = await response.text();*/

            if (response.status == 200) {
                setMessage('Login successful!');
                console.log('Login successful');
            }
            else {
                setMessage('Invalid username or password');
                console.error('Login failed');
                throw new Error('Invalid username or password');
            }
        }
        catch (error) {
            console.error('Error logging in:', error);
            setError('An unexpected error occurred');
        }
    };

    const handleForgotPassword = (event) => {
        event.preventDefault();
        console.error("Forgot Password?");
        navigate('/forgot-password');
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
                <div className={message === 'Invalid username or password' ? 'error-message' : (message === 'Login successful!' ? 'success-message' : '')}>
                    {message === 'Invalid username or password' ? <><GoXCircle /> {message}</> : (message === 'Login successful!' ? <><GoCheckCircle /> {message}</> : '')}</div>
                <button type="submit">Login</button>
            </form>
            <img>

            </img>
        </div>
    );
};

export default WelcomePageLogIn;