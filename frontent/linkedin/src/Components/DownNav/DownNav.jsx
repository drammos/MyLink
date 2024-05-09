import React from "react";
import logo2 from '../../assets/newlogo.png'
import './DownNav.css';

const DownNav = () => {
    return (
        <div className="closing">
            <div className="logo">
                <img src={logo2} alt="" />
            </div>

            <div className="left_box">
                <p>
                    Unicom A.T.E <br /> 
                    Plateia Vasilissis <br /> 
                    Sofias 4, Nea Smyrni <br /> 
                    Athens, 17121 <br /> 
                    unicom1996@yahoo.gr <br /> 
                    210 9356 880
                </p>
            </div>

            <div className="center_box">
                <p>Follow us on</p>
                <a href="https://www.facebook.com/unicom.minaidis" target="_blank" className="icon">
                    <i className="fa-brands fa-facebook-f"></i>
                </a>
            </div>

            <div className="right_box">
                <h4>OUR SERVICES</h4>
                <ul>
                    <li><a href="about.html#Buildings">Buildings</a></li>
                    <li><a href="about.html#Stores">Stores</a></li>
                    <li><a href="about.html#Villas">Villas</a></li>
                </ul>
            </div>

            <div className="CreatedBy">
                <p>©️ Created by Unicom Services 2024</p> 
            </div>
        </div>
    );
};

export default DownNav;