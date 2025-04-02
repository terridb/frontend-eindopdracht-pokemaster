import "./HeaderPokemonDetails.css";
import Navigation from "../navigation/Navigation.jsx";
import {writeCleanText, writePokedexNumber} from "../../helpers/changeText.js";
import TypeCard from "../type-card/TypeCard.jsx";
import {makeWeaknessArray} from "../../helpers/getPokemonDetails.jsx";

function HeaderPokemonDetails({pokemon, typeOne, typeTwo, pokemonSpecies, loading, error}) {
    return (
        <header>
            <div className="outer-container header">
                <Navigation/>
                {!loading && !error &&
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
                                    {makeWeaknessArray(typeOne, typeTwo)?.map((type, index) => (
                                        <TypeCard
                                            pokemonType={type}
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

                        </div>
                        <div className="pokedex-colorblock"/>
                        <p className="pokemon-details-description">
                            {writeCleanText(
                                pokemonSpecies?.flavor_text_entries?.find(
                                    (data) => data.language.name === "en"
                                ).flavor_text || "No description available in English."
                            )}
                        </p>
                    </div>
                }
            </div>
        </header>
    );
}

export default HeaderPokemonDetails;