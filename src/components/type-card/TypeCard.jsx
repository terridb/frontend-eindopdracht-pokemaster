import "./TypeCard.css";
import {capitalizeFirstLetter} from "../../helpers/changeText.js";

function TypeCard({type}) {
    return (
        <li className={`pokemon-card-type ${type.type.name}`}>
            {capitalizeFirstLetter(type.type.name)}
        </li>
    );
}

export default TypeCard;