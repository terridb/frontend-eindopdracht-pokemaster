import "./Footer.css";
import {createCurrentYear} from "../../helpers/createDate.js";
import SocialIcon from "../social-icon/SocialIcon.jsx";
import {FacebookLogo, InstagramLogo, TiktokLogo, YoutubeLogo} from "@phosphor-icons/react";

function Footer() {
    return (
        <footer>
            <p>© {createCurrentYear()} Pokémaster</p>
            <div className="footer-socials-wrapper">
                <SocialIcon
                    title="Facebook"
                    image={<FacebookLogo/>}
                    link="https://www.facebook.com/"
                />
                <SocialIcon
                    title="Instagram"
                    image={<InstagramLogo/>}
                    link="https://www.instagram.com/"
                />
                <SocialIcon
                    title="Tiktok"
                    image={<TiktokLogo/>}
                    link="https://www.tiktok.com/"
                />
                <SocialIcon
                    title="Youtube"
                    image={<YoutubeLogo/>}
                    link="https://www.youtube.com/"
                />
            </div>
        </footer>
    );
}

export default Footer;