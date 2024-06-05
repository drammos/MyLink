import React from 'react'
import ReactDOM from 'react-dom/client'
import SignUp from './Pages/SignUp/SignUp.jsx'
import SignIn from './Pages/SignIn/SignIn.jsx'

import App from './Pages/WelcomePage/App.jsx'
import './index.css'

import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>
    },
    {
        path: "signup",
        element: <SignUp/>,
    },
    {
        path: "signin",
        element: <SignIn />,
    }
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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
