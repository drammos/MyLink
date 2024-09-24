import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import LoggedInNavBar from "../../Components/AfterLoginComponents/LoggedInNavBar/LoggedInNavBar";
import Footer from "../../Components/Footer/Footer";
import SearchResults from "../../Components/AfterLoginComponents/SearchResultsComponent/SearchResults.jsx";
import useGetUser from '../../Components/Services/useGetUser.jsx';
import './SearchUsers.css';

const useDocumentTitle = (title) => {
    useEffect(() => {
        document.title = title;
    }, [title]);
};

const SearchUsers = () => {
    const { userInfo } = useGetUser();
    
    // Use useSearchParams to retrieve the term from the URL
    const [searchParams] = useSearchParams();
    const term = searchParams.get('term');  // This will retrieve the ?term= from the URL

    useDocumentTitle(`Search Results for: ${term}`);

    return (
        <div>
            <LoggedInNavBar userInfo={userInfo} />
            <SearchResults searchTerm={term} />
            <Footer />
        </div>
    );
};

export default SearchUsers;
