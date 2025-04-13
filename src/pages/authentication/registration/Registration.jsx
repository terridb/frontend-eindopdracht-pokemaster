import GeneralButton from "../../../components/general-button/GeneralButton.jsx";
import {useContext, useState} from "react";
import {AuthContext} from "../../../context/AuthContext.jsx";
import axios from "axios";
import InputField from "../../../components/input-field/InputField.jsx";
import {useForm} from "react-hook-form"
import AuthForm from "../../../components/auth-form/AuthForm.jsx";

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
        <AuthForm
            onSubmit={handleSubmit(handleRegister)}
            error={error}
            loading={loading}
            pageTitle="Join Pokémaster"
            bottomTextOne="Already have an account?"
            bottomTextTwo="Sign in here"
            bottomLink="/login"
        >
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
        </AuthForm>
    );
}

export default Registration;