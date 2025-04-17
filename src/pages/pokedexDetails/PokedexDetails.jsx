import "./PokedexDetails.css";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import HeaderPokemonDetails from "../../components/header-pokemonDetails/HeaderPokemonDetails.jsx";
import Footer from "../../components/footer/Footer.jsx";
import PokemonStats from "../../components/pokemon-stats/PokemonStats.jsx";
import PokemonInformation from "../../components/pokemon-information/PokemonInformation.jsx";
import Loader from "../../components/loader/Loader.jsx";
import {fetchPokemonData} from "../../helpers/getPokemonDetails.jsx";

function PokedexDetails() {
    const {pokemonId} = useParams();
    const [pokemon, setPokemon] = useState({});
    const [pokemonSpecies, setPokemonSpecies] = useState({});
    const [error, setError] = useState("");
    const [loading, toggleLoading] = useState(false);
    const [typeOne, setTypeOne] = useState({});
    const [typeTwo, setTypeTwo] = useState({});
    const [isPokemonLoaded, toggleIsPokemonLoaded] = useState(false);

    const isReady = isPokemonLoaded;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            toggleLoading(true);
            try {
                const data = await fetchPokemonData(pokemonId);
                setPokemon(data.pokemon);
                setPokemonSpecies(data.pokemonSpecies);
                setTypeOne(data.typeOne);
                setTypeTwo(data.typeTwo);
                toggleIsPokemonLoaded(true);
            } catch (err) {
                setError(err.message);
                console.error(err);
                if (err.response && err.response.status === 404) {
                    navigate("/not-found");
                }
            } finally {
                toggleLoading(false);
            }
        };

        fetchData();
    }, [pokemonId]);

    return (
        <>
            <HeaderPokemonDetails
                pokemon={pokemon}
                typeOne={typeOne}
                typeTwo={typeTwo}
                pokemonSpecies={pokemonSpecies}
                loading={loading}
                error={error}
                header="pokedex"
                isReady={isReady}
            />
            <main>
                <section className="outer-container">
                    {(loading || !isReady) &&
                        <span className="loader-container">
                        <Loader/>
                        </span>
                    }
                    {error && <p className="error-message">{error}</p>}
                    {!loading && isReady &&
                        <>
                            <section className="pokemon-information-section">
                                <PokemonInformation
                                    pokemon={pokemon}
                                    pokemonSpecies={pokemonSpecies}
                                />
                                <PokemonStats
                                    stats={pokemon?.stats || []}
                                    type={typeOne.name}
                                />
                            </section>
                        </>
                    }
                </section>
            </main>
            <Footer/>
        </>
    );
}

export default PokedexDetails;