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
                if (err?.response?.status === 401) {
                    logout();
                }
            });
        } else {
            void logout();
        }
    }, []);

    const registerUser = async (username, email, password, source) => {
        try {
            const response = await axios.post(
                `https://frontend-educational-backend.herokuapp.com/api/auth/signup`,
                {
                    username,
                    email,
                    password,
                }, {
                    cancelToken: source,
                }
            );

            if (response.status === 200) {
                const loginResponse = await axios.post(
                    `https://frontend-educational-backend.herokuapp.com/api/auth/signin`,
                    {
                        username,
                        password,
                    }
                );

                const token = loginResponse.data.accessToken;
                await login(token);
            }
        } catch (err) {
            console.error("Registratie mislukt:", err);
            throw err;
        }
    };

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

            setAuth({
                isAuth: false,
                user: null,
                status: "done",
            });

            throw err;
        }
    };

    useEffect(() => {
        if (auth.isAuth && auth.status === "pending") {
            navigate("/profile");
        }
    }, [auth.isAuth, auth.status, navigate]);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("favorites");
        setAuth({
            isAuth: false,
            user: null,
            status: "done",
        });
    };

    const data = {
        isAuth: auth.isAuth,
        user: auth.user,
        token: localStorage.getItem("token"),
        login,
        logout,
        registerUser,
    };

    return (
        <AuthContext.Provider value={data}>
            {auth.status === "done" ? children : <Loader/>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;

