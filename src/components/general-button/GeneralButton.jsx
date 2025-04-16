import './GeneralButton.css';

function GeneralButton({pokemonName, buttonText, buttonType, onClick, disabled}) {
    return (
        <>
            <button className={`general-button ${pokemonName}`}
                    type={buttonType}
                    onClick={onClick}
                    disabled={disabled}
            >
                {buttonText}
            </button>
        </>
    );
}

export default GeneralButton;