import { useEffect, useState } from "react";

import CharactersList from "../../charactersList/CharactersList";

import useApi from "../../../services/useApi";

import "./episodes-page.scss";

const EpisodesPage = () => {
    const [episodes, setEpisodes] = useState([]);
    const [episodesInfo, setEpisodesInfo] = useState();

    // при изменении этого значения меняются персонажи и меняется информация про эпизод
    const [currentEpisode, setCurrentEpisode] = useState(2);

    const { loading, error, getEpisode, clearError } = useApi();

    const onCharactersLoaded = (data) => {
        setEpisodes(data.result);
        setEpisodesInfo(data.info);
    };

    useEffect(() => {
        clearError();
        getEpisode(currentEpisode).then(onCharactersLoaded);
    }, [currentEpisode]);

    return (
        <div className="episodes">
            <h1 className="episodes__title page-title">Episode name:</h1>

            <CharactersList data={episodes} loading={loading} error={error} />
        </div>
    );
};

export default EpisodesPage;
