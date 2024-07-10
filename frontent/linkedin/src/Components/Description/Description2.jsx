import React , { useState } from "react"
import { IoIosRocket } from "react-icons/io";
// import 'bootstrap/dist/css/bootstrap.min.css'
// import { useHistory } from 'react-router-dom';
import './Description2.css'


const Description2 = () => {
  // State variables to hold username and password
  return (
      <div className="glass-cont2">
          <div className="Description2Div">
            <h1><><IoIosRocket /></> Our Mission</h1>
            <p>
            Our mission is to blend cutting-edge design with seamless user experience,
            ensuring that every interaction on your site is engaging, intuitive, and memorable.
            </p>

            <button type="submit">Learn More</button>
        </div>
    </div>
  );
};

export default Description2;