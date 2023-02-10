import { useState, createContext, useEffect, useRef } from "react";

import CharactersList from "../charactersList/CharactersList";
import SearchPanel from "../searchPanel/SearchPanel";

import { useCurrentPage } from "../../hooks/useCurrentPage";
import useApi from "../../services/useApi";

export const CurrentPageContext = createContext();

export const CharactersPage = () => {
    const [query, setQuery] = useState("");

    // осторожно!!! эта часть кода, возможно - костыль
    const [allCharactersPages, setAllCharactersPages] = useState(1);
    const currentPage = useCurrentPage(allCharactersPages);
    const searchRef = useRef(null);

    const { getAllPages } = useApi();

    useEffect(() => {
        getAllPages().then((pages) => {
            setAllCharactersPages(pages);
        });
    }, []);
    // осторожно!!! эта часть кода, возможно - костыль

    useEffect(() => {
        searchRef.current.scrollIntoView({
            block: "center",
            // behavior: "smooth",
        });
    }, [currentPage.currentPage]);

    return (
        <div className="characters">
            <h1>Characters</h1>

            <SearchPanel
                searchRef={searchRef}
                query={query}
                setQuery={setQuery}
            />

            <CurrentPageContext.Provider value={currentPage}>
                <CharactersList />
            </CurrentPageContext.Provider>
        </div>
    );
};
