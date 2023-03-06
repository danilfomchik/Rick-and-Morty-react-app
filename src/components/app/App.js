import { lazy, Suspense } from "react";

import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";

import rickAndMorty from "../../resources/rick-and-morty.png";
import rickAndMortyMain from "../../resources/rick-and-morty-main.png";

import SingleCharacterPage from "../pages/singleCharacterPage/SingleCharacterPage";
import AppHeader from "../appHeader/AppHeader";
import Footer from "../footer/Footer";

import Spinner from "../spinner/Spinner";

import "./app.scss";

import { CharactersPage } from "../pages/charactersPage/CharactersPage";

const EpisodesPage = lazy(() => import("../pages/episodesPage/EpisodesPage"));
const LocationsPage = lazy(() =>
    import("../pages/locationsPage/LocationsPage")
);

function App() {
    return (
        <div className="app">
            <AppHeader />

            <Container>
                <main>
                    <div className="salutation">
                        <div className="salutation-content">
                            <h1>Rick & Morty API</h1>
                            <p>
                                Find your favorites rick and morty characters,
                                episodes and locations.
                            </p>
                        </div>
                        <div className="salutation-image">
                            <img
                                className="rick-and-morty__main-image"
                                src={rickAndMortyMain}
                                alt="Rick and Morty"
                            />
                        </div>
                    </div>

                    <Suspense fallback={<Spinner />}>
                        <Routes>
                            <Route path="/" element={<CharactersPage />}>
                                {/* outlet - это этот вложенный роут(SingleCharacterPage), он будет вставляться в (CharactersPage) */}
                                <Route
                                    path=":charId"
                                    element={<SingleCharacterPage />}
                                />
                            </Route>
                            <Route path="/episodes" element={<EpisodesPage />}>
                                <Route
                                    path=":charId"
                                    element={<SingleCharacterPage />}
                                />
                            </Route>
                            <Route
                                path="/locations"
                                element={<LocationsPage />}
                            >
                                <Route
                                    path=":charId"
                                    element={<SingleCharacterPage />}
                                />
                            </Route>

                            <Route
                                path="*"
                                element={<h1>Nothing to show..</h1>}
                            ></Route>
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
