import React , { useState } from "react"
import SignInImage from '../../assets/WelcomePageImg.png'
import { GoXCircle, GoCheckCircle } from "react-icons/go";
import './SignUpForm.css'

const LogIn = () => {
  // State variables to hold username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [firstname, setFirstName] = useState(''); 

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
      
      if(data.success){
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

    return (
        <div className="glass-container-SignUpForm">
        <form className="SignUpForm" onSubmit={handleSubmit}>
            <h1>Welcome to MyLink!</h1>
            <p className="phrase">Empowering connections for a brighter future</p>
            <div>
              <label htmlFor="firstname">First Name:</label>
              <input type="text" id="firstname" value={firstname} onChange={(e) => setFirstName(e.target.value)} onKeyPress={handleKeyPress}/>
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyPress={handleKeyPress}/>
                </div>
            <div>
              <label htmlFor="username">Username:</label>
              <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} onKeyPress={handleKeyPress}/>
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyPress={handleKeyPress}/>
            </div>
            <div>
              <label htmlFor="username">Username:</label>
              <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} onKeyPress={handleKeyPress}/>
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyPress={handleKeyPress}/>
            </div>
            <div>
              <label htmlFor="username">Username:</label>
              <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} onKeyPress={handleKeyPress}/>
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyPress={handleKeyPress}/>
            </div>
            <div>
              <label htmlFor="username">Username:</label>
              <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} onKeyPress={handleKeyPress}/>
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyPress={handleKeyPress}/>
            </div>
            <button className="forgot" onClick={(event) => handleForgotPassword(event)}>Forgot Password? </button>
            <div className={message === 'Invalid username or password' ? 'error-message' : (message === 'Login successful!' ? 'success-message' : '')}>
            {message === 'Invalid username or password' ? <><GoXCircle /> {message}</> : (message === 'Login successful!' ? <><GoCheckCircle /> {message}</> : '')}</div>
        
            <img src={SignInImage} alt=""/>
            <button type="submit">Login</button>
        
      </form>
      
    </div>
  );
};

export default LogIn;