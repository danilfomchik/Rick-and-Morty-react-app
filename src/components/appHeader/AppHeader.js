import { Link, NavLink } from "react-router-dom";
import { Container } from "react-bootstrap";

import "./app-header.scss";
import logo from "../../resources/logo.png";
import rickAndMorty from "../../resources/rick-and-morty.png";

const setActiveClass = ({ isActive }) =>
    isActive
        ? "app-header__navigation-link__active"
        : "app-header__navigation-link__primary";

const AppHeader = () => {
    return (
        <header className="app-header">
            <div className="app-header__container">
                <ul className="app-header__navigation">
                    <li className="app-header__navigation-link">
                        <NavLink to="/" className={setActiveClass}>
                            Characters
                        </NavLink>
                    </li>
                    <li className="app-header__navigation-link">
                        <NavLink to="/episodes" className={setActiveClass}>
                            Episodes
                        </NavLink>
                    </li>
                    <li className="app-header__navigation-link">
                        <Link
                            to="/"
                            className="app-header__navigation-link__logo"
                        >
                            <img
                                className="app-header__logo"
                                src={rickAndMorty}
                                alt="Rick and Morty"
                            />
                        </Link>
                    </li>
                    <li className="app-header__navigation-link">
                        <NavLink to="/locations" className={setActiveClass}>
                            Locations
                        </NavLink>
                    </li>

                    <li className="app-header__navigation-link">
                        <NavLink
                            to="https://rickandmortyapi.com/"
                            target={"_blank"}
                            className={setActiveClass}
                        >
                            API
                        </NavLink>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default AppHeader;
