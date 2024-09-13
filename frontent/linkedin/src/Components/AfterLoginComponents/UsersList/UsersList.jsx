//#region import section
import React, { useEffect, useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import {agents} from '../../../agents'; 
import PropTypes from 'prop-types';

import useDeleteUsers from '../../Services/useDeleteUsers';
import './UsersList.css';
import useService from '../../Services/useService';
import { useNavigationHelpers } from '../Helpers/navigationHelpers';
import NewUserPopupModal from './NewUserPopupModal/NewUserPopupModal'; 

//#endregion

const UsersList = () => {

    //#region statements
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [error, setError] = useState(null);
    const [count, setCount] = useState(0);
    const [errorCode, setErrorCode] = useState(2); // 2 is nothing , 0 is all good, 1 is problem
    const [userToDelete, setUserToDelete] = useState(null); 
    const [displayNewUserDialog, setDisplayNewUserDialog] = useState(false); 


    const dt = useRef(null);
    const { handleLogoutButton } = useNavigationHelpers();

    //#endregion

    //#region handling endpoints

    const url = agents.localhost + agents.deleteUser;
    // Handling user deletion
    const deleteUserService = useService(
        userToDelete ? `Deleting user ${userToDelete}` : '',
        'DELETE',
        userToDelete ? `${url}?Username=${userToDelete}` : null,
        null,
        'application/json',
        !!userToDelete
    ); 

    const url2 = agents.localhost + agents.getAllUsers;

    // Fetching users using useService custom hook
    const { response, loading, refetch } = useService(
        'Loading users..',
        'GET',
        url2,
        null,
        undefined,
        true
    );

    //#endregion

    const { DeleteUsers, deleting, deleteError } = useDeleteUsers(refetch);

    //#region export to xml

    const convertUsersToXML = (users) => {
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<users>\n';

        users.forEach(user => {
            xml += `  <user>\n`;
            xml += `    <userName>${user.userName}</userName>\n`;
            xml += `    <firstName>${user.firstName}</firstName>\n`;
            xml += `    <lastName>${user.lastName}</lastName>\n`;
            xml += `    <role>${user.role}</role>\n`;
            xml += `  </user>\n`;
        });

        xml += '</users>';
        return xml;
    };

    const exportToXML = () => {
        const xmlData = convertUsersToXML(users); // Convert the users data to XML
        const blob = new Blob([xmlData], { type: 'application/xml' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'users.xml';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Clean up
    };


    //#endregion 

    useEffect(() => {
        refetch();
    }, [refetch]);

    useEffect(() => {
        if (response) {
            if (response.status === 200) {
                setErrorCode(0);
                setUsers(response.data); // Adjust according to your API response structure
                setError(null); // Clear any previous errors
                setCount(response.data.length);
            } else {
                setErrorCode(1);
                setError('An unexpected error occurred. Please refresh and try again.');
            }
        } else if (!loading) {
            setErrorCode(1);
            setError('An unexpected error occurred. Please refresh and try again.');
        }
    }, [response, loading]);

    useEffect(() => {
        if (userToDelete) {
            deleteUserService.refetch();  // Trigger the DELETE request
        }
    }, [userToDelete, deleteUserService]); 

    useEffect(() => {
        if (userToDelete !== null) {
            console.log("done");
            setTimeout(() => {
                refetch();
            }, 2000);
            setUserToDelete(null); // Reset user to delete
        }
    }, [userToDelete,deleteUserService.response, refetch]);

    const handleDeleteSelectedUsers = () => {
        if (selectedUsers.length > 0) {
            console.log("got it! ", selectedUsers);
            DeleteUsers(selectedUsers);
        } else {
            console.log('No users selected for deletion');
        }
    };

    //#region modal popup

    const openNewUserDialog = () => {
        setDisplayNewUserDialog(true); // Show modal
    };

    const hideNewUserDialog = () => {
        setDisplayNewUserDialog(false); // Hide modal
    };

    //#endregion

    //#region toolbar templates

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="action-buttons">
                    <Button
                        label="New"
                        icon="pi pi-plus"
                        className="p-button-success p-mr-2"
                        onClick={openNewUserDialog}
                    />
                    <Button
                        label="Delete"
                        icon="pi pi-trash"
                        className="p-button-danger"
                        onClick={ handleDeleteSelectedUsers } 
                        disabled={selectedUsers.length === 0 || deleting} 
                    />
                </div>
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button
                    label="Export"
                    icon="pi pi-download"
                    className="p-button-help"
                    onClick={exportToXML}
                />
            </React.Fragment>
        );
    };

    const secondRightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button
                    label="Logout"
                    icon="pi pi-sign-out"
                    className="p-button-danger"
                    onClick={handleLogoutButton}
                />
            </React.Fragment>
        );
    };

    //#endregion

    const header = (
        <div className="table-header">
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                    type="search"
                    placeholder="Search by Username, First Name, Last Name, Role"
                    onInput={(e) => setGlobalFilter(e.target.value)}
                />
            </span>
        </div>
    );

    const actionBodyTemplate = (rowData) => {
        const handleEdit = () => {
            console.log('Edit user:', rowData.userName);
        };

        const handleDelete = () => {
            const message = `Delete user: ${rowData.userName}`;
            console.log(message);
            setUserToDelete(rowData.userName); 
        };

        return (
            <div className="action-buttons">
                <Button
                    icon="pi pi-pencil"
                    className="p-button-rounded p-button-info p-mr-2"
                    onClick={handleEdit}
                    aria-label="Edit"
                />
                <Button
                    icon="pi pi-trash"
                    className="p-button-rounded p-button-danger"
                    onClick={handleDelete}
                    aria-label="Delete"
                />
            </div>
        );
    };

    const userNameBodyTemplate = (rowData) => <span>{rowData.userName}</span>;
    const userFirstNameTemplate = (rowData) => <span>{rowData.firstName}</span>;
    const userLastNameTemplate = (rowData) => <span>{rowData.lastName}</span>;
    const roleBodyTemplate = (rowData) => <span>{rowData.role}</span>;

    return (
        <div className="usersListsContainer">
            <div className="usersList">
                <h2>MyLink Users <span className="numOfUsers">({count} / {count})</span></h2>
                {errorCode === 1 && <p className="error">{error}</p>}
                {loading && <p className="loading">Loading...</p>}

                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                <DataTable
                    ref={dt}
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
                    globalFilter={globalFilter}
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
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
                <Toolbar className="mb-4" center={secondRightToolbarTemplate}></Toolbar>
                 
                <NewUserPopupModal
                    visible={displayNewUserDialog}
                    onHide={hideNewUserDialog}
                /> 

            </div>
        </div>
    );
};

UsersList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default UsersList;
