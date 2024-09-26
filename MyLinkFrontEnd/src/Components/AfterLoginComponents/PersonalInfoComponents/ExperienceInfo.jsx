import React from 'react';
import PropTypes from 'prop-types';

const ExperienceInfo = ({ userInfo }) => {
    const experiences = userInfo.experiences || []; // Extract experiences from userInfo

    return (
        <div className="experience-info-container">
            <h3>Experience</h3>
            {experiences.length > 0 ? (
                <ul>
                    {experiences.map((experience, index) => (
                        <li key={index}>
                            <p>{experience.jobTitle} - {experience.company}</p>
                            <p>{experience.startDate} to {experience.endDate}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No experience information available</p>
            )}
        </div>
    );
};

ExperienceInfo.propTypes = {
    userInfo: PropTypes.shape({
        experiences: PropTypes.arrayOf(PropTypes.shape({
            jobTitle: PropTypes.string,
            company: PropTypes.string,
            startDate: PropTypes.string,
            endDate: PropTypes.string,
        }))
    }).isRequired,
};

export default ExperienceInfo;
