import { useState, createContext, useEffect } from "react";

import CharactersList from "../charactersList/CharactersList";
import SearchPanel from "../searchPanel/SearchPanel";

import { useCurrentPage } from "../../hooks/useCurrentPage";
import useApi from "../../services/useApi";

export const CurrentPageContext = createContext();

export const CharactersPage = () => {
    const [query, setQuery] = useState("");

    // осторожно!!! эта часть кода, возможно - костыль
    const [allCharactersPages, setAllCharactersPages] = useState(1);

    const { getAllPages } = useApi();

    useEffect(() => {
        getAllPages().then((pages) => {
            setAllCharactersPages(pages);
        });
    }, []);
    // осторожно!!! эта часть кода, возможно - костыль

    const currentPage = useCurrentPage(allCharactersPages);

    return (
        <div className="characters">
            <h1>Characters</h1>

            <SearchPanel query={query} setQuery={setQuery} />

            <CurrentPageContext.Provider value={currentPage}>
                <CharactersList />
            </CurrentPageContext.Provider>
        </div>
    );
};
