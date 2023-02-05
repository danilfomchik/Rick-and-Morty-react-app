import { useEffect, useState, useCallback } from "react";

import CharactersItem from "../charactersItem/CharactersItem";
import Spinner from "../spinner/Spinner";

import useApi from "../../services/useApi";

import "./characters-list.scss";

const CharactersList = () => {
    const [characters, setCharacters] = useState([]);
    const [pagesCount, setPagesCount] = useState(1);

    const [currentPage, setCurrentPage] = useState(1);

    const { loading, error, getAllCharacters, getAllPages } = useApi();

    useEffect(() => {
        onCharactersLoading();
    }, [currentPage]);

    useEffect(() => {
        getAllPages().then((pages) => setPagesCount(pages));
    }, []);

    const onCharactersLoading = () => {
        getAllCharacters(currentPage).then(onCharactersLoaded);
    };

    const onCharactersLoaded = (data) => {
        setCharacters(data);
    };

    const renderCharacters = (characters) => {
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
    };

    const renderPages = (pagesCount) => {
        let pages = [];

        for (let page = 0; page < pagesCount; page++) {
            let currentPage = page + 1;

            pages.push(
                <div
                    key={currentPage}
                    onClick={() => setCurrentPage(currentPage)}
                    className="characters-list__pages-page"
                >
                    <span>{currentPage}</span>
                </div>
            );
        }

        return pages;
    };

    const charCards = renderCharacters(characters);
    const pagesBlocks = renderPages(pagesCount);

    const content = !loading && charCards;
    const spinner = loading && <Spinner />;
    const errorMessage = error && <h1>ERROR!</h1>;

    return (
        <>
            <div className="characters-list">
                {errorMessage}
                {spinner}
                {content}
            </div>
            <div className="characters-list__pages">{pagesBlocks}</div>
        </>
    );
};

export default CharactersList;
