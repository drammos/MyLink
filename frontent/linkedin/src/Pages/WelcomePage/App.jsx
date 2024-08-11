import React from "react"
import Navbar from "../../Components/Navbar/Navbar"
import WelcomePageLogIn from "../../Components/WelcomePageLogIn/WelcomePageLogIn"
import Footer from "../../Components/Footer/Footer"
import Description1 from "../../Components/Description/Description1"
import Description2 from "../../Components/Description/Description2"


import './App.css'

const App = () => {

    return (
        <div>
            <Navbar />
            <div className="WelcomePageMain">
                <div className="row">
                    <WelcomePageLogIn />
                    <Description1 />
                </div>
                <Description2 />
            </div>
            <Footer />
        </div>
    )
}

export default App