import "./PokemonGrid.css";
import PokemonCard from "../pokemon-card/PokemonCard.jsx";
import Loader from "../loader/Loader.jsx";
import GeneralButton from "../general-button/GeneralButton.jsx";

function PokemonGrid({pokemon, loading, error, moreAvailable, handleLoadMore, favorites}) {
    return (
        <>
            <div className="pokemon-grid">
                {favorites ? (
                    favorites.map((pokemonId) => (
                        <PokemonCard
                            endpoint={`https://pokeapi.co/api/v2/pokemon/${pokemonId}`}
                            key={pokemonId}
                        />
                    ))
                ) : (
                    <>
                        {!loading && pokemon.length === 0 && (
                            <p className="no-results">No matching Pokémon found, try something else</p>
                        )}
                        {pokemon && pokemon.length > 0 &&
                            pokemon.map((pokemon) => (
                                <PokemonCard
                                    endpoint={pokemon.url}
                                    key={pokemon.url}
                                />
                            ))
                        }
                    </>
                )}
            </div>
            {!favorites &&
                <div className="load-more-section">
                    {loading && <Loader/>}
                    {error && <p>{error}</p>}
                    {!loading && moreAvailable && (
                        <GeneralButton buttonText="Load more" onClick={handleLoadMore}/>
                    )}
                </div>
            }
        </>
    )
}

export default PokemonGrid;