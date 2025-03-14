import "./Header.css"
import Navigation from "../navigation/Navigation.jsx";

function Header() {
    return (
        <header>
            <div className="outer-container header">
                <Navigation/>
            </div>
        </header>
    );
}

export default Header;