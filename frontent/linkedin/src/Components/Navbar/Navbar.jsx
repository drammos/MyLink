import React from "react"
import './Navbar.css'
import logo from '../../assets/Logo.png'
import { GoAlert } from "react-icons/go";
import { useNavigate } from "react-router-dom";



const Navbar = () => {
    const navigate = useNavigate();

    const handleSignInClick = async () => {
        navigate("/signin");
    };

    const handleSignUpClick = async () => {
        navigate("/signup");
    };

    const handleLogoClick = async () => {
        navigate("/");
    }

    const handleSendHelpClick = async () => {
        navigate("/Send-Help");
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