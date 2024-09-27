import React from "react";
import { useState, useCallback, useEffect } from 'react';
import LoggedInNavBar from "../../Components/AfterLoginComponents/LoggedInNavBar/LoggedInNavBar.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import useGetUser from '../../Components/Services/useGetUser.jsx';
import PrintConnectedUsers from '../../Components/NetworkComponents/PrintConnectedUsers.jsx';
import PrintPendingUsers from '../../Components/NetworkComponents/PrintPendingUsers.jsx';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './Network.css';


const useDocumentTitle = (title) => {
    useEffect(() => {
        document.title = title;
    }, [title]);
};

const Network = () => {

    const { userInfo, refetch } = useGetUser();
    useEffect(() => {
        refetch(localStorage.getItem('username'));
    }, []);

    useDocumentTitle("Network");

    return (
        <div className="network-page">
            <LoggedInNavBar userInfo={userInfo} />
            <div className="p-grid">
                <div className="p-col-6">
                    <PrintConnectedUsers />
                </div>
                <div className="p-col-6">
                    <PrintPendingUsers />
                </div>
            </div>
            <div className="footer">
                <Footer />
            </div>
        </div>
    );
};

export default Network;