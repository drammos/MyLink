import React from "react"
import Navbar from "./Components/Navbar/Navbar"
import WelcomePageLogIn from "./Components/WelcomePageLogIn/WelcomePageLogIn"
import DownNav from "./Components/DownNav/DownNav"

const App = () => {
  return (
    <div>
        <Navbar/>
        <WelcomePageLogIn/>
        <DownNav/>
    </div>
  )
}

export default App