import { useEffect, useState } from "react";

import Accordion from "../../accordion/Accordion";
import CharactersList from "../../charactersList/CharactersList";

import useApi from "../../../services/useApi";

import "./locations-page.scss";

const LocationsPage = () => {
    const [episodes, setEpisodes] = useState([]);
    const [episodesInfo, setEpisodesInfo] = useState({});
    const [episodesCount, setEpisodesCount] = useState(0);

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
        <div className="location">
            <h4 className="locations__title page-title">Pick location</h4>
            <Accordion
                customClass={"locations__accordion"}
                id={0}
                initialValue={1}
                accordion={accordion}
                toggleAccordion={toggleAccordion}
                onCurrentCategoryChange={onCurrentCategoryChange}
            />

            <div className="locations__location-info">
                <h1 className="locations__title page-title">
                    Location: <span>{episodesInfo.name}</span>
                </h1>
                <h3 className="locations__title page-title">
                    Dimension: <span>{episodesInfo.dimension}</span>
                </h3>
                <h4 className="locations__title page-title">
                    Type: <span>{episodesInfo.type}</span>
                </h4>
            </div>

            <CharactersList data={episodes} loading={loading} error={error} />
        </div>
    );
};

export default LocationsPage;
