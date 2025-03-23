import "./SearchSuggestions.css";

function SearchSuggestions({suggestions}) {
    return (
        <>
            <ul className="suggestions-container">
                {suggestions.map((pokemon) => (
                    <li
                        key={pokemon.name}
                        className="suggestion-item"
                    >
                        {pokemon.name}
                    </li>
                ))}
            </ul>
        </>
    );
}

export default SearchSuggestions;