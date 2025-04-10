import "./Home.css"
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import HeaderGeneral from "../../components/header-general/HeaderGeneral.jsx";
import IllustratedButton from "../../components/illustrated-button/IllustratedButton.jsx";
import IllustratedSearchbar from "../../components/illustrated-searchbar/IllustratedSearchbar.jsx";
import Footer from "../../components/footer/Footer.jsx";
import SearchSuggestions from "../../components/search-suggestions/SearchSuggestions.jsx";
import charizard from "../../assets/images/charizard.png"
import pikachu from "../../assets/images/detective-pikachu.png";
import {getIdFromUrl} from "../../helpers/getPokemonDetails.jsx";
import {resetInput} from "../../helpers/resetInput.js";

function Home() {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [pokemonList, setPokemonList] = useState([]);
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        const fetchPokemonList = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=10000`);

                const detailedPokemonList = response.data.results.map((pokemon) => {
                    const id = getIdFromUrl(pokemon.url);

                    return {
                        name: pokemon.name,
                        id: id,
                        url: pokemon.url
                    };
                }).filter(pokemon => Number(pokemon.id) <= 10000);

                setPokemonList(detailedPokemonList);
            } catch (err) {
                setError(err.message);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchPokemonList();
    }, []);

    const handleSuggestions = () => {
        const filteredSuggestions = pokemonList
            .filter((pokemon) =>
                pokemon.name.toLowerCase().includes(query.toLowerCase())
                ||
                pokemon.id.includes(query)
            )
            .slice(0, 3);
        setSuggestions(filteredSuggestions);
    };

    const handleChange = (e) => {
        setError("");
        setQuery(e.target.value);
    };

    useEffect(() => {
        handleSuggestions();
    }, [query]);

    const handleSearch = (e) => {
        e.preventDefault();
        setError("");
        const matchedPokemon = pokemonList.find(
            (pokemon) =>
                pokemon.name.toLowerCase() === query.toLowerCase() ||
                pokemon.id === query
        );

        if (matchedPokemon) {
            navigate(`/pokedex/${matchedPokemon.id}`);
        } else if (!query) {
            setError("Search field is empty. Enter a Pokémon name or number.");
        } else if (!matchedPokemon) {
            setError("This Pokémon could not be found, try something else.");
        }
    }

    return (
        <>
            <HeaderGeneral
                title="Become a Pokémaster!"
                text="Catch, train, battle! Your ultimate Pokémon journey begins here."
                buttonText="Join now"
                headerImage={charizard}
                pokemonName="charizard"
                buttonType="button"
                onClick={() => navigate("/login")}
            />
            <main>
                <section className="outer-container home">
                    <div className="small-inner-container home">
                        <h2>What do you want to do?</h2>
                        <div className="home-buttons-container">
                            <IllustratedButton
                                title="Pokédex"
                            />
                            <div className="searchbar-section">
                                <IllustratedSearchbar
                                    image={pikachu}
                                    imageDescription="Detective Pikachu"
                                    title="Quick search"
                                    subtitle="By name or number"
                                    value={query}
                                    onChange={handleChange}
                                    handleSubmit={handleSearch}
                                    handleReset={() => resetInput(setQuery)}
                                />
                                {loading && <p className="loading-message">Loading Pokémon...</p>}
                                {!loading && error && <p className="error-message home">{error}</p>}
                                {query && suggestions.length > 0 && !error && !loading && (
                                    <SearchSuggestions
                                        suggestions={suggestions}
                                    />
                                )}
                            </div>
                            <IllustratedButton
                                title="Battlemaster"
                            />
                        </div>
                    </div>
                </section>
            </main>
            <Footer/>
        </>
    );
}

export default Home;