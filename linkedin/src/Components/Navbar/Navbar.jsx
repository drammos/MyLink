import React from "react"
import './Navbar.css'
import logo from '../../assets/MyLinkLogo.png'

const Navbar = () => {
  return (
    <nav>
        <img src={logo} alt=""/>
        <ul>
            <li>Sign In</li>
            <li>Sing up</li>
        </ul>
    </nav>
  )
}

export default Navbar