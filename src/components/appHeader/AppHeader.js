import {useState} from 'react';
import {Link, NavLink, useLocation} from 'react-router-dom';

import rickAndMorty from '../../resources/rick-and-morty.png';
import './app-header.scss';

const setActiveClass = ({isActive}) =>
    isActive ? 'app-header__navigation-link__active' : 'app-header__navigation-link__primary';

const AppHeader = () => {
    const [isBurgerActive, setIsBurgerActive] = useState(false);

    const {pathname} = useLocation();

    return (
        <header className="app-header">
            <div className="app-header__container">
                <nav>
                    <Link to="/" className="app-header__mobile-logo">
                        <img className="app-header__logo" src={rickAndMorty} alt="Rick and Morty" />
                    </Link>

                    <ul className={`app-header__navigation ${isBurgerActive ? 'active' : ''}`}>
                        <li className="app-header__navigation-link">
                            <NavLink
                                to="/"
                                className={({isActive}) =>
                                    pathname.startsWith('/characters') || isActive
                                        ? 'app-header__navigation-link__active'
                                        : 'app-header__navigation-link__primary'
                                }
                                onClick={() => setIsBurgerActive(prev => !prev)}>
                                Characters
                            </NavLink>
                        </li>
                        <li className="app-header__navigation-link">
                            <NavLink
                                to="/episodes"
                                className={setActiveClass}
                                onClick={() => setIsBurgerActive(prev => !prev)}>
                                Episodes
                            </NavLink>
                        </li>
                        <li className="app-header__navigation-link">
                            <Link to="/" className="app-header__navigation-link__logo">
                                <img className="app-header__logo" src={rickAndMorty} alt="Rick and Morty" />
                            </Link>
                        </li>
                        <li className="app-header__navigation-link">
                            <NavLink
                                to="/locations"
                                className={setActiveClass}
                                onClick={() => setIsBurgerActive(prev => !prev)}>
                                Locations
                            </NavLink>
                        </li>

                        <li className="app-header__navigation-link">
                            <NavLink
                                to="https://rickandmortyapi.com/"
                                target={'_blank'}
                                className={setActiveClass}
                                onClick={() => setIsBurgerActive(prev => !prev)}>
                                API
                            </NavLink>
                        </li>
                    </ul>
                </nav>

                <div
                    className={`menu-btn ${isBurgerActive ? 'active' : ''}`}
                    onClick={() => setIsBurgerActive(prev => !prev)}>
                    <span></span>
                </div>
            </div>
        </header>
    );
};

export default AppHeader;
