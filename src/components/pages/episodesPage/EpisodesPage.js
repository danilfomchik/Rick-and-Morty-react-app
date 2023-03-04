import { useEffect, useState } from "react";

import Accordion from "../../accordion/Accordion";
import CharactersList from "../../charactersList/CharactersList";

import useApi from "../../../services/useApi";

import "./episodes-page.scss";

const EpisodesPage = () => {
    const [episodes, setEpisodes] = useState([]);
    const [episodesInfo, setEpisodesInfo] = useState({});
    const [episodesCount, setEpisodesCount] = useState(0);

    const [accordion, setAccordion] = useState({
        id: 0,
        title: "Status",
        categories: [],
        currentValue: "Episode - 1",
        open: false,
    });

    const [currentEpisode, setCurrentEpisode] = useState(0);

    const { loading, error, getEpisode, clearError } = useApi();

    const onCharactersLoaded = (data) => {
        setEpisodesInfo(data.info);
        setEpisodes(data.result);
        setEpisodesCount(data.count);

        setAccordion((prev) => ({
            ...prev,
            categories: setLocationAccordion(data.count),
        }));
    };

    useEffect(() => {
        clearError();
        getEpisode(currentEpisode).then(onCharactersLoaded);
    }, [currentEpisode]);

    const setLocationAccordion = (amount) => {
        let result = [];

        for (let i = 1; i <= amount; i++) {
            result.push(`Episode - ${i}`);
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

        let intCurrentValue = +currentValue.replace(/\D+/g, "");

        setAccordion((prev) => ({
            ...prev,
            currentValue,
        }));

        setCurrentEpisode(
            intCurrentValue === 0 ? intCurrentValue : intCurrentValue - 1
        );
    };

    return (
        <div className="episodes">
            <div className="episodes__episode-info">
                <h1 className="episodes__title page-title">
                    Episode name: <span>{episodesInfo.name}</span>
                </h1>
                <h3 className="episodes__title page-title">
                    Air date: <span>{episodesInfo.air_date}</span>
                </h3>
            </div>

            <Accordion
                customClass={"episodes__accordion"}
                id={0}
                accordion={accordion}
                toggleAccordion={toggleAccordion}
                onCurrentCategoryChange={onCurrentCategoryChange}
            />

            <CharactersList data={episodes} loading={loading} error={error} />
        </div>
    );
};

export default EpisodesPage;
