import React , { useState } from "react"
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import './WelcomePageLogIn.css'


const WelcomePageLogIn = () => {
  // State variables to hold username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle changes in username input
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  // Function to handle changes in password input
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send form data to backend API
      const response = await axios.post('../../../api', {
        username,
        password
      });
  
      // Check response status and handle accordingly
      if (response.status === 200) {
        console.log('Login successful');
        // Redirect user to dashboard or another page
      } else {
        console.error('Login failed');
      }
    } 
    catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <p>
      Welcome to MyLink!
      </p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default WelcomePageLogIn;