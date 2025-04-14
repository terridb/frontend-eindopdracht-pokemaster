import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {checkTokenValidity} from "../helpers/checkTokenValidity";
import axios from "axios";
import Loader from "../components/loader/Loader.jsx";

export const AuthContext = createContext(null);

function AuthContextProvider({children}) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        status: "pending",
    });
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem("token");

        if (storedToken && checkTokenValidity(storedToken)) {
            void login(storedToken).catch((err) => {
                if (err.response && err.response.status === 401) {
                    logout();
                }
            });
        } else {
            void logout();
        }
    }, []);

    const login = async (jwtToken) => {
        localStorage.setItem("token", jwtToken);

        try {
            const response = await axios.get(
                `https://frontend-educational-backend.herokuapp.com/api/user`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${jwtToken}`,
                    },
                },
            );
            setAuth({
                isAuth: true,
                user: {
                    username: response.data.username,
                    email: response.data.email,
                    id: response.data.sub,
                },
                status: "done",
            });
        } catch (err) {
            console.error(err);
        } finally {
            console.log("Logged in");
        }
    };

    useEffect(() => {
        if (auth.isAuth && auth.status === "pending") {
            navigate("/profile");
        }
    }, [auth.isAuth, auth.status, navigate]);

    const logout = () => {
        localStorage.removeItem("token");
        setAuth({
            isAuth: false,
            user: null,
            status: "done",
        });
        console.log('Gebruiker is uitgelogd!');
    };

    const data = {
        isAuth: auth.isAuth,
        user: auth.user,
        token: localStorage.getItem("token"),
        login,
        logout
    };

    return (
        <AuthContext.Provider value={data}>
            {auth.status === "done" ? children : <Loader/>}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;

