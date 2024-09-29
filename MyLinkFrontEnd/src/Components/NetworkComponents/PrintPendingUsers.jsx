import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { ProgressSpinner } from 'primereact/progressspinner';
import useGetListFromIncomingRequests from '../Services/useGetListFromIncomingRequests';
import useAcceptRequest from '../Services/User/useAcceptRequest';
import useDeleteRequest from '../Services/User/useDeleteRequest';
import './styles/PrintPendingUsers.css'
import { useNavigationHelpers } from '../AfterLoginComponents/Helpers/useNavigationHelpers';

const PrintPendingUsers = () => {
    const [resultMessage, setResultMessage] = useState(null);
    const { handleUsernameClick } = useNavigationHelpers();
    const { listLength, notificationList, loading, refetch: getList } = useGetListFromIncomingRequests();
    const { errorCode: acceptErrorCode, message: acceptMessage, loading: acceptLoading, acceptRequestRefetch } = useAcceptRequest();
    const { errorCode: deleteErrorode, message: deleteMessage, loading: deleteLoading, deleteRequestRefetch } = useDeleteRequest();
    const currentUser = localStorage.getItem('id');

    useEffect(() => {
        getList(localStorage.getItem('id'));
    }, []);

    useEffect(() => {
        console.log("===============================");
        getList(localStorage.getItem('id'));
    }, [resultMessage]);

    if (loading) {
        return <ProgressSpinner />;
    }

    // #region Connection answer

    const handleAccept = async (userId) => {
        try {
            await acceptRequestRefetch(userId, currentUser);
            setResultMessage({ severity: 'success', text: acceptMessage || 'Request accepted successfully' });
            window.location.reload();

        } catch (error) {
            setResultMessage({ severity: 'error', text: `Error accepting request: ${acceptErrorCode}` });
            window.location.reload();

        }
    };

    const handleReject = async (userId) => {
        try {
            await deleteRequestRefetch(userId, currentUser);
            setResultMessage({ severity: 'info', text: deleteMessage || 'Request rejected successfully' });
            window.location.reload();

        } catch (error) {
            setResultMessage({ severity: 'error', text: `Error rejecting request: ${deleteErrorode}` });
        }
    };

    //#endregion


    return (
        <div className="pending-users">
            {resultMessage && (
                <Message
                    severity={resultMessage.severity}
                    text={resultMessage.text}
                    style={{ marginBottom: '1rem' }}
                />
            )}
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
                                }} />
                            <div className="p-d-flex p-jc-between mt-3">
                                <Button label="Accept" className="p-button-success" onClick={() => handleAccept(user.id)} />
                                <Button label="Reject" className="p-button-danger" onClick={() => handleReject(user.id)} />
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