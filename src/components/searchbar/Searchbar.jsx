import './Searchbar.css'
import SearchButton from "../search-button/SearchButton.jsx";

function SearchBar({placeholder, size, onChange, value}) {
    return (
        <div className="searchbar-inner-container">
            <input
                className={`searchbar ${size}`}
                type="search"
                name="search"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            <SearchButton/>
        </div>

    );
}

export default SearchBar;