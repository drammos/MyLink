import { useEffect } from "react"
import Navbar from "../../Components/Navbar/Navbar"
import Footer from "../../Components/Footer/Footer"
import PageNotFoundComponent from "../../Components/PageNotFoundComponent/PageNotFoundComponent"


const ForgotPassword = () => {
    const useDocumentTitle = (title) => {
        useEffect(() => {
            document.title = title;
        }, [title]);
    };
    useDocumentTitle('Forgot Password');
    return (
        <div>
            <PageNotFoundComponent />
            <Footer />
        </div>
    )
}

export default ForgotPassword