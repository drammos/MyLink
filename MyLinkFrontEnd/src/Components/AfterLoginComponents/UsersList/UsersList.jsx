//#region import section
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import {agents} from '../../../agents'; 
import PropTypes from 'prop-types';
import useDeleteUsers from '../../Services/useDeleteUsers';
import Grid2 from "@mui/material/Grid2";

import './UsersList.css';
import useService from '../../Services/useService';
import { useNavigationHelpers } from '../Helpers/useNavigationHelpers';
import { useExportHelpers } from '../Helpers/useExportHelpers'
import NewUserPopupModal from './NewUserPopupModal/NewUserPopupModal'; 
import AppPagination from '../../Pagination/AppPagination';
import ExportPopupModal from './ExportPopupModal/ExportPopupModal';

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

    // Pop up displays
    const [displayNewUserDialog, setDisplayNewUserDialog] = useState(false); 
    const [displayExportPopup, setDisplayExportPopup] = useState(false);

    //Page Number and Page Size
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    //Metadata
    const [metadata, setMetadata] = useState({
        currentPage: 1,
        totalPages: 1,
        pageSize: 10,
        totalCount: 10
      });    
    const dt = useRef(null);
    const { handleLogoutButton } = useNavigationHelpers();
    const { exportToJSON, exportToXML } = useExportHelpers();

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

    const buildUrl = useCallback(() => {
        const params = new URLSearchParams();
        const url2 = agents.localhost + agents.getAllUsers;
        params.append('PageNumber', pageNumber.toString());
        params.append('PageSize', pageSize.toString());
        return `${url2}?${params}`;
      }, [pageNumber, pageSize]);
    
    const {response, loading, refetch} = useService(
        'Loading users..',
        'GET',
        buildUrl(),
        null,  
        undefined,
        true
    );

    //#endregion

    const { DeleteUsers, deleting, deleteError } = useDeleteUsers(refetch);

    useEffect(() => {
        refetch();
    }, [refetch, pageNumber, pageSize]);

    useEffect(() => {
        if (response) {
            if (response.status === 200) {
                setErrorCode(0);
                setUsers(response.data); // Adjust according to your API response structure
                setError(null); // Clear any previous errors
                
                const paginationJson = JSON.parse(response.headersDict['pagination']);
                setMetadata(paginationJson);
                setCount(response.data.length);
                console.log("data, ", response.data);
                console.log("len", users.length );
                console.log("user", users.entries());
            } else {
                setErrorCode(1);
                setError('An unexpected error occurred. Please refresh and try again.');
            }
        } else if (!loading) {
            setErrorCode(1);
            setError('An unexpected error occurred. Please refresh and try again.');
        }
    }, [response, loading, pageNumber, pageSize]);

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
    const openNewUserDialog = () => { setDisplayNewUserDialog(true); };
    const hideNewUserDialog = () => { setDisplayNewUserDialog(false); };
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
                    onClick={() => setDisplayExportPopup(true)} // Open export popup
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
                {users.length > 0 ? (
                    <Grid2>
                        <Grid2 container>
                            <DataTable
                                ref={dt}
                                value={users}
                                // paginator
                                rows={pageSize}
                                first={(pageNumber - 1) * pageSize}
                                onPage={(e) => {
                                setPageNumber(e.page + 1);
                                refetch();  // Add this line to trigger a refetch when the page changes
                                }}
                                totalRecords={metadata?.totalCount}  // Change this from totalRecords to totalCount
                                dataKey="id"
                                selectionMode="checkbox"
                                selection={selectedUsers}
                                onSelectionChange={(e) => setSelectedUsers(e.value)}
                                globalFilter={globalFilter}
                                header={header}
                                globalFilterFields={['userName', 'firstName', 'lastName', 'role']}
                                emptyMessage="No users found."
                            >
                                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                                <Column field="userName" header="Username" sortable filter filterPlaceholder="Search by username" style={{ minWidth: '10rem' }} body={userNameBodyTemplate} />
                                <Column field="firstName" header="First Name" sortable filter filterPlaceholder="Search by first name" style={{ minWidth: '10rem' }} body={userFirstNameTemplate} />
                                <Column field="lastName" header="Last Name" sortable filter filterPlaceholder="Search by last name" style={{ minWidth: '10rem' }} body={userLastNameTemplate} />
                                <Column field="role" header="Role" sortable filter filterPlaceholder="Search by role" style={{ minWidth: '10rem' }} body={roleBodyTemplate} />
                                <Column headerStyle={{ width: '5rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} />
                                <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                            </DataTable>
                        </Grid2>
                        <Grid2 >
                            <Grid2 container justifyContent="center" alignItems="center">
                                <AppPagination
                                    metadata={metadata}
                                    onPageChange={(page) => setPageNumber(page)}
                                />
                            </Grid2>
                        </Grid2>
                    </Grid2>
                ) : (
                    <h2>No users found...</h2>
                )}
               
                <Toolbar className="mb-4" center={secondRightToolbarTemplate}></Toolbar>
                 
                <NewUserPopupModal
                    visible={displayNewUserDialog}
                    onHide={hideNewUserDialog}
                /> 

                <ExportPopupModal
                    visible={displayExportPopup}
                    onHide={() => setDisplayExportPopup(false)}
                    exportToXML={() => exportToXML({ users, selectedUsers })}
                    exportToJSON={() => exportToJSON({ users, selectedUsers })}
                />


            </div>
        </div>
        
    );
};

UsersList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default UsersList;
