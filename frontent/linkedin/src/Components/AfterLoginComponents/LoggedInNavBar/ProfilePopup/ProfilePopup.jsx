import './ProfilePopup.css'
import { useNavigationHelpers } from '../../Helpers/navigationHelpers'; 

const ProfilePopup = () => {

    const {
        handleLogoutButton
    } = useNavigationHelpers();

    return (
        <div className="profilePopup-menu">
            <div className="profilePopup-menu-item">View Profile</div>
            <div className="profilePopup-menu-item">Settings</div>
            <div className="profilePopup-menu-item" onClick={handleLogoutButton}>Logout</div>
        </div>
    )
};

export default ProfilePopup