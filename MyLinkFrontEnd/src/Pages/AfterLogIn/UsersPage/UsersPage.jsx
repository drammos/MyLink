import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../../../routes'
import LoggedInNavBar from "../../../Components/AfterLoginComponents/LoggedInNavBar/LoggedInNavBar";
import Footer from "../../../Components/Footer/Footer";
import UsersPageMainInfo from "../../../Components/AfterLoginComponents/UsersPage/UsersPageMainInfo";
import UsersPageEducationInfo from "../../../Components/AfterLoginComponents/UsersPage/UsersPageEducationInfo";
import UsersPageExperienceInfo from "../../../Components/AfterLoginComponents/UsersPage/UsersPageExperienceInfo";
import useGetUser from '../../../Components/Services/useGetUser.jsx';
import UserPosts from "../../../Components/AfterLoginComponents/UsersPage/UsersPosts"
import './UsersPage.css';

const useDocumentTitle = (title) => {
    useEffect(() => {
        document.title = title;
    }, [title]);
};

const UsersPage = () => {

    const navigate = useNavigate();
    const { userInfo, message, errorCode, refetch } = useGetUser();
    const { username } = useParams();

    useEffect(() => {
        refetch(username);
    }, [username]);

    useEffect(() => {
        if (errorCode === 1)
            navigate(Routes.PageNotFound);
    }, [errorCode]);

    useDocumentTitle('FirstName Surname');
    //<LoggedInNavBar userInfo={userInfo} /> !! REMOVED

    return (
        <>
            <div className="usersPage-container">
                <UsersPageMainInfo userInfo={userInfo} />
                <UsersPageEducationInfo userInfo={userInfo} />
                <UsersPageExperienceInfo userInfo={userInfo} />
                <UserPosts userInfo={userInfo} /> 
            </div>
            <Footer />
        </>
    );
};

export default UsersPage;
