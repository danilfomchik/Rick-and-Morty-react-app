import { useEffect, useState, useCallback, useMemo } from "react";

import CharactersItem from "../charactersItem/CharactersItem";
import PagesBlock from "../pagesBlock/PagesBlock";
import Spinner from "../spinner/Spinner";

import useApi from "../../services/useApi";

import "./characters-list.scss";

const CharactersList = ({
    query,
    scrollRef,
    currentPageControls,
    accordions,
    accordionsCategories,
}) => {
    const [characters, setCharacters] = useState([]);
    const { loading, error, getCharacters, clearError } = useApi();

    const { allPagesCount, setAllPagesCount, currentPage } =
        currentPageControls;

    useEffect(() => {
        clearError();

        // применить useTransition
        onCharactersLoading(() =>
            getCharacters({
                query,
                currentPage,
                // оптимизировать с помощью цикла
                status: accordions[0].currentCategory,
                species: accordions[1].currentCategory,
                gender: accordions[2].currentCategory,
                // оптимизировать с помощью цикла
            })
        );
    }, [currentPage, query, ...accordionsCategories]);

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
                    scrollRef={scrollRef}
                    allPagesCount={allPagesCount}
                    controls={currentPageControls}
                />
            )}
        </>
    );
};

export default CharactersList;
