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
                    <Suspense fallback={<Spinner />}>
                        <Routes>
                            <Route
                                path="/characters"
                                element={<CharactersPage />}
                            >
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

                            {/* // сделать компонент с отображением ошибки (dead morty) */}
                            <Route
                                path="*"
                                element={<h1>no such page!</h1>}
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
