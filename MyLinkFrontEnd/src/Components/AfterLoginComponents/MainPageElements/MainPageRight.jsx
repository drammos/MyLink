import React from "react";
import { Tag } from 'primereact/tag';
import './styles/MainPageRight.css';

const MainPageRight = () => {
    return (
        <div className="main-page-right">
            <div className="ads-section">
                <Tag value="New"></Tag>
                <h4 className="section-title">Did you know that...</h4>
                <div className="ad-content">
                    <p className="ad-link">Did you know that the first computer programmer was a woman named
                        Ada Lovelace? She wrote the first algorithm designed to be processed by a machine in the mid-1800s</p>

                </div>
                <h4 className="section-title">Also ...</h4>
                <div className="ad-content">
                    <p className="ad-link">Did you know that the term bug in computer science originated when a moth got trapped
                        in a relay of the Harvard Mark II computer in 1947?</p>

                </div>
            </div>

            {/*<div className="suggestions-section">*/}
            {/*    <h4 className="section-title">People you may know</h4>*/}
            {/*    <div className="suggestion">*/}
            {/*        <a href="#" className="suggestion-link">*/}
            {/*            <i className="fas fa-user-circle fa-3x"></i>*/}
            {/*            <div className="suggestion-info">*/}
            {/*                <b>User Name</b>*/}
            {/*                <p>Short bio</p>*/}
            {/*                <button className="connect-btn">Connect</button>*/}
            {/*            </div>*/}
            {/*        </a>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
};

export default MainPageRight;
