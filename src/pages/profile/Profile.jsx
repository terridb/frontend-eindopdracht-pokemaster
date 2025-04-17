import "./Profile.css";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import HeaderGeneral from "../../components/header-general/HeaderGeneral.jsx";
import mimikyu from "../../assets/images/mimikyu.png";
import Footer from "../../components/footer/Footer.jsx";
import {useNavigate} from "react-router-dom";
import InputField from "../../components/input-field/InputField.jsx";
import {useForm} from "react-hook-form";
import GeneralButton from "../../components/general-button/GeneralButton.jsx";
import axios from "axios";
import Loader from "../../components/loader/Loader.jsx";
import AlertBox from "../../components/alert-box/AlertBox.jsx";

function Profile() {
    const {user, token} = useContext(AuthContext);
    const navigate = useNavigate();
    const {handleSubmit, formState: {errors}, register, watch} = useForm();

    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState(null);
    const [changeTab, setChangeTab] = useState("email");
    const [alertMessage, setAlertMessage] = useState("");

    const handleChangeEmail = async (data) => {
        toggleLoading(true);
        setError(null);

        try {
            const response = await axios.put("https://frontend-educational-backend.herokuapp.com/api/user",
                {"email": data.email},
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                }
            );
            if (response.status === 200) {
                setAlertMessage("Your e-mailaddress has been changed successfully! A refresh might be necessary to be able to see the adjustment.");
                setTimeout(() => setAlertMessage(""), 5000);
            }
        } catch (err) {
            console.error("Error at changing the e-mailaddress", err);
            setError(err?.response?.data?.message || "Something went wrong");
        } finally {
            toggleLoading(false);
        }
    };

    const handleChangePassword = async (data) => {
        toggleLoading(true);
        setError(null);

        try {
            const response = await axios.put("https://frontend-educational-backend.herokuapp.com/api/user",
                {
                    "password": data.password,
                    "repeatedPassword": data["password-check"],
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                }
            );
            if (response.status === 200) {
                setAlertMessage("Your password has been changed successfully!");
                setTimeout(() => setAlertMessage(""), 5000);
            }
        } catch (err) {
            console.error("Error at changing the password", err);
            setError(err?.response?.data?.message || "Something went wrong");
        } finally {
            toggleLoading(false);
        }
    };

    const handleChangeTab = () => {
        changeTab === "email" ? setChangeTab("password") : setChangeTab("email");
    };

    return (
        <>
            <HeaderGeneral
                title="Your profile"
                text={`Welcome ${user.username}!`}
                headerImage={mimikyu}
                pokemonName="mimikyu"
                buttonType="button"
                buttonText="See favorites"
                onClick={() => navigate("/favorites")}
                page="profile"
            />
            <main>
                <section className="outer-container">
                    <section className="profile-block-container">
                        <section className="profile-block">
                            <h2>Your details</h2>
                            <ul className="profile-details-list">
                                <li className="profile-details-item">
                                    <p className="profile-details-title">Username:</p>
                                    {user.username}
                                </li>
                                <li className="profile-details-item">
                                    <p className="profile-details-title">E-mailaddress:</p>
                                    {user.email}
                                </li>
                            </ul>
                        </section>
                        <section className="profile-block">
                            <h2>Change profile</h2>
                            {changeTab === "email" ?
                                <form className="profile-form" onSubmit={handleSubmit(handleChangeEmail)}>
                                    <h4>Change e-mailaddress</h4>
                                    <InputField
                                        type="email"
                                        id="email-field"
                                        name="email"
                                        title="New e-mailaddress"
                                        register={register}
                                        errors={errors}
                                    />
                                    {error && <p className="error-message-form">{error}</p>}
                                    {loading && <Loader/>}
                                    <GeneralButton
                                        buttonText="Continue"
                                        buttonType="submit"
                                        disabled={loading}
                                        page="profile"
                                    />
                                </form>
                                :
                                <form className="profile-form" onSubmit={handleSubmit(handleChangePassword)}>
                                    <h4>Change password</h4>
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
                                    {error && <p className="error-message-form">{error}</p>}
                                    {loading && <Loader/>}
                                    <GeneralButton
                                        buttonText="Continue"
                                        buttonType="submit"
                                        disabled={loading}
                                        pokemonName="mimikyu"
                                    />
                                </form>
                            }
                            <div className="profile-tabs">
                                <GeneralButton
                                    buttonText="Change email"
                                    buttonType="submit"
                                    disabled={loading || changeTab === "email"}
                                    onClick={handleChangeTab}
                                />
                                <GeneralButton
                                    buttonText="Change password"
                                    buttonType="submit"
                                    disabled={loading || changeTab === "password"}
                                    onClick={handleChangeTab}
                                />
                            </div>
                            {alertMessage &&
                                <AlertBox
                                    message={alertMessage}
                                />
                            }
                        </section>
                    </section>
                </section>
            </main>
            <Footer/>
        </>
    );
}

export default Profile;