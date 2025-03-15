import './IllustratedButton.css'
import {Link} from "react-router-dom";
import {changeTextToSimple} from "../../helpers/changeText.js";

function IllustratedButton({title}) {
const simpleTitle = changeTextToSimple(title);

    return (
        <>
            <Link to={`/${simpleTitle}`}>
                <button className={`illustrated-button ${simpleTitle}`} type="button">
                    {title}
                </button>
            </Link>
        </>
    );
}

export default IllustratedButton;