import "./BattlemasterResult.css";
import {Link, useParams} from "react-router-dom";
import HeaderPokemonDetails from "../../components/header-pokemonDetails/HeaderPokemonDetails.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import Loader from "../../components/loader/Loader.jsx";
import {getIdFromUrl} from "../../helpers/getPokemonDetails.jsx";
import PokemonCard from "../../components/pokemon-card/PokemonCard.jsx";
import Footer from "../../components/footer/Footer.jsx";
import TypeCard from "../../components/type-card/TypeCard.jsx";
import GeneralButton from "../../components/general-button/GeneralButton.jsx";

function BattlemasterResult() {
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
                header="battlemaster"
            />
            <main>
                <section className="result-section">
                    <div className="pokemon-grid-title">
                        <h2>Suitable pokémon options - </h2>
                        <p>Gen 1, Gen 3</p>
                    </div>
                    <div className="pokemon-grid">
                        {loading && <Loader/>}
                        {error && <p>{error.message}</p>}
                        <PokemonCard/>
                        <PokemonCard/>
                        <PokemonCard/>
                        <PokemonCard/>
                    </div>
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

            </main>
            <Footer/>
        </>
    );
}

export default BattlemasterResult;