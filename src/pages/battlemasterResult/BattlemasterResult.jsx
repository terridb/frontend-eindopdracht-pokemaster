import "./BattlemasterResult.css";
import {useParams} from "react-router-dom";
import HeaderPokemonDetails from "../../components/header-pokemonDetails/HeaderPokemonDetails.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {getIdFromUrl, makeWeaknessArray} from "../../helpers/getPokemonDetails.jsx";
import Footer from "../../components/footer/Footer.jsx";
import PokemonGrid from "../../components/pokemon-grid/PokemonGrid.jsx";
import MovesTable from "../../components/moves-table/MovesTable.jsx";
import {capitalizeFirstLetter} from "../../helpers/changeText.js";

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
    const [movesListTypes, setMovesListTypes] = useState([]);
    const [movesListGen, setMovesListGen] = useState([]);
    const [suitablePokemon, setSuitablePokemon] = useState([]);
    const [suitableMoves, setSuitableMoves] = useState([]);
    const [visibleCountPokemon, setVisibleCountPokemon] = useState(3);
    const [visibleCountMoves, setVisibleCountMoves] = useState(5);

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
                    const responsePokemon = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=10000");
                    setPokemonListGen(responsePokemon.data.results);
                    const responseMoves = await axios.get("https://pokeapi.co/api/v2/move/?limit=10000");
                    setMovesListGen(responseMoves.data.results);
                } else {
                    const response = await axios.get(`https://pokeapi.co/api/v2/generation/${generation}`);
                    const pokemonList = response.data.pokemon_species.map(pokemonData => ({
                        name: pokemonData.name,
                        url: `https://pokeapi.co/api/v2/pokemon/${getIdFromUrl(pokemonData.url)}`
                    }));
                    setPokemonListGen(pokemonList);
                    setMovesListGen(response.data.moves);
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
            />
            <main>
                <section className="outer-container">
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
                </section>
            </main>
            <Footer/>
        </>
    );
}

export default BattlemasterResult;