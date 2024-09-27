import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { agents } from '../../../agents';
import './styles/EducationComponent.css';
import useService from '../../Services/useService';

const EducationComponent = ({ userInfo }) => {
  const [educations, setEducations] = useState([]);
  const [data, setData] = useState(null);
  const inputFormData = new FormData();
  const [newEducation, setNewEducation] = useState({
    school: '',
    degree: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: '',
    grade: '',
    description: '',
    isPublic: true,
  });
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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewEducation(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const url2 = agents.localhost + agents.addEducation;

  const alltogether = useService(
    'Add educations ...',
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
            setNewEducation({
              school: '',
              degree: '',
              fieldOfStudy: '',
              startDate: '',
              endDate: '',
              grade: '',
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
    inputFormData.append('School', newEducation.school);
    inputFormData.append('UserId', userInfo.id);
    inputFormData.append('Degree', newEducation.degree);
    inputFormData.append('FieldOfStudy', newEducation.fieldOfStudy);
    inputFormData.append('StartDate', newEducation.startDate);
    inputFormData.append('EndDate', newEducation.endDate);
    inputFormData.append('Grade', newEducation.grade);
    inputFormData.append('Description', newEducation.description);
    inputFormData.append('IsPublic', newEducation.isPublic);
    setData(inputFormData);
  };

  return (
    <div className="education-component">
      <h2>Education</h2>
      {error && <p className="error">{error}</p>}
      <div className="education-content">
        <div className="education-form-container">
          <form onSubmit={handleSubmit} className="education-form">
            <h3>Add New Education</h3>
            <input
              type="text"
              name="school"
              value={newEducation.school}
              onChange={handleInputChange}
              placeholder="School"
              required
            />
            <input
              type="text"
              name="degree"
              value={newEducation.degree}
              onChange={handleInputChange}
              placeholder="Degree"
            />
            <input
              type="text"
              name="fieldOfStudy"
              value={newEducation.fieldOfStudy}
              onChange={handleInputChange}
              placeholder="Field of Study"
            />
            <input
              type="date"
              name="startDate"
              value={newEducation.startDate}
              onChange={handleInputChange}
              required
            />
            <input
              type="date"
              name="endDate"
              value={newEducation.endDate}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="grade"
              value={newEducation.grade}
              onChange={handleInputChange}
              placeholder="Grade"
            />
            <textarea
              name="description"
              value={newEducation.description}
              onChange={handleInputChange}
              placeholder="Description"
            />
            <label>
              <input
                type="checkbox"
                name="isPublic"
                checked={newEducation.isPublic}
                onChange={handleInputChange}
              />
              Public
            </label>
            <button type="submit">Add Education</button>
          </form>
        </div>
        <div className="education-list-container">
          <ul className="education-list">
            {educations.map((edu, index) => (
              <li key={index} className="education-item">
                <h3>{edu.school}</h3>
                <p>{edu.degree} in {edu.fieldOfStudy}</p>
                <p>{new Date(edu.startDate).getFullYear()} - {edu.endDate ? new Date(edu.endDate).getFullYear() : 'Present'}</p>
                {edu.grade && <p>Grade: {edu.grade}</p>}
                {edu.description && <p>{edu.description}</p>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
EducationComponent.propTypes = {
  userInfo: PropTypes.shape({
      educations: PropTypes.arrayOf(PropTypes.shape({
          degree: PropTypes.string,
          institution: PropTypes.string,
          startDate: PropTypes.string,
          endDate: PropTypes.string,
      }))
  }).isRequired,
};
export default EducationComponent;