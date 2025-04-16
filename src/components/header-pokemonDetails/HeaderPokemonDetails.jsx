import "./HeaderPokemonDetails.css";
import Navigation from "../navigation/Navigation.jsx";
import {writeCleanText, writePokedexNumber} from "../../helpers/changeText.js";
import TypeCard from "../type-card/TypeCard.jsx";
import {makeImmunitiesArray, makeResistancesArray, makeWeaknessArray} from "../../helpers/getPokemonDetails.jsx";
import FavoriteButton from "../favorite-button/FavoriteButton.jsx";

function HeaderPokemonDetails({pokemon, typeOne, typeTwo, pokemonSpecies, loading, error, header}) {
    return (
        <header className="detailed-header">
            <section className="outer-container">
                <Navigation/>
                {!loading && !error &&
                    <section className="pokemon-details-section">
                        <section className="pokemon-details-container">

                            {header === "battlemaster" ?
                                <div className="pokemon-details-name">
                                    <h2>Your opposing pokémon:</h2>
                                    <p className="pokemon-card-number">
                                        {writePokedexNumber(pokemon.id)}
                                    </p>
                                    <h3>{pokemon.name}</h3>
                                </div>
                                :
                                <div className="pokemon-details-name">
                                    <p className="pokemon-card-number">
                                        {writePokedexNumber(pokemon.id)}
                                    </p>
                                    <h1>{pokemon.name}</h1>
                                </div>
                            }

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
                            <div className="pokemon-details-type">
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
                        </section>
                        <figure className="pokemon-details-image-wrapper">
                            <img
                                className="pokemon-details-image"
                                src={pokemon.sprites?.other?.[`official-artwork`]?.[`front_default`]}
                                alt={`Image of ${pokemon.name}`}/>
                            <FavoriteButton pokemon={pokemon}/>
                        </figure>
                        <div className={`pokedex-colorblock pokemon-type-color ${typeOne.name}`}/>

                        {header === "battlemaster" ?
                            <section className="pokemon-details-container mirrored">
                                <div className="pokemon-details-type mirrored">
                                    <h3>Immune to</h3>
                                    <ul className="pokemon-details-type-wrapper mirrored">
                                        {makeImmunitiesArray(typeOne, typeTwo)?.map((type, index) => (
                                            <TypeCard
                                                pokemonType={type}
                                                key={index}
                                            />
                                        ))}
                                    </ul>
                                </div>
                                <div className="pokemon-details-type mirrored">
                                    <h3>Resistant to</h3>
                                    <ul className="pokemon-details-type-wrapper mirrored">
                                        {makeResistancesArray(typeOne, typeTwo)?.map((type, index) => (
                                            <TypeCard
                                                pokemonType={type}
                                                key={index}
                                            />
                                        ))}
                                    </ul>
                                </div>
                            </section>
                            :
                            <p className="pokemon-details-description">
                                {writeCleanText(
                                    pokemonSpecies?.flavor_text_entries?.find(
                                        (data) => data.language.name === "en"
                                    ).flavor_text || "No description available in English."
                                )}
                            </p>
                        }
                    </section>
                }
            </section>
        </header>
    );
}

export default HeaderPokemonDetails;