import React, { useEffect } from "react";
import LoggedInNavBar from "../../Components/AfterLoginComponents/LoggedInNavBar/LoggedInNavBar.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import useGetUser from '../../Components/Services/useGetUser.jsx';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import MyJobsComponent from '../../Components/JobsComponents/MyJobsComponent.jsx';
import './JobsPage.css';

const useDocumentTitle = (title) => {
    useEffect(() => {
        document.title = title;
    }, [title]);
};

const JobsPage = () => {
    const { userInfo, refetch } = useGetUser();

    useEffect(() => {
        refetch(localStorage.getItem('username'));
    }, []);

    useDocumentTitle("My Jobs");

    return (
        <>
            <LoggedInNavBar userInfo={userInfo} />
            <div className="main-myjobs-page">
               <MyJobsComponent/>
            </div>
            <div className="footer">
                <Footer />
            </div>
        </>
    );
};

export default JobsPage;
