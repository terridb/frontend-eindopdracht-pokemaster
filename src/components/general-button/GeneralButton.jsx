import './GeneralButton.css';

function GeneralButton({page, buttonText, buttonType, onClick, disabled}) {
    return (
        <>
            <button className={`general-button ${page}`}
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