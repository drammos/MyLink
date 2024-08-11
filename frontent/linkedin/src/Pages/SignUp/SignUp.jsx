import React from "react"
import './SignUp.css'
import Navbar from "../../Components/Navbar/Navbar"
import Footer from "../../Components/Footer/Footer"
import SignUpForm from "../../Components/SignUpForm/SignUpForm"


const SignUp = () => {

  return (
    <div>
        <Navbar/>
        <SignUpForm/>
        <Footer/>
    </div>
  )
}

export default SignUp