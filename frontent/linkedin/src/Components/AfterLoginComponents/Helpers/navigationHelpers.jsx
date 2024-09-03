import { useNavigate } from 'react-router-dom';
import { Routes } from '../../../routes'

export const useNavigationHelpers = () => {
    const navigate = useNavigate();

    const handleHomeButton = () => {
        navigate(Routes.MainPage); 
    };

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
        navigate(Routes.Home);
    };

    return {
        handleHomeButton,
        handleProfileButton,
        handleNetworkButton,
        handleJobsButton,
        handleInterestsButton,
        handleLogoutButton,
    };
};