import "./Battlemaster.css";
import HeaderGeneral from "../../components/header-general/HeaderGeneral.jsx";
import Footer from "../../components/footer/Footer.jsx";
import lucario from "../../assets/images/lucario.png";
import GeneralButton from "../../components/general-button/GeneralButton.jsx";
import TypeCard from "../../components/type-card/TypeCard.jsx";
import battlemaster from "../../assets/images/pokemon-battle.png";
import Searchbar from "../../components/searchbar/Searchbar.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {getIdFromUrl} from "../../helpers/getPokemonDetails.jsx";
import {useNavigate} from "react-router-dom";
import Loader from "../../components/loader/Loader.jsx";
import SearchSuggestions from "../../components/search-suggestions/SearchSuggestions.jsx";
import {resetInput} from "../../helpers/resetInput.js";

function Battlemaster() {
    const navigate = useNavigate();

    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState(null);
    const [allGen, setAllGen] = useState([]);
    const [selectedGen, setSelectedGen] = useState(null);
    const [quizPage, setQuizPage] = useState(0);
    const [pokemonList, setPokemonList] = useState([]);
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        const controller = new AbortController();

        const fetchAllGen = async () => {
            toggleLoading(true);
            setError(null);

            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/generation/`, {
                    signal: controller.signal,
                });
                setAllGen(generationArray(response.data.results));
            } catch (err) {
                console.error(err)
                setError(err.message);
            } finally {
                toggleLoading(false);
            }
        }
        fetchAllGen();

        return function cleanup() {
            controller.abort();
        }

    }, []);

    useEffect(() => {
        const controller = new AbortController();

        const fetchPokemon = async () => {
            toggleLoading(true);
            setError(null);

            try {
                if (quizPage === 1) {
                    const response = await axios.get(selectedGen.url, {
                        signal: controller.signal,
                    });

                    if (selectedGen.name === "use-all") {
                        const pokemonList = response.data.results.map((pokemon) => {
                            const id = getIdFromUrl(pokemon.url);

                            return {
                                name: pokemon.name,
                                id: id,
                                url: pokemon.url
                            };
                        }).filter(pokemon => Number(pokemon.id) <= 10000);
                        setPokemonList(pokemonList);
                    } else {
                        const pokemonList = response.data.pokemon_species.map((pokemon) => {
                            const id = getIdFromUrl(pokemon.url);

                            return {
                                name: pokemon.name,
                                id: id,
                                url: `https://pokeapi.co/api/v2/pokemon/${id}`
                            };
                        }).filter(pokemon => Number(pokemon.id) <= 10000);
                        setPokemonList(pokemonList);
                    }
                }
            } catch
                (err) {
                setError(err.message);
                console.error(err);
            } finally {
                toggleLoading(false);
            }
        }
        fetchPokemon();

        return function cleanup() {
            controller.abort();
        }

    }, [quizPage, selectedGen]);

    const generationArray = (gen) => {
        return [{
            title: "Use all",
            name: "use-all",
            url: "https://pokeapi.co/api/v2/pokemon/?limit=10000"
        }].concat(gen.map((item) => {
            const genId = getIdFromUrl(item.url);
            return ({
                    title: `Gen ${genId}`,
                    name: item.name,
                    url: item.url
                }
            );
        }));
    };

    const handleSelectGen = (genName) => {
        setSelectedGen(prevGen => (prevGen?.name === genName.name ? null : genName));
    };

    const handleChange = (e) => {
        setError("");
        setQuery(e.target.value);
    };

    useEffect(() => {
        if (pokemonList.length > 0) {
            const filteredSuggestions = pokemonList.filter(pokemon =>
                pokemon.name.toLowerCase().includes(query.toLowerCase()) ||
                pokemon.id.includes(query)
            ).slice(0, 3);
            setSuggestions(filteredSuggestions);
        }
    }, [query, pokemonList]);


    const handleClick = (e) => {
        e.preventDefault();
        if (quizPage === 0) {
            setQuizPage(quizPage + 1);
        } else {
            const matchedPokemon = pokemonList.find(
                (pokemon) =>
                    pokemon.name.toLowerCase() === query.toLowerCase() ||
                    pokemon.id === query
            );
            if (matchedPokemon) {
                navigate(`/battlemaster/${matchedPokemon.id}/${selectedGen.name}`)
            } else if (!matchedPokemon) {
                setError("This Pokémon could not be found, try something else.");
            }
        }
    };

    return (
        <>
            <HeaderGeneral
                title="Battlemaster"
                text="Enter your opponent Pokémon to discover the most effective Pokémon against your chosen opponent!"
                headerImage={lucario}
                pokemonName="lucario"
                page="battlemaster"
            />
            <main>
                <section className="outer-container">
                    <div className="battlemaster-quiz-container">
                        <section className="battlemaster-quiz">
                            <img
                                className="quiz-image"
                                src={battlemaster}
                                alt="Pokémon battle"
                            />
                            {quizPage === 0 ?
                                <>
                                    <section className="quiz-questions">
                                        <h2>Battlemaster</h2>
                                        <p className="quiz-question">Do you want to only use Pokémon from a specific
                                            generation?</p>
                                        <div className="quiz-gen-container">
                                            {loading && <Loader/>}
                                            {error && <p>{error}</p>}
                                            {!loading && !error &&
                                                allGen && allGen.map((option) => (
                                                    <TypeCard
                                                        key={option.name}
                                                        type="gen"
                                                        genName={option}
                                                        activeGen={selectedGen}
                                                        onClick={() => handleSelectGen(option)}
                                                    />
                                                ))
                                            }
                                        </div>
                                    </section>
                                    <div className="quiz-button-container">
                                        {!loading && !error &&
                                            <GeneralButton
                                                buttonType="button"
                                                buttonText="Next"
                                                page="primary"
                                                onClick={handleClick}
                                                disabled={!selectedGen}
                                            />
                                        }
                                    </div>
                                </>
                                :
                                <>
                                    <section className="quiz-questions">
                                        <h2>Battlemaster</h2>
                                        <p className="quiz-question">Which Pokémon do you want to analyse?</p>
                                        {loading && <Loader/>}
                                        {!loading &&
                                            <div className="searchbar-section battlemaster">
                                                <Searchbar
                                                    placeholder="Search"
                                                    value={query}
                                                    onChange={handleChange}
                                                    handleReset={() => resetInput(setQuery)}
                                                    handleSubmit={handleClick}
                                                />
                                                {query && suggestions.length > 0 && (
                                                    <SearchSuggestions
                                                        suggestions={suggestions}
                                                        setQuery={setQuery}
                                                        visualType="standalone"
                                                    />
                                                )}
                                                {!loading && error && <p className="error-message">{error}</p>}
                                            </div>
                                        }
                                    </section>
                                    <div className="quiz-button-container">
                                        {!loading &&
                                            <GeneralButton
                                                buttonType="button"
                                                buttonText="Results"
                                                pokemonName="lucario"
                                                onClick={handleClick}
                                                disabled={!query}
                                                page="primary"
                                            />
                                        }
                                    </div>
                                </>
                            }
                        </section>
                    </div>
                </section>
            </main>
            <Footer/>
        </>
    );
}

export default Battlemaster;