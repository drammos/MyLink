import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';

import Footer from "../../../Components/Footer/Footer";
import UsersPageMainInfo from "../../../Components/AfterLoginComponents/UsersPage/UsersPageMainInfo";
import useGetUser from '../../../Components/Services/useGetUser.jsx'
//import './ControlPanel.css';

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
        <div>
            <UsersPageMainInfo userInfo={userInfo} />
            <Footer />
        </div>
    );
};

export default UsersPage;