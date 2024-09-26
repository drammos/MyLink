import React from "react";
import { useState, useCallback, useEffect } from 'react';
import LoggedInNavBar from "../../Components/AfterLoginComponents/LoggedInNavBar/LoggedInNavBar.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import useGetUser from '../../Components/Services/useGetUser.jsx';
import MessageInterface from "../../Components/AfterLoginComponents/MessagesComponents/MessageInterface.jsx";
import './Messages.css';


const Messages = () => {

    
    const { userInfo, refetch } = useGetUser();
    useEffect(() => {
        refetch(localStorage.getItem('username'));
    },[]);

    console.log("gee", userInfo);
    return (
        <div className="messages-page">
            <LoggedInNavBar userInfo={userInfo} />
            <div className="messages-content">
                <MessageInterface userInfo={userInfo} />
            </div>
        </div>
    );
};

export default Messages;