import React, { useEffect } from "react";
import LoggedInNavBar from "../../Components/AfterLoginComponents/LoggedInNavBar/LoggedInNavBar.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import useGetUser from '../../Components/Services/useGetUser.jsx';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import CreateJobComponent from "../../Components/JobsComponents/CreateJobComponent.jsx";
import ConnectedUsersJobsComponent from "../../Components/JobsComponents/ConnectedUsersJobsComponent.jsx";
import './JobsPage.css';
import { useNavigationHelpers } from "../../Components/AfterLoginComponents/Helpers/useNavigationHelpers.jsx";

const useDocumentTitle = (title) => {
    useEffect(() => {
        document.title = title;
    }, [title]);
};

const JobsPage = () => {
    const { userInfo, refetch } = useGetUser();

    const { handleMyJobsClick } = useNavigationHelpers();

    useEffect(() => {
        refetch(localStorage.getItem('username'));
    }, []);

    useDocumentTitle("Jobs");

    return (
        <>
            <LoggedInNavBar userInfo={userInfo} />
            <div className="main-page">
                <div className="left-column">
                    <CreateJobComponent userInfo={userInfo} handleMyJobs={handleMyJobsClick} />
                </div>
                <div className="right-column">
                    <ConnectedUsersJobsComponent userInfo={userInfo} />
                </div>
            </div>
            <div className="footer">
                <Footer />
            </div>
        </>
    );
};

export default JobsPage;
