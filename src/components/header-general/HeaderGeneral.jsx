import "./HeaderGeneral.css";
import Navigation from "../navigation/Navigation.jsx";
import GeneralButton from "../general-button/GeneralButton.jsx";

function HeaderGeneral({title, text, buttonText, headerImage, pokemonName, buttonType, onClick}) {

    return (
        <header className="general-header">
            <section className="outer-container">
                <Navigation/>
                <div className="general-header-content-container">
                    <div className="general-header-text-container">
                        <h1>{title}</h1>
                        <p className="general-header-text">{text}</p>
                        {buttonType &&
                            <GeneralButton
                                buttonText={buttonText}
                                pokemonName={pokemonName}
                                buttonType={buttonType}
                                onClick={onClick}
                            />}
                    </div>
                    <figure className="general-header-image-container">
                        <img className="general-header-image" src={headerImage} alt={pokemonName}/>
                    </figure>
                </div>
                <div className={`general-header-color-block ${pokemonName}`}/>
            </section>
        </header>
    );
}

export default HeaderGeneral;