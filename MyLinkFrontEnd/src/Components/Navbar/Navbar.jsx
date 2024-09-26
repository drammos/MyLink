import React from "react"
import './Navbar.css'
import logo from '../../assets/Logo.png'
import { GoAlert } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { Routes } from '../../routes.jsx';


const Navbar = () => {
    const navigate = useNavigate();

    const handleSignInClick = async () => {
        navigate(Routes.SignIn);
    };

    const handleSignUpClick = async () => {
        navigate(Routes.SignUp);
    };

    const handleLogoClick = async () => {
        navigate(Routes.Home);
    }

    const handleSendHelpClick = async () => {
        navigate(Routes.SendHelp);
    }

    return (
        <nav>
            <img src={logo} onClick={handleLogoClick} alt="" />
            <ul>
                <button className="signIn" onClick={handleSignInClick}>Sign In</button>
                <button className="signUp" onClick={handleSignUpClick}>Sign Up</button>
                <button className="sendHelp" onClick={handleSendHelpClick}><div><GoAlert /></div> Send Help!</button>
            </ul>
        </nav>
    )
}

export default Navbar