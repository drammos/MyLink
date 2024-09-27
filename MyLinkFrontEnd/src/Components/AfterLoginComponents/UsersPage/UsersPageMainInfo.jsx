import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useGetCommunicationType from '../../Services/User/useGetCommunicationType';
import useRequestToConnections from '../../Services/User/useRequestToConnections';
import ConnectButton from './ConnectButton';
import './styles/UsersPageMainInfo.css'; 

const UsersPageMainInfo = ({ userInfo }) => {
    const [status, setStatus] = useState('NotConnected');
    const { requestToConnectMessage, errorCode: requestToConnectErrorCode,
        loading: requestToConnectLoading, requestToConnectRefetch } = useRequestToConnections();

    const loggedInUserId = localStorage.getItem('id');
    const loggedInUserRole = localStorage.getItem('role');

    const { CommunicationTypeResponse, CommunicationTypeRefetch } = useGetCommunicationType();

    const lastname = userInfo.lastName ? userInfo.lastName.charAt(0).toUpperCase() + userInfo.lastName.slice(1).toLowerCase() : '';
    const firstname = userInfo.firstName ? userInfo.firstName.charAt(0).toUpperCase() + userInfo.firstName.slice(1).toLowerCase() : '';

    useEffect(() => {
        const fetchStatuses = async () => {
            console.log("user.id = ", userInfo.id);
            if (userInfo.id && loggedInUserId !== userInfo.id && loggedInUserRole !== 'Admin')
                await CommunicationTypeRefetch(loggedInUserId, userInfo.id);
            else
                setStatus(null);
        };
        fetchStatuses();
    }, [userInfo, userInfo.id]);

    useEffect(() => {
        if (CommunicationTypeResponse) {
            setStatus(CommunicationTypeResponse.data.result);
        }
    }, [CommunicationTypeResponse]);

    const handleConnectClick = async (userId) => {
        await requestToConnectRefetch(userInfo.id, userId);
        setStatus('Pending');
    };

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
            </div>
            <ConnectButton status={status} userId={userInfo.id}
                handleConnectClick={handleConnectClick} requestToConnectLoading={requestToConnectLoading} /> 
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
        birthday: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
    }).isRequired,
};

export default UsersPageMainInfo;
