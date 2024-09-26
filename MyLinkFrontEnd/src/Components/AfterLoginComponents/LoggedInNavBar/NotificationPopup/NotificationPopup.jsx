import React from 'react';
import PropTypes from 'prop-types';
import './NotificationPopup.css';

const NotificationPopup = ({ notifications }) => {
    return (
        <div className="notification-popup">
            <h3>Notifications</h3>
            <ul>
                {notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                        <li key={index}>{notification.message}</li>
                    ))
                ) : (
                    <li>No new notifications</li>
                )}
            </ul>
        </div>
    );
};

NotificationPopup.propTypes = {
    notifications: PropTypes.arrayOf(
        PropTypes.shape({
            message: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default NotificationPopup;
