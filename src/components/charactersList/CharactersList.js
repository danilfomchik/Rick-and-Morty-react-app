import { useEffect, useState, useCallback, useMemo } from "react";

import CharactersItem from "../charactersItem/CharactersItem";
import PagesBlock from "../pagesBlock/PagesBlock";
import Spinner from "../spinner/Spinner";

import useApi from "../../services/useApi";

import "./characters-list.scss";

const CharactersList = ({ query, scrollRef, currentPageControls }) => {
    const [characters, setCharacters] = useState([]);
    const { loading, error, getAllCharacters, getCharacterByName, clearError } =
        useApi();

    const { allPagesCount, setAllPagesCount, currentPage } =
        currentPageControls;

    useEffect(() => {
        scrollRef.current.scrollIntoView({
            block: "center",
            behavior: "smooth",
        });

        clearError();

        // применить useTransition
        if (query) {
            onCharactersLoading(() => getCharacterByName(query, currentPage));
        } else {
            onCharactersLoading(() => getAllCharacters(currentPage));
        }
    }, [currentPage, query]);

    const onCharactersLoading = (getDataFunc, param) => {
        getDataFunc(param).then(onCharactersLoaded);
    };

    const onCharactersLoaded = (data) => {
        setCharacters(data.result);
        setAllPagesCount(data.pages);
    };

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
        [characters]
    );

    const charCards = renderCharacters(characters);

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

            {!error && (
                <PagesBlock
                    allPagesCount={allPagesCount}
                    controls={currentPageControls}
                />
            )}
        </>
    );
};

export default CharactersList;
