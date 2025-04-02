import mew from "../../assets/images/mew.png";
import HeaderGeneral from "../../components/header-general/HeaderGeneral.jsx";
import "./Pokedex.css";
import Searchbar from "../../components/searchbar/Searchbar.jsx";
import PokemonCard from "../../components/pokemon-card/PokemonCard.jsx";
import Footer from "../../components/footer/Footer.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import Loader from "../../components/loader/Loader.jsx";
import GeneralButton from "../../components/general-button/GeneralButton.jsx";
import TypeFilters from "../../components/type-filters/TypeFilters.jsx";
import {Link} from "react-router-dom";

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
                if (endpoint === "https://pokeapi.co/api/v2/pokemon/?limit=12") {
                    setDetailedPokemon(detailedData);
                    setResults(detailedData);
                } else {
                    setDetailedPokemon((prev) => [...prev, ...detailedData]);
                    setResults((prev) => [...prev, ...detailedData]);
                }
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
            <HeaderGeneral
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
                            <TypeFilters/>
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
                                    results.map((pokemon) => (
                                        <Link key={pokemon.id} to={`/pokedex/${pokemon.id}`}>
                                            <PokemonCard
                                                name={pokemon.name}
                                                id={pokemon.id}
                                                sprites={pokemon.sprites}
                                                types={pokemon.types}
                                            />
                                        </Link>
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