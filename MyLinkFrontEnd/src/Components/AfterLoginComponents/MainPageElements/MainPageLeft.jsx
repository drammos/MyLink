import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import './styles/MainPageLeft.css';
import useGetEducations from "../../Services/Educations/useGetEducations";
import { Routes } from '../../../routes';

const MainPageLeft = ({ userInfo }) => {
    const { getEducationInfo, message, errorCode, loading, getEducationrefetch } = useGetEducations();
    const [educationList, setEducationList] = useState([]);


    const calculateAge = (birthday) => {
        const birthDate = new Date(birthday);
        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate()))
            age--;

        return age;
    };

    // if name and surname doesn't start with capitals, fix it
    const lastname = userInfo.lastName  ? userInfo.lastName.charAt(0).toUpperCase() + userInfo.lastName.slice(1).toLowerCase() : '';
    const firstname = userInfo.firstName ? userInfo.firstName.charAt(0).toUpperCase() + userInfo.firstName.slice(1).toLowerCase() : '';

    const initials = firstname.charAt(0) + lastname.charAt(0);

    const bday = userInfo.birthday;
    const age = calculateAge(bday);

    useEffect(() => {
        getEducationrefetch(localStorage.getItem('id'));
    }, []);

    useEffect(() => {
        setEducationList(getEducationInfo);
    }, [getEducationInfo]);


    return (
        <div className="main-page-left">
            <div className="profile-section">
                <div className="profile-photo">
                    {(userInfo.pictureURL && userInfo.pictureURL !== "null") ? ( 
                        <img src={userInfo.pictureURL} alt={`${firstname} ${lastname}`} />
                    ) : (
                        <div className="initials">{initials}</div>
                    )}
                </div>
                <div className="profile-info">
                    <b>{firstname} {lastname}</b>
                    <>Age: {age}</>
                </div>
            </div>
            {/* Link to Contacts */}
            <div style={{ marginTop: '20px' }}>
                <a href={Routes.Network} className="contact-link">Go to Contacts</a>
            </div>
            <div>
                <h4>Education Information</h4>
                {educationList.length > 0 ? (
                    educationList.map((education) => (
                        <div key={education.id} className="education-box-left">
                            <p><strong>School:</strong> {education.school}</p>
                            <p><strong>Degree:</strong> {education.degree}</p>
                            <p><strong>Field of Study:</strong> {education.fieldOfStudy}</p>
                            <p><strong>Start Date:</strong> {new Date(education.startDate).toLocaleDateString()}</p>
                            <p><strong>End Date:</strong> {education.endDate ? new Date(education.endDate).toLocaleDateString() : 'Present'}</p>
                            <p><strong>Grade:</strong> {education.grade}</p>
                            <p><strong>Description:</strong> {education.description}</p>
                        </div>
                    ))
                ) : (
                    <p>No education information available.</p>
                )}
            </div>
        </div>
    );
};

MainPageLeft.propTypes = {
    userInfo: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        pictureURL: PropTypes.string,
        educations: PropTypes.string,
        birthday: PropTypes.string
    }).isRequired,
};

export default MainPageLeft; 