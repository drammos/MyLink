import React, { Suspense, useState } from 'react';
import './LoggedInNavBar.css';
import logo from '../../../assets/Logo.png'
import ProfilePopup from './ProfilePopup/ProfilePopup'
import { useNavigationHelpers } from '../Helpers/navigationHelpers'; 

const LoggedInNavBar = () => {
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    const {
        handleHomeButton,
        handleProfileButton,
        handleNetworkButton,
        handleJobsButton,
        handleInterestsButton,
    } = useNavigationHelpers();

    const toggleProfileMenu = () => {
        setIsProfileMenuOpen(!isProfileMenuOpen);
    };

    return (
        <div className="loggedInNavbarContainer">
            <div className="navbar-left">
                <div className="logo">
                    <img src={logo} alt="Logo" />
                </div>
                <div className="nav-item" onClick={handleHomeButton}>Home</div>
                <div className="nav-item" onClick={handleProfileButton}>Profile</div>
                <div className="nav-item" onClick={handleNetworkButton}>Network</div>
                <div className="nav-item" onClick={handleJobsButton}>Jobs</div>
                <div className="nav-item" onClick={handleInterestsButton}>Interests</div>
            </div>
            <div className="navbar-center">
                <input type="text" placeholder="Search" />
                <button type="submit">Search</button>
            </div>
            <div className="navbar-right">
                <div className="nav-item notification">24</div>
                <button className="profile-pic-button" onClick={toggleProfileMenu}>
                    <img src="https://via.placeholder.com/30x30?text=U" alt="User" />
                </button>
                {isProfileMenuOpen && (
                    < ProfilePopup />
                )}
            </div>
        </div>
    );
};

export default LoggedInNavBar;
