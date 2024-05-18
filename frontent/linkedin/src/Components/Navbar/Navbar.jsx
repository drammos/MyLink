import React from "react"
import './Navbar.css'
import logo from '../../assets/Logo.png'
import { GoAlert } from "react-icons/go";
import { useNavigate } from "react-router-dom";



const Navbar = () => {
  const navigate = useNavigate();
  const handleSignUpClick = async (e) => {
    navigate("/signup");
  };

  const handleLogoClick = async (e) => {
    navigate("/");
  }

  return (
    <nav>
        <img src={logo} onClick={handleLogoClick} alt=""/>
        <ul>
            <button class="signIn">Sign In</button>
            <button class="signUp" onClick={handleSignUpClick}>Sign Up</button>
            <button class="sendHelp"><div><GoAlert/></div> Send Help!</button>
        </ul>
    </nav>
  )
}

export default Navbar