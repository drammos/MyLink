import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';

import LoggedInNavBar from "../../../Components/AfterLoginComponents/LoggedInNavBar/LoggedInNavBar";
import Footer from "../../../Components/Footer/Footer";
import UsersPageMainInfo from "../../../Components/AfterLoginComponents/UsersPage/UsersPageMainInfo";
import UsersPageEducationInfo from "../../../Components/AfterLoginComponents/UsersPage/UsersPageEducationInfo";
import UsersPageExperienceInfo from "../../../Components/AfterLoginComponents/UsersPage/UsersPageExperienceInfo";
import useGetUser from '../../../Components/Services/useGetUser.jsx';
import './UsersPage.css';

const useDocumentTitle = (title) => {
    useEffect(() => {
        document.title = title;
    }, [title]);
};

const UsersPage = () => {

    const { userInfo, message, errorCode, refetch } = useGetUser();
    const { username } = useParams();

    useEffect(() => {
        refetch(username);
    }, [username]);

    useDocumentTitle('FirstName Surname');

    return (
        <>
            <LoggedInNavBar userInfo={userInfo} />
            <div className="usersPage-container">
                <UsersPageMainInfo userInfo={userInfo} />
                <UsersPageEducationInfo userInfo={userInfo} />
                <UsersPageExperienceInfo userInfo={userInfo} />
            </div>
            <Footer />
        </>
    );
};

export default UsersPage;
