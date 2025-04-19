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
            page="profile"
            />
            <main>
                <section className="outer-container">
                    <div className="favorites-section">
                        <h2>Favorites</h2>
                        {favorites.length !== 0 ?
                            <PokemonGrid
                                favorites={favorites}
                            />
                            :
                            <p>You haven't added any favorites yet!</p>
                        }
                    </div>
                </section>
            </main>
            <Footer/>
        </>
    );
}

export default Favorites;