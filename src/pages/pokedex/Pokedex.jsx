import mew from "../../assets/images/mew.png";
import Header from "../../components/header/Header.jsx";
import "./Pokedex.css";
import Searchbar from "../../components/searchbar/Searchbar.jsx";
import PokemonCard from "../../components/pokemon-card/PokemonCard.jsx";
import Footer from "../../components/footer/Footer.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import Loader from "../../components/loader/Loader.jsx";
import TypeCard from "../../components/type-card/TypeCard.jsx";
import GeneralButton from "../../components/general-button/GeneralButton.jsx";

function Pokedex() {
    const [detailedPokemon, setDetailedPokemon] = useState([]);
    const [basicPokemon, setBasicPokemon] = useState([]);
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState("");
    const [endpoint, setEndpoint] = useState("https://pokeapi.co/api/v2/pokemon/?limit=12");
    const [results, setResults] = useState([]);

    useEffect(() => {
        const handleFetchData = async () => {
            try {
                toggleLoading(true);
                const response = await axios.get(endpoint);
                setBasicPokemon(response.data);
                const detailedData = await Promise.all(
                    response.data.results.map(async (pokemon) => {
                        const pokemonDetails = await axios.get(pokemon.url);
                        return pokemonDetails.data;
                    })
                );
                setDetailedPokemon((prev) => [...prev, ...detailedData]);
                setResults((prev) => [...prev, ...detailedData]);
            } catch (err) {
                setError(err.message);
                console.error(err);
            } finally {
                toggleLoading(false);
            }
        }
        handleFetchData();
    }, [endpoint]);

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value === "") {
            setResults(detailedPokemon);
        } else {
            setResults(
                detailedPokemon.filter((pokemon) =>
                    pokemon.name.toLowerCase().includes(value.toLowerCase())
                    ||
                    pokemon.id.toString().includes(value)
                ));
        }
    };

    return (
        <>
            <Header
                title="Pokédex"
                text="Welcome to the ultimate Pokédex! Explore detailed profiles, stats and moves for every Pokémon."
                buttonText="Join now"
                headerImage={mew}
                pokemonName="mew"
            />
            <main>
                <section className="outer-container">
                    <div className="large-inner-container pokedex">
                        <div className="filter-section">
                            <h2>Filters</h2>
                            <div className="filter-section-types">
                                <h3>Type</h3>
                                <ul className="filter-section-types-grid">
                                    <TypeCard
                                        pokemonType="normal"
                                        button={true}
                                    />
                                    <TypeCard
                                        pokemonType="fire"
                                        button={true}
                                    />
                                    <TypeCard
                                        pokemonType="fighting"
                                        button={true}
                                    />
                                    <TypeCard
                                        pokemonType="water"
                                        button={true}
                                    />
                                    <TypeCard
                                        pokemonType="flying"
                                        button={true}
                                    />
                                    <TypeCard
                                        pokemonType="grass"
                                        button={true}
                                    />
                                    <TypeCard
                                        pokemonType="poison"
                                        button={true}
                                    />
                                    <TypeCard
                                        pokemonType="electric"
                                        button={true}
                                    />
                                    <TypeCard
                                        pokemonType="ground"
                                        button={true}
                                    />
                                    <TypeCard
                                        pokemonType="psychic"
                                        button={true}
                                    />
                                    <TypeCard
                                        pokemonType="rock"
                                        button={true}
                                    />
                                    <TypeCard
                                        pokemonType="ice"
                                        button={true}
                                    />
                                    <TypeCard
                                        pokemonType="bug"
                                        button={true}
                                    />
                                    <TypeCard
                                        pokemonType="dragon"
                                        button={true}
                                    />
                                    <TypeCard
                                        pokemonType="ghost"
                                        button={true}
                                    />
                                    <TypeCard
                                        pokemonType="dark"
                                        button={true}
                                    />
                                    <TypeCard
                                        pokemonType="steel"
                                        button={true}
                                    />
                                    <TypeCard
                                        pokemonType="fairy"
                                        button={true}
                                    />
                                </ul>
                            </div>
                            <div className="filter-section-gen">
                                <h3>Generation</h3>
                            </div>
                        </div>
                        <div className="pokemon-search-section">
                            <Searchbar
                                placeholder="Search"
                                size="large"
                                value={query}
                                onChange={handleChange}
                            />
                            <div className="pokemon-grid">
                                {results && results.length > 0 ? (
                                    results.map(pokemon => (
                                        <PokemonCard
                                            key={pokemon.id}
                                            name={pokemon.name}
                                            id={pokemon.id}
                                            sprites={pokemon.sprites}
                                            types={pokemon.types}
                                        />
                                    ))
                                ) : (
                                    <p>There are no Pokémon available</p>
                                )}
                            </div>
                            {loading && <Loader/>}
                            {error && <p>{error.message}</p>}
                            {basicPokemon.next && !loading ? (
                                <GeneralButton
                                    buttonText="load more"
                                    onClick={() => {
                                        setEndpoint(basicPokemon.next)
                                    }}
                                />
                            ) : null
                            }
                        </div>
                    </div>

                </section>
            </main>
            <Footer/>
        </>
    );
}

export default Pokedex;