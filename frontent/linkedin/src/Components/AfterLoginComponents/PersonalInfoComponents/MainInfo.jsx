import React from 'react';
import PropTypes from 'prop-types';
import { agents } from '../../../agents';
import { Routes } from '../../../routes';

const MainInfo = ({ userInfo }) => {

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
                <p>Birthday: {userInfo.birthday}</p>
                <p> Url: 
                    <a
                        href={`${agents.frontLocalhost}${Routes.UserInfo.replace(':username', userInfo.userName)}`}
                        target="_blank"
                        rel="noopener noreferrer">
                        {` ${agents.frontLocalhost}${Routes.UserInfo.replace(':username', userInfo.userName)}`}
                    </a>
                </p>
            </div>
        </div>
    );
};

MainInfo.propTypes = {
    userInfo: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        pictureURL: PropTypes.string,
        email: PropTypes.string.isRequired,
        phoneNumber: PropTypes.string.isRequired,
        birthday: PropTypes.string.isRequired,
        userName: PropTypes.string.isRequired,
    }).isRequired,
};

export default MainInfo;
