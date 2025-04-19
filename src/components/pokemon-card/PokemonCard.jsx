import "./PokemonCard.css";
import {capitalizeFirstLetter, writePokedexNumber} from "../../helpers/changeText.js";
import TypeCard from "../type-card/TypeCard.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import FavoriteButton from "../favorite-button/FavoriteButton.jsx";
import {Link} from "react-router-dom";

function PokemonCard({endpoint}) {
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pokemon, setPokemon] = useState({});
    const [loadedImage, toggleLoadedImage] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        const fetchPokemon = async () => {
            toggleLoading(true);
            setError(null);

            try {
                const response = await axios.get(endpoint, {
                    signal: controller.signal,
                });
                setPokemon(response.data);

                if (response.data.sprites?.other?.[`official-artwork`]?.[`front_default`]) {
                    toggleLoadedImage(true);
                } else {
                    setError("Pokemon could not be loaded")
                }

            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                toggleLoading(false);
            }
        }
        fetchPokemon();

        return function cleanup() {
            controller.abort();
        }

    }, [endpoint]);

    if (pokemon && loadedImage) {
        return (
            <article className="pokemon-card">
                <figure className="pokemon-card-image-wrapper">
                    <img
                        className="pokemon-card-image"
                        src={pokemon.sprites?.other?.[`official-artwork`]?.[`front_default`]}
                        alt={`Image of ${pokemon.name}`}
                    />
                    <FavoriteButton
                        pokemon={pokemon}
                    />
                </figure>
                <Link to={`/pokedex/${pokemon.id}`}>
                    <div className="pokemon-card-details">
                        <p className="pokemon-card-number">{writePokedexNumber(pokemon.id)}</p>
                        <h5>{capitalizeFirstLetter(pokemon.name)}</h5>
                        <ul className="pokemon-card-type-wrapper">
                            {pokemon.types?.map((type, index) => (
                                <TypeCard
                                    pokemonType={type.type.name}
                                    key={index}
                                />
                            ))}
                        </ul>
                    </div>
                </Link>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
            </article>
        );
    }
}

export default PokemonCard;