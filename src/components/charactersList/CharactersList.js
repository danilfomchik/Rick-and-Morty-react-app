import { useCallback } from "react";

import CharactersItem from "../charactersItem/CharactersItem";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./characters-list.scss";

const CharactersList = ({ data, loading, error, page, onCharacterCLick }) => {
    const renderCharacters = useCallback(
        (characters) => {
            return characters.map((char) => (
                <CharactersItem
                    char={char}
                    key={char.id}
                    page={page}
                    onCharacterCLick={onCharacterCLick}
                />
            ));
        },
        [data]
    );

    const charCards = renderCharacters(data);

    const content = !loading && !error && charCards;
    const spinner = loading && <Spinner />;
    const errorMessage = error && <ErrorComponent />;

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

const ErrorComponent = () => {
    return (
        <div className="error-component">
            <ErrorMessage />
            <h2>Something went wrong...</h2>
        </div>
    );
};

export default CharactersList;
