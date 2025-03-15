import {MagnifyingGlass} from "@phosphor-icons/react";
import "./SearchButton.css"

function SearchButton() {
    return (
        <button className={"search-button"} type="submit">
            <MagnifyingGlass/>
        </button>
    );
}

export default SearchButton;