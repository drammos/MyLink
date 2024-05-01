import React from "react"
import './Navbar.css'
import logo from '../../assets/Logo.png'
import { GoAlert } from "react-icons/go";




const Navbar = () => {
  return (
    <nav>
        <img src={logo} alt=""/>
        <ul>
            <button class="signIn">Sign In</button>
            <button class="signUp">Sign Up</button>
            <button class="sendHelp"><div><GoAlert/></div> Send Help!</button>
        </ul>
    </nav>
  )
}

export default Navbar