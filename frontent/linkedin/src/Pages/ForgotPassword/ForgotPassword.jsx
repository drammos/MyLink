import { useEffect } from "react"
import './ForgotPassword.css'
import Navbar from "../../Components/Navbar/Navbar"
import Footer from "../../Components/Footer/Footer"
import ForgotPasswordComponent from "../../Components/ForgotPasswordComponent/ForgotPasswordComponent"


const ForgotPassword = () => {
    const useDocumentTitle = (title) => {
        useEffect(() => {
            document.title = title;
        }, [title]);
    };
    useDocumentTitle('Forgot Password');
  return (
    <div>
        <Navbar/>
          <ForgotPasswordComponent />
        <Footer/>
    </div>
  )
}

export default ForgotPassword