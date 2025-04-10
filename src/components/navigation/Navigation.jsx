import "./Navigation.css"
import {Link, NavLink} from "react-router-dom";
import whiteLogo from "../../assets/logo/logo-white.png"
import FavoriteIcon from "../favorite-icon/FavoriteIcon.jsx";

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
                    <FavoriteIcon/>
                    <Link to={"/login"} className="nav-link">Sign in</Link>
                </div>
            </nav>
        </>
    );
}

export default Navigation;