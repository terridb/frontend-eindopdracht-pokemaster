import "./TypeCard.css";
import {capitalizeFirstLetter} from "../../helpers/changeText.js";
import {useState} from "react";

function TypeCard({pokemonType, button}) {
    const [buttonStatus, setButtonStatus] = useState("default");

    return (
        <>
            {button ? (
                <button
                    className={`pokemon-type-card pokemon-type-color ${pokemonType} ${buttonStatus === "active" ? "active" : "default"}`}
                    type="button"
                    onClick={() => {
                        buttonStatus === "active" ? setButtonStatus("default") : setButtonStatus("active")
                    }}
                >
                    {capitalizeFirstLetter(pokemonType)}
                </button>
            ) : (
                <li className={`pokemon-type-card pokemon-type-color ${pokemonType}`}>
                    {capitalizeFirstLetter(pokemonType)}
                </li>
            )}
        </>
    );
}

export default TypeCard;