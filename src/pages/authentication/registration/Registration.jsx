import "./Registration.css";
import greyLogo from "../../../assets/logo/logo-grey.png";
import snorlax from "../../../assets/images/snorlax.png";
import {Link} from "react-router-dom";
import GeneralButton from "../../../components/general-button/GeneralButton.jsx";
import {useContext, useState} from "react";
import {AuthContext} from "../../../context/AuthContext.jsx";
import axios from "axios";
import InputField from "../../../components/input-field/InputField.jsx";
import {useForm} from "react-hook-form"
import Loader from "../../../components/loader/Loader.jsx";

function Registration() {
    const {handleSubmit, formState: {errors}, register, watch} = useForm();

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

            if (response.status === 200 || response.status === 201) {
                const loginResponse = await axios.post("https://frontend-educational-backend.herokuapp.com/api/auth/signin", {
                    "username": data.username,
                    "password": data.password
                });

                if (loginResponse.status === 200) {
                    login(loginResponse.data.accessToken);
                }
            }
        } catch (err) {
            console.error("Error at registration or login:", err.response || err);
            setError(err.response.data.message || "Something went wrong");
        } finally {
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
                            errors={errors}
                        />
                        <InputField
                            type="password"
                            id="password-field"
                            name="password"
                            title="Password"
                            register={register}
                            errors={errors}
                        />
                        <InputField
                            type="password"
                            id="password-check-field"
                            name="password-check"
                            title="Confirm password"
                            register={register}
                            errors={errors}
                            watch={watch}
                        />
                        <InputField
                            type="text"
                            id="username-field"
                            name="username"
                            title="Username"
                            register={register}
                            errors={errors}
                        />
                        <GeneralButton
                            pokemonName="snorlax"
                            buttonType="submit"
                            buttonText="continue"
                            disabled={loading}
                        />
                    </form>
                    {error && <p className="error-message-form">{error}</p>}
                    {loading && <Loader/>}
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