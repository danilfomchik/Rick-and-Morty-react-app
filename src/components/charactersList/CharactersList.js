import { useEffect, useState, useCallback } from "react";

import CharactersItem from "../charactersItem/CharactersItem";
import PagesBlock from "../pagesBlock/PagesBlock";
import Spinner from "../spinner/Spinner";

import useApi from "../../services/useApi";
import { useCurrentPage } from "../../hooks/useCurrentPage";

import "./characters-list.scss";

const CharactersList = ({ query, scrollRef }) => {
    const [characters, setCharacters] = useState([]);
    const { loading, error, getAllCharacters, getAllPages } = useApi();

    // осторожно!!! эта часть кода, возможно - костыль
    const [allPagesCount, setAllPagesCount] = useState(1);
    const currentPage = useCurrentPage(allPagesCount);

    useEffect(() => {
        getAllPages().then((pages) => {
            setAllPagesCount(pages);
        });
    }, []);
    // осторожно!!! эта часть кода, возможно - костыль

    useEffect(() => {
        scrollRef.current.scrollIntoView({
            block: "center",
            behavior: "smooth",
        });

        onCharactersLoading();
    }, [currentPage.currentPage]);

    const onCharactersLoading = () => {
        getAllCharacters(currentPage.currentPage).then(onCharactersLoaded);
    };

    const onCharactersLoaded = (data) => {
        setCharacters(data);
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

            <PagesBlock allPagesCount={allPagesCount} controls={currentPage} />
        </>
    );
};

export default CharactersList;
