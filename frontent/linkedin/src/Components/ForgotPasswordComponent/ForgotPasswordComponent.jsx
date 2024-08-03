import React, { useState } from "react"
import ForgotPasswordImg from '../../assets/ForgotPasswordImg.jpg'
import { GoXCircle, GoCheckCircle } from "react-icons/go";
import './ForgotPasswordComponent.css'

const ForgotPasswordComponent = () => {
    // State variables to hold username and password
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send form data to backend API
            const response = await fetch('http://localhost:3001/ForgotPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (data.success) {
                setMessage('ForgotPassword successful!');
                console.log('ForgotPassword successful');
            }
            else {
                setMessage('Invalid username or password');
                console.error('ForgotPassword failed');
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
        history.push('/forgot-password');
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            // Trigger ForgotPassword when Enter key is pressed
            handleSubmit(event);
        }
    };

    return (
        <div className="glass-container-forgotPassword">
            <form className="ForgotPasswordForm" onSubmit={handleSubmit}>
                <p className="phrase">Empowering connections for a brighter future</p>
                <div className="forgotPasswordText">
                    <label className="forgotPasswordLabel" >Please enter your email to send you a temporary code to connect</label>
                    <input type="email" id="email" placeholder="Enter your email" value={username} onChange={(e) => setUsername(e.target.value)} onKeyPress={handleKeyPress} />
                </div>
                
                <div className={message === 'Invalid username or password' ? 'error-message' : (message === 'ForgotPassword successful!' ? 'success-message' : '')}>
                    {message === 'Invalid username or password' ? <><GoXCircle /> {message}</> : (message === 'ForgotPassword successful!' ? <><GoCheckCircle /> {message}</> : '')}</div>

                <div className="forgotPasswordButton">
                    <button type="submit">Send Temporary Code</button>
                </div>
                
                <img src={ForgotPasswordImg} alt="" />

            </form>

        </div>
    );
};

export default ForgotPasswordComponent;