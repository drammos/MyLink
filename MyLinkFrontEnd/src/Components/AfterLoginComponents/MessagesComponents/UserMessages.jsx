import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useService from '../../Services/useService';
import { agents } from '../../../agents'; 
import AppPagination from '../../Pagination/AppPagination';
import './UserMessages.css';

const UserMessages = ({ userInfo }) => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    
    const [users, setUsers] = useState([]);
    const [metadata, setMetadata] = useState({
        currentPage: 1,
        totalPages: 1,
        pageSize: 6,
        totalCount: 0,
    });
    
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(8);

    const buildUrl = () => {
        const params = new URLSearchParams();
        const url2 = agents.localhost + agents.searchUsers;
        params.append('SearchName', searchTerm.toString());
        params.append('PageNumber', pageNumber.toString());
        params.append('PageSize', pageSize.toString());
        return `${url2}?${params}`;
    };


    return (
        <div className="search-results-container">
            <h2>Users matching: ela</h2>
        </div>
    );
}

export default UserMessages;
