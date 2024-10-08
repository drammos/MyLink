import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useGetUserPostedJobs from '../Services/Jobs/useGetUserPostedJobs';
import useCloseJob from '../Services/Jobs/useCloseJob';
import './styles/MyJobsComponent.css'
import useDeleteJob from '../Services/Jobs/useDeleteJob';
import MyJobUsersApplied from './MyJobUsersApplied';

const MyJobsComponent = ({ userInfo }) => {
    const { response: getJobsResponse, message: getJobsMessage, errorCode: getJobsErrorCode, loading: getJobsLoading, getJobsRefetch } = useGetUserPostedJobs();
    const { message: closeJobMessage, errorCode: closeErrorCode, loading: closeJobLoading, closeJobRefetch } = useCloseJob();
    const { message: deleteJobMessage, errorCode: deleteErrorCode, loading: deleteJobLoading, deleteJobRefetch } = useDeleteJob();


    const currentUserId = localStorage.getItem('id');
    const [jobs, setJobs] = useState([]);
    const [currentJobId, setCurrentJobId] = useState(null);

    useEffect(() => {
        getJobsRefetch(currentUserId);
    }, [userInfo]);

    useEffect(() => {
        if (getJobsResponse && getJobsResponse.data) {
            setJobs(getJobsResponse.data);
        }
    }, [getJobsResponse]);

    const handleCloseJob = async (postId) => {
        await closeJobRefetch(postId);
    };

    const handleDeleteJob = async (postId) => {
        await deleteJobRefetch(postId);
    };

    useEffect(() => {
        if (deleteErrorCode === 0) {
            setTimeout(() => { getJobsRefetch(); }, 2000);
        }
    }, [deleteErrorCode]);

    useEffect(() => {
        if (closeErrorCode === 0) {
            setTimeout(() => { getJobsRefetch(); }, 2000);
        }
    }, [closeErrorCode]);



    return (
        <div className="myjobs-container">
            <h3>My Jobs</h3>
            {jobs.length > 0 ? (
                <ul className="posts-list">
                    {jobs.map((job, index) => (
                        <li key={index} className="post-item">
                            <div className="post-header">
                                <h4>{job.title}</h4>
                                <button className="delete-button" onClick={() => handleDeleteJob(job.id)} disabled={closeJobLoading} >
                                    Delete job
                                </button>
                                <button className="delete-button" onClick={() => handleCloseJob(job.id)} disabled={closeJobLoading || !job.isActive} >
                                    Close Job
                                </button>
                            </div>
                            <p>{job.description}</p>

                            <div className="post-info">
                                <span><strong>Company: </strong>{' '}{job.companyName}</span>
                                <span><strong>Location: </strong>{' '}{job.location}</span>
                                <span><strong>Work Type: </strong>{' '}{job.workType}</span>
                                <span><strong>Category: </strong>{' '}{job.category}</span>
                                <span><strong>Status: </strong>{' '}{job.isActive ? 'Active' : 'Closed'}</span>
                            </div>

                            

                            <MyJobUsersApplied job={job} setCurrentJobId={setCurrentJobId} />
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="post-item">No jobs available</p>
            )}
        </div>
    );
};

MyJobsComponent.propTypes = {
    userInfo: PropTypes.shape({
        jobs: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string.isRequired,
            companyName: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            location: PropTypes.string.isRequired,
            workType: PropTypes.string.isRequired,
            locationType: PropTypes.number.isRequired,
            category: PropTypes.string.isRequired,
            postedDate: PropTypes.string.isRequired,
            isActive: PropTypes.bool.isRequired,
            commentsCount: PropTypes.number,
            reactionsCount: PropTypes.number,
            createdAt: PropTypes.string.isRequired
        }))
    }).isRequired
};

export default MyJobsComponent;