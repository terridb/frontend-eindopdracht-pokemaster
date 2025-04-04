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
    const [pokemon, setPokemon] = useState([]);
    const [offset, setOffset] = useState(0);
    const [moreAvailable, toggleMoreAvailable] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            toggleLoading(true);
            setError(null);

            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=12`);
                setPokemon(prev => offset === 0 ? response.data.results : [...prev, ...response.data.results]);
                toggleMoreAvailable(response.data.results.length > 0);
            } catch (err) {
                setError(err.message);
                console.error(err);
            } finally {
                toggleLoading(false);
            }
        };
        fetchData();

    }, [offset]);

    // stap 0: gebruiker drukt op de load more knop
// stap 1: haal nog 12 pokemon op
// stap 2: voeg deze toe aan de bestaande lijst met pokemon
// stap 3: als er geen pokemon meer zijn, moet de load more knop verdwijnen.
// stap 4: als er pokemon laden, moet de load more knop verdwijnen.

    const handleLoadMore = () => {
        setOffset(prevOffset => prevOffset + 12);
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