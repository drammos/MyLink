//import React, { useEffect, useState } from 'react';
//import { useLocation } from 'react-router-dom';
//import useService from '../../Services/useService';
//import useIsConnectedUsers from '../../Services/User/useIsConnectedUsers';
//import useIsPendingRequest from '../../Services/User/useIsPendingRequest';
//import useRequestToConnections from '../../Services/User/useRequestToConnections';
//import { agents } from '../../../agents';
//import AppPagination from '../../Pagination/AppPagination';
//import './SearchResults.css';

//const SearchResults = () => {

//    const { IsConnectedResponse, IsConnectedMessage, IsConnectedErrorCode, IsConnectedLoading, IsConnectedUsersRefetch } = useIsConnectedUsers();
//    const { IsPendingResponse, IsPendingMessage, IsPendingErrorCode, IsPendingLoading, IsPendingRefetch } = useIsPendingRequest();
//    const { requestToConnectMessage, errorCode: requestToConnectErrorCode, loading: requestToConnectLoading , requestToConnectRefetch } = useRequestToConnections();

//    const location = useLocation();
//    const queryParams = new URLSearchParams(location.search);
//    const searchTerm = queryParams.get('term') || '';

//    const [users, setUsers] = useState([]);
//    const [metadata, setMetadata] = useState({
//        currentPage: 1,
//        totalPages: 1,
//        pageSize: 6,
//        totalCount: 0,
//    });

//    const [pageNumber, setPageNumber] = useState(1);
//    const [pageSize, setPageSize] = useState(8);

//    const buildUrl = () => {
//        const params = new URLSearchParams();
//        const url2 = agents.localhost + agents.searchUsers;
//        params.append('SearchName', searchTerm.toString());
//        params.append('PageNumber', pageNumber.toString());
//        params.append('PageSize', pageSize.toString());
//        return `${url2}?${params}`;
//    };

//    const { response, loading, refetch } = useService(
//        'Loading users..',
//        'GET',
//        buildUrl(),
//        null,
//        undefined,
//        true
//    );

//    useEffect(() => {
//        if (response) {
//            if (response.status === 200) {
//                setUsers(response.data);
//                const paginationJson = JSON.parse(response.headersDict['pagination']);
//                setMetadata(paginationJson);
//            }
//        }
//    }, [response]);

//    useEffect(() => {
//        refetch();
//    }, [pageNumber, refetch]);

//    return (
//        <div className="search-results-container">
//        <h2>Users matching: "{searchTerm}"</h2>
//        {loading ? (
//            <p>Loading...</p>
//        ) : (
//            <>
//                <div className="search-results-list">
//                    {users.map(user => (
//                        <div key={user.id} className="search-result-item">
//                            <img src={user.pictureURL} alt={user.firstName} />
//                            <div className="result-info">
//                                <span className="name-highlight">
//                                    {user.firstName + " " + user.lastName}
//                                </span>
//                                <span>{user.userName}</span>
//                            </div>
//                            <button className="connect-button">Connect</button>
//                        </div>
//                    ))}
//                </div>

//                <div>
//                    <div className="pagination">
//                        <AppPagination
//                            metadata={metadata}
//                            onPageChange={(page) => setPageNumber(page)}
//                        />
//                    </div>
//                </div>

//            </>
//        )}
//    </div>

//    );
//};

//export default SearchResults;

