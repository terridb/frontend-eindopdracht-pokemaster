import "./SocialIcon.css";

function SocialIcon({link, image, title}) {
    return (
        <a href={link} target="_blank" rel="noreferrer" className="social-icon" aria-label={`Go to ${title}`}>
            {image}
        </a>
    );
}

export default SocialIcon;