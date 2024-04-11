import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { app } from "./FirebaseConfig.js";
import { RouterProvider } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { router } from "./Routes/index.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
        <ToastContainer />
    </React.StrictMode>
);
