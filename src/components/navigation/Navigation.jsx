import "./Navigation.css";
import {Link, NavLink, useNavigate} from "react-router-dom";
import whiteLogo from "../../assets/logo/logo-white.png";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import ProfilePopup from "../profile-popup/ProfilePopup.jsx";
import AlertBox from "../alert-box/AlertBox.jsx";
import {List} from "@phosphor-icons/react";
import FavoriteButton from "../favorite-button/FavoriteButton.jsx";

function Navigation() {
    const {isAuth, user, logout} = useContext(AuthContext);
    const [showPopup, setShowPopup] = useState(false);
    const [logOutMessage, setLogOutMessage] = useState("");
    const [mobileMenu, toggleMobileMenu] = useState(false);

    const navigate = useNavigate();

    const switchMobileMenu = () => {
        toggleMobileMenu(!mobileMenu);
    };

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const handleLogOut = () => {
        logout();
        setLogOutMessage("Signed out successfully!");
        setShowPopup(false);
    };

    useEffect(() => {
        if (!logOutMessage) return;

        const timeoutLogOut = setTimeout(() => setLogOutMessage(""), 3000);

        return function cleanup() {
            clearTimeout(timeoutLogOut);
        }

    }, [logOutMessage]);

    return (
        <nav>
            <div className="nav-pages">
                <button className="nav-hamburger-button nav-mobile" onClick={switchMobileMenu}>
                    <List size={20} color="#FFF"/>
                </button>
                <Link to="/">
                    <img className="white-logo" src={whiteLogo} alt="Logo"/>
                </Link>
                {mobileMenu &&
                    <ul className="nav-dropdown-mobile nav-mobile">
                        <li>
                            <NavLink
                                onClick={() => toggleMobileMenu(false)}
                                className={({isActive}) => isActive ? "active-menu-link" : "default-menu-link"}
                                to="/">
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                onClick={() => toggleMobileMenu(false)}
                                className={({isActive}) => isActive ? "active-menu-link" : "default-menu-link"}
                                to="/pokedex">
                                Pokédex
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                onClick={() => toggleMobileMenu(false)}
                                className={({isActive}) => isActive ? "active-menu-link" : "default-menu-link"}
                                to="/battlemaster">
                                Battlemaster
                            </NavLink>
                        </li>
                        {isAuth && (
                            <>
                                <li>
                                    <NavLink
                                        onClick={() => toggleMobileMenu(false)}
                                        className={({isActive}) => isActive ? "active-menu-link" : "default-menu-link"}
                                        to="/profile">
                                        Profile
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        onClick={() => toggleMobileMenu(false)}
                                        className={({isActive}) => isActive ? "active-menu-link" : "default-menu-link"}
                                        to="/favorites">
                                        Favorites
                                    </NavLink>
                                </li>
                                <li>
                                    <button
                                        className="nav-button-dropdown" onClick={() => {
                                        handleLogOut();
                                        toggleMobileMenu(false);
                                    }}
                                    >
                                        Sign out
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                }
                <ul className="nav-desktop-items nav-desktop">
                    <li>
                        <NavLink
                            className={({isActive}) => isActive ? "active-menu-link" : "default-menu-link"}
                            to="/pokedex">
                            Pokédex
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({isActive}) => isActive ? "active-menu-link" : "default-menu-link"}
                            to="/battlemaster">
                            Battlemaster
                        </NavLink>
                    </li>
                </ul>
            </div>
            {!isAuth ? (
                <div className="nav-profile-buttons">
                    <button className="profile-button" onClick={() => navigate("/login")}>
                        Sign in
                    </button>
                </div>
            ) : (
                <>
                    <div className="nav-profile-buttons nav-desktop">
                        <FavoriteButton/>
                        <button className="profile-button" onClick={togglePopup}>
                            {user.username}
                        </button>
                    </div>
                    <div className="nav-profile-buttons nav-mobile">
                        <button className="profile-button" onClick={() => navigate("/profile")}>
                            {user.username}
                        </button>
                    </div>
                </>
            )}
            {showPopup && isAuth &&
                <div className={"popup-container nav-desktop"}>
                    <ProfilePopup user={user} handleLogOut={handleLogOut}/>
                </div>
            }
            {logOutMessage &&
                <AlertBox
                    message={logOutMessage}
                />
            }
        </nav>
    );
}

export default Navigation;