import "./NotFound.css";
import {Link} from "react-router-dom";

function NotFound() {
    return (
        <>
            <main>
                <section className="outer-container">
                    <div className="notfound-content">
                        <h1>404 - Oops!</h1>
                        <h2>Page could not be found</h2>
                        <p>The page you're trying to visit does not exist.</p>
                        <Link to="/">Go back to the homepage</Link>
                    </div>
                </section>
            </main>
        </>
    );
}

export default NotFound;