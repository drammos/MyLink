import React from "react"
import Navbar from "./Components/Navbar/Navbar"
import WelcomePageLogIn from "./Components/WelcomePageLogIn/WelcomePageLogIn"

// const { connect } = require('../db');
// connect();

const App = () => {
  return (
    <div>
        <Navbar/>
        <WelcomePageLogIn/>
    </div>
  )
}

export default App