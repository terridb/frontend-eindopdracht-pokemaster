import "./Home.css"
import Header from "../../components/header/Header.jsx";
import charizard from "../../assets/images/charizard.png"
import pikachu from "../../assets/images/detective-pikachu.png";
import IllustratedButton from "../../components/illustrated-button/IllustratedButton.jsx";
import IllustratedSearchbar from "../../components/illustrated-searchbar/IllustratedSearchbar.jsx";
import Footer from "../../components/footer/Footer.jsx";
import {useNavigate} from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <>
            <Header
                title="Become a Pokémaster!"
                text="Catch, train, battle! Your ultimate Pokémon journey begins here."
                buttonText="Join now"
                headerImage={charizard}
                pokemonName="charizard"
                buttonType="button"
                onClick={() => navigate("/login")}
            />
            <main>
                <section className="outer-container home">
                    <div className="small-inner-container home">
                        <h2>What do you want to do?</h2>
                        <div className="home-buttons-container">
                            <IllustratedButton
                                title="Pokédex"
                            />
                            <IllustratedSearchbar
                                image={pikachu}
                                imageDescription="Detective Pikachu"
                                title="Quick search"
                                subtitle="By name or number"
                            />
                            <IllustratedButton
                                title="Battlemaster"
                            />
                        </div>
                    </div>
                </section>
            </main>
            <Footer/>
        </>
    );
}

export default Home;