import React, { useEffect } from "react";
import Footer from "../../Components/Footer/Footer";
import UsersListComponent from "../../Components/AfterLoginComponents/UsersList/UsersList";
import PageNotFound from "../PageNotFound/PageNotFound";
import './ControlPanel.css';

const useDocumentTitle = (title) => {
    useEffect(() => {
        document.title = title;
    }, [title]);
};

const ControlPanel = () => {
    const userRole = localStorage.getItem('role');
    console.log("user role is: ", userRole);

    useDocumentTitle(userRole === "Admin" ? 'Admin Dashboard' : 'Access Denied');

    if (userRole !== "Admin") {
        return <PageNotFound />;
    }

    const items = Array.from({ length: 30 }, (_, i) => `Item ${i + 1}`);

    return (
        <div>
            <UsersListComponent items={items} />
            <Footer />
        </div>
    );
};

export default ControlPanel;