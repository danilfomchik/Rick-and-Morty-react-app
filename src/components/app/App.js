import {Suspense, lazy} from 'react';
import {Container} from 'react-bootstrap';
import {Route, Routes, useLocation} from 'react-router-dom';

import AppHeader from '../appHeader/AppHeader';
import Footer from '../footer/Footer';
import {CharactersPage} from '../pages/charactersPage/CharactersPage';
import Page404 from '../pages/errorPage/404';
import SingleCharacterPage from '../pages/singleCharacterPage/SingleCharacterPage';
import Salutation from '../salutation/Salutation';
import Spinner from '../spinner/Spinner';
import './app.scss';

const EpisodesPage = lazy(() => import('../pages/episodesPage/EpisodesPage'));
const LocationsPage = lazy(() => import('../pages/locationsPage/LocationsPage'));

function App() {
    const {pathname} = useLocation();

    return (
        <div className="app">
            <AppHeader />

            <Container>
                <main>
                    {/* check if pathname ends with /number */}
                    {!pathname.match(/\/\d+$/) && <Salutation />}

                    <Suspense fallback={<Spinner />}>
                        <Routes>
                            <Route path="/" element={<CharactersPage />}>
                                <Route path="characters/:charId" element={<SingleCharacterPage />} />
                            </Route>
                            <Route path="/episodes" element={<EpisodesPage />}></Route>
                            <Route path="/locations" element={<LocationsPage />}></Route>
                            <Route path="*" element={<Page404 />}></Route>
                        </Routes>
                    </Suspense>
                </main>
            </Container>

            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default App;
