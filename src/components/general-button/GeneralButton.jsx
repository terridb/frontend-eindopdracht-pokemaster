import './GeneralButton.css'

function GeneralButton({pokemonName, buttonText, buttonType}) {
    return (
        <>
            <button className={`general-button ${pokemonName}`} type={buttonType}>{buttonText}</button>
        </>
    );
}

export default GeneralButton;