import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import "./custom.css";

import App from "./App";
import { WorkoutsContextProvider } from "./contexts/WorkoutsContextProvider";
import { AuthContextProvider } from "./contexts/AuthContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <AuthContextProvider>
            <WorkoutsContextProvider>
                <App />
            </WorkoutsContextProvider>
        </AuthContextProvider>
    </React.StrictMode>
);
