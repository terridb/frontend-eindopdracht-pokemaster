import "./Home.css"
import Header from "../../components/header/Header.jsx";
import charizard from "../../assets/images/charizard.png"
import IllustratedButton from "../../components/illustrated-button/IllustratedButton.jsx";

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
            <main>
                <section className="outer-container home">
                    <div className="small-inner-container home">
                        <h2>What do you want to do?</h2>
                        <div className="home-buttons-container">
                            <IllustratedButton
                                title="Pokédex"
                            />
                            <IllustratedButton
                                title="Battlemaster"
                            />
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Home;