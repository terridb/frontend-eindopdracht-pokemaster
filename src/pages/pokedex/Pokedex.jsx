import "./Pokedex.css";
import mew from "../../assets/images/mew.png";
import HeaderGeneral from "../../components/header-general/HeaderGeneral.jsx";
import Searchbar from "../../components/searchbar/Searchbar.jsx";
import Footer from "../../components/footer/Footer.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {getIdFromUrl} from "../../helpers/getPokemonDetails.jsx";
import {resetInput} from "../../helpers/resetInput.js";
import PokemonGrid from "../../components/pokemon-grid/PokemonGrid.jsx";

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
        const controller = new AbortController();

        const fetchData = async () => {
            toggleLoading(true);
            setError(null);

            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=12`, {
                    signal: controller.signal,
                });
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

        return function cleanup() {
            controller.abort();
        }

    }, [offset]);

    useEffect(() => {
        const controller = new AbortController();

        const fetchAllPokemon = async () => {
            toggleLoading(true);
            setError(null);
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=10000`, {
                    signal: controller.signal,
                });
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
                headerImage={mew}
                pokemonName="mew"
                page="pokedex"
            />
            <main>
                <section className="outer-container">
                    <div className="pokemon-search-section">
                        <div className="pokemon-search">
                            <Searchbar
                                placeholder="Search"
                                size="large"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                handleSubmit={handleSearch}
                                handleReset={() => resetInput(setQuery)}
                            />
                            {searchResults && pokemon.length > 0 && (
                                <p className="search-results-text">{matchingPokemon.length} results for
                                    "{searchResults}"</p>
                            )}
                        </div>
                        <PokemonGrid
                            pokemon={pokemon}
                            loading={loading}
                            error={error}
                            moreAvailable={moreAvailable}
                            handleLoadMore={handleLoadMore}
                        />
                    </div>
                </section>
            </main>
            <Footer/>
        </>
    );
}

export default Pokedex;