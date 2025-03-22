import "./Header.css"
import Navigation from "../navigation/Navigation.jsx";
import GeneralButton from "../general-button/GeneralButton.jsx";

function Header({title, text, buttonText, headerImage, pokemonName, buttonType, onClick}) {

    return (
        <header>
            <div className="outer-container header">
                <Navigation/>
                <div className="small-inner-container header">
                    <div className="header-text-wrapper">
                        <h1>{title}</h1>
                        <p className="header-text">{text}</p>
                        {buttonType &&
                            <GeneralButton
                                buttonText={buttonText}
                                pokemonName={pokemonName}
                                buttonType={buttonType}
                                onClick={onClick}
                            />}
                    </div>
                    <span className="header-image-wrapper">
                    <img className="header-image" src={headerImage} alt={pokemonName}/>
                </span>
                </div>
                <div className={`header-color-block ${pokemonName}`}/>
            </div>
        </header>
    );
}

export default Header;