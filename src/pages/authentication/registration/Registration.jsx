import "./Registration.css";
import greyLogo from "../../../assets/logo/logo-grey.png";
import snorlax from "../../../assets/images/snorlax.png";
import {Link, useNavigate} from "react-router-dom";
import GeneralButton from "../../../components/general-button/GeneralButton.jsx";
import {useContext, useState} from "react";
import {AuthContext} from "../../../context/AuthContext.jsx";
import axios from "axios";
import InputField from "../../../components/input-field/InputField.jsx";
import {useForm} from "react-hook-form"

function Registration() {
    const {handleSubmit, register} = useForm();

    const navigate = useNavigate();

    const {login} = useContext(AuthContext);

    const [error, setError] = useState(null);
    const [loading, toggleLoading] = useState(false);

    const handleRegister = async (data) => {
        toggleLoading(true);
        setError(null);

        try {
            const response = await axios.post("https://frontend-educational-backend.herokuapp.com/api/auth/signup", {
                "username": data.username,
                "email": data.email,
                "password": data.password,
                "role": ["user"]
            });
            if (response.status === 200) {
                login(response.data.accessToken);
                navigate("/profile")
            }
            console.log(response.data);

        } catch (err) {
            console.error(err);
            setError(err);
        } finally {
            console.log(`${data.username} is succesvol geregistreerd!`)
            toggleLoading(false);
        }
    };

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
                    <form className="auth-form" onSubmit={handleSubmit(handleRegister)}>
                        <InputField
                            type="email"
                            id="email-field"
                            name="email"
                            title="E-mailaddress"
                            register={register}
                        />
                        <InputField
                            type="password"
                            id="password-field"
                            name="password"
                            title="Password"
                            register={register}
                        />
                        <InputField
                            type="password"
                            id="password-check-field"
                            name="password-check"
                            title="Confirm password"
                            register={register}
                        />
                        <InputField
                            type="text"
                            id="username-field"
                            name="username"
                            title="Username"
                            register={register}
                        />
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