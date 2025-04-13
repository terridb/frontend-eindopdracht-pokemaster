import "./Navigation.css"
import {Link, NavLink} from "react-router-dom";
import whiteLogo from "../../assets/logo/logo-white.png"
import FavoriteIcon from "../favorite-icon/FavoriteIcon.jsx";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import ProfilePopup from "../profile-popup/ProfilePopup.jsx";

function Navigation() {
    const {isAuth, user, logout} = useContext(AuthContext);
    const [showPopup, setShowPopup] = useState(false);
    const [logOutMessage, setLogOutMessage] = useState("");

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const handleLogOut = () => {
        logout();
        setLogOutMessage("Signed out successfully!");
        setShowPopup(false);

        setTimeout(() => setLogOutMessage(""), 3000);
    }

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
                {!isAuth ? (
                    <div className="nav-profile-buttons">
                        <Link to={"/login"} className="nav-link">Sign in</Link>
                    </div>
                ) : (
                    <div className="nav-profile-buttons">
                        <FavoriteIcon/>
                        <button className="profile-button" onClick={togglePopup}>
                            {user.username}
                        </button>
                    </div>
                )}
                {showPopup && isAuth &&
                    <div className={"popup-container"}>
                        <ProfilePopup user={user} handleLogOut={handleLogOut}/>
                    </div>
                }
                {logOutMessage &&
                    <div className="alert-box">
                        <p>{logOutMessage}</p>
                    </div>}
            </nav>
        </>
    );
}

export default Navigation;