import "./ProfilePopup.css";
import {SignOut, User} from "@phosphor-icons/react";
import {useNavigate} from "react-router-dom";

function ProfilePopup({user, handleLogOut}) {
    const navigate = useNavigate();

    return (
        <div className="profile-popup">
            <div className="profile-popup-content">
                <h5 className="profile-popup-username">{user.username}</h5>
                <ul className="profile-popup-list">
                    <li className="profile-popup-item" onClick={() => navigate("/profile")}>
                        <User color="#5E5E5E" size={24} />
                        <p>See profile</p>
                    </li>
                    <li className="profile-popup-item" onClick={handleLogOut}>
                        <SignOut color="#5E5E5E" size={24} />
                        <p>Sign out</p>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default ProfilePopup;