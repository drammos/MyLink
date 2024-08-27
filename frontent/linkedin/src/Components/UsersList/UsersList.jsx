import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import PropTypes from 'prop-types';
import UseService from "../Services/useService";

import './UsersList.css'

const UsersList = () => {

    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [filters, setFilters] = useState({});
    const header = <h5>MyLink Users</h5>;

    useEffect(() => {
        const fetchUsers = async () => {

            const response = await UseService('Loading users..', 'GET', 'http://localhost:5175/User/GetAllUsers', null, undefined, true);
            const data = await response.json();

            if (response.status === 200) {
                setMessage('Finding Users....Done!');
                console.log('Finding Users....Done!');
                setUsers(data);
            } else {
                setMessage('Invalid username or password');
                console.error('Finding Users....Failed..');
                setError('An unexpected error occurred. Please refresh and try again.');
            }

        };

        fetchUsers();
    }, []);
    
    const userNameBodyTemplate = (rowData) => <span>{rowData.userName}</span>;
    const userFirstNameTemplate = (rowData) => <span>{rowData.firstName}</span>;
    const userLastNameTemplate = (rowData) => <span>{rowData.lastName}</span>;
    const fullNameBodyTemplate = (rowData) => <span>{`${rowData.firstName} ${rowData.lastName}`}</span>;
    const roleBodyTemplate = (rowData) => <span>{rowData.role}</span>;

    return (
        <div className="usersListsContainer">
            <div className="usersList">
                <h2>MyLink Users <span className="numOfUsers">(Num / Num Admins)</span></h2>
                {error && <p className="error">{error}</p>}
                <DataTable
                    value={users}
                    paginator
                    header={header}
                    rows={10}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    rowsPerPageOptions={[10, 25, 50]}
                    dataKey="id"
                    selectionMode="checkbox"
                    selection={selectedUsers}
                    onSelectionChange={(e) => setSelectedUsers(e.value)}
                    filters={filters}
                    filterDisplay="menu"
                    globalFilterFields={['userName', 'firstName', 'lastName', 'role']}
                    emptyMessage="No users found."
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                >
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                    <Column field="userName" header="Username" sortable filter filterPlaceholder="Search by username" style={{ minWidth: '10rem' }} body={userNameBodyTemplate} />
                    <Column field="firstName" header="First Name" sortable filter filterPlaceholder="Search by first name" style={{ minWidth: '10rem' }} body={userFirstNameTemplate} />
                    <Column field="lastName" header="Last Name" sortable filter filterPlaceholder="Search by last name" style={{ minWidth: '10rem' }} body={userLastNameTemplate} />
                    <Column field="role" header="Role" sortable filter filterPlaceholder="Search by role" style={{ minWidth: '10rem' }} body={roleBodyTemplate} />
                    <Column headerStyle={{ width: '5rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} />
                </DataTable>
            </div>
        </div>
    );
};

UsersList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
};


export default UsersList;