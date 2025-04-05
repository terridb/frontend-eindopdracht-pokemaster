import "./TypeCard.css";
import {capitalizeFirstLetter} from "../../helpers/changeText.js";
import {useState} from "react";

function TypeCard({pokemonType, type, genName}) {
    const [buttonStatus, setButtonStatus] = useState("default");

    return (
        <>
            {type === "type" ? (
                <button
                    className={`pokemon-label pokemon-type-color ${pokemonType} ${buttonStatus === "active" ? "active" : "default"}`}
                    type="button"
                    onClick={() => {
                        buttonStatus === "active" ? setButtonStatus("default") : setButtonStatus("active")
                    }}
                >
                    {capitalizeFirstLetter(pokemonType)}
                </button>
            ) : type === "gen" ? (
                <button
                    className={`pokemon-label gen ${buttonStatus === "active" ? "active" : "default"}`}
                    type="button"
                    onClick={() => {
                        buttonStatus === "active" ? setButtonStatus("default") : setButtonStatus("active")
                    }}
                >
                    {capitalizeFirstLetter(genName)}
                </button>
                ) : (
                <li className={`pokemon-label pokemon-type-color ${pokemonType}`}>
                    {capitalizeFirstLetter(pokemonType)}
                </li>
            )}
        </>
    );
}

export default TypeCard;