import "./SearchSuggestions.css";
import {capitalizeFirstLetter} from "../../helpers/changeText.js";

function SearchSuggestions({suggestions, setQuery, visualType}) {
    return (
        <ul className={`suggestions-container ${visualType}`}>
            {suggestions.map((pokemon) => (
                <li
                    key={pokemon.id}
                    onClick={() => setQuery(pokemon.name)}
                    className="suggestion-item"
                >
                    <p>{capitalizeFirstLetter(pokemon.name)}</p>
                    <p>#{pokemon.id}</p>
                </li>
            ))}
        </ul>
    );
}

export default SearchSuggestions;