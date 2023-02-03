import { Link, NavLink } from "react-router-dom";
import { Container } from "react-bootstrap";

import "./app-header.scss";
import logo from "../../resources/logo.png";

const setActiveClass = ({ isActive }) =>
    isActive ? "navigation-link__active" : "navigation-link__primary";

const AppHeader = () => {
    return (
        <header className="app-header">
            <Container className="app-header__container">
                <Link to="/">
                    <img
                        className="app-header__logo"
                        src={logo}
                        alt="Rick and Morty"
                    />
                </Link>

                <ul className="app-header__navigation">
                    <li className="app-header__navigation-link">
                        <NavLink end to="/" className={setActiveClass}>
                            Characters
                        </NavLink>
                    </li>
                    <li className="app-header__navigation-link">
                        <NavLink to="/episodes" className={setActiveClass}>
                            Episodes
                        </NavLink>
                    </li>
                    <li className="app-header__navigation-link">
                        <NavLink to="/locations" className={setActiveClass}>
                            Locations
                        </NavLink>
                    </li>
                </ul>
            </Container>
        </header>
    );
};

export default AppHeader;
