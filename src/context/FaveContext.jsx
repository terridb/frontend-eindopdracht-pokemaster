import {createContext, useEffect, useState} from "react";

export const FaveContext = createContext(null);

function FaveContextProvider({children}) {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const savedFavorites = localStorage.getItem("favorites");
        if (savedFavorites) {
            setFavorites(JSON.parse(savedFavorites));
        }
    }, []);

    useEffect(() => {
        if (favorites.length > 0) {
            localStorage.setItem("favorites", JSON.stringify(favorites));
        }
    }, [favorites]);

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

// stap 1: de knop houdt bij of deze pokemon al als favoriet is opgeslagen. Indien ja, is het hart gevuld, indien nee is hij leeg
// stap 2: als de gebruiker op de knop klikt (leeg) dan wordt de pokemon toegevoegd aan favorieten
// stap 3: als de gebruiker er nog eens op klikt, wordt de pokemon verwijderd uit de favorieten

export default FaveContextProvider;