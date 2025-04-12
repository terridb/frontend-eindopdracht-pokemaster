import "./TypeCard.css";
import {capitalizeFirstLetter} from "../../helpers/changeText.js";
import {useState} from "react";

function TypeCard({pokemonType, type, genName, activeGen, onClick}) {
    const [buttonStatus, setButtonStatus] = useState("default");
    const [clickCount, setClickCount] = useState(0);

    return (
        <>
            {type === "type" ? (
                <button
                    className={`pokemon-label pokemon-type-color ${pokemonType} 
                    ${buttonStatus === "active" ? "active" : "default"}`}
                    type="button"
                    onClick={() => {
                        buttonStatus === "active" ?
                            setButtonStatus("default") && setClickCount(0)
                            :
                            setButtonStatus("active") && setClickCount(1)
                    }}
                    disabled={buttonStatus === "default" && clickCount === 1}
                >
                    {capitalizeFirstLetter(pokemonType)}
                </button>
            ) : type === "gen" ? (
                <button
                    className={`pokemon-label gen ${activeGen?.name === genName.name ? "active" : "default"}`}
                    type="button"
                    onClick={onClick}
                    disabled={activeGen && activeGen.name !== genName.name}
                >
                    {capitalizeFirstLetter(genName.title)}
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