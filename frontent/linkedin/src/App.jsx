import React from "react"
import Navbar from "./Components/Navbar/Navbar"
import WelcomePageLogIn from "./Components/WelcomePageLogIn/WelcomePageLogIn"
import Footer from "./Components/Footer/Footer"

const App = () => {
  return (
    <div>
        <Navbar/>
        <WelcomePageLogIn/>
        <Footer/>
    </div>
  )
}

export default App