import "./FavoriteButton.css";
import {HeartStraight} from "@phosphor-icons/react";
import {useContext} from "react";
import {FaveContext} from "../../context/FaveContext.jsx";
import {AuthContext} from "../../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

function FavoriteButton({pokemon}) {
    const {favorites, setFavorites} = useContext(FaveContext);
    const {isAuth} = useContext(AuthContext);
    const navigate = useNavigate();

    const addFavoritePokemon = () => {
        const checkDuplicates = favorites.includes(pokemon.id);

        if (!checkDuplicates) {
            const newFavoriteList = [...favorites, pokemon.id];
            setFavorites(newFavoriteList);
        } else {
            const newFavoriteList = favorites.filter(id => id !== pokemon.id);
            setFavorites(newFavoriteList);
        }
    };

    return (
        <>
            {isAuth && pokemon ? (
                <button type="button" className="favorite-button" onClick={addFavoritePokemon}>
                    <HeartStraight
                        size={24}
                        color="#5E5E5E"
                        weight={favorites.includes(pokemon.id) ? "fill" : "regular"}
                    />
                </button>
            ) : (
                <button type="button" className="favorite-icon" onClick={() => navigate("/favorites")}>
                    <HeartStraight
                        color="white"
                    />
                </button>
            )}
        </>
    );
}

export default FavoriteButton;