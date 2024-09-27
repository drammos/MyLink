import React, { useEffect } from 'react';
import { Card } from 'primereact/card';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import useGetListFromConnections from '../Services/User/useGetListFromConnections';
import './styles/PrintConnectedUsers.css';
import { useNavigationHelpers } from '../AfterLoginComponents/Helpers/useNavigationHelpers';


const PrintConnectedUsers = () => {
    const { handleUsernameClick } = useNavigationHelpers();
    const { listLength, connectionList, loading, GetConnectionsrefetch } = useGetListFromConnections();

    useEffect(() => {
        GetConnectionsrefetch(localStorage.getItem('id'));
    }, []);

    if (loading) {
        return <ProgressSpinner />;
    }

    return (
        <div className="connected-users">
            <h2 className="text-xl font-bold mb-4">Connected Users ({listLength})</h2>
            {Array.isArray(connectionList) && connectionList.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                    {connectionList.map((user) => (
                        <Card key={user.id} className="shadow-md">
                            <div className="flex items-start">
                                <Avatar
                                    image={user.pictureURL}
                                    shape="circle"
                                    size="large"
                                    className="mr-4"
                                />
                                <div className="flex-grow">
                                    <h3 className="text-lg font-semibold mb-1">{user.firstName} {user.lastName}</h3>
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>{user.email} Phone: {user.phoneNumber}</span>
                                    </div>
                                </div>
                            </div>
                            <Button label="View Profile" className="p-button-outlined mt-3 w-full"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleUsernameClick(user.userName);
                                }} />
                        </Card>
                    ))}
                </div>
            ) : (
                <p>No connected users found.</p>
            )}
        </div>
    );
};

export default PrintConnectedUsers;