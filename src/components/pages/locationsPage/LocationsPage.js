import { useEffect, useState } from "react";
import { useOutlet, Outlet } from "react-router-dom";

import Salutation from "../../salutation/Salutation";
import Accordion from "../../accordion/Accordion";
import CharactersList from "../../charactersList/CharactersList";

import useApi from "../../../services/useApi";

import "./locations-page.scss";
import ErrorBoundery from "../../errorBoundary/ErrorBoundery";

const LocationsPage = () => {
    const [episodes, setEpisodes] = useState([]);
    const [episodesInfo, setEpisodesInfo] = useState({});
    const [episodesCount, setEpisodesCount] = useState(0);

    const outlet = useOutlet();

    const [accordion, setAccordion] = useState({
        id: 0,
        title: "",
        categories: [],
        currentValue: 1,
        open: false,
    });

    const [currentLocation, setCurrentLocation] = useState(1);

    const { loading, error, getLocation, getDataCount, clearError } = useApi();

    useEffect(() => {
        getDataCount("location").then((count) => {
            setEpisodesCount(count);
            setAccordion((prev) => ({
                ...prev,
                categories: setLocationAccordion(count),
            }));
        });
    }, []);

    useEffect(() => {
        clearError();
        getLocation(currentLocation).then((data) => {
            setEpisodesInfo(data.info);
            setEpisodes(data.result);
        });
    }, [currentLocation]);

    const setLocationAccordion = (amount) => {
        let result = [];

        for (let i = 1; i <= amount; i++) {
            result.push(i);
        }

        return result;
    };

    const toggleAccordion = (e) => {
        if (!e.target.classList.contains("accordion-container__content")) {
            setAccordion((prev) => ({
                ...prev,
                open: !prev.open,
            }));
        }
    };

    const onCurrentCategoryChange = (e, accordiontId, currentValue) => {
        e.stopPropagation();

        setAccordion((prev) => ({
            ...prev,
            currentValue,
        }));

        setCurrentLocation(currentValue);
    };

    return (
        <>
            {outlet ? (
                <Outlet />
            ) : (
                <>
                    <Salutation />

                    <div className="locations">
                        <h1 className="page-title">Locations</h1>

                        {!error && (
                            <>
                                <h4 className="locations__title page-title__2">
                                    Pick location
                                </h4>

                                <Accordion
                                    customClass={"locations__accordion"}
                                    id={0}
                                    initialValue={1}
                                    accordion={accordion}
                                    toggleAccordion={toggleAccordion}
                                    onCurrentCategoryChange={
                                        onCurrentCategoryChange
                                    }
                                />

                                <div className="locations__location-info">
                                    <h1 className="locations__title">
                                        Location:{" "}
                                        <span>{episodesInfo.name}</span>
                                    </h1>
                                    <h3 className="locations__title">
                                        Dimension:{" "}
                                        <span>{episodesInfo.dimension}</span>
                                    </h3>
                                    <h4 className="locations__title">
                                        Type: <span>{episodesInfo.type}</span>
                                    </h4>
                                </div>
                            </>
                        )}

                        <ErrorBoundery>
                            <CharactersList
                                page={"/locations/"}
                                data={episodes}
                                loading={loading}
                                error={error}
                            />
                        </ErrorBoundery>
                    </div>
                </>
            )}
        </>
    );
};

export default LocationsPage;
