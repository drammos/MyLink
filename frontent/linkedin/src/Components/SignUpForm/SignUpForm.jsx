import React, { useState } from "react"
import { GoXCircle, GoCheckCircle } from "react-icons/go";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './SignUpForm.css'

const SignUpForm = () => {
    // State variables to hold username and password

    const [message, setMessage] = useState('');

    const [firstname, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setrepeatPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    const [phone, setPhone] = useState('');
    const [photo, setPhoto] = useState('');
    const [birthDate, setBirthDate] = useState('');

    const [terms, setTerms] = useState('');
    const [error, setError] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send form data to backend API
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (data.success) {
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
        history.push('/forgot-password');
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
        <div className="glass-container-SignUpForm">
            <p className="phrase">Empowering connections for a brighter future</p>
            <form className="SignUpForm" onSubmit={handleSubmit}>
                <div className="firstline">
                    <div className="rowOne">

                        <input type="text" id="firstname" placeholder="First name" value={firstname} onChange={(e) => setFirstName(e.target.value)} onKeyPress={handleKeyPress} />

                        <input type="text" id="surname" placeholder="Surname" value={surname} onChange={(e) => setSurname(e.target.value)} onKeyPress={handleKeyPress} />

                        <input type="text" id="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} onKeyPress={handleKeyPress} />

                        <input type={showPassword ? 'text' : 'password'} id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyPress={handleKeyPress} />


                    </div>

                    <div className="rowTwo">

                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} onKeyPress={handleKeyPress} />

                        <label htmlFor="phone">Phone</label>
                        <input type="tel" id="password" value={phone} onChange={(e) => setPhone(e.target.value)} onKeyPress={handleKeyPress} />

                        <label htmlFor="birthDate">Birth Date</label>
                        <input type="date" id="birthDate" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} onKeyPress={handleKeyPress} />

                        <label htmlFor="repeatPassword">Repeat Password</label>
                        <input type={showPassword ? 'text' : 'password'} id="repeatpassword" value={repeatPassword} onChange={(e) => setrepeatPassword(e.target.value)} onKeyPress={handleKeyPress} />

                    </div>
                </div>

                <div className="down-buttons">
                    <button type="button" onClick={togglePasswordVisibility} className="togglePassword">
                        <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                    </button>

                    <div>
                    <label htmlFor="terms">I agree with terms and conditions</label>
                    <input type="checkbox" id="terms" value={terms} onChange={(e) => setTerms(e.target.value)} onKeyPress={handleKeyPress} />
                    </div>

                    <div className={message === 'Invalid username or password' ? 'error-message' : (message === 'Login successful!' ? 'success-message' : '')}>
                        {message === 'Invalid username or password' ? <><GoXCircle /> {message}</> : (message === 'Login successful!' ? <><GoCheckCircle /> {message}</> : '')}</div>

                    <button className="create" type="submit">Create my Account</button>
                </div>
            </form>

        </div>
    );
};

export default SignUpForm;