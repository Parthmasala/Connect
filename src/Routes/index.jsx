import {    createBrowserRouter  } from "react-router-dom";
import Login from "../WebPages/Login.jsx";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    }
  ]);