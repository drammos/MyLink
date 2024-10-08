import { useEffect } from "react"
import Navbar from "../../../Components/AfterLoginComponents/LoggedInNavBar/LoggedInNavBar"
import Footer from "../../../Components/Footer/Footer"

import MainPageLeft from "../../../Components/AfterLoginComponents/MainPageElements/MainPageLeft";
import MainPageCenter from "../../../Components/AfterLoginComponents/MainPageElements/MainPageCenter";
import MainPageRight from "../../../Components/AfterLoginComponents/MainPageElements/MainPageRight";

import useGetUser from "../../../Components/Services/useGetUser"
import { useNavigate } from 'react-router-dom';
import './MainPage.css'
import { Routes } from "../../../routes";

const MainPage = () => {
    const navigate = useNavigate();
    const useDocumentTitle = (title) => {
        useEffect(() => {
            document.title = title;
        }, [title]);
    };
    useDocumentTitle('Main Page');

    const { userInfo, refetch } = useGetUser();

    useEffect(() => {
        if (localStorage.getItem('role') === 'Admin')
            navigate(Routes.PageNotFound);
        if (localStorage.getItem('username'))
            refetch(localStorage.getItem('username'));
        console.log(localStorage.getItem('username'));
    }, [refetch, userInfo]);

    return (
        <div>
            <Navbar userInfo={userInfo} />
            <div className="main-container">
                <div className="main-left">
                    <MainPageLeft userInfo={userInfo} />
                </div>
                <div className="main-center">
                    <MainPageCenter />
                </div>
                <div className="main-right">
                    <MainPageRight />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default MainPage