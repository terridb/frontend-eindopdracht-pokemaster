import "./AuthForm.css";
import {Link} from "react-router-dom";
import greyLogo from "../../assets/logo/logo-grey.png";
import snorlax from "../../assets/images/snorlax.png";
import Loader from "../loader/Loader.jsx";

function AuthForm({onSubmit, children, error, loading, pageTitle, bottomTextOne, bottomTextTwo, bottomLink}) {
    return (
        <main>
            <section className="outer-container">
                <article className="auth-content">
                    <Link to="/">
                        <img
                            src={greyLogo}
                            alt="Pokémaster logo"
                            className="auth-logo"
                        />
                    </Link>
                    <h1>{pageTitle}</h1>
                    <form className="general-form" onSubmit={onSubmit}>
                        {children}
                    </form>
                    <section className="auth-bottom-section">
                        {error && <p className="error-message-form">{error}</p>}
                        {loading && <Loader/>}
                        <p>
                            {bottomTextOne}
                            <Link to={bottomLink} className="auth-link"> {bottomTextTwo}</Link>
                        </p>
                    </section>
                </article>
                <figure className="auth-background-container">
                    <img
                        className="auth-background"
                        src={snorlax}
                        alt="Snorlax"
                    />
                </figure>
            </section>
        </main>
    );
}

export default AuthForm;