import { useEffect, useState } from "react";
import { useOutlet, Outlet } from "react-router-dom";

import Salutation from "../../salutation/Salutation";
import Accordion from "../../accordion/Accordion";
import CharactersList from "../../charactersList/CharactersList";
import ErrorBoundery from "../../errorBoundary/ErrorBoundery";

import useData from "../../../hooks/useData";
import useApi from "../../../services/useApi";

import "./episodes-page.scss";

const EpisodesPage = () => {
    const outlet = useOutlet();

    const { loading, error, getEpisode } = useApi();
    const {
        toggleAccordion,
        onCurrentCategoryChange,
        data,
        dataInfo,
        accordion,
        onCharacterCLick,
    } = useData(getEpisode, "episode");

    return (
        <>
            {outlet ? (
                <Outlet />
            ) : (
                <>
                    <Salutation />

                    <div className="episodes">
                        <h1 className="page-title">Episodes</h1>

                        {!error && (
                            <>
                                <h4 className="episodes__title page-title__2">
                                    Pick Episode
                                </h4>

                                <Accordion
                                    customClass={"episodes__accordion"}
                                    id={0}
                                    initialValue={1}
                                    accordion={accordion}
                                    toggleAccordion={toggleAccordion}
                                    onCurrentCategoryChange={
                                        onCurrentCategoryChange
                                    }
                                />

                                <div className="episodes__episode-info">
                                    <h1 className="episodes__title">
                                        Episode name:{" "}
                                        <span>{dataInfo.name}</span>
                                    </h1>
                                    <h3 className="episodes__title">
                                        Air date:{" "}
                                        <span>{dataInfo.air_date}</span>
                                    </h3>
                                </div>
                            </>
                        )}

                        <ErrorBoundery>
                            <CharactersList
                                page={"/episodes/"}
                                data={data}
                                loading={loading}
                                error={error}
                                onCharacterCLick={onCharacterCLick}
                            />
                        </ErrorBoundery>
                    </div>
                </>
            )}
        </>
    );
};

export default EpisodesPage;
