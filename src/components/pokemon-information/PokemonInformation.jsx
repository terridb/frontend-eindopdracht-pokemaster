import "./PokemonInformation.css";
import {decreaseUnit, getGenderIcons} from "../../helpers/getPokemonDetails.jsx";
import {capitalizeFirstLetter} from "../../helpers/changeText.js";

function PokemonInformation({pokemon, pokemonSpecies}) {
    return (
        <section className="pokemon-information-section">
            <div className="pokemon-attribute">
                <h3>Height</h3>
                <p>{decreaseUnit(pokemon.height)} m</p>
            </div>
            <div className="pokemon-attribute">
                <h3>Weight</h3>
                <p>{decreaseUnit(pokemon.weight)} kg</p>
            </div>
            <div className="pokemon-attribute">
                <h3>Gender</h3>
                <div className="gender-icon-container">
                    {getGenderIcons(pokemonSpecies?.gender_rate)}
                </div>
            </div>
            <div className="pokemon-attribute">
                <h3>Category</h3>
                <p>{pokemonSpecies?.genera?.find(
                    (data) => data.language.name === "en"
                ).genus || "No category available in English."}
                </p>
            </div>
            <div className="pokemon-attribute">
                <h3>Abilities</h3>
                <ul className="abilities-list">
                    {pokemon?.abilities?.map((ability) => (
                        ability.is_hidden === false && (
                            <li key={ability.slot}>
                                {capitalizeFirstLetter(ability.ability.name)}
                            </li>
                        )
                    ))}
                </ul>
            </div>
            <div className="pokemon-attribute centered">
                <h3>Shiny</h3>
                <figure className="shiny-container">
                    <img src={pokemon.sprites?.other?.[`official-artwork`]?.[`front_shiny`]}
                         alt={`Shiny ${pokemon.name}`}
                         className="shiny-pokemon"
                    />
                </figure>
            </div>
        </section>
    );
}

export default PokemonInformation;