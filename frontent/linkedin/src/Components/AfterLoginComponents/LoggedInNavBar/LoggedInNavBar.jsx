import { useState, useEffect } from 'react';
import './LoggedInNavBar.css';
import logo from '../../../assets/Logo.png'
import ProfilePopup from './ProfilePopup/ProfilePopup'
import { useNavigationHelpers } from '../Helpers/navigationHelpers'; 
import PropTypes from 'prop-types';


const LoggedInNavBar = ({ userInfo }) => {
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [userPhotoUrl, setuserPhotoUrl] = useState('');

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

    const defaultPhotoURL = 'https://res.cloudinary.com/dvhi4yyrm/image/upload/v1725693786/bui1pzeaj5msljlp1qvi.png';

    useEffect(() => {
        if (userInfo.pictureURL != null) {
            console.log("ll",userInfo.pictureURL );
            setuserPhotoUrl(userInfo.pictureURL);
        } else {
            setuserPhotoUrl(defaultPhotoURL);
        }
    }, [userInfo]);


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
                    <img src={userPhotoUrl} alt="User" />
                </button>
                {isProfileMenuOpen && (
                    < ProfilePopup />
                )}
            </div>
        </div>
    );
};

LoggedInNavBar.propTypes = {
    userInfo: PropTypes.shape({
        pictureURL: PropTypes.string,
    }).isRequired,
};

export default LoggedInNavBar;
