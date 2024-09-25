import React from 'react';
import PropTypes from 'prop-types';

const EducationInfo = ({ userInfo }) => {
    const educations = userInfo.educations || []; 
    return (
        <div className="education-info-container">
            <h3>Education</h3>
            {educations.length > 0 ? (
                <ul>
                    {educations.map((education, index) => (
                        <li key={index}>
                            <p>{education.degree} - {education.institution}</p>
                            <p>{education.startDate} to {education.endDate}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No education information available</p>
            )}
        </div>
    );
};

EducationInfo.propTypes = {
    userInfo: PropTypes.shape({
        educations: PropTypes.arrayOf(PropTypes.shape({
            degree: PropTypes.string,
            institution: PropTypes.string,
            startDate: PropTypes.string,
            endDate: PropTypes.string,
        }))
    }).isRequired,
};

export default EducationInfo;
