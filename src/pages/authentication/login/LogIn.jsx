import GeneralButton from "../../../components/general-button/GeneralButton.jsx";
import {useContext, useState} from "react";
import {useForm} from "react-hook-form";
import {AuthContext} from "../../../context/AuthContext.jsx";
import axios from "axios";
import InputField from "../../../components/input-field/InputField.jsx";
import AuthForm from "../../../components/auth-form/AuthForm.jsx";

function LogIn() {
    const {login} = useContext(AuthContext);
    const {handleSubmit, formState: {errors}, register} = useForm();

    const [error, setError] = useState(null);
    const [loading, toggleLoading] = useState(false);

    const handleLogin = async (data) => {
        toggleLoading(true);

        try {
            const response = await axios.post("https://frontend-educational-backend.herokuapp.com/api/auth/signin", {
                "username": data.username,
                "password": data.password,
            });
            if (response.status === 200) {
                login(response.data.accessToken);
            }
            console.log(response)
        } catch (err) {
            console.error("Error at login:", err.response || err);
            if (err.response && err.response.status === 401) {
                setError("Oops! It looks like your username or password is incorrect. Please check your details and try again")
            } else {
                setError(err.response.data.message || "Something went wrong");
            }
        } finally {
            toggleLoading(false);
        }
    }

    return (
        <AuthForm
            onSubmit={handleSubmit(handleLogin)}
            error={error}
            loading={loading}
            pageTitle="Log in to Pokémaster"
            bottomTextOne="Need an account?"
            bottomTextTwo="Register here"
            bottomLink="/signup"
        >
            <InputField
                type="text"
                id="username-field"
                name="username"
                title="Username"
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
            <GeneralButton
                pokemonName="snorlax"
                buttonType="submit"
                buttonText="sign-in"
                disabled={loading}
            />
        </AuthForm>
    );
}

export default LogIn;