import React, { useEffect, useState } from "react";

import useApi from "../../services/useApi";

import vercelDeploy from "../../resources/vercel-deploy.png";
import reactLogo from "../../resources/react-logo.png";

import "./footer.scss";

const Footer = () => {
    const [charactersCount, setCharactersCount] = useState(0);
    const [episodesCount, setEpisodesCount] = useState(0);
    const [locationsCount, setLocationsCount] = useState(0);
    const { getAllCharactersCount, getEpisode, getLocation } = useApi();

    useEffect(() => {
        getAllCharactersCount().then(setCharactersCount);
        getEpisode().then((data) => setEpisodesCount(data.count));
        getLocation().then((data) => setLocationsCount(data.count));
    }, []);

    return (
        <div className="footer">
            <div className="footer__api-info">
                <div className="footer__api-info__count">
                    CHARACTERS: <span>{charactersCount}</span>
                </div>
                <div className="footer__api-info__count">
                    LOCATIONS: <span>{locationsCount}</span>
                </div>
                <div className="footer__api-info__count">
                    EPISODES: <span>{episodesCount}</span>
                </div>
            </div>
            <div className="footer__social-medias">
                <ul className="footer__social-medias__list">
                    <li className="social-list_li">
                        <a
                            href="https://www.linkedin.com/in/danilfomchik/"
                            target="_blanck"
                            className="menu-item"
                        >
                            <i className="fab fa-linkedin"></i>
                        </a>
                    </li>
                    <li className="social-list_li">
                        <a
                            href="https://github.com/danilfomchik"
                            target="_blanck"
                            className="menu-item"
                        >
                            <i className="fab fa-github"></i>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="footer__developed-by">
                <span>❮❯ by </span>
                <a
                    href="https://github.com/danilfomchik"
                    target="_blank"
                    className="developer-name"
                >
                    <span>Daniil Fomenko</span>
                </a>
                <span> 2023</span>
            </div>
        </div>
    );
};

export default Footer;
