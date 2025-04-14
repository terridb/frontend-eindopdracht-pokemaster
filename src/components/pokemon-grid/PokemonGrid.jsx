import "./PokemonGrid.css";
import PokemonCard from "../pokemon-card/PokemonCard.jsx";
import Loader from "../loader/Loader.jsx";
import GeneralButton from "../general-button/GeneralButton.jsx";

function PokemonGrid({pokemon, loading, error, moreAvailable, handleLoadMore, favorites}) {
    return (
        <>
            <section className="pokemon-grid">
                {!favorites ?
                    <>
                        {loading && <Loader/>}
                        {error && <p>{error}</p>}

                        {!loading && pokemon.length === 0 && (
                            <p className="no-results">No matching Pokémon found, try something else</p>
                        )}
                        {pokemon.map((pokemon) => (
                            <PokemonCard
                                endpoint={pokemon.url}
                                key={pokemon.url}
                            />
                        ))}
                    </>
                    :
                    (favorites.map((pokemonId) => (
                        <PokemonCard
                            endpoint={`https://pokeapi.co/api/v2/pokemon/${pokemonId}`}
                            key={pokemonId}
                        />
                    )))
                }
            </section>
            {!favorites &&
                <section className="load-more-section">
                    {!loading && moreAvailable && (
                        <GeneralButton buttonText="Load more" onClick={handleLoadMore}/>
                    )}
                </section>
            }
        </>
    )
}

export default PokemonGrid;