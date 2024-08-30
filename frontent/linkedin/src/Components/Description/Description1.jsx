import React , { useState } from "react"
import { GoXCircle, GoCheckCircle } from "react-icons/go";
import { IoIosRocket } from "react-icons/io";
// import 'bootstrap/dist/css/bootstrap.min.css'
// import { useHistory } from 'react-router-dom';
import './Description1.css'


const Description1 = () => {
  // State variables to hold username and password
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send form data to backend API
        }
        catch (error) {
            console.error('Error logging in:', error);
            setError('An unexpected error occurred');
        }
    };

  return (
      <div className="glass-cont">
          <div className="Description1Div">
              <h1><IoIosRocket /> Our Mission</h1>
              <p>
                  At MyLink, our mission is to empower professionals by providing a platform where connections
                  lead to opportunities. Whether you're seeking to grow your network, find new career prospects,
                  or showcase your expertise, MyLink is here to bridge the gap between talent and opportunity.
                  We believe in fostering a community where collaboration thrives and every interaction is a step
                  towards achieving your professional goals.
              </p>
              <button type="submit" onClick={handleSubmit}>Learn More</button>
              {error && <p className="error">{error}</p>}
              {message && <p className="message">{message}</p>}
          </div>
      </div>
  );
};

export default Description1;