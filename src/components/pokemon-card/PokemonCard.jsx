import "./PokemonCard.css";
import {capitalizeFirstLetter, writePokedexNumber} from "../../helpers/changeText.js";

function PokemonCard({name, id, sprites}) {
    return (
        <div className="pokemon-card">
            <div className="pokemon-card-image-wrapper">
                <img
                    className="pokemon-card-image"
                    src={sprites?.other?.[`official-artwork`]?.[`front_default`]}
                    alt={`Image of ${name}`} />
            </div>
            <div className="pokemon-card-details">
                <p className="pokemon-card-number">{writePokedexNumber(id)}</p>
                <h5>{capitalizeFirstLetter(name)}</h5>
                <div className="pokemon-card-type-wrapper">
                    <ul>
                        <li>Grass</li>
                        <li>Poison</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default PokemonCard;