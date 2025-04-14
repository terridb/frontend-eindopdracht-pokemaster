import {createContext, useContext, useEffect, useState} from "react";
import {AuthContext} from "./AuthContext.jsx";

export const FaveContext = createContext(null);

function FaveContextProvider({children}) {
    const {user} = useContext(AuthContext);
    const [favorites, setFavorites] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (user) {
            const savedFavorites = localStorage.getItem("favorites");
            if (savedFavorites) {
                setFavorites(JSON.parse(savedFavorites));
            } else {
                setFavorites([]);
            }
            setLoaded(true);
        }
    }, [user]);

    useEffect(() => {
        if (user && loaded) {
            localStorage.setItem("favorites", JSON.stringify(favorites));
        }
    }, [favorites, loaded, user]);

    const data = {
        favorites: favorites,
        setFavorites: setFavorites,
    };

    return (
        <FaveContext.Provider value={data}>
            {children}
        </FaveContext.Provider>
    );
}

export default FaveContextProvider;