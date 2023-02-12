import { useEffect, useState, useCallback } from "react";

import CharactersItem from "../charactersItem/CharactersItem";
import PagesBlock from "../pagesBlock/PagesBlock";
import Spinner from "../spinner/Spinner";

import useApi from "../../services/useApi";
import { useCurrentPage } from "../../hooks/useCurrentPage";

import "./characters-list.scss";

const CharactersList = ({ query, scrollRef }) => {
    const [characters, setCharacters] = useState([]);
    const [allPagesCount, setAllPagesCount] = useState(1);
    const currentPageInfo = useCurrentPage(allPagesCount);

    const { currentPage, setNewPage } = currentPageInfo;

    const { loading, error, getAllCharacters, getCharacterByName, clearError } =
        useApi();

    useEffect(() => {
        scrollRef.current.scrollIntoView({
            block: "center",
            behavior: "smooth",
        });

        clearError();

        if (error) {
            setAllPagesCount(1);
        }

        // применить useTransition
        if (query) {
            onCharactersLoading(() => getCharacterByName(query, currentPage));
        } else {
            setNewPage(1);
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
    const errorMessage = error && <h1>ERROR!</h1>;

    return (
        <>
            <div className="characters-list">
                {errorMessage}
                {spinner}
                {content}
            </div>

            <PagesBlock
                allPagesCount={allPagesCount}
                controls={currentPageInfo}
            />
        </>
    );
};

export default CharactersList;
