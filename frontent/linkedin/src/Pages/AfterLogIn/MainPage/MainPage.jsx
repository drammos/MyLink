import { useEffect } from "react"
import Navbar from "../../../Components/AfterLoginComponents/LoggedInNavBar/LoggedInNavBar"
import Footer from "../../../Components/Footer/Footer"

import useGetUser from "../../../Components/Services/useGetUser"

const MainPage = () => {
    const useDocumentTitle = (title) => {
        useEffect(() => {
            document.title = title;
        }, [title]);
    };
    useDocumentTitle('Main Page');

    const { userInfo, refetch } = useGetUser();

    useEffect(() => {
        refetch(localStorage.getItem('username'));
        console.log(userInfo);
    }, [refetch, userInfo]);

    return (
        <div>
            <Navbar userInfo={userInfo} />

            <Footer />
        </div>
    )
}

export default MainPage