import { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import useService from '../../Services/useService';
import useGetCommunicationType from '../../Services/User/useGetCommunicationType';

const ConnectedButton = ({ statuses, userId, handleConnectClick, requestToConnectLoading }) => {

    return (
        <>
            {statuses[userId] !== null && (
                <button
                    className="connect-button"
                    onClick={() => statuses[userId] === 'Connect' && handleConnectClick(userId)}
                    disabled={statuses[userId] !== 'Connect' || requestToConnectLoading}
                >
                    {statuses[userId]}
                </button>
            )}
        </>
    );
}

export default ConnectedButton;