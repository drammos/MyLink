import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './NotificationPopup.css';
import { useNavigationHelpers } from '../../Helpers/useNavigationHelpers';
import useAcceptRequest from '../../../Services/User/useAcceptRequest';
import useDeleteRequest from '../../../Services/User/useDeleteRequest';
import { Button } from 'primereact/button';

const NotificationPopup = ({ notificationsPending, notificationsReactions }) => {
    const { handleUsernameClick } = useNavigationHelpers();
    const currentUser = localStorage.getItem('id');
    const { errorCode: acceptErrorCode, message: acceptMessage, loading: acceptLoading, acceptRequestRefetch } = useAcceptRequest();
    const { errorCode: deleteErrorode, message: deleteMessage, loading: deleteLoading, deleteRequestRefetch } = useDeleteRequest();

    useEffect(() => {
        console.log("Notifications are: ", notificationsPending);
    }, [notificationsPending]);

    // #region Connection answer
    const [resultMessage, setResultMessage] = useState(null);
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
        <div className="notification-popup">
            <h3>Notifications</h3>
            <ul>
                {notificationsPending.length > 0 ? (
                    notificationsPending.map((notification, index) => (

                        <li key={index} className="notification-item" > 
                            <img
                                src={notification.pictureURL}
                                alt={`${notification.firstName} ${notification.lastName}`}
                                className="notification-image"
                                onClick={() => handleUsernameClick(notification.userName)}
                            />
                            <span className="buttons" onClick={() => handleUsernameClick(notification.userName)}>
                                {notification.firstName} {notification.lastName} sends you a friend request</span>
                            <div className="p-d-flex p-jc-between mt-3">
                                <Button label="Accept" className="p-button-success" onClick={() => handleAccept(notification.id)} />
                                <Button label="Reject" className="p-button-danger" onClick={() => handleReject(notification.id)} />
                            </div>
                        </li>
                    ))
                ) : (
                        <li style={{ color: 'black' }}>You haven&apos;t any new friend request</li>
                )}
                {notificationsReactions.length > 0 ? (
                    notificationsReactions.map((notificationReaction, index) => (
                        <li key={index} className="notification-item" onClick={() => handleUsernameClick(notificationReaction.userName)} > 
                            <img
                                src={notificationReaction.pictureURL}
                                alt={`${notificationReaction.firstName} ${notificationReaction.lastName}`}
                                className="notification-image"
                            />
                            <span className="buttons">
                                {notificationReaction.isComment ? (
                                    <> <strong> {notificationReaction.firstName} {notificationReaction.lastName} </strong>  commented on your post
                                        <strong> {notificationReaction.postTitle} </strong>  this  <br />
                                        <strong style={{ color: '#1fb4c2' }}>{notificationReaction.body}</strong> </>
                                ) : (
                                    <> {notificationReaction.firstName} {notificationReaction.lastName} liked your post </>
                                )}
                            </span>
                        </li>
                    ))
                ) : (
                        <li>You haven&apos;t any new reaction</li> 
                )}
            </ul>
        </div>
    );
};

NotificationPopup.propTypes = {
    notificationsPending: PropTypes.arrayOf(
        PropTypes.shape({
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,
            pictureURL: PropTypes.string.isRequired,
        })
    ).isRequired,
    notificationsReactions: PropTypes.arrayOf(
        PropTypes.shape({
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,
            pictureURL: PropTypes.string.isRequired,
            isComment: PropTypes.bool.isRequired,
            body: PropTypes.string.isRequired,
            postId: PropTypes.number.isRequired,
        })
    ).isRequired,
};

export default NotificationPopup;
