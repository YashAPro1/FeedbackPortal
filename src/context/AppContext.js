import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';

const AppContext = createContext()

export default function AppProvider({ children }) {
    const fullLocation = useLocation();
    const cookies = new Cookies();
    const navigate = useNavigate();

    useEffect(() => {
        const cData = cookies.get("user");
        if (cData) {
                // if (fullLocation.pathname == "/login" || fullLocation.pathname === "/login/details") {
                //     navigate("/");
                // }
        }
        else {
            navigate("/login");
        }
    }, [fullLocation.pathname])

    return (
        <AppContext.Provider value={{ userI: 1 }}>{children}</AppContext.Provider>
    )
}

export const AppState = () => {
    return useContext(AppContext)
}


