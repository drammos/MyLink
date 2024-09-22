import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import './styles/MainPageLeft.css';

const MainPageLeft = ({ userInfo }) => {

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
    const [education, setEducation] = useState('');

    const bday = userInfo.birthday;
    const age = calculateAge(bday);


    //useEffect(() => {
    //    if (userInfo.educations !== [])
    //        setEducation(userInfo.educations);
    //    else
    //        setEducation(null);
    //}, [userInfo.educations]);

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
                    {/*<p>{education} Physiotherapist</p>*/}
                </div>
            </div>
            <div className="quick-links-section">
                <h4 className="section-title">Quick Links</h4>
                <a href="#" className="quick-link">Link 1</a>
                <a href="#" className="quick-link">Link 2</a>
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