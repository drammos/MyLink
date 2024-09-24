import React, { useEffect } from "react";
import Footer from "../../Components/Footer/Footer";
import SearchResults from "../../Components/AfterLoginComponents/SearchResultsComponent/SearchResult";
import PageNotFound from "../PageNotFound/PageNotFound";
import './SearchUsers.css';

const useDocumentTitle = (title) => {
    useEffect(() => {
        document.title = title;
    }, [title]);
};

const SearchUsers = () => {

    return (
        <div>
            <SearchResults items={items} />
            <Footer />
        </div>
    );
};

export default SearchUsers;