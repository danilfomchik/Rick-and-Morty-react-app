import React from "react";

import vercelDeploy from "../../resources/vercel-deploy.png";
import reactLogo from "../../resources/react-logo.png";

import "./footer.scss";

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer__api-info">
                <div className="footer__api-info__count">
                    CHARACTERS: {<span>826</span>}
                </div>
                <div className="footer__api-info__count">
                    LOCATIONS: {<span>126</span>}
                </div>
                <div className="footer__api-info__count">
                    EPISODES: {<span>51</span>}
                </div>
            </div>
            {/* <div className="footer__logotypes">
                <img src={vercelDeploy} alt="vercel-deploy" />
                <img src={reactLogo} alt="react-logo" />
            </div> */}
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
