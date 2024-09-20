import { useNavigate } from 'react-router-dom';
import { Routes } from '../../../routes'

export const useNavigationHelpers = () => {
    const navigate = useNavigate();

    const handleHomeButton = () => {
        navigate(Routes.MainPage); 
    };

    const handleViewProfile = () => {
        navigate(Routes.PersonalInfo);
    };

    const handleSettings = () => {
        navigate(Routes.UserSettings);
    }
    const handleProfileButton = () => {
        navigate('/profile');
    };

    const handleNetworkButton = () => {
        navigate('/network'); 
    };    

    const handleJobsButton = () => {
        navigate('/jobs'); 
    };

    const handleInterestsButton = () => {
        navigate('/interests'); 
    };

    const handleLogoutButton = () => {
        console.log('Logging out...')
        localStorage.setItem('authToken', '');
        localStorage.setItem('role', '');
        localStorage.setItem('username', '');
        localStorage.setItem('id', '');
        navigate(Routes.Home);
    };

    return {
        handleHomeButton,
        handleProfileButton,
        handleNetworkButton,
        handleJobsButton,
        handleInterestsButton,
        handleViewProfile,
        handleLogoutButton,
        handleSettings,
    };
};