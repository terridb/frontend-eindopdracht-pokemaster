import "./PokemonGrid.css";
import PokemonCard from "../pokemon-card/PokemonCard.jsx";
import {Link} from "react-router-dom";
import Loader from "../loader/Loader.jsx";
import GeneralButton from "../general-button/GeneralButton.jsx";
import {getIdFromUrl} from "../../helpers/getPokemonDetails.jsx";

function PokemonGrid({ pokemon, loading, error, moreAvailable, handleLoadMore }) {
    return (
        <>
            <section className="pokemon-grid">
                {loading && <Loader/>}
                {error && <p>{error}</p>}

                {!loading && pokemon.length === 0 && (
                    <p className="no-results">No matching Pokémon found, try something else</p>
                )}

                {pokemon.map((pokemon) => (
                    <Link key={pokemon.url} to={`/pokedex/${getIdFromUrl(pokemon.url)}`}>
                        <PokemonCard endpoint={pokemon.url}/>
                    </Link>
                ))}
            </section>
            <section className="load-more-section">
                {!loading && moreAvailable && (
                    <GeneralButton buttonText="Load more" onClick={handleLoadMore}/>
                )}
            </section>
            );
        </>
    )
}

export default PokemonGrid;