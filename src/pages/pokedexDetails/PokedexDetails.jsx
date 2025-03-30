import "./PokedexDetails.css";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Navigation from "../../components/navigation/Navigation.jsx";
import {writeCleanText, writePokedexNumber} from "../../helpers/changeText.js";
import TypeCard from "../../components/type-card/TypeCard.jsx";

function PokedexDetails() {
    const {pokemonId} = useParams();
    const [pokemon, setPokemon] = useState({});
    const [pokemonSpecies, setPokemonSpecies] = useState({});
    const [error, setError] = useState("");
    const [loading, toggleLoading] = useState(false);

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                toggleLoading(true);
                const responsePokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
                setPokemon(responsePokemon.data);

                const responseSpecies = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);
                setPokemonSpecies(responseSpecies.data);
            } catch (err) {
                setError(err.message);
                console.error(err);
            } finally {
                toggleLoading(false);
            }
        }
        fetchPokemon();
    }, []);


    return (
        <>
            <header>
                <div className="outer-container header">
                    <Navigation/>
                    <div className="small-inner-container pokedex-details">
                        <div className="pokemon-details">
                            <div className="pokemon-details-name">
                                <p className="pokemon-card-number">
                                    {writePokedexNumber(pokemon.id)}
                                </p>
                                <h1>{pokemon.name}</h1>
                            </div>
                            <div className="pokemon-details-type">
                                <h3>Type</h3>
                                <ul className="pokemon-details-type-wrapper">
                                    {pokemon.types?.map((type, index) => (
                                        <TypeCard
                                            pokemonType={type.type.name}
                                            key={index}
                                        />
                                    ))}
                                </ul>
                            </div>
                            <div className="pokemon-details-weakness">
                                <h3>Weakness</h3>
                                <ul className="pokemon-details-type-wrapper">
                                    {pokemon.types?.map((type, index) => (
                                        <TypeCard
                                            pokemonType={type.type.name}
                                            key={index}
                                        />
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="pokemon-details-image-wrapper">
                            <img
                                className="pokemon-details-image"
                                src={pokemon.sprites?.other?.[`official-artwork`]?.[`front_default`]}
                                alt={`Image of ${pokemon.name}`}/>

                        </div>  <div className="pokedex-colorblock"/>
                        <p className="pokemon-details-description">
                            {writeCleanText(
                                pokemonSpecies?.flavor_text_entries?.find(
                                    (data) => data.language.name === "en"
                                ).flavor_text || "No description available in English."
                            )}
                        </p>
                    </div>

                </div>
            </header>

        </>
    );
}

export default PokedexDetails;