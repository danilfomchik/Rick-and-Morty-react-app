import { useEffect, useState, useCallback, useMemo } from "react";

import CharactersItem from "../charactersItem/CharactersItem";
import PagesBlock from "../pagesBlock/PagesBlock";
import Spinner from "../spinner/Spinner";

import useGettingData from "../../hooks/useGettingData";
import useApi from "../../services/useApi";

import "./characters-list.scss";

const CharactersList = ({ data, loading, error }) => {
    // console.log(data);

    const renderCharacters = useCallback(
        (characters) => {
            return characters.map((char) => (
                <CharactersItem
                    key={char.id}
                    id={char.id}
                    name={char.name}
                    location={char.location}
                    thumbnail={char.thumbnail}
                    species={char.species}
                    status={char.status}
                />
            ));
        },
        [data]
    );

    const charCards = renderCharacters(data);

    const content = !loading && !error && charCards;
    const spinner = loading && <Spinner />;
    const errorMessage = error && <h1>Nothing to show!</h1>;

    return (
        <>
            <div className="characters-list">
                {errorMessage}
                {spinner}
                {content}
            </div>
        </>
    );
};

export default CharactersList;
