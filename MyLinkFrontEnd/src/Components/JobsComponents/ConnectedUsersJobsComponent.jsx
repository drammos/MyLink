import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import './styles/ConnectedUsersJobsComponent.css';
import useGetFilteredJobs from '../Services/Jobs/useGetFilteredJobs';
import AppPagination from '../Pagination/AppPagination';
import useApplyForJob from '../Services/Jobs/useApplyForJob';
import useGetUserStatusJobs from '../Services/Jobs/useGetUserStatusJobs';

const ConnectedUsersJobsComponent = ({ userInfo }) => {
    const [jobs, setJobs] = useState([]);
    const [appliedJobIds, setAppliedJobIds] = useState([]);
    const currentUserId = localStorage.getItem('id');
    const currentUserUsername = localStorage.getItem('username');

    const { getJobsResponse, getJobsMessage, getJobsErrorCode, getJobsLoading, getJobsRefetch } = useGetFilteredJobs();
    const { getStatusResponse, getStatusJobsRefetch } = useGetUserStatusJobs();
    const { applyForJobMessage, applyForJobErrorCode, applyForJobLoading, applyForJobRefetch } = useApplyForJob();

    //#region filters

    const [selectedWorkType, setSelectedWorkType] = useState('');
    const [selectedLocationType, setSelectedLocationType] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const workTypes = ['Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship'];
    const locationTypes = ['On-site', 'Remote', 'Hybrid'];
    const categories = ['Technology', 'Finance', 'Healthcare', 'Education', 'Marketing', 'Other'];

    const filteredJobs = jobs.filter(job => {
        return (
            (selectedWorkType === '' || job.workType === selectedWorkType) &&
            (selectedLocationType === '' || job.locationType === selectedLocationType) &&
            (selectedCategory === '' || job.category === selectedCategory)
        );
    });

    const clearFilter = (filterType) => {
        switch (filterType) {
            case 'workType':
                setSelectedWorkType('');
                break;
            case 'locationType':
                setSelectedLocationType('');
                break;
            case 'category':
                setSelectedCategory('');
                break;
            default:
                break;
        }
    };


    //#endregion

    //#region pagination
    const [metadata, setMetadata] = useState({
        currentPage: 1,
        totalPages: 1,
        pageSize: 6,
        totalCount: 0,
    });

    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(8);
    //#endregion


    const handleApply = (jobId) => {
        setAppliedJobIds([...appliedJobIds, jobId]);
        applyForJobRefetch(jobId, currentUserUsername);
    };

    useEffect(() => {
        console.log("refetch ---------> ", pageNumber);
        getJobsRefetch(currentUserId, 150, '', '', '', pageNumber, pageSize);
    }, [pageNumber, currentUserId]);

    useEffect(() => {
        getStatusJobsRefetch(currentUserUsername, "Applied");
    }, []);

    useEffect(() => {
        if (getStatusResponse) {
            const jobIdsList = getStatusResponse.data.map(job => job.jobId);
            setAppliedJobIds(jobIdsList);
        }
    }, [getStatusResponse]);

    useEffect(() => {
        if (getJobsErrorCode === 0) {
            if (getJobsResponse) {
                setJobs(getJobsResponse.data);
                const paginationJson = JSON.parse(getJobsResponse.headersDict['pagination']);
                setMetadata(paginationJson);
            }
        }
    }, [getJobsErrorCode, getJobsResponse]);

    return (
        <div className="connected-user-jobs">
            <h2>New Job opportunities</h2>

            {/* Filters */}
            <div className="filters">
                <div className="filter-group">
                    <Dropdown
                        value={selectedWorkType}
                        options={workTypes}
                        onChange={(e) => setSelectedWorkType(e.value)}
                        placeholder="Select Work Type"
                    />
                    {selectedWorkType && (
                        <Button
                            label="Clear"
                            className="p-button-danger p-ml-2"
                            onClick={() => clearFilter('workType')}
                        />
                    )}
                </div>

                <div className="filter-group">
                    <Dropdown
                        value={selectedLocationType}
                        options={locationTypes}
                        onChange={(e) => setSelectedLocationType(e.value)}
                        placeholder="Select Location Type"
                    />
                    {selectedLocationType && (
                        <Button
                            label="Clear"
                            className="p-button-danger p-ml-2"
                            onClick={() => clearFilter('locationType')}
                        />
                    )}
                </div>

                <div className="filter-group">
                    <Dropdown
                        value={selectedCategory}
                        options={categories}
                        onChange={(e) => setSelectedCategory(e.value)}
                        placeholder="Select Category"
                    />
                    {selectedCategory && (
                        <Button
                            label="Clear"
                            className="p-button-danger p-ml-2"
                            onClick={() => clearFilter('category')}
                        />
                    )}
                </div>
            </div>


            {/* Display filtered jobs */}
            {filteredJobs.map(job => (
                <Card key={job.id} className="job-card">
                    <h3>{job.title}</h3>
                    <p className="company-name">{job.companyName}</p>
                    <p>{job.description}</p>
                    <div className="job-details">
                        <span>{job.location}</span>
                        <span>{job.workType}</span>
                        <span>{job.locationType}</span>
                    </div>
                    <p className="category">Category: {job.category}</p>
                    <Button
                        label={appliedJobIds.includes(job.id) ? "Applied" : "Apply"}
                        className={`apply-button ${appliedJobIds.includes(job.id) ? 'applied' : ''}`}
                        onClick={() => handleApply(job.id)}
                        disabled={appliedJobIds.includes(job.id)}
                    />
                </Card>
            ))}

            <div className="pagination">
                <AppPagination
                    metadata={metadata}
                    onPageChange={(page) => setPageNumber(page)}
                />
            </div>
        </div>
    );
}

export default ConnectedUsersJobsComponent;