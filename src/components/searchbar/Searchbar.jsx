import './Searchbar.css'
import {MagnifyingGlass} from "@phosphor-icons/react";

function SearchBar({placeholder, size, onChange, value}) {
    return (
        <div className="searchbar-container">
            <input
                className={`searchbar ${size}`}
                type="search"
                name="search"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            <button className="searchbar-button" type="submit">
                <MagnifyingGlass/>
            </button>
        </div>
    );
}

export default SearchBar;