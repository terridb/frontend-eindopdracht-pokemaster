import "./Home.css"
import Header from "../../components/header/Header.jsx";
import charizard from "../../assets/images/charizard.png"

function Home() {
    return (
        <>
            <Header
                title="Become a Pokémaster!"
                text="Catch, train, battle! Your ultimate Pokémon journey begins here."
                buttonText="Join now"
                headerImage={charizard}
                pokemonName="charizard"
                buttonType="button"
            />
        </>
    );
}

export default Home;