import './Searchbar.css'
import SearchButton from "../search-button/SearchButton.jsx";

function SearchBar({placeholder, size}) {
    return (
        <div className="searchbar-inner-container">
            <input className={`searchbar ${size}`} type="search" placeholder={placeholder}/>
            <SearchButton/>
        </div>

    );
}

export default SearchBar;