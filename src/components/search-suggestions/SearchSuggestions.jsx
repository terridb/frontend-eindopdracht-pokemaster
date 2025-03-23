import "./SearchSuggestions.css";
import {Link} from "react-router-dom";

function SearchSuggestions({suggestions}) {
    return (
        <>
            <ul className="suggestions-container">
                {suggestions.map((pokemon) => (
                    <li
                        key={pokemon.name}
                    >
                        <Link to={"/"} className={"suggestion-item-link"}>
                            {pokemon.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default SearchSuggestions;