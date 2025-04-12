import "LogIn.css";
import {Link} from "react-router-dom";
import greyLogo from "../../../assets/logo/logo-grey.png";
import GeneralButton from "../../../components/general-button/GeneralButton.jsx";
import snorlax from "../../../assets/images/snorlax.png";

function LogIn() {
    return (
        <main>
            <section className="outer-container">
                <section className="auth-content">
                    <Link to="/">
                        <img
                            src={greyLogo}
                            alt="Pokémaster logo"
                            className="auth-logo"
                        />
                    </Link>
                    <h1>Log in to Pokémaster</h1>
                    <form className="auth-form">
                        <label htmlFor="email-field">E-mailaddress
                            <input
                                type="email"
                                id="email-field"
                                name="email"
                                placeholder="E-mailaddress"
                            />
                        </label>
                        <label htmlFor="password-field">Password
                            <input
                                type="password"
                                id="password-field"
                                name="password"
                                placeholder="Password"
                            />
                        </label>
                        <GeneralButton
                            pokemonName="snorlax"
                            buttonType="submit"
                            buttonText="sign-in"
                        />
                    </form>
                    <p>
                       Need an account?
                        <Link to="/signup" className="auth-link"> Register here</Link>
                    </p>
                </section>
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

export default LogIn;