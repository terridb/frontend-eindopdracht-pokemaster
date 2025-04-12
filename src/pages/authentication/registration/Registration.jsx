import "./Registration.css";
import greyLogo from "../../../assets/logo/logo-grey.png";
import snorlax from "../../../assets/images/snorlax.png";
import {Link} from "react-router-dom";
import GeneralButton from "../../../components/general-button/GeneralButton.jsx";

function Registration() {
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
                    <h1>Join Pokémaster</h1>
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
                        <label htmlFor="password-check-field">Confirm Password
                            <input
                                type="password"
                                id="password-check-field"
                                name="password-check"
                                placeholder="Password"
                            />
                        </label>
                        <label htmlFor="username-field">Username
                            <input
                                type="text"
                                id="username-field"
                                name="username"
                                placeholder="Username"
                            />
                        </label>
                        <GeneralButton
                            pokemonName="snorlax"
                            buttonType="submit"
                            buttonText="continue"
                        />
                    </form>
                    <p>
                        Already have an account?
                        <Link to="/login" className="auth-link"> Sign in here</Link>
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

export default Registration;