import { useNavigate } from 'react-router-dom';
import { Routes } from '../../../routes';
import { agents } from '../../../agents';

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
        navigate(Routes.Network); 
    };    

    const handleJobsButton = () => {
        navigate('/jobs'); 
    };

    const handleMessagesButton = () => {
        navigate(Routes.Messages); 
    };

    const handleSearchUsers = () => {
        navigate(Routes.SearchUsers); 
    };

    const handleLogoutButton = () => {
        console.log('Logging out...')
        localStorage.setItem('authToken', '');
        localStorage.setItem('role', '');
        localStorage.setItem('username', '');
        localStorage.setItem('id', '');
        navigate(Routes.Home);
    };

    const handleUsernameClick = (username) => {
        window.open(Routes.UserInfo.replace(':username', username), '_blank');
    };

    return {
        handleHomeButton,
        handleProfileButton,
        handleNetworkButton,
        handleJobsButton,
        handleMessagesButton,
        handleViewProfile,
        handleLogoutButton,
        handleSettings,
        handleSearchUsers,
        handleUsernameClick,
    };
};