import React, { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import useService from '../../Services/useService';
import useIsConnectedUsers from '../../Services/User/useIsConnectedUsers';
import useIsPendingRequest from '../../Services/User/useIsPendingRequest';
import useRequestToConnections from '../../Services/User/useRequestToConnections';
import { agents } from '../../../agents';
import AppPagination from '../../Pagination/AppPagination';
import './SearchResults.css';
import { useNavigationHelpers } from '../Helpers/useNavigationHelpers';

const SearchResults = () => {
    const { handleUsernameClick } = useNavigationHelpers();
    const { IsConnectedResponse, IsConnectedUsersRefetch } = useIsConnectedUsers();
    const { IsPendingResponse, IsPendingRefetch } = useIsPendingRequest();
    const { requestToConnectMessage, errorCode: requestToConnectErrorCode, loading: requestToConnectLoading, requestToConnectRefetch } = useRequestToConnections();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get('term') || '';

    const [users, setUsers] = useState([]);
    const [metadata, setMetadata] = useState({
        currentPage: 1,
        totalPages: 1,
        pageSize: 6,
        totalCount: 0,
    });

    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(8);
    const [userStatuses, setUserStatuses] = useState({});

    const currentUserId = localStorage.getItem('id');
    const [otherUserId, setOtherUserId] = useState(null);

    const newStatuses = {};
    const IsConnectedUser = {};
    const IsPendingRequest = {};
    //#region Search Api
    const buildUrl = () => {
        const params = new URLSearchParams();
        const url2 = agents.localhost + agents.searchUsers;
        params.append('SearchName', searchTerm.toString());
        params.append('PageNumber', pageNumber.toString());
        params.append('PageSize', pageSize.toString());
        return `${url2}?${params}`;
    };

    const { response, loading, refetch } = useService(
        'Loading users..',
        'GET',
        buildUrl(),
        null,
        undefined,
        true
    );

    useEffect(() => {
        if (response) {
            if (response.status === 200) {
                setUsers(response.data);
                const paginationJson = JSON.parse(response.headersDict['pagination']);
                setMetadata(paginationJson);
            }
        }
    }, [response]);

    useEffect(() => {
        refetch();
    }, [pageNumber, refetch]);

    //#endregion

    const [userStatus, setUserStatus] = useState('Connect');

    const checkConnectedUsers = useCallback(async (currentUserId, userId) => {
        await IsConnectedUsersRefetch(currentUserId, userId);

    }, [otherUserId]);

    useEffect(() => {
        if (IsConnectedResponse) {
            setUserStatus('Send Message');
        }
        else {
            IsPendingRefetch(currentUserId, otherUserId);
        }
    }, [IsConnectedResponse]);

    useEffect(() => {
        if (IsPendingResponse) {
            setUserStatus('Pending');
        }
    }, [IsPendingResponse]);

    useEffect(() => {
        const updateUserStatuses = async () => {
            for (const user of users) {
                //if (currentUserId === user.id) return null;

                setOtherUserId(user.id);
                await checkUserStatus(currentUserId, user.id);
                newStatuses[user.id] = userStatus;
            }
            setUserStatuses(newStatuses);
        };

        if (users.length > 0) {
            updateUserStatuses();
        }
    }, [users]);

    const handleConnectClick = async (userId) => {
        await requestToConnectRefetch(currentUserId, userId);
        if (!requestToConnectErrorCode) {
            setUserStatuses(prev => ({ ...prev, [userId]: 'Pending' }));
        }
    };

    return (
        <div className="search-results-container">
            <h2>Users matching: "{searchTerm}"</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div className="search-results-list">
                        {users.map(user => (
                            <div key={user.id} className="search-result-item">
                                <img src={user.pictureURL} alt={user.firstName} />
                                <div className="result-info">
                                    <a className="name-highlight" onClick={(e) => {
                                        e.preventDefault();
                                        handleUsernameClick(user.userName);
                                    }}>
                                        {user.firstName + " " + user.lastName}
                                    </a>
                                    <span>{user.userName}</span>
                                </div>
                                {userStatuses[user.id] !== null && (
                                    <button
                                        className="connect-button"
                                        onClick={() => userStatuses[user.id] === 'Connect' && handleConnectClick(user.id)}
                                        disabled={userStatuses[user.id] !== 'Connect' || requestToConnectLoading}
                                    >
                                        {userStatuses[user.id]}
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    <div>
                        <div className="pagination">
                            <AppPagination
                                metadata={metadata}
                                onPageChange={(page) => setPageNumber(page)}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default SearchResults;