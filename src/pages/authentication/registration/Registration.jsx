import GeneralButton from "../../../components/general-button/GeneralButton.jsx";
import {useContext, useState} from "react";
import {AuthContext} from "../../../context/AuthContext.jsx";
import InputField from "../../../components/input-field/InputField.jsx";
import {useForm} from "react-hook-form"
import AuthForm from "../../../components/auth-form/AuthForm.jsx";

function Registration() {
    const {handleSubmit, formState: {errors}, register, watch} = useForm();

    const {registerUser} = useContext(AuthContext);

    const [error, setError] = useState(null);
    const [loading, toggleLoading] = useState(false);

    const handleRegister = async (data) => {
        toggleLoading(true);
        setError(null);

        try {
            await registerUser(data.username, data.email, data.password);
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
                page="primary"
                buttonType="submit"
                buttonText="continue"
                disabled={loading}
            />
        </AuthForm>
    );
}

export default Registration;