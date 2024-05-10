import React from "react";
import logo2 from '../../assets/newlogo.png'
import './Footer.css';
import { VscArrowSmallRight } from "react-icons/vsc";


const Footer = () => {
    return (
        <div className="footer">
            <div className="closing">
                <div className="logo">
                    <img src={logo2} alt="" />
                    <p>Empowering connections for a brighter future.</p>
                </div>

                <div className="left_box">
                    <p>
                        M&R Project <br />  
                        (+30) 697 9303 827
                    </p>
                    <p> Email us: <br />
                        mylink@gmail.com
                    </p>
                </div>

                <div className="right_box">
                    <h4>Categories:</h4>
                    <ul>
                        <li><a href="about.html#Buildings">Categories <VscArrowSmallRight/></a></li>
                        <li><a href="about.html#Stores">Categories <VscArrowSmallRight/></a></li>
                        <li><a href="about.html#Villas">Categories <VscArrowSmallRight/></a></li>
                    </ul>
                </div>
            </div>
            
            <div className="CreatedBy">
                <p>©️ Created by M&R Services 2024</p> 
            </div>
        </div>
        
    );
};

export default Footer;