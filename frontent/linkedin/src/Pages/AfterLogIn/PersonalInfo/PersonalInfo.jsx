import { useEffect } from "react"
import PropTypes from 'prop-types';

import Navbar from "../../../Components/AfterLoginComponents/LoggedInNavBar/LoggedInNavBar"
import Footer from "../../../Components/Footer/Footer"

import MainInfo from "../../../Components/AfterLoginComponents/PersonalInfoComponents/MainInfo";
import EducationInfo from "../../../Components/AfterLoginComponents/PersonalInfoComponents/EducationInfo";
import ExperienceInfo from "../../../Components/AfterLoginComponents/PersonalInfoComponents/ExperienceInfo";

import useGetUser from '../../../Components/Services/useGetUser';

import './PersonalInfo.css'

const PersonalInfo = () => {
    const useDocumentTitle = (title) => {
        useEffect(() => {
            document.title = title;
        }, [title]);
    };
    useDocumentTitle('Personal Info');

    const username = localStorage.getItem('username');
    const { userInfo, message, errorCode, loading, refetch } = useGetUser();

    useEffect(() => {
        if (username !== null && username !== '') {
            refetch(username);
        }
    });

    return (
        <div>
            <Navbar userInfo={userInfo} />
            <div className="personalInfo-container">
                    <MainInfo userInfo={userInfo} />
                <EducationInfo userInfo={userInfo} />
                <ExperienceInfo userInfo={userInfo} />

            </div>
            <Footer />
        </div>
    )
}

PersonalInfo.propTypes = {
    userInfo: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        pictureURL: PropTypes.string,
        educations: PropTypes.string
    }).isRequired,
};

export default PersonalInfo;