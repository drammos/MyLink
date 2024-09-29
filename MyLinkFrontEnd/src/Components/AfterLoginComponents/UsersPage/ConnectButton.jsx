import PropTypes from 'prop-types';
import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../../../routes';

const ConnectButton = ({ status, userId, handleConnectClick, requestToConnectLoading }) => {

    const typeDictionary = {
        Connected: 'Send Message',
        NotConnected: 'Connect',
        Pending: 'Pending',
        InComing: 'Incoming'
    };

    const isDisabled = typeDictionary[status] === 'Incoming' || requestToConnectLoading;
    const type = typeDictionary[status];
    const navigate = useNavigate();


    const handleClick = () => {
        if (typeDictionary[status] === 'Connect')
            handleConnectClick(userId);
        else if (typeDictionary[status] === 'Send Message')
            navigate(Routes.Messages);
    };

    useEffect(() => {
    }, []);

    return (
        <>
            {status !== null && (
                <button
                    className="connect-button"
                    onClick={handleClick}
                    disabled={isDisabled}
                >
                    {type}
                </button>
            )}
        </>
    );
}

// PropTypes validation
ConnectButton.propTypes = {
    status: PropTypes.object.isRequired,
    userId: PropTypes.string.isRequired,
    handleConnectClick: PropTypes.func.isRequired,
    requestToConnectLoading: PropTypes.bool.isRequired,
    typeDictionary: PropTypes.object.isRequired,
};

export default ConnectButton;