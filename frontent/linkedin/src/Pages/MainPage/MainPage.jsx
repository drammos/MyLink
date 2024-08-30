import { useEffect } from "react"
import Navbar from "../../Components/Navbar/Navbar"
import Footer from "../../Components/Footer/Footer"

const ForgotPassword = () => {
    const useDocumentTitle = (title) => {
        useEffect(() => {
            document.title = title;
        }, [title]);
    };
    useDocumentTitle('Main Page');
    return (
        <div>
            <Navbar />

            <Footer />
        </div>
    )
}

export default ForgotPassword