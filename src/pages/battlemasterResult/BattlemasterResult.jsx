import "./BattlemasterResult.css";
import {useParams} from "react-router-dom";
import HeaderPokemonDetails from "../../components/header-pokemonDetails/HeaderPokemonDetails.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import Loader from "../../components/loader/Loader.jsx";
import {getIdFromUrl, makeWeaknessArray} from "../../helpers/getPokemonDetails.jsx";
import Footer from "../../components/footer/Footer.jsx";
import TypeCard from "../../components/type-card/TypeCard.jsx";
import GeneralButton from "../../components/general-button/GeneralButton.jsx";
import PokemonGrid from "../../components/pokemon-grid/PokemonGrid.jsx";

function BattlemasterResult() {
    const {pokemonId, generation} = useParams();
    const [pokemon, setPokemon] = useState({});
    const [pokemonSpecies, setPokemonSpecies] = useState({});
    const [error, setError] = useState("");
    const [loading, toggleLoading] = useState(false);
    const [typeOne, setTypeOne] = useState({});
    const [typeTwo, setTypeTwo] = useState({});
    const [pokemonListTypes, setPokemonListTypes] = useState([]);
    const [pokemonListGen, setPokemonListGen] = useState([]);
    const [suitablePokemon, setSuitablePokemon] = useState([]);
    const [visibleCount, setVisibleCount] = useState(3);

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
    }, [pokemonId]);

    useEffect(() => {
        const getGenerationData = async () => {
            toggleLoading(true);

            try {
                if (generation === "use-all") {
                    const response = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=10000");
                    setPokemonListGen(response.data.results);
                } else {
                    const response = await axios.get(`https://pokeapi.co/api/v2/generation/${generation}`);
                    const pokemonList = response.data.pokemon_species.map(pokemonData => ({
                        name: pokemonData.name,
                        url: `https://pokeapi.co/api/v2/pokemon/${getIdFromUrl(pokemonData.url)}`
                    }));
                    setPokemonListGen(pokemonList);
                }
            } catch (err) {
                console.error(err);
                setError(err);
            } finally {
                toggleLoading(false);
            }
        }

        getGenerationData();
    }, [generation]);

    useEffect(() => {
        const getWeaknessData = async () => {
            const pokemonWeakness = makeWeaknessArray(typeOne, typeTwo);
            toggleLoading(true);

            try {
                const weaknessData = await Promise.all(
                    pokemonWeakness.map(async (type) => {
                        const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
                        return response.data;
                    })
                );

                const pokemonList = weaknessData.map(type =>
                    type.pokemon.map(pokemonData => ({
                        name: pokemonData.pokemon.name,
                        url: pokemonData.pokemon.url
                    }))
                ).flat();
                const uniquePokemonList = [...new Set(pokemonList)];
                setPokemonListTypes(uniquePokemonList);
            } catch (err) {
                console.error(err);
                setError(err);
            } finally {
                toggleLoading(false);
            }
        }
        if (typeOne && Object.keys(typeOne).length > 0) {
            getWeaknessData();
        }
    }, [typeOne, typeTwo])

    useEffect(() => {
        if (pokemonListTypes.length > 0 && pokemonListGen.length > 0) {
            const genPokemonNames = pokemonListGen.map(pokemon => pokemon.name);

            const matchingPokemon = pokemonListTypes
                .filter(pokemon => genPokemonNames.includes(pokemon.name));
            setSuitablePokemon(matchingPokemon);
        }
    }, [pokemonListGen, pokemonListTypes]);

    const handleLoadMore = () => {
        setVisibleCount(prevCount => prevCount + 3);
    };

    return (
        <>
            <HeaderPokemonDetails
                pokemon={pokemon}
                typeOne={typeOne}
                typeTwo={typeTwo}
                pokemonSpecies={pokemonSpecies}
                loading={loading}
                error={error}
                header="battlemaster"
            />
            <main>
                <section className="outer-container">
                    <section className="result-section">
                        <div className="pokemon-grid-title">
                            <h2>Suitable pokémon options - </h2>
                            <p className="selected-gen">{generation}</p>
                        </div>
                        <PokemonGrid
                            pokemon={suitablePokemon.slice(0, visibleCount)}
                            loading={loading}
                            error={error}
                            moreAvailable={visibleCount < suitablePokemon.length}
                            handleLoadMore={handleLoadMore}
                        />
                    </section>
                    <section className="result-section">
                        <div className="pokemon-grid-title">
                            <h2>Strong moves</h2>
                        </div>
                        <div className="type-list">
                            {loading && <Loader/>}
                            {error && <p>{error.message}</p>}
                            <table>
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Power</th>
                                    <th>Acc</th>
                                    <th>PP</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Water Gun</td>
                                    <td>
                                        <TypeCard
                                            pokemonType="water"
                                        />
                                    </td>
                                    <td>40</td>
                                    <td>100</td>
                                    <td>25</td>
                                </tr>
                                </tbody>
                            </table>
                            <section className="load-more-section">
                                <GeneralButton buttonText="Load more"/>
                            </section>
                        </div>
                    </section>
                </section>
            </main>
            <Footer/>
        </>
    );
}

export default BattlemasterResult;