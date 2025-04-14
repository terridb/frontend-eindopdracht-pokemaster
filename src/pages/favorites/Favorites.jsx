import "./Favorites.css";
import HeaderGeneral from "../../components/header-general/HeaderGeneral.jsx";
import mimikyu from "../../assets/images/mimikyu.png";
import Footer from "../../components/footer/Footer.jsx";

function Favorites() {

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
                </section>
            </main>
            <Footer/>
        </>
    );
}

export default Favorites;