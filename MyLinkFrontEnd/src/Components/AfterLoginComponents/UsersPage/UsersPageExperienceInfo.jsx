import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { agents } from '../../../agents';
import './styles/ExperienceInfo.css';
import useService from '../../Services/useService';

const ExperienceInfo = ({ userInfo }) => {
    const [experiences, setExperiences] = useState([]);
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
  
    return (
      <div className="experience-component">
        <h2>Experience</h2>
        {error && <p className="error">{error}</p>}
        <div className="experience-content">
          <div className="experience-list-container">
            <ul className="experience-list">
              {experiences.map((exp, index) => (
                <li key={index} className="experience-item">
                  <h3>Title: {exp.title}</h3>
                  <p>Company Name: {exp.companyName}</p>
                  <p>Employment Type: {exp.employmentType}</p>
                  <p>{new Date(exp.startDate).toLocaleDateString()} - {exp.currentJob ? 'Present' : new Date(exp.endDate).toLocaleDateString()}</p>
                  <p>Location Type: {exp.locationType}</p>
                  <p>Location: {exp.location}</p>
                  {exp.description && <p>{exp.description}</p>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };
  
ExperienceInfo.propTypes = {
    userInfo: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
};

export default ExperienceInfo;
