import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import './styles/ConnectedUsersJobsComponent.css';

const ConnectedUsersJobsComponent = ({ userInfo }) => {
    const [jobs, setJobs] = useState([]);

    // Simulating fetching jobs from an API
    useEffect(() => {
        // This would typically be an API call
        setJobs(testJobs);
    }, []);

    const handleApply = (jobId) => {
        setJobs(jobs.map(job =>
            job.id === jobId ? { ...job, hasApplied: true } : job
        ));
    };

    return (
        <div className="connected-user-jobs">
            <h2>New Job opportunities</h2>
            {jobs.map(job => (
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
                        label={job.hasApplied ? "Applied" : "Apply"}
                        className={`apply-button ${job.hasApplied ? 'applied' : ''}`}
                        onClick={() => handleApply(job.id)}
                        disabled={job.hasApplied}
                    />
                </Card>
            ))}
        </div>
    );
};

// Test data
const testJobs = [
    {
        id: 1,
        title: "Software Engineer",
        companyName: "TechCorp",
        description: "We are looking for a skilled software engineer to join our team.",
        location: "San Francisco, CA",
        workType: "Full-time",
        locationType: "Hybrid",
        category: "Technology",
        hasApplied: false
    },
    {
        id: 2,
        title: "Marketing Manager",
        companyName: "AdGenius",
        description: "Seeking an experienced marketing manager to lead our campaigns.",
        location: "New York, NY",
        workType: "Full-time",
        locationType: "On-site",
        category: "Marketing",
        hasApplied: true
    },
    {
        id: 3,
        title: "Data Analyst Intern",
        companyName: "DataDive",
        description: "Great opportunity for a data analysis intern to gain real-world experience.",
        location: "Remote",
        workType: "Internship",
        locationType: "Remote",
        category: "Technology",
        hasApplied: false
    }
];

export default ConnectedUsersJobsComponent;