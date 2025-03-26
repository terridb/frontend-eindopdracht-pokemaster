import './Searchbar.css'
import {MagnifyingGlass} from "@phosphor-icons/react";

function SearchBar({placeholder, size, onChange, value, handleSubmit, onFocus, onBlur}) {
    return (
        <form className="searchbar-container" onSubmit={handleSubmit}>
            <input
                className={`searchbar ${size}`}
                type="search"
                name="search"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
            />
            <button className="searchbar-button" type="submit" disabled={value === null}>
                <MagnifyingGlass/>
            </button>
        </form>
    );
}

export default SearchBar;