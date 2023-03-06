import { useEffect, useState } from "react";
import { useOutlet, Outlet } from "react-router-dom";

import Accordion from "../../accordion/Accordion";
import CharactersList from "../../charactersList/CharactersList";

import useApi from "../../../services/useApi";

import "./episodes-page.scss";

const EpisodesPage = () => {
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

    const [currentEpisode, setCurrentEpisode] = useState(1);

    const { loading, error, getEpisode, getDataCount, clearError } = useApi();

    useEffect(() => {
        getDataCount("episode").then((count) => {
            setEpisodesCount(count);
            setAccordion((prev) => ({
                ...prev,
                categories: setLocationAccordion(count),
            }));
        });
    }, []);

    useEffect(() => {
        clearError();

        getEpisode(currentEpisode).then((data) => {
            setEpisodesInfo(data.info);
            setEpisodes(data.result);
        });
    }, [currentEpisode]);

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

        setCurrentEpisode(currentValue);
    };

    return (
        <>
            {outlet ? (
                <Outlet />
            ) : (
                <div className="episodes">
                    <h4 className="episodes__title page-title">Pick Episode</h4>
                    <Accordion
                        customClass={"episodes__accordion"}
                        id={0}
                        initialValue={1}
                        accordion={accordion}
                        toggleAccordion={toggleAccordion}
                        onCurrentCategoryChange={onCurrentCategoryChange}
                    />

                    <div className="episodes__episode-info">
                        <h1 className="episodes__title page-title">
                            Episode name: <span>{episodesInfo.name}</span>
                        </h1>
                        <h3 className="episodes__title page-title">
                            Air date: <span>{episodesInfo.air_date}</span>
                        </h3>
                    </div>

                    <CharactersList
                        page={"/episodes/"}
                        data={episodes}
                        loading={loading}
                        error={error}
                    />
                </div>
            )}
        </>
    );
};

export default EpisodesPage;
