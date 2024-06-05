import React from "react"
import './SignIn.css'
import Navbar from "../../Components/Navbar/Navbar"
import Footer from "../../Components/Footer/Footer"
import LogIn from "../../Components/LogIn/LogIn"


const SignIn = () => {

  return (
    <div>
        <Navbar/>
        <LogIn/>
        <Footer/>
    </div>
  )
}

export default SignIn