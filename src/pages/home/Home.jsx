import "./Home.css"
import Header from "../../components/header/Header.jsx";
import charizard from "../../assets/images/charizard.png"
import pikachu from "../../assets/images/detective-pikachu.png";
import IllustratedButton from "../../components/illustrated-button/IllustratedButton.jsx";
import IllustratedSearchbar from "../../components/illustrated-searchbar/IllustratedSearchbar.jsx";
import Footer from "../../components/footer/Footer.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import SearchSuggestions from "../../components/search-suggestions/SearchSuggestions.jsx";

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
                const totalCount = await axios.get("https://pokeapi.co/api/v2/pokemon/");
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${totalCount.data.count}`);

                const detailedPokemonList = response.data.results.map((pokemon) => {
                    const splitUrl = pokemon.url.split("/");
                    const id = splitUrl[splitUrl.length - 2];

                    return {
                        name: pokemon.name,
                        id: id,
                        url: pokemon.url
                    };
                })

                setPokemonList(detailedPokemonList);
            } catch (err) {
                setError(err.message);
                console.error(err);
            }
        };
        fetchPokemonList();
    }, []);

    const handleSearch = () => {
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
        setQuery(e.target.value);
    };

    useEffect(() => {
        handleSearch();
    }, [query]);

    return (
        <>
            <Header
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
                                />
                                {query && suggestions.length > 0 && (
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