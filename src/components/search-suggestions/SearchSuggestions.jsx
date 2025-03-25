import "./SearchSuggestions.css";
import {Link} from "react-router-dom";

function SearchSuggestions({suggestions}) {
    return (
        <>
            <ul className="suggestions-container">
                {suggestions.map((pokemon) => (
                    <li
                        key={pokemon.id}
                    >
                        <Link to={`/pokedex/${pokemon.id}`} className={"suggestion-item-link"}>
                            <p>{pokemon.name}</p>
                            <p>#{pokemon.id}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default SearchSuggestions;