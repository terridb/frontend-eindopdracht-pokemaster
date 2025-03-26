import "./PokedexDetails.css";
import {useParams} from "react-router-dom";

function PokedexDetails() {
    const {pokemonId} = useParams();
    console.log(pokemonId);

    return (
        <>
            <h1>Pokedex details {pokemonId}</h1>
        </>
    );
}

export default PokedexDetails;