import React from "react";
import './styles/MainPageRight.css';

const MainPageRight = () => {
    return (
        <div className="main-page-right">
            <div className="ads-section">
                <h4 className="section-title">Sponsored</h4>
                <div className="ad-content">
                    <a href="#" className="ad-link">Ad Title</a>
                    <p className="ad-description">Ad description goes here</p>
                </div>
            </div>

            <div className="suggestions-section">
                <h4 className="section-title">People you may know</h4>
                <div className="suggestion">
                    <a href="#" className="suggestion-link">
                        <i className="fas fa-user-circle fa-3x"></i>
                        <div className="suggestion-info">
                            <b>User Name</b>
                            <p>Short bio</p>
                            <button className="connect-btn">Connect</button>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default MainPageRight;
