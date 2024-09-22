import React from 'react';
import PropTypes from 'prop-types';

const UsersPageMainInfo = ({ userInfo }) => {

    const lastname = userInfo.lastName ? userInfo.lastName.charAt(0).toUpperCase() + userInfo.lastName.slice(1).toLowerCase() : '';
    const firstname = userInfo.firstName ? userInfo.firstName.charAt(0).toUpperCase() + userInfo.firstName.slice(1).toLowerCase() : '';

    return (
        <div className="main-info-container">
            <div className="profile-picture">
                {userInfo.pictureURL !== "null" ? (
                    <img src={userInfo.pictureURL} alt={`${firstname} ${lastname}`} />
                ) : (
                    <div className="default-picture">
                        <span>{firstname[0]}{lastname[0]}</span>
                    </div>
                )}
            </div>
            <div className="user-details">
                <h2>{`${firstname} ${lastname}`}</h2>
                <p>Email: {userInfo.email}</p>
                <p>Phone: {userInfo.phoneNumber}</p>
            </div>
        </div>
    );
};

UsersPageMainInfo.propTypes = {
    userInfo: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        pictureURL: PropTypes.string,
        email: PropTypes.string.isRequired,
        phoneNumber: PropTypes.string.isRequired,
    }).isRequired,
};

export default UsersPageMainInfo;
