import "./TypeCard.css";
import {capitalizeFirstLetter} from "../../helpers/changeText.js";

function TypeCard({pokemonType, type, genName, activeGen, onClick}) {
    return (
        <>
            { type === "gen" ? (
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