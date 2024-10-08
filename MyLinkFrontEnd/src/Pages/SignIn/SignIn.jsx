import { useEffect } from "react"
import './SignIn.css'
import Navbar from "../../Components/Navbar/Navbar"
import Footer from "../../Components/Footer/Footer"
import LogIn from "../../Components/LogIn/LogIn"


const SignIn = () => {

    const useDocumentTitle = (title) => {
        useEffect(() => {
            document.title = title;
        }, [title]);
    };
    useDocumentTitle('Sign In');

  return (
    <div>
        <Navbar/>
        <LogIn/>
        <Footer/>
    </div>
  )
}

export default SignIn