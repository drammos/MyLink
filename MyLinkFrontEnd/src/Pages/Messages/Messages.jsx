import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import LoggedInNavBar from "../../Components/AfterLoginComponents/LoggedInNavBar/LoggedInNavBar.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import useGetUser from '../../Components/Services/useGetUser.jsx';
import UserMessages from "../../Components/AfterLoginComponents/MessagesComponents/UserMessages.jsx"
import './Messages.css';

const useDocumentTitle = (title) => {
    useEffect(() => {
        document.title = title;
    }, [title]);
};

const Messages = () => {
    const { userInfo } = useGetUser();
    
    // Use useSearchParams to retrieve the term from the URL
    const [searchParams] = useSearchParams();
    const term = searchParams.get('term');  // This will retrieve the ?term= from the URL

    useDocumentTitle(`Search Results for: ${term}`);

    return (
        <div>
            <LoggedInNavBar userInfo={userInfo} />
            <UserMessages userInfo={userInfo} />
            <Footer />
        </div>
    );
};

export default Messages;
