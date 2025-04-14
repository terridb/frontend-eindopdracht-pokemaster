import "./FavoriteButton.css";
import {HeartStraight} from "@phosphor-icons/react";
import {useContext} from "react";
import {FaveContext} from "../../context/FaveContext.jsx";

function FavoriteButton({pokemon}) {
    const {favorites, setFavorites} = useContext(FaveContext);

    const addFavoritePokemon = () => {
        const checkDuplicates = favorites.find(favorite => favorite.id === pokemon.id);

        if (!checkDuplicates) {
            const newFavoriteList = [...favorites, pokemon]
            setFavorites(newFavoriteList);
            console.log(newFavoriteList);
        } else {
            const newFavoriteList = favorites.filter(favorite => favorite.id !== pokemon.id);
            setFavorites(newFavoriteList);
            console.log(newFavoriteList);
        }
    }

    return (
        <button type="button" className="favorite-button" onClick={addFavoritePokemon}>
            <HeartStraight size={24} color="#5E5E5E"/>
        </button>
    );
}

export default FavoriteButton;