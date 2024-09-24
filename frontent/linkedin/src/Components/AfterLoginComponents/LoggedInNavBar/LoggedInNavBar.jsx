import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoggedInNavBar.css';
import logo from '../../../assets/Logo.png';
import ProfilePopup from './ProfilePopup/ProfilePopup';
import NotificationPopup from './NotificationPopup/NotificationPopup';
import { useNavigationHelpers } from '../Helpers/useNavigationHelpers';
import useGetListFromIncomingRequests from '../../Services/useGetListFromIncomingRequests';
import PropTypes from 'prop-types';
import useService from '../../Services/useService';
import {agents} from '../../../agents'; 

const LoggedInNavBar = ({ userInfo }) => {
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [userPhotoUrl, setuserPhotoUrl] = useState('');
    const [users, setUsers] = useState([]);
    const [count, setCount] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    const navigate = useNavigate();
    //Metadata
    const [metadata, setMetadata] = useState({
        currentPage: 1,
        totalPages: 1,
        pageSize: 10,
        totalCount: 10
      });  

    const {
        handleHomeButton,
        handleProfileButton,
        handleNetworkButton,
        handleJobsButton,
        handleInterestsButton,
    } = useNavigationHelpers();

    const toggleProfileMenu = () => {
        setIsProfileMenuOpen(!isProfileMenuOpen);
        if (isNotificationOpen)
            setIsNotificationOpen(false);
    };

    const toggleNotificationPopup = () => {
        setIsNotificationOpen(!isNotificationOpen);
        if (isProfileMenuOpen)
            setIsProfileMenuOpen(false);
    };
    
    const defaultPhotoURL = 'https://res.cloudinary.com/dvhi4yyrm/image/upload/v1725693786/bui1pzeaj5msljlp1qvi.png';
    const { listLength, notificationList, refetch } = useGetListFromIncomingRequests();

    const buildUrl = useCallback(() => {
        const params = new URLSearchParams();
        const url2 = agents.localhost + agents.searchUsers;
        params.append('SearchName', searchTerm.toString());
        params.append('PageNumber', pageNumber.toString());
        params.append('PageSize', pageSize.toString());
        return `${url2}?${params}`;
      }, [searchTerm, pageNumber, pageSize]);
    
    const {response, loading, refetch: refetchService} = useService(
        'Loading users..',
        'GET',
        buildUrl(),
        null,  
        undefined,
        true
    );

    useEffect(() => {
        if (userInfo.pictureURL && userInfo.pictureURL !== "null" && userInfo.pictureURL !== '') {
            setuserPhotoUrl(userInfo.pictureURL);
        } else {
            setuserPhotoUrl(defaultPhotoURL);
        }

        // Initial fetch
        refetch(userInfo.id);

        // Set up an interval to refetch every 20 seconds
        const intervalId = setInterval(() => {
            refetch(userInfo.id);
        }, 20000); // 20000ms = 20 seconds

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);

    }, [userInfo, refetch]);

    useEffect(() => {
        if (searchTerm.length > 0) {
            refetchService();
        } else {
            setShowDropdown(false);
        }
    }, [refetchService, pageNumber, pageSize]); 

    const handleSearchChange = async (event) => {
        const term = event.target.value;       
        setSearchTerm(term);
        refetchService(); 
        setShowDropdown(term.length > 0); 
    };
    

    useEffect(() => {
        if (response) {
            if (response.status === 200) {
                console.log("rewsp", response.data);
                setUsers(response.data); 
                setSearchResults(response.data); 
                
                const paginationJson = JSON.parse(response.headersDict['pagination']);
                setMetadata(paginationJson);
                setCount(response.data.length);
    
                setShowDropdown(true);
            }
        } else if (!loading) {
            setShowDropdown(false); 
        }
    }, [response, loading, pageNumber, pageSize]);
    

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        navigate(`/search?term=${searchTerm}`);
    };

    const handleSeeAllResults = () => {
        navigate(`/search?term=${searchTerm}`);
    };

    return (
        <div className="loggedInNavbarContainer">
             <div className="navbar-left">
                <div className="logo">
                    <img src={logo} alt="Logo" />
                </div>
                <div className="nav-item" onClick={handleHomeButton}>Home</div>
                <div className="nav-item" onClick={handleNetworkButton}>Network</div>
                <div className="nav-item" onClick={handleJobsButton}>Jobs</div>
                <div className="nav-item" onClick={handleInterestsButton}>Messages</div>
            </div>
            <div className="navbar-center">
                <form onSubmit={handleSearchSubmit}>
                    <input 
                        type="text" 
                        placeholder="Search" 
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </form>
                {showDropdown && (
                    <div className="search-dropdown">
                        {searchResults.map((result, index) => (
                            <div key={index} className="search-result-item">
                            <img src={result.pictureURL || defaultPhotoURL} alt={result.name} />
                            <div className="result-info"> {}
                                <span className="fullname">{result.firstName + " " + result.lastName}</span>
                                <span>{result.userName}</span>
                            </div>
                        </div>
                        ))}
                        <div className="see-all-results" onClick={handleSeeAllResults}>
                            See all results
                        </div>
                    </div>
                )}
            </div>
            <div className="navbar-right">
                <button className="notification-button" onClick={toggleNotificationPopup}>
                    <span className="notification-count">{listLength}</span>
                </button>
                {isNotificationOpen && (
                    <NotificationPopup notifications={notificationList} />
                )}
                <button className="profile-pic-button" onClick={toggleProfileMenu}>
                    <img src={userPhotoUrl} alt="User" />
                </button>
                {isProfileMenuOpen && (
                    <ProfilePopup />
                )}
            </div>
        </div>
    );
};

LoggedInNavBar.propTypes = {
    userInfo: PropTypes.shape({
        pictureURL: PropTypes.string,
        id: PropTypes.string,
    }).isRequired,
};

export default LoggedInNavBar;
