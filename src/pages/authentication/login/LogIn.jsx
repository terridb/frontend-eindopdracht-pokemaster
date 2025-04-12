import "./LogIn.css";
import {Link} from "react-router-dom";
import greyLogo from "../../../assets/logo/logo-grey.png";
import GeneralButton from "../../../components/general-button/GeneralButton.jsx";
import snorlax from "../../../assets/images/snorlax.png";
import {useContext, useState} from "react";
import {useForm} from "react-hook-form";
import {AuthContext} from "../../../context/AuthContext.jsx";
import axios from "axios";
import InputField from "../../../components/input-field/InputField.jsx";

function LogIn() {
    const {login} = useContext(AuthContext);
    const {register, handleSubmit} = useForm();

    const [error, setError] = useState(null);
    const [loading, toggleLoading] = useState(false);

    const handleLogin = async (data) => {
        toggleLoading(true);

        try{
            const response = await axios.post("https://frontend-educational-backend.herokuapp.com/api/auth/signin", {
                "username": data.username,
                "password" : data.password,
            });
            if (response.status === 200) {
                login(response.data.accessToken);
                navigate("/profile")
            }
            console.log(response)
        } catch (err) {
            console.error(err);
            setError(err);
        } finally {
            toggleLoading(false);
        }
    }

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
                    <form className="auth-form" onSubmit={handleSubmit(handleLogin)}>
                        <InputField
                            type="text"
                            id="username-field"
                            name="username"
                            title="Username"
                            register={register}
                        />
                        <InputField
                            type="password"
                            id="password-field"
                            name="password"
                            title="Password"
                            register={register}
                        />
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