import React from "react";
import logo2 from '../../assets/mylinkorg.png'
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
                        (+30) 697 9303 827 <br /> 
                        (+30) 694 087 0953 
                    </p>
                    <p> Email us: <br />
                        <a href="#">mylink@gmail.com</a>
                    </p>
                </div>

                <div className="right_box">
                    <h4>Creators:</h4>
                    <ul>
                        <li>Rammos Dimitris <VscArrowSmallRight/></li>
                        <li>Thodoris Minaidis <VscArrowSmallRight/></li>
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