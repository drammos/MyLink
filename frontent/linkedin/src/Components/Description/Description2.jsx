import React from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from '../../routes.jsx';
import './Description2.css';

const Description2 = () => {
    const navigate = useNavigate();
    const handleGetStarted = () => {
        navigate(Routes.SignIn);
    };

    return (
        <div className="glass-cont2">
            <div className="Description2Div">
                <h1>Why Choose MyLink?</h1>
                <p>
                    MyLink is more than just a professional networking site; it&#8217;s a dynamic ecosystem tailored to
                    the needs of modern professionals. With advanced algorithms that suggest connections,
                    personalized career insights, and a platform designed for showcasing your skills and achievements,
                    MyLink helps you stand out in a crowded marketplace. Whether you&#8217;re a seasoned professional or just
                    starting your career, MyLink offers the tools and connections you need to succeed.
                </p>
                <p>
                    Join us today and take the next step in your professional journey with confidence.
                    Connect with peers, discover new opportunities, and let your network work for you!
                </p>
                <button type="button" onClick={ handleGetStarted }>Get Started</button>
            </div>
        </div>
    );
};

export default Description2;
