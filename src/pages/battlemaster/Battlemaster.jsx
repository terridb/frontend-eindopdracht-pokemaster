import "./Battlemaster.css";
import HeaderGeneral from "../../components/header-general/HeaderGeneral.jsx";
import Footer from "../../components/footer/Footer.jsx";
import lucario from "../../assets/images/lucario.png";
import GeneralButton from "../../components/general-button/GeneralButton.jsx";
import TypeCard from "../../components/type-card/TypeCard.jsx";
import battlemaster from "../../assets/images/pokemon-battle.png";
import Searchbar from "../../components/searchbar/Searchbar.jsx";

function Battlemaster() {
    return (
        <>
            <HeaderGeneral
                title="Battlemaster"
                text="Enter your opponent Pokémon to discover the most effective Pokémon against your chosen opponent!"
                headerImage={lucario}
                pokemonName="lucario"
            />
            <main>
                <section className="outer-container">
                    <div className="small-inner-container battlemaster">
                        <section className="battlemaster-quiz">
                            <img
                                className="quiz-image"
                                src={battlemaster}
                                alt="Pokémon battle"
                            />
                            <section className="quiz-questions">
                                <h2>Battlemaster</h2>
                                <p className="quiz-question">Do you want to only use Pokémon from a specific generation?</p>
                                <div className="quiz-gen-container">
                                    <TypeCard
                                        type="gen"
                                        genName="Use all"
                                    />
                                    <TypeCard
                                        type="gen"
                                        genName="Gen 1"
                                    />
                                    <TypeCard
                                        type="gen"
                                        genName="Gen 2"
                                    />
                                    <TypeCard
                                        type="gen"
                                        genName="Gen 3"
                                    />
                                    <TypeCard
                                        type="gen"
                                        genName="Gen 4"
                                    />
                                    <TypeCard
                                        type="gen"
                                        genName="Gen 5"
                                    />
                                    <TypeCard
                                        type="gen"
                                        genName="Gen 6"
                                    />
                                    <TypeCard
                                        type="gen"
                                        genName="Gen 7"
                                    />
                                    <TypeCard
                                        type="gen"
                                        genName="Gen 8"
                                    />
                                    <TypeCard
                                        type="gen"
                                        genName="Gen 9"
                                    />
                                </div>
                            </section>
                            <div className="quiz-button-container">
                                <GeneralButton
                                    buttonType="button"
                                    buttonText="Next"
                                    pokemonName="lucario"
                                />
                            </div>
                        </section>
                        <section className="battlemaster-quiz">
                            <img
                                className="quiz-image"
                                src={battlemaster}
                                alt="Pokémon battle"
                            />
                            <section className="quiz-questions">
                                <h2>Battlemaster</h2>
                                <p className="quiz-question">Which Pokémon do you want to analyse?</p>
                                    <Searchbar
                                        size="small"
                                        placeholder="Search"
                                    />
                            </section>
                            <div className="quiz-button-container">
                                <GeneralButton
                                    buttonType="button"
                                    buttonText="Results"
                                    pokemonName="lucario"
                                />
                            </div>
                        </section>
                    </div>
                </section>
            </main>
            <Footer/>
        </>
    );
}

export default Battlemaster;