import React from 'react'
import ReactDOM from 'react-dom/client'
import SignUp from './Pages/SignUp/SignUp.jsx'
import UserSettings from './Pages/UserSettings/UserSettings.jsx'
import SignIn from './Pages/SignIn/SignIn.jsx'
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword.jsx'
import ControlPanel from './Pages/ControlPanel/ControlPanel.jsx'
import UsersPage from './Pages/AfterLogin/UsersPage/UsersPage.jsx'
import SendHelp from './Pages/SendHelp/SendHelp.jsx'
import PageNotFound from './Pages/PageNotFound/PageNotFound.jsx'
import MainPage from './Pages/AfterLogIn/MainPage/MainPage.jsx'
import PersonalInfo from './Pages/AfterLogIn/PersonalInfo/PersonalInfo.jsx'
import SearchUsers from './Pages/SearchUsers/searchUsers.jsx'
import Messages from './Pages/Messages/Messages.jsx'
import { Routes } from './routes.jsx';


import App from './Pages/WelcomePage/App.jsx'
import './index.css'

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { Rotate } from '@cloudinary/url-gen/actions'

const router = createBrowserRouter([
    { path: Routes.Home, element: <App /> },
    { path: Routes.SignUp, element: <SignUp />, },
    { path: Routes.SignIn, element: <SignIn />, },
    { path: Routes.ForgotPassword, element: <ForgotPassword /> },
    { path: Routes.ControlPanel, element: <ControlPanel /> },
    { path: Routes.SendHelp, element: <SendHelp /> },
    { path: Routes.PageNotFound, element: <PageNotFound /> },
    { path: Routes.MainPage, element: <MainPage /> },
    { path: Routes.PersonalInfo, element: <PersonalInfo /> },
    { path: Routes.UserSettings, element: <UserSettings /> },
    { path: Routes.UserInfo, element: <UsersPage /> },
    { path: Routes.SearchUsers,  element: <SearchUsers /> },
    { path: Routes.Messages, element: <Messages />},
    { path: "*", element: <PageNotFound /> },
]);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router}>
        </RouterProvider>
    </React.StrictMode>,
);
