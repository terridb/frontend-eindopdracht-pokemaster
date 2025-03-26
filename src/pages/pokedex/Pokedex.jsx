import mew from "../../assets/images/mew.png";
import Header from "../../components/header/Header.jsx";
import "./Pokedex.css";
import Searchbar from "../../components/searchbar/Searchbar.jsx";
import PokemonCard from "../../components/pokemon-card/PokemonCard.jsx";
import Footer from "../../components/footer/Footer.jsx";
import {useEffect, useState} from "react";
import axios from "axios";

function Pokedex() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [offset, setOffset] = useState(0);
    const [totalPokemon, setTotalPokemon] = useState(0);

    useEffect(() => {
        const handleFetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=12`);
                const detailedData = await Promise.all(
                    response.data.results.map(async (pokemon) => {
                        const pokemonDetails = await axios.get(pokemon.url);
                        return pokemonDetails.data;
                    })
                );

                setData(detailedData);

                if (offset === 0) {
                    setTotalPokemon(response.data.count);
                }

            } catch (err) {
                setError(err.message);
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        handleFetchData();
    }, [offset])

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
                            </div>
                            <div className="filter-section-gen">
                                <h3>Generation</h3>
                            </div>
                        </div>
                        <div className="pokemon-search-section">
                            <Searchbar
                                placeholder="Search"
                                size="large"
                                // value={value}
                                // onChange={onChange}
                                // suggestions={suggestions}
                                // handleSubmit={handleSubmit}
                                // onFocus={onFocus}
                                // onBlur={onBlur}
                            />
                            <div className="pokemon-grid">
                                {data && data.length > 0 ? (
                                    data.map(pokemon => (
                                        <PokemonCard
                                            key={pokemon.id}
                                            name={pokemon.name}
                                            id={pokemon.id}
                                            sprites={pokemon.sprites}
                                            types={pokemon.types}
                                        />
                                    ))
                                ) : (
                                    <p>Er zijn geen Pokémon beschikbaar</p>
                                )}
                            </div>
                        </div>
                    </div>

                </section>
            </main>
            <Footer/>
        </>
    );
}

export default Pokedex;