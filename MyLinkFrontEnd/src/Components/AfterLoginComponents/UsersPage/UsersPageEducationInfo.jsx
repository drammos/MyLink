import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { agents } from '../../../agents';
import './styles/UsersPageExperienceInfo.css';
import useService from '../../Services/useService';

const UsersPageExperienceInfo = ({ userInfo }) => {
    const [educations, setEducations] = useState([]);

    const [error, setError] = useState('');
  
    console.log("id:",userInfo);
    const url = agents.localhost + agents.getEducations + '?UserId=' + userInfo.id;
    const { response, loading, refetch } = useService(
      'Getting all educations ...',
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
            setEducations(response.data);
        } else {
            console.log(response.data.detail);
            setError(response.data.detail);
        }
      }
    }, [response]);
  
  

  
    return (
        <div className="education-component">
            <h2>Education</h2>
            {error && <p className="error">{error}</p>}
            <div className="education-list-container">
                <ul className="education-list">
                {educations.map((edu, index) => (
                    <li key={index} className="education-item">
                    <h3>School: {edu.school}</h3>
                    <p>Degree: {edu.degree} </p>
                    <p>Field of Study: {edu.fieldOfStudy}</p>
                    <p>{new Date(edu.startDate).toLocaleDateString()} - {edu.endDate ? new Date(edu.endDate).toLocaleDateString() : 'Present'}</p>
                    {edu.grade && <p>Grade: {edu.grade}</p>}
                    {edu.description && <p>{edu.description}</p>}
                    </li>
                ))}
                </ul>
            </div>
        </div>

      
    );
};

UsersPageExperienceInfo.propTypes = {
    userInfo: PropTypes.shape({
        educations: PropTypes.arrayOf(PropTypes.shape({
            degree: PropTypes.string,
            institution: PropTypes.string,
            startDate: PropTypes.string,
            endDate: PropTypes.string,
        }))
    }).isRequired,
};

export default UsersPageExperienceInfo;
