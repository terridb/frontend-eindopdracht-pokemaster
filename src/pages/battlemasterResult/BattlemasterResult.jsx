import "./BattlemasterResult.css";
import {useNavigate, useParams} from "react-router-dom";
import HeaderPokemonDetails from "../../components/header-pokemonDetails/HeaderPokemonDetails.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {fetchPokemonData, getIdFromUrl, makeWeaknessArray} from "../../helpers/getPokemonDetails.jsx";
import Footer from "../../components/footer/Footer.jsx";
import PokemonGrid from "../../components/pokemon-grid/PokemonGrid.jsx";
import MovesTable from "../../components/moves-table/MovesTable.jsx";
import {capitalizeFirstLetter} from "../../helpers/changeText.js";
import Loader from "../../components/loader/Loader.jsx";

function BattlemasterResult() {
    const {pokemonId, generation} = useParams();
    const navigate = useNavigate();

    const [pokemon, setPokemon] = useState({});
    const [pokemonSpecies, setPokemonSpecies] = useState({});
    const [error, setError] = useState("");
    const [loading, toggleLoading] = useState(false);
    const [typeOne, setTypeOne] = useState({});
    const [typeTwo, setTypeTwo] = useState({});
    const [pokemonListTypes, setPokemonListTypes] = useState([]);
    const [pokemonListGen, setPokemonListGen] = useState([]);
    const [movesListTypes, setMovesListTypes] = useState([]);
    const [movesListGen, setMovesListGen] = useState([]);
    const [suitablePokemon, setSuitablePokemon] = useState([]);
    const [suitableMoves, setSuitableMoves] = useState([]);
    const [visibleCountPokemon, setVisibleCountPokemon] = useState(3);
    const [visibleCountMoves, setVisibleCountMoves] = useState(5);
    const [isPokemonLoaded, toggleIsPokemonLoaded] = useState(false);
    const [isGenLoaded, toggleIsGenLoaded] = useState(false);

    const isReady = isPokemonLoaded && isGenLoaded;

    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            toggleLoading(true);
            try {
                const data = await fetchPokemonData(pokemonId, controller.signal);
                setPokemon(data.pokemon);
                setPokemonSpecies(data.pokemonSpecies);
                setTypeOne(data.typeOne);
                setTypeTwo(data.typeTwo);
                toggleIsPokemonLoaded(true);
            } catch (err) {
                console.error(err);
                if (err.response && err.response.status === 404) {
                    return navigate("/not-found");
                }
                setError(err.message);
            } finally {
                toggleLoading(false);
            }
        };
        fetchData();

        return function cleanup() {
            controller.abort();
        }

    }, [pokemonId]);

    useEffect(() => {
        const controller = new AbortController();

        const getGenerationData = async () => {
            toggleLoading(true);

            try {
                if (generation === "use-all") {
                    const responsePokemon = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=10000", {
                        signal: controller.signal,
                    });
                    setPokemonListGen(responsePokemon.data.results);
                    const responseMoves = await axios.get("https://pokeapi.co/api/v2/move/?limit=10000", {
                        signal: controller.signal,
                    });
                    setMovesListGen(responseMoves.data.results);
                } else {
                    const response = await axios.get(`https://pokeapi.co/api/v2/generation/${generation}`, {
                        signal: controller.signal,
                    });
                    const pokemonList = response.data.pokemon_species.map(pokemonData => ({
                        name: pokemonData.name,
                        url: `https://pokeapi.co/api/v2/pokemon/${getIdFromUrl(pokemonData.url)}`
                    }));
                    setPokemonListGen(pokemonList);
                    setMovesListGen(response.data.moves);
                }
                toggleIsGenLoaded(true);
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
        getGenerationData();

        return function cleanup() {
            controller.abort();
        }

    }, [generation]);

    useEffect(() => {
        const controller = new AbortController();

        const getWeaknessData = async () => {
            const pokemonWeakness = makeWeaknessArray(typeOne, typeTwo);
            toggleLoading(true);

            try {
                const weaknessData = await Promise.all(
                    pokemonWeakness.map(async (type) => {
                        const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`, {
                            signal: controller.signal,
                        });
                        return response.data;
                    })
                );

                const pokemonList = weaknessData.flatMap(type =>
                    type.pokemon.map(pokemonData => ({
                        name: pokemonData.pokemon.name,
                        url: pokemonData.pokemon.url
                    }))
                );

                setMovesListTypes(weaknessData.flatMap(type => type.moves));

                const seenNames = new Set();
                const uniquePokemonList = pokemonList.filter(pokemon => {
                    if (seenNames.has(pokemon.name)) {
                        return false;
                    }
                    seenNames.add(pokemon.name);
                    return true;
                });
                setPokemonListTypes(uniquePokemonList);

            } catch (err) {
                setError(err.message);
                console.error(err);
            } finally {
                toggleLoading(false);
            }
        };

        if (typeOne && Object.keys(typeOne).length > 0) {
            getWeaknessData();
        }

        return function cleanup() {
            controller.abort();
        }

    }, [typeOne, typeTwo]);

    useEffect(() => {
        if (pokemonListTypes.length > 0 && pokemonListGen.length > 0) {
            const genPokemonNames = pokemonListGen.map(pokemon => pokemon.name);

            const matchingPokemon = pokemonListTypes
                .filter(pokemon => genPokemonNames.includes(pokemon.name));
            setSuitablePokemon(matchingPokemon);
        }
    }, [pokemonListGen, pokemonListTypes]);

    useEffect(() => {
        if (movesListTypes.length > 0 && movesListGen.length > 0) {
            const genMoveNames = movesListGen.map(moves => moves.name);

            const matchingMoves = movesListTypes
                .filter(moves => genMoveNames.includes(moves.name));
            setSuitableMoves(matchingMoves);
        }
    }, [movesListGen, movesListTypes]);

    const handleLoadMorePokemon = () => {
        setVisibleCountPokemon(prevCount => prevCount + 6);
    };

    const handleLoadMoreMoves = () => {
        setVisibleCountMoves(prevCount => prevCount + 5);
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
                            <section className="result-section">
                                <div className="pokemon-grid-title">
                                    <h2>Suitable pokémon options - </h2>
                                    <p className="selected-gen">{capitalizeFirstLetter(generation)}</p>
                                </div>
                                <PokemonGrid
                                    pokemon={suitablePokemon.slice(0, visibleCountPokemon)}
                                    loading={loading}
                                    error={error}
                                    moreAvailable={visibleCountPokemon < suitablePokemon.length}
                                    handleLoadMore={handleLoadMorePokemon}
                                />
                            </section>
                            <section className="result-section">
                                <div className="pokemon-grid-title">
                                    <h2>Strong moves -</h2>
                                    <p className="selected-gen">{capitalizeFirstLetter(generation)}</p>
                                </div>
                                <MovesTable
                                    loading={loading}
                                    handleLoadMore={handleLoadMoreMoves}
                                    movesList={suitableMoves}
                                    counter={visibleCountMoves}
                                    moreAvailable={visibleCountMoves < suitableMoves.length}
                                />
                            </section>
                        </>
                    }
                </section>
            </main>
            <Footer/>
        </>
    )

}

export default BattlemasterResult;