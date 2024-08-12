import React from 'react'
import ReactDOM from 'react-dom/client'
import SignUp from './Pages/SignUp/SignUp.jsx'
import SignIn from './Pages/SignIn/SignIn.jsx'
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword.jsx'
import ControlPanel from './Pages/ControlPanel/ControlPanel.jsx'


import App from './Pages/WelcomePage/App.jsx'
import './index.css'

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
    { path: "/", element: <App /> },
    { path: "signup", element: <SignUp />, },
    { path: "signin", element: <SignIn />, },
    { path: "forgot-password", element: <ForgotPassword /> },
    //},
    //{
    //    path: "jobs",
    //    element: <Jobs />,
    //},
    //{
    //    path: "mesages",
    //    element: <Messages />,
    //},
    //{
    //    path: "notifications",
    //    element: <Notifications />,
    //},
    //{
    //    path: "MyLinks",
    //    element: <MyLinks />,
    //}

]);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router}>
        </RouterProvider>
    </React.StrictMode>,
);
