import { useEffect, useState } from "react";
import { useOutlet, Outlet } from "react-router-dom";

import Salutation from "../../salutation/Salutation";
import Accordion from "../../accordion/Accordion";
import CharactersList from "../../charactersList/CharactersList";

import useData from "../../../hooks/useData";
import useApi from "../../../services/useApi";

import "./locations-page.scss";
import ErrorBoundery from "../../errorBoundary/ErrorBoundery";

const LocationsPage = () => {
    const outlet = useOutlet();

    const { loading, error, getLocation } = useApi();
    const {
        toggleAccordion,
        onCurrentCategoryChange,
        data,
        dataInfo,
        dataCount,
        currentData,
        accordion,
        onCharacterCLick,
    } = useData(getLocation, "location");

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
                                        Location: <span>{dataInfo.name}</span>
                                    </h1>
                                    <h3 className="locations__title">
                                        Dimension:{" "}
                                        <span>{dataInfo.dimension}</span>
                                    </h3>
                                    <h4 className="locations__title">
                                        Type: <span>{dataInfo.type}</span>
                                    </h4>
                                </div>
                            </>
                        )}

                        <ErrorBoundery>
                            <CharactersList
                                page={"/locations/"}
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

export default LocationsPage;
