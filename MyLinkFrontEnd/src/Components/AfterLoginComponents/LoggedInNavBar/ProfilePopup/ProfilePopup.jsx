import './ProfilePopup.css'
import { useNavigationHelpers } from '../../Helpers/useNavigationHelpers'; 

const ProfilePopup = () => {

    const {
        handleViewProfile,
        handleLogoutButton,
        handleSettings
    } = useNavigationHelpers();

    return (
        <div className="profilePopup-menu">
            <div className="profilePopup-menu-item" onClick={handleViewProfile}>View Profile</div>
            <div className="profilePopup-menu-item" onClick={handleSettings}>Settings</div>
            <div className="profilePopup-menu-item" onClick={handleLogoutButton}>Logout</div>
        </div>
    )
};

export default ProfilePopup
