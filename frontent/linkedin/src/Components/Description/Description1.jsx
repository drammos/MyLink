import React , { useState } from "react"
import { GoXCircle, GoCheckCircle } from "react-icons/go";
import { IoIosRocket } from "react-icons/io";
// import 'bootstrap/dist/css/bootstrap.min.css'
// import { useHistory } from 'react-router-dom';
import './Description1.css'


const Description1 = () => {
  // State variables to hold username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

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
    // history.push('/forgot-password');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      // Trigger login when Enter key is pressed
      handleSubmit(event);
    }
  };

  return (
    <div class="glass-cont">
        <div class="Description1Div">
            <h1><><IoIosRocket /></> Our Mission</h1>
            <p>
            Our mission is to blend cutting-edge design with seamless user experience,
            ensuring that every interaction on your site is engaging, intuitive, and memorable.
            </p>

            <button type="submit">Learn More</button>
        </div>
    </div>
  );
};

export default Description1;