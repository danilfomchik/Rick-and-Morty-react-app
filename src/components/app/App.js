import { lazy, Suspense } from "react";

import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";

import "./app.scss";
import rickAndMorty from "../../resources/rick-and-morty.png";
import rickAndMortyMain from "../../resources/rick-and-morty-main.png";

import AppHeader from "../appHeader/AppHeader";

import Spinner from "../spinner/Spinner";

import { CharactersPage } from "../pages/charactersPage/CharactersPage";

const EpisodesPage = lazy(() => import("../pages/EpisodesPage"));
const LocationsPage = lazy(() => import("../pages/LocationsPage"));

function App() {
    return (
        <div className="app">
            <AppHeader />

            <Container className="salutation-container">
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
            </Container>

            <main>
                <Container className="main-container">
                    <Suspense fallback={<Spinner />}>
                        <Routes>
                            <Route path="/" element={<CharactersPage />} />
                            <Route
                                path="/episodes"
                                element={<EpisodesPage />}
                            />
                            <Route
                                path="/locations"
                                element={<LocationsPage />}
                            />
                            {/* <Route
                                path="/api"
                                element={<LocationsPage />}
                            /> */}

                            <Route
                                path="*"
                                element={<h1>Nothing to show..</h1>}
                            />
                        </Routes>
                    </Suspense>
                </Container>
            </main>
        </div>
    );
}

export default App;
