import React, { useEffect } from "react"
import { Button } from 'primereact/button';
import './PageNotFoundComponent.css';
import PageNotFoundPhoto from '../../assets/undraw_Not_found.png'
import { Routes } from '../../routes'
import { useNavigate } from 'react-router-dom';


const PageNotFoundComponent = () => {

    useEffect(() => {
        console.log(localStorage.getItem('role'));
    });

    const navigate = useNavigate();
    const handleGoHomeButton = () => {
        console.log("NotFound: user is ", localStorage.getItem('role'));
        if (localStorage.getItem('role') === 'Admin')
            navigate(Routes.ControlPanel);
        else if (localStorage.getItem('role') === 'Professional')
            navigate(Routes.MainPage);
        else
            navigate(Routes.Home);
    }

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
                    onClick={handleGoHomeButton}
                />
            </div>
        </div>
    );
};

export default PageNotFoundComponent;