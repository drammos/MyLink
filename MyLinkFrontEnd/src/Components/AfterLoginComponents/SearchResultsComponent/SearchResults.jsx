import { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import useService from '../../Services/useService';
import useGetCommunicationType from '../../Services/User/useGetCommunicationType';
import useRequestToConnections from '../../Services/User/useRequestToConnections';
import { agents } from '../../../agents';
import AppPagination from '../../Pagination/AppPagination';
import './SearchResults.css';
import { useNavigationHelpers } from '../Helpers/useNavigationHelpers';
import ConnectedButton from './ConnectedButton';

const SearchResults = () => {
    const { handleUsernameClick } = useNavigationHelpers();

    const { requestToConnectMessage, errorCode: requestToConnectErrorCode,
        loading: requestToConnectLoading, requestToConnectRefetch } = useRequestToConnections();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get('term') || '';

    const [users, setUsers] = useState([]);

    //#region pagination
    const [metadata, setMetadata] = useState({
        currentPage: 1,
        totalPages: 1,
        pageSize: 6,
        totalCount: 0,
    });

    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(8);
    const [statuses, setStatuses] = useState(8);
    //#endregion

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

    const currentUserId = localStorage.getItem('id');

    // #region Try to Connect
    const [userToConnect, setUserToConnect] = useState('');
    const handleConnectClick = async (userId) => {
        setUserToConnect(userId);
        await requestToConnectRefetch(currentUserId, userId);
        setStatuses(prev => ({ ...prev, [userId]: 'Pending' }));
    };

    useEffect(() => {
        if (requestToConnectMessage) {

                console.log("useEffect message -> ", requestToConnectMessage);
                //setStatuses((prevStatuses) => ({ ...prevStatuses, [CommunicationTypeResponse.data.user2]: CommunicationTypeResponse.data.result, }));
           
        }
    }, [requestToConnectMessage]);
    //#endregion


    const TypeDictionary = {
        Connected: 'Send Message',
        NotConnected: 'Connect',
        Pending: 'Pending',
        InComing: 'Incoming'
    };
    const { CommunicationTypeResponse, CommunicationTypeRefetch } = useGetCommunicationType();


    useEffect(() => {
        const fetchStatuses = async () => {
            for (const user of users) {
                if (currentUserId !== user.id) {
                    console.log("goes in");
                    await CommunicationTypeRefetch(currentUserId, user.id);
                } else {
                    setStatuses((prevStatuses) => ({
                        ...prevStatuses,
                        [user.id]: null,
                    }));
                }
            }
        };

        if (users.length > 0) {
            fetchStatuses();
        }
    }, [users]);

    useEffect(() => {
        if (CommunicationTypeResponse) {
            if (CommunicationTypeResponse.data) {
                console.log("useEffect data -> ", CommunicationTypeResponse.data.result);
                setStatuses((prevStatuses) => ({ ...prevStatuses, [CommunicationTypeResponse.data.user2 ]: CommunicationTypeResponse.data.result, }));
            }
        }
    }, [CommunicationTypeResponse]);

    return (
        <div className="search-results-container">
            <h2>Users matching: &quot;{searchTerm}&quot;</h2>
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
                                <ConnectedButton statuses={statuses} userId={user.id}
                                    handleConnectClick={handleConnectClick} requestToConnectLoading={requestToConnectLoading} typeDictionary={TypeDictionary} /> 
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