import "./PokemonCard.css";
import {capitalizeFirstLetter, writePokedexNumber} from "../../helpers/changeText.js";
import TypeCard from "../type-card/TypeCard.jsx";

function PokemonCard({name, id, sprites, types}) {
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
                <ul className="pokemon-card-type-wrapper">
                    {types?.map((type, index) => (
                        <TypeCard
                            type={type}
                            key={index}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default PokemonCard;