import mew from "../../assets/images/mew.png";
import Header from "../../components/header/Header.jsx";
import "./Pokedex.css";

function Pokedex() {
    return (
        <>
            <Header
                title="Pokédex"
                text="Welcome to the ultimate Pokédex! Explore detailed profiles, stats and moves for every Pokémon."
                buttonText="Join now"
                headerImage={mew}
                pokemonName="mew"
            />
        </>
    );
}

export default Pokedex;