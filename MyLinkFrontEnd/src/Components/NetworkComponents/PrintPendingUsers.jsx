import React, { useEffect } from 'react';
import { Card } from 'primereact/card';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import useGetListFromIncomingRequests from '../Services/useGetListFromIncomingRequests';
import './styles/PrintPendingUsers.css'
import { useNavigationHelpers } from '../AfterLoginComponents/Helpers/useNavigationHelpers';

const PrintPendingUsers = () => {
    const { handleUsernameClick } = useNavigationHelpers();
    const { listLength, notificationList, loading, refetch: getList } = useGetListFromIncomingRequests();

    useEffect(() => {
        getList(localStorage.getItem('id'));
    }, []);

    if (loading) {
        return <ProgressSpinner />;
    }


    return (
        <div className="pending-users">
            <h2 className="text-xl font-bold mb-4">Pending Requests ({listLength})</h2>
            {Array.isArray(notificationList) && notificationList.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                    {notificationList.map((user) => (
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
                                } } />
                            <div className="p-d-flex p-jc-between mt-3">
                            <Button label="Accept" className="p-button-success" />
                            <Button label="Reject" className="p-button-danger" />
                            </div>
                        </Card>
                    ))}
                </div>
            ) : (
                <p>No pending requests found.</p>
            )}
        </div>
    );
};

export default PrintPendingUsers;

//Routes.UserInfo.replace(':username', userInfo.userName)