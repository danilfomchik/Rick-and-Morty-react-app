import { useEffect, useState, useContext } from "react";

import { CurrentPageContext } from "../pages/CharactersPage";
import { getPageIntersection } from "../../helpers/getPageIntersection";

import CharactersItem from "../charactersItem/CharactersItem";
import PagesBlock from "../pagesBlock/PagesBlock";
import Spinner from "../spinner/Spinner";

import useApi from "../../services/useApi";

import "./characters-list.scss";

const CharactersList = () => {
    const [characters, setCharacters] = useState([]);
    const { currentPage, allPagesCount } = useContext(CurrentPageContext);

    const { loading, error, getAllCharacters } = useApi();

    useEffect(() => {
        onCharactersLoading();
    }, [currentPage]);

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

            <PagesBlock allPagesCount={allPagesCount} />
        </>
    );
};

export default CharactersList;
