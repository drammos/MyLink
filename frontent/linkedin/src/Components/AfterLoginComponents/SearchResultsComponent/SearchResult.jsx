// SearchResults.jsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useService from '../../Services/useService';
import { agents } from '../../../agents'; 

const SearchResults = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get('term') || '';
    
    const [users, setUsers] = useState([]);
    const [metadata, setMetadata] = useState({
        currentPage: 1,
        totalPages: 1,
        pageSize: 10,
        totalCount: 0,
    });
    
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize] = useState(6); // Adjust this value as necessary

    const buildUrl = () => {
        const params = new URLSearchParams();
        const url2 = agents.localhost + agents.searchUsers;
        params.append('SearchName', searchTerm);
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

    const handleNextPage = () => {
        if (pageNumber < metadata.totalPages) {
            setPageNumber(prev => prev + 1);
        }
    };

    const handlePreviousPage = () => {
        if (pageNumber > 1) {
            setPageNumber(prev => prev - 1);
        }
    };

    useEffect(() => {
        refetch();
    }, [pageNumber, refetch]);

    return (
        <div>
            <h1>Users matching: "{searchTerm}"</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {users.map(user => (
                        <div key={user.id} className="user-item">
                            <img src={user.pictureURL} alt={user.firstName} />
                            <span>{user.firstName} {user.lastName}</span>
                        </div>
                    ))}
                    <div className="pagination">
                        <button onClick={handlePreviousPage} disabled={pageNumber === 1}>
                            Previous
                        </button>
                        <span>{`Page ${pageNumber} of ${metadata.totalPages}`}</span>
                        <button onClick={handleNextPage} disabled={pageNumber === metadata.totalPages}>
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchResults;
