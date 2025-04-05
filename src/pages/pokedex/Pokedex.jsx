import "./Pokedex.css";
import mew from "../../assets/images/mew.png";
import HeaderGeneral from "../../components/header-general/HeaderGeneral.jsx";
import Searchbar from "../../components/searchbar/Searchbar.jsx";
import PokemonCard from "../../components/pokemon-card/PokemonCard.jsx";
import Footer from "../../components/footer/Footer.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import Loader from "../../components/loader/Loader.jsx";
import GeneralButton from "../../components/general-button/GeneralButton.jsx";
import TypeFilters from "../../components/type-filters/TypeFilters.jsx";
import {Link} from "react-router-dom";
import {getIdFromUrl} from "../../helpers/getPokemonDetails.jsx";

function Pokedex() {
    const [pokemon, setPokemon] = useState([]);
    const [allPokemon, setAllPokemon] = useState([]);
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState("");
    const [moreAvailable, toggleMoreAvailable] = useState(true);
    const [offset, setOffset] = useState(0);
    const [searchOffset, setSearchOffset] = useState(12);
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState(null);
    const [matchingPokemon, setMatchingPokemon] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            toggleLoading(true);
            setError(null);

            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=12`);
                const filteredPokemon = response.data.results.filter(pokemon =>
                    getIdFromUrl(pokemon.url) <= 10000
                );

                setPokemon(prev => offset === 0 ? filteredPokemon : [...prev, ...filteredPokemon]);
                toggleMoreAvailable(filteredPokemon.length > 0);
            } catch (err) {
                setError(err.message);
                console.error(err);
            } finally {
                toggleLoading(false);
            }
        };
        fetchData();

    }, [offset]);

    useEffect(() => {
        const fetchAllPokemon = async () => {
            toggleLoading(true);
            setError(null);
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=10000`);
                const filteredPokemon = response.data.results.filter(pokemon =>
                    getIdFromUrl(pokemon.url) <= 10000
                );

                setAllPokemon(filteredPokemon);
            } catch (err) {
                setError(err.message);
                console.error(err);
            } finally {
                toggleLoading(false);
            }
        };
        fetchAllPokemon();

    }, []);

    const handleLoadMore = () => {
        if (query === "") {
            setOffset(prevOffset => prevOffset + 12);
        } else {
            setSearchOffset(prevSearchOffset => prevSearchOffset + 12);
            setPokemon(matchingPokemon.slice(0, searchOffset + 12));
            toggleMoreAvailable(matchingPokemon.length > pokemon.length + 12);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setOffset(0);
        setSearchOffset(12);
        setSearchResults(query);

        toggleLoading(true);
        setError(null);

        try {
            const filteredPokemon = allPokemon.filter((pokemon) => {
                const pokemonId = getIdFromUrl(pokemon.url);
                return (
                    pokemon.name.toLowerCase().includes(query.toLowerCase()) ||
                    pokemonId.toString().includes(query)
                );
            });

            setMatchingPokemon(filteredPokemon);

            if (filteredPokemon.length > 0) {
                setPokemon(filteredPokemon.slice(0, 12));
                toggleMoreAvailable(filteredPokemon.length > 12);
            } else {
                setPokemon([]);
                toggleMoreAvailable(false);
            }

        } catch (err) {
            setError(err.message);
            console.error(err);
        } finally {
            toggleLoading(false);
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
                        <section className="filter-section">
                            <h2>Filters</h2>
                            <TypeFilters/>
                            <div className="filter-section-gen">
                                <h3>Generation</h3>
                            </div>
                        </section>
                        <section className="pokemon-search-section">
                            <section className="pokemon-search">
                                <Searchbar
                                    placeholder="Search"
                                    size="large"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    handleSubmit={handleSearch}
                                />
                                {searchResults && pokemon.length > 0 && (
                                    <p className="search-results-text">{matchingPokemon.length} results for
                                        "{searchResults}"</p>
                                )}
                            </section>
                            <section className="pokemon-grid">
                                {loading && <Loader/>}
                                {error && <p>{error.message}</p>}

                                {!loading && pokemon.length === 0 && searchResults !== "" && (
                                    <p className="no-results">No matching Pokémon found, try something else</p>
                                )}

                                {pokemon && pokemon.map((pokemon) => (
                                    <Link key={getIdFromUrl(pokemon.url)} to={`/pokedex/${getIdFromUrl(pokemon.url)}`}>
                                        <PokemonCard endpoint={pokemon.url}/>
                                    </Link>
                                ))}
                            </section>
                            <section className="load-more-section">
                                {!loading && moreAvailable && (
                                    <GeneralButton
                                        buttonText="Load more"
                                        onClick={handleLoadMore}
                                    />
                                )
                                }
                            </section>
                        </section>
                    </div>
                </section>
            </main>
            <Footer/>
        </>
    );
}

export default Pokedex;