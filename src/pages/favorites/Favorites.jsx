import "./Favorites.css";
import HeaderGeneral from "../../components/header-general/HeaderGeneral.jsx";
import mimikyu from "../../assets/images/mimikyu.png";
import Footer from "../../components/footer/Footer.jsx";
import {FaveContext} from "../../context/FaveContext.jsx";
import {useContext} from "react";
import PokemonGrid from "../../components/pokemon-grid/PokemonGrid.jsx";

function Favorites() {
    const {favorites} = useContext(FaveContext);

    return (
        <>
            <HeaderGeneral
            title="Your favorites"
            text={"Manage your favorites here!"}
            headerImage={mimikyu}
            pokemonName="mimikyu"
            />
            <main>
                <section className="outer-container">
                    <h2>Favorites</h2>
                    <PokemonGrid
                        favorites={favorites}
                    />
                </section>
            </main>
            <Footer/>
        </>
    );
}

export default Favorites;