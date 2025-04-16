import {Link} from "react-router-dom";
import {HeartStraight} from "@phosphor-icons/react";

function FavoriteIcon() {
    return (
        <>
            <Link to={"/favorites"} className="favorite-icon nav">
                <HeartStraight
                    color="white"
                />
            </Link>
        </>
    );
}

export default FavoriteIcon;