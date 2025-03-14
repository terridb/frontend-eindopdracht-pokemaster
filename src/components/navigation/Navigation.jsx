import "./Navigation.css"
import {Link, NavLink} from "react-router-dom";
import whiteLogo from "../../assets/logo/logo-white.png"
import favoriteHeart from "../../assets/icons/Heart.svg"

function Navigation() {
    return (
        <>
            <nav>
                <div className="nav-pages">
                    <Link to="/">
                        <img className="white-logo" src={whiteLogo} alt="Logo"/>
                    </Link>
                    <ul>
                        <li>
                            <NavLink className={({isActive}) => isActive ? "active-menu-link" : "default-menu-link"}
                                     to="/pokedex">
                                Pokédex
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className={({isActive}) => isActive ? "active-menu-link" : "default-menu-link"}
                                     to="/battlemaster">
                                Battlemaster
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className="nav-profile-buttons">
                    <img className="nav-heart" src={favoriteHeart} alt="Favorite icon"/>
                    <Link to={"/"}>Sign in</Link>
                </div>
            </nav>
        </>
    );
}

export default Navigation;