import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { agents } from '../../../agents';
import './styles/ExperienceComponent.css';
import useService from '../../Services/useService';

const ExperienceComponent = ({ userInfo }) => {
  const [experiences, setExperiences] = useState([]);
  const [data, setData] = useState(null);
  const inputFormData = new FormData();
  const [newExperience, setNewExperience] = useState({
    title: '',
    employmentType: '',
    companyName: '',
    location: '',
    locationType: '',
    startDate: '',
    endDate: '',
    currentJob: false,
    description: '',
    isPublic: true,
  });
  const [error, setError] = useState('');

  const url = agents.localhost + agents.getExperiences + '?UserId=' + userInfo.id;
  const { response, loading, refetch } = useService(
    'Getting all Experiences ...',
    'GET',
    url,
    null,
    undefined,
    true
  );

  useEffect(() => {
    refetch();
  }, [userInfo]);

  useEffect(() => {
    if (response) {
      if (response.status === 200) {
        setExperiences(response.data);
      } else {
        console.log(response.data.detail);
        setError(response.data.detail);
      }
    }
  }, [response]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewExperience(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const url2 = agents.localhost + agents.addExperience;

  const alltogether = useService(
    'Add Experience ...',
    'POST',
    url2,
    data,
    'multipart/form-data'
  );

  useEffect(() => {
    if (data != null) {
      alltogether.refetch(); 
    }
  }, [data]);

  useEffect(() => {
    if (alltogether.response) {
      if (alltogether.response.status === 200) {
        refetch();
        setNewExperience({
          title: '',
          employmentType: '',
          companyName: '',
          location: '',
          locationType: '',
          startDate: '',
          endDate: '',
          currentJob: false,
          description: '',
          isPublic: true,
        });
        setData(null);
      } else {
        console.log(alltogether.response.data.detail);
        setError(alltogether.response.data.detail);
        setData(null);
      }
    }
  }, [alltogether.response, data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    inputFormData.append('UserId', userInfo.id);
    inputFormData.append('Title', newExperience.title);
    inputFormData.append('EmploymentType', newExperience.employmentType);
    inputFormData.append('CompanyName', newExperience.companyName);
    inputFormData.append('Location', newExperience.location);
    inputFormData.append('LocationType', newExperience.locationType);
    inputFormData.append('StartDate', newExperience.startDate);
    inputFormData.append('EndDate', newExperience.endDate);
    inputFormData.append('CurrentJob', newExperience.currentJob);
    inputFormData.append('Description', newExperience.description);
    inputFormData.append('IsPublic', newExperience.isPublic);
    setData(inputFormData);
  };

  return (
    <div className="experience-component">
      <h2>Experience</h2>
      {error && <p className="error">{error}</p>}
      <div className="experience-content">
        <div className="experience-form-container">
          <form onSubmit={handleSubmit} className="experience-form">
            <h3>Add New Experience</h3>
            <input
              type="text"
              name="title"
              value={newExperience.title}
              onChange={handleInputChange}
              placeholder="Job Title"
              required
            />
            <input
              type="text"
              name="employmentType"
              value={newExperience.employmentType}
              onChange={handleInputChange}
              placeholder="Employment Type"
            />
            <input
              type="text"
              name="companyName"
              value={newExperience.companyName}
              onChange={handleInputChange}
              placeholder="Company Name"
              required
            />
            <input
              type="text"
              name="location"
              value={newExperience.location}
              onChange={handleInputChange}
              placeholder="Location"
            />
            <input
              type="text"
              name="locationType"
              value={newExperience.locationType}
              onChange={handleInputChange}
              placeholder="Location Type"
            />
            <input
              type="date"
              name="startDate"
              value={newExperience.startDate}
              onChange={handleInputChange}
              required
            />
            <input
              type="date"
              name="endDate"
              value={newExperience.endDate}
              onChange={handleInputChange}
              disabled={newExperience.currentJob}
            />
            <label>
              <input
                type="checkbox"
                name="currentJob"
                checked={newExperience.currentJob}
                onChange={handleInputChange}
              />
              Current Job
            </label>
            <textarea
              name="description"
              value={newExperience.description}
              onChange={handleInputChange}
              placeholder="Description"
            />
            <label>
              <input
                type="checkbox"
                name="isPublic"
                checked={newExperience.isPublic}
                onChange={handleInputChange}
              />
              Public
            </label>
            <button type="submit">Add Experience</button>
          </form>
        </div>
        <div className="experience-list-container">
          <ul className="experience-list">
            {experiences.map((exp, index) => (
              <li key={index} className="experience-item">
                <h3>{exp.title}</h3>
                <p>{exp.companyName}</p>
                <p>{exp.employmentType}</p>
                <p>{new Date(exp.startDate).toLocaleDateString()} - {exp.currentJob ? 'Present' : new Date(exp.endDate).toLocaleDateString()}</p>
                {exp.location && <p>Location: {exp.location} ({exp.locationType})</p>}
                {exp.description && <p>{exp.description}</p>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

ExperienceComponent.propTypes = {
  userInfo: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default ExperienceComponent;