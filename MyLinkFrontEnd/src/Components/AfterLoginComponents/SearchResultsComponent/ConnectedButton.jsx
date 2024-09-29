import PropTypes from 'prop-types';
import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../../../routes';
import useGetCommunicationType from '../../Services/User/useGetCommunicationType';

const ConnectedButton = ({ statuses, userId, handleConnectClick, requestToConnectLoading, typeDictionary }) => {

    const TypeDictionary = {
        Connected: 'Send Message',
        NotConnected: 'Connect',
        Pending: 'Pending',
        InComing: 'Incoming'
    };

    const isDisabled = typeDictionary[statuses[userId]] === 'Incoming' || requestToConnectLoading;
    //const type = typeDictionary[statuses[userId]];
    const [type, setType] = useState(null);
    const navigate = useNavigate();
    const { CommunicationTypeResponse, CommunicationTypeRefetch } = useGetCommunicationType();


    const handleClick = () => {
        if (typeDictionary[statuses[userId]] === 'Connect')
            handleConnectClick(userId);
        else if (typeDictionary[statuses[userId]] === 'Send Message')
            navigate(Routes.Messages);
    };


    useEffect(() => {
        if (CommunicationTypeResponse) {
            if (CommunicationTypeResponse.data) {
                setType(TypeDictionary[CommunicationTypeResponse.data.result]);
            }
        }
    }, [CommunicationTypeResponse]);


    useEffect(() => {
        CommunicationTypeRefetch(localStorage.getItem('id'), userId);
    }, []);

    return (
        <>
            {statuses[userId] !== null && (
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
ConnectedButton.propTypes = {
    statuses: PropTypes.object.isRequired, 
    userId: PropTypes.string.isRequired, 
    handleConnectClick: PropTypes.func.isRequired, 
    requestToConnectLoading: PropTypes.bool.isRequired, 
    typeDictionary: PropTypes.object.isRequired,
};

export default ConnectedButton;
