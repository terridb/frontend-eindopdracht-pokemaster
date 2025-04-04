import "./PokemonCard.css";
import {capitalizeFirstLetter, writePokedexNumber} from "../../helpers/changeText.js";
import TypeCard from "../type-card/TypeCard.jsx";
import {useEffect, useState} from "react";
import axios from "axios";

function PokemonCard({endpoint}) {
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pokemon, setPokemon] = useState({});

    useEffect(() => {
        const fetchPokemon = async () => {
            toggleLoading(true);
            setError(null);

            try {
                const response = await axios.get(endpoint);
                setPokemon(response.data);
            } catch (err) {
                console.error(err);
                setError(err);
            } finally {
                toggleLoading(false);
            }
        }
        fetchPokemon();

    }, []);

    return (
        <article className="pokemon-card">
            <figure className="pokemon-card-image-wrapper">
                <img
                    className="pokemon-card-image"
                    src={pokemon.sprites?.other?.[`official-artwork`]?.[`front_default`]}
                    alt={`Image of ${pokemon.name}`}/>
            </figure>
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
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
        </article>
    );
}

export default PokemonCard;