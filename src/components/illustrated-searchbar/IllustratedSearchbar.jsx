import "./IllustratedSearchBar.css"
import Searchbar from "../searchbar/Searchbar.jsx";

function IllustratedSearchBar({image, imageDescription, title, subtitle, value, onChange}) {
    return (
        <div className="illustrated-searchbar-wrapper">
            <img className="illustration-searchbar" src={image} alt={imageDescription}/>
            <div className="searchbar-outer-container">
            <Searchbar
                placeholder="Search"
                size="small"
                value={value}
                onChange={onChange}
            />
            </div>
            <div className="illustrated-searchbar-title">
                <h3>{title}</h3>
                <p>{subtitle}</p>
            </div>
        </div>
    );
}

export default IllustratedSearchBar;