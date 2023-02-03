import { useEffect, useState } from "react";

import CharactersItem from "../charactersItem/CharactersItem";
import Spinner from "../spinner/Spinner";

import useApi from "../../services/useApi";

import "./characters-list.scss";

const CharactersList = () => {
    const [characters, setCharacters] = useState([]);
    const [charactersPage, setCharactersPage] = useState(1);

    const { loading, error, getAllCharacters } = useApi();

    useEffect(() => {
        getAllCharacters(charactersPage).then(onCharactersLoaded);
    }, [charactersPage]);

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
            />
        ));
    };

    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error && <h1>ERROR!</h1>;

    const elements = renderCharacters(characters);

    return (
        <div className="characters-list">
            {errorMessage}
            {spinner}
            {elements}
        </div>
    );
};

export default CharactersList;
