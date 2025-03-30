import "./TypeCard.css";
import {capitalizeFirstLetter} from "../../helpers/changeText.js";
import {useState} from "react";

function TypeCard({pokemonType, button}) {
    const [buttonStatus, setButtonStatus] = useState("default");
    console.log(buttonStatus);
    return (
        <>
            {button ? (
                <button
                    className={`pokemon-card-type ${pokemonType} ${buttonStatus === "active" ? "active" : "default"}`}
                    type="button"
                    onClick={() => {
                        buttonStatus === "active" ? setButtonStatus("default") : setButtonStatus("active")
                    }}
                >
                    {capitalizeFirstLetter(pokemonType)}
                </button>
            ) : (
                <li className={`pokemon-card-type ${pokemonType}`}>
                    {capitalizeFirstLetter(pokemonType)}
                </li>
            )}
        </>
    );
}

export default TypeCard;