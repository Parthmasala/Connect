import {    createBrowserRouter  } from "react-router-dom";
import Login from "../WebPages/Login.jsx";
import Signup from "../WebPages/Signup.jsx";
import Home from "../WebPages/Home.jsx";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/home",
      element: <Home />,
    }
  ]);