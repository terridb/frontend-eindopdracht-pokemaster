import "./IllustratedSearchBar.css";
import Searchbar from "../searchbar/Searchbar.jsx";

function IllustratedSearchBar({
                                  image,
                                  imageDescription,
                                  title,
                                  subtitle,
                                  value,
                                  onChange,
                                  suggestions,
                                  handleSubmit,
                                  handleReset
                              }) {
    return (
        <section className="illustrated-searchbar-container">
            <img className="illustration-searchbar" src={image} alt={imageDescription}/>
            <div className="searchbar-outer-container">
                <Searchbar
                    placeholder="Search"
                    value={value}
                    onChange={onChange}
                    suggestions={suggestions}
                    handleSubmit={handleSubmit}
                    handleReset={handleReset}
                />
            </div>
            <div className="illustrated-searchbar-title">
                <h3>{title}</h3>
                <p>{subtitle}</p>
            </div>
        </section>
    );
}

export default IllustratedSearchBar;