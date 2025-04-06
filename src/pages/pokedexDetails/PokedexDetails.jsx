import "./PokedexDetails.css";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import HeaderPokemonDetails from "../../components/header-pokemonDetails/HeaderPokemonDetails.jsx";
import Footer from "../../components/footer/Footer.jsx";
import PokemonStats from "../../components/pokemon-stats/PokemonStats.jsx";
import PokemonInformation from "../../components/pokemon-information/PokemonInformation.jsx";
import Loader from "../../components/loader/Loader.jsx";

function PokedexDetails() {
    const {pokemonId} = useParams();
    const [pokemon, setPokemon] = useState({});
    const [pokemonSpecies, setPokemonSpecies] = useState({});
    const [error, setError] = useState("");
    const [loading, toggleLoading] = useState(false);
    const [typeOne, setTypeOne] = useState({});
    const [typeTwo, setTypeTwo] = useState({});

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                toggleLoading(true);
                const responsePokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
                setPokemon(responsePokemon.data);

                const responseSpecies = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);
                setPokemonSpecies(responseSpecies.data);

                if (responsePokemon.data.types.length === 2) {
                    const responseTypeOne = await axios.get(`https://pokeapi.co/api/v2/type/${responsePokemon.data.types[0].type.name}`);
                    setTypeOne(responseTypeOne.data);
                    const responseTypeTwo = await axios.get(`https://pokeapi.co/api/v2/type/${responsePokemon.data.types[1].type.name}`);
                    setTypeTwo(responseTypeTwo.data);
                } else {
                    const responseTypeOne = await axios.get(`https://pokeapi.co/api/v2/type/${responsePokemon.data.types[0].type.name}`);
                    setTypeOne(responseTypeOne.data);
                }

            } catch (err) {
                setError(err.message);
                console.error(err);
            } finally {
                toggleLoading(false);
            }
        }
        fetchPokemon();
    }, []);

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
            />
            <main>
                <section className="outer-container">
                    <div className="large-inner-container pokemon-overview">
                        {loading && <Loader/>}
                        {error && <p className="error-message">{error}</p>}
                        {!loading && !error &&
                            <>
                                <PokemonInformation
                                    pokemon={pokemon}
                                    pokemonSpecies={pokemonSpecies}
                                />
                                <PokemonStats
                                    stats={pokemon?.stats || []}
                                    type={typeOne.name}
                                />
                            </>
                        }
                    </div>
                </section>
            </main>
            <Footer/>
        </>
    );
}

export default PokedexDetails;