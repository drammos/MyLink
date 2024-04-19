import React from "react"
import './Navbar.css'
import logo from '../../assets/Logo.png'
import info from '../../assets/information.png'



const Navbar = () => {
  return (
    <nav>
        <img src={logo} alt=""/>
        <ul>
            <button class="signIn">Sign In</button>
            <button class="signUp">Sing Up</button>
            <button class="sendHelp"><h4 class="i">i</h4> Send Help!</button>
        </ul>
    </nav>
  )
}

export default Navbar