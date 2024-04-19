import React from "react"
import './Navbar.css'
import logo from '../../assets/Logo.png'
import info from '../../assets/information.png'



const Navbar = () => {
  return (
    <nav>
        <img src={logo} alt=""/>
        <ul>
            <li class="signIn">Sign In</li>
            <li class="signUp">Sing Up</li>
            <li class="sendHelp"><img src={info} alt=""/> Send Help!</li>
        </ul>
    </nav>
  )
}

export default Navbar