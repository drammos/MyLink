import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './NotificationPopup.css';

const NotificationPopup = ({ notifications }) => {
    useEffect(() => {
        console.log("Notifications are: ", notifications);
    }, [notifications]);

    return (
        <div className="notification-popup">
            <h3>Notifications</h3>
            <ul>
                {notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                        <li key={index} className="notification-item">
                            <img
                                src={notification.pictureURL}
                                alt={`${notification.firstName} ${notification.lastName}`}
                                className="notification-image"
                            />
                            <span>{notification.firstName} {notification.lastName} sends you a friend request</span>
                        </li>
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
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,
            pictureURL: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default NotificationPopup;
