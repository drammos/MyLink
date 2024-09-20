import React, { useEffect, useState } from 'react';
import './UserSettings.css';

import Navbar from "../../Components/AfterLoginComponents/LoggedInNavBar/LoggedInNavBar"
import useGetUser from '../../Components/Services/useGetUser';
import SettingsInfo from "../../Components/AfterLoginComponents/SettingsComponents/SettingsInfo";
import Footer from "../../Components/Footer/Footer";

const UserSettings = () => {
    const useDocumentTitle = (title) => {
        useEffect(() => {
            document.title = title;
        }, [title]);
    };
    useDocumentTitle('User Settings');


    const { userInfo, message, errorCode, loading, refetch } = useGetUser();
    const username = localStorage.getItem('username');

    useEffect(() => {
        if (username !== null && username !== '') {
            refetch(username);
            console.log("fuk ", userInfo);
        }
    });

    return (
        <div>
            <Navbar userInfo={userInfo} />
            <div className="personalInfo-container">
                    <SettingsInfo userInfo={userInfo} />
            </div>
            <Footer />
        </div>
    );
};

export default UserSettings;