import React, { useState } from "react";
import Photo from '../../assets/undraw_read_notes_gqmq.png';
import './Description1.css';

const Description1 = () => {
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send form data to backend API
        } catch (error) {
            console.error('Error logging in:', error);
            setError('An unexpected error occurred');
        }
    };

    return (
        <div className="glass-cont">
            <div className="Description1Div">
                <img src={Photo} alt="Reading Notes" />
                <p>
                    At MyLink, our mission is to empower professionals by providing a platform where connections
                    lead to opportunities. Whether you are seeking to grow your network, find new career prospects,
                    or showcase your expertise, MyLink is here to bridge the gap between talent and opportunity.
                    We believe in fostering a community where collaboration thrives and every interaction is a step
                    towards achieving your professional goals.
                </p>
                {error && <p className="error">{error}</p>}
                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
};

export default Description1;
