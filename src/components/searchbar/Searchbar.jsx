import "./Searchbar.css";
import {MagnifyingGlass, X} from "@phosphor-icons/react";

function SearchBar({placeholder, onChange, value, handleSubmit, handleReset}) {
    return (
        <form className="searchbar-container" onSubmit={handleSubmit}>
            <input
                className="searchbar"
                type="text"
                name="search"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            {value &&
                <button
                    className={"searchbar-reset-button"}
                    onClick={handleReset}
                    type="button">
                    <X/>
                </button>
            }
            <button className="searchbar-button" type="submit" disabled={value === ""}>
                <MagnifyingGlass/>
            </button>
        </form>
    );
}

export default SearchBar;