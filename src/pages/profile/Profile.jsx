import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

function Profile() {
    const {logout} = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <>
            <button type="button" onClick={logout}> sign out </button>
            <button type="button" onClick={() => navigate("/")}> home </button>
        </>
    );
}

export default Profile;