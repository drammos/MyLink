import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import './styles/CreateJobComponent.css';
import useCreateJob from '../Services/Jobs/useCreateJob';
import { GoXCircle, GoCheckCircle } from "react-icons/go";

const CreateJobComponent = ({ userInfo, handleMyJobs }) => {
    const { response: createJobResponse , message: createJobMessage, errorCode: createJobErrorCode, loading, createJobRefetch } = useCreateJob();
    const [jobData, setJobData] = useState({
        title: '',
        companyName: '',
        description: '',
        location: '',
        workType: '',
        locationType: '',
        category: ''
    });

    const currentUserId = localStorage.getItem('id');
    const workTypes = ['Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship'];
    const locationTypes = ['On-site', 'Remote', 'Hybrid'];
    const categories = ['Technology', 'Finance', 'Healthcare', 'Education', 'Marketing', 'Other'];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setJobData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createJobRefetch(currentUserId, jobData.title, jobData.companyName, jobData.description, jobData.location,
            jobData.workType, jobData.location, jobData.category);

    };

    useEffect(() => {
        
        if (createJobErrorCode === 0) {
            setJobData({
                title: '',
                companyName: '',
                description: '',
                location: '',
                workType: '',
                locationType: '',
                category: ''
            });
        }
    }, [createJobErrorCode]);

    return (
        <>
            <Button type="pageRedirect" label="My Jobs" className="create-job-button" onClick={handleMyJobs} />
        <div className="create-job-container">
            <h2>Create a New Job Posting</h2>
            <form onSubmit={handleSubmit} className="create-job-form">
                <div className="form-field">
                    <label htmlFor="title">Job Title</label>
                    <InputText id="title" name="title" value={jobData.title} onChange={handleInputChange} required />
                </div>
                <div className="form-field">
                    <label htmlFor="companyName">Company Name</label>
                    <InputText id="companyName" name="companyName" value={jobData.companyName} onChange={handleInputChange} required />
                </div>
                <div className="form-field">
                    <label htmlFor="description">Job Description</label>
                    <InputTextarea id="description" name="description" value={jobData.description} onChange={handleInputChange} rows={5} required />
                </div>
                <div className="form-field">
                    <label htmlFor="location">Location</label>
                    <InputText id="location" name="location" value={jobData.location} onChange={handleInputChange} required />
                </div>
                <div className="form-field">
                    <label htmlFor="workType">Work Type</label>
                    <Dropdown id="workType" name="workType" value={jobData.workType} options={workTypes} onChange={handleInputChange} placeholder="Select Work Type" required />
                </div>
                <div className="form-field">
                    <label htmlFor="locationType">Location Type</label>
                    <Dropdown id="locationType" name="locationType" value={jobData.locationType} options={locationTypes} onChange={handleInputChange} placeholder="Select Location Type" required />
                </div>
                <div className="form-field">
                    <label htmlFor="category">Job Category</label>
                    <Dropdown id="category" name="category" value={jobData.category} options={categories} onChange={handleInputChange} placeholder="Select Job Category" required />
                </div>
                    <Button type="submit" label="Create Job" className="create-job-button" />

                </form>
                <div className={loading ? 'loading' : (createJobErrorCode === 1 ? 'error-message-job' : (createJobErrorCode === 0 ? 'success-message-job' : ''))}>
                    {loading ? (<></>) : (createJobErrorCode === 1 ? (<><GoXCircle /> {createJobMessage}</>) : (createJobErrorCode === 0 ? (<><GoCheckCircle /> {createJobMessage}</>) : ''))}
                </div>
                {loading && <p className="loading">Loading...</p>}
            </div>
        </>
    );
};

export default CreateJobComponent;