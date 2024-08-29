import React from "react"
import Navbar from "../../Components/Navbar/Navbar"
import Footer from "../../Components/Footer/Footer"
import UsersListComponent from "../../Components/UsersList/UsersList"
import './ControlPanel.css'
import { useEffect } from "react"


const ControlPanel = () => {

    const items = Array.from({ length: 30 }, (_, i) => `Item ${i + 1}`);

    const useDocumentTitle = (title) => {
        useEffect(() => {
            document.title = title;
        }, [title]);
    };
    useDocumentTitle('Admin Dashboard');
    return (
        <div>
            <Navbar />
            <UsersListComponent items={items} />
            <Footer />
        </div>
    )
}

export default ControlPanel
