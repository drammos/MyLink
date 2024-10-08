import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import './styles/ConnectedUsersJobsComponent.css';
import useGetFilteredJobs from '../Services/Jobs/useGetFilteredJobs';
import AppPagination from '../Pagination/AppPagination';
import useApplyForJob from '../Services/Jobs/useApplyForJob';
import useGetUserStatusJobs from '../Services/Jobs/useGetUserStatusJobs';
import { agents } from '../../agents';
import useService from '../Services/useService';
import useGetProposedJobs from '../Services/Jobs/useGetProposedJobs';

const ConnectedUsersJobsComponent = ({ userInfo }) => {
    const [jobs, setJobs] = useState([]);
    const [appliedJobIds, setAppliedJobIds] = useState([]);
    const currentUserId = localStorage.getItem('id');
    const currentUserUsername = localStorage.getItem('username');

    const { getJobsResponse, getJobsMessage, getJobsErrorCode, getJobsLoading, getJobsRefetch } = useGetFilteredJobs();
    const { getJobsMatrixResponse, getJobsMatrixMessage, getJobsMatrixErrorCode, getJobsMatrixLoading, getJobsMatrixRefetch } = useGetProposedJobs();
    
    const { getStatusResponse, getStatusJobsRefetch } = useGetUserStatusJobs();
    const { applyForJobMessage, applyForJobErrorCode, applyForJobLoading, applyForJobRefetch } = useApplyForJob();
    const [data, setData] = useState(null);
    //#region filters

    const [selectedWorkType, setSelectedWorkType] = useState('');
    const [selectedLocationType, setSelectedLocationType] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedDatePosted, setSelectedDatePosted] = useState('None');

    const workTypes = ['Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship'];
    const locationTypes = ['On-site', 'Remote', 'Hybrid'];
    const categories = ['Technology', 'Finance', 'Healthcare', 'Education', 'Marketing', 'Other'];
    const datePosted = ['Today', 'Yesterday', 'This Week', 'This Month'];

    const datePostedOptions = [
        { label: 'Today', value: 1 },
        { label: 'Yesterday', value: 2 },
        { label: 'This Week', value: 7 },
        { label: 'This Month', value: 15 },
        { label: 'None', value: 180 },
    ];


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
            case 'date':
                setSelectedDatePosted('None');
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
        getJobsMatrixRefetch(currentUserId, pageNumber, pageSize);
    }, [currentUserId]);

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

    useEffect(() => {
        if (getJobsMatrixErrorCode === 0) {
            if (getJobsMatrixResponse) {
                setJobs(getJobsMatrixResponse.data);
                const paginationJson = JSON.parse(getJobsMatrixResponse.headersDict['pagination']);
                setMetadata(paginationJson);
            }
        }
    }, [getJobsMatrixErrorCode, getJobsMatrixResponse]);

    useEffect(() => {
        if(selectedCategory === '' && selectedLocationType === '' && selectedWorkType === '' && selectedDatePosted === 'None'){
            getJobsMatrixRefetch(currentUserId, pageNumber, pageSize);
        }
        else{
            if (datePostedOptions.find(option => option.label === selectedDatePosted).value)
                getJobsRefetch(currentUserId, datePostedOptions.find(option => option.label === selectedDatePosted).value,
                    selectedLocationType, selectedWorkType, selectedCategory, pageNumber, pageSize);
            else
            {
                getJobsRefetch(currentUserId, 180,
                    selectedLocationType, selectedWorkType, selectedCategory, pageNumber, pageSize);       
            }       
        }


        
    }, [pageNumber, pageSize, selectedCategory, selectedLocationType, selectedWorkType, selectedDatePosted, currentUserId, datePostedOptions]);


    const urlForJob = agents.localhost + agents.addViewedJob;

    const myPostedService = useService(
        'Posted ...',
        'POST',
        urlForJob,
        data,
        'multipart/form-data',
        true
    );
    
    useEffect(() => {
        if (data != null) {
            myPostedService.refetch(); 
        }
    }, [data]);
    
    useEffect(() => {
        if (myPostedService.response) {
          if (myPostedService.response.status === 200) {
            setData(null);
          } else {
            setError(myPostedService.response.data.detail);
            setData(null);
          }
        }
    }, [myPostedService.response, data]);

    const handleJobClick = (jobId) => {
        const userId = localStorage.getItem('id');    
        const informdata = new FormData();
            

        informdata.append("UserId", userId);
        informdata.append("JobId", jobId);

        setData(informdata);
    };

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

            <div className="filter-group">
                <Dropdown
                    value={selectedDatePosted}
                    options={datePosted}
                    onChange={(e) => setSelectedDatePosted(e.value)}
                    placeholder="Date Posted"
                />
                {selectedDatePosted !== 'None' && (
                    <Button
                        label="Clear"
                        className="p-button-danger p-ml-2"
                        onClick={() => clearFilter('date')}
                    />
                )}
            </div>


            {/* Display filtered jobs */}
            {jobs.map(job => (
                <Card key={job.id} className="job-card" onClick={() =>  handleJobClick(job.id) }>
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