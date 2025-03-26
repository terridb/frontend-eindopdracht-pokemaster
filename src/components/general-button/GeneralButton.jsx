import './GeneralButton.css'

function GeneralButton({pokemonName, buttonText, buttonType, onClick}) {
    return (
        <>
            <button className={`general-button ${pokemonName}`} type={buttonType} onClick={onClick}>{buttonText}</button>
        </>
    );
}

export default GeneralButton;