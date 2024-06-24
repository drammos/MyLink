import React from "react"
import Navbar from "../../Components/Navbar/Navbar"
import WelcomePageLogIn from "../../Components/WelcomePageLogIn/WelcomePageLogIn"
import Footer from "../../Components/Footer/Footer"
import Description1 from "../../Components/Description/Description1"
import './App.css'

const App = () => {
  return (
    <div>
        <Navbar/>
        <div class="WelcomePageMain">
            <WelcomePageLogIn/>
            <Description1/>
        </div>
        <Footer/>
    </div>
  )
}

export default App