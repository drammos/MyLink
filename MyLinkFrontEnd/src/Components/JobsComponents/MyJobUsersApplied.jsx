import { useState, useEffect } from 'react';
import { FaUserFriends, FaCalendarAlt } from 'react-icons/fa';
import PropTypes from 'prop-types';
import useGetJobApplicationsForPost from '../Services/Jobs/useGetJobApplicationsForPost';
import { Routes } from '../../routes';
import { Tag } from 'primereact/tag';


import { Button } from 'primereact/button';
import './styles/MyJobsComponent.css';

const MyJobUsersApplied = ({ job, setCurrentJobId}) => {
    const { getApplicationsResponse, getApplicationsMessage, getApplicationsErrorCode, loading, getApplicationsRefetch } = useGetJobApplicationsForPost();

    const [users, setUsers] = useState({});
    const [visibleUsers, setVisibleUsers] = useState({});

    const toggleUsersVisibility = (jobId) => {
        setVisibleUsers(prevState => ({
            ...prevState,
            [jobId]: !prevState[jobId]
        }));
        console.log('mpainei?????????', jobId, users[jobId]); 

        if (!users[jobId]) {
            console.log('mpainei?????????');
            if (jobId) {
                setCurrentJobId(jobId);
                getApplicationsRefetch(jobId);
            }
        }
    };

    useEffect(() => {
        console.log("--------------:", getApplicationsResponse, job.id);
        if (getApplicationsResponse) {
            if (getApplicationsResponse.status === 200) {
                setUsers(prevState => ({
                    ...prevState,
                    [job.id]: getApplicationsResponse.data || []
                }));
            }
        }
    }, [getApplicationsResponse]);

    return (
        <>
            <div className="post-info">
                <button className="comments-count-button" label={"Users applied"} onClick={() => toggleUsersVisibility(job.id)}>
                    <FaUserFriends /> Users applied
                </button>
                <span><FaCalendarAlt /> Posted on: {new Date(job.postedDate).toLocaleDateString()}</span>
            </div>


            {visibleUsers[job.id] && (
                <div className="appliedusers-section">
                    {users[job.id] && users[job.id].length > 0 ? (
                        <ul className="appliedusers-list">
                            {users[job.id].map((user, index) => (
                                <li key={index} className="appliedusers-item">
                                    <strong>
                                        <a href={Routes.UserInfo.replace(':username', user.username)}
                                            className="appliedusers-link"> {user.username} </a>
                                    </strong>
                                    <span className="appliedusers-date">
                                        {new Date(user.appliedDate).toLocaleString()}
                                    </span>
                                    <Tag severity="success" value="Applied"></Tag>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No users applied yet.</p>
                    )}
                </div>
            )}
        </>
    );
};

MyJobUsersApplied.propTypes = {
    toggleUsersVisibility: PropTypes.func.isRequired, 
    setCurrentJobId: PropTypes.func.isRequired, 
    getApplicationsRefetch: PropTypes.func.isRequired, 
    getApplicationsResponse: PropTypes.array,
    visibleUsers: PropTypes.objectOf(PropTypes.bool).isRequired, 
    //jobId: PropTypes.string.isRequired, 
    job: PropTypes.string.isRequired, 
    users: PropTypes.objectOf(
        PropTypes.arrayOf(
            PropTypes.shape({
                firstName: PropTypes.string.isRequired,
                lastName: PropTypes.string.isRequired,
                content: PropTypes.string.isRequired,
                createdAt: PropTypes.string.isRequired, 
            })
        )
    ).isRequired, 
};

export default MyJobUsersApplied;
