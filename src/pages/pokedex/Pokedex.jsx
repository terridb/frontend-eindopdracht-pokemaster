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
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState("");
    const [endpoint, setEndpoint] = useState("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=12");
    const [pokemon, setPokemon] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            toggleLoading(true);
            setError(null);

            try {
                const response = await axios.get(endpoint);
                setPokemon(response.data);
            } catch (err) {
                setError(err.message);
                console.error(err);
            } finally {
                toggleLoading(false);
            }
        };
        fetchData();

    }, [endpoint]);

    const handleLoadMore = () => {
        setEndpoint(pokemon.next);
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
                            <Searchbar
                                placeholder="Search"
                                size="large"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                // handleSubmit={handleSearch}
                            />
                            <section className="pokemon-grid">
                                {loading && <Loader/>}
                                {error && <p>{error.message}</p>}
                                {pokemon.results && pokemon.results.map((pokemon) => (
                                    <Link key={getIdFromUrl(pokemon.url)} to={`/pokedex/${getIdFromUrl(pokemon.url)}`}>
                                        <PokemonCard endpoint={pokemon.url}/>
                                    </Link>
                                ))}
                            </section>
                            <section className="load-more-section">
                                {!loading ? (
                                    <GeneralButton
                                        buttonText="Load more"
                                        onClick={handleLoadMore}
                                    />
                                ) : null
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