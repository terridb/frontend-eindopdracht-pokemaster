import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter as Router} from "react-router-dom";
import {IconContext} from "@phosphor-icons/react";
import AuthContextProvider from "./context/AuthContext.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Router>
            <AuthContextProvider>
                <IconContext.Provider
                    value={{
                        color: "#CCCCCC",
                        size: 32,
                        weight: "regular",
                        mirrored: false,
                    }}>
                    <App/>
                </IconContext.Provider>
            </AuthContextProvider>
        </Router>
    </StrictMode>,
)
