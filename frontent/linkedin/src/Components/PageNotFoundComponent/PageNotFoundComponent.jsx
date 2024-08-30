import React from "react"
import { Button } from 'primereact/button';
import './PageNotFoundComponent.css';
import PageNotFoundPhoto from '../../assets/undraw_Not_found.png'
import { Routes } from '../../routes'

const PageNotFoundComponent = () => {
    // State variables to hold username and password

    return (
        <div className="pagenotfound-container">
            <div className="pagenotfound-box">
                <img
                    src={PageNotFoundPhoto} 
                    alt=""
                    className="pagenotfound-image"
                />
                <h1>Error 404: Page Not Found</h1>
                <p className="pagenotfound-description">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
                <Button
                    label="Go Home"
                    icon="pi pi-home"
                    className="p-button-rounded p-button-info"
                    onClick={() => window.location.href = Routes.Home}
                />
            </div>
        </div>
    );
};

export default PageNotFoundComponent;