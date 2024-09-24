import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useService from '../../Services/useService';
import { agents } from '../../../agents'; 
import AppPagination from '../../Pagination/AppPagination';
import './SearchResults.css';

const SearchResults = () => {
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
    const [pageSize, setPageSize] = useState(2);

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
                                <span className="name-highlight">
                                    {user.firstName + " " + user.lastName}
                                </span>
                                <span>{user.userName}</span>
                            </div>
                            <button className="connect-button">Connect</button>
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